import { db } from '@/db'
import { videos } from '@/db/schema'
import { serve } from '@upstash/workflow/nextjs'
import { and, eq } from 'drizzle-orm'
import { UTApi } from 'uploadthing/server'

interface InputType {
  userId: string
  videoId: string
  prompt: string
}

const maxRetries = 5

export const { POST } = serve(async (context) => {
  const utapi = new UTApi()
  const input = context.requestPayload as InputType
  const { userId, videoId, prompt } = input

  const video = await context.run('get-video', async () => {
    const [existingVideo] = await db
      .select()
      .from(videos)
      .where(and(eq(videos.id, videoId), eq(videos.userId, userId)))

    if (!existingVideo) throw new Error('Not found')

    return existingVideo
  })

  const { body: postBody } = await context.call<{
    output: { task_id: string }
  }>('generate-thumbnail', {
    url: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.BAILIAN_API_KEY}`,
      'Content-Type': 'application/json',
      'X-DashScope-Async': 'enable',
    },
    body: {
      model: 'wanx2.1-t2i-turbo',
      input: {
        prompt,
      },
      parameters: {
        size: '1280*720',
        n: 1,
      },
    },
  })

  const task_id = postBody.output.task_id
  if (!task_id) throw new Error('Fail to generate iamge')

  let tempThumbnailUrl: string | null = null
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    await context.sleep('pause-to-wait', 5)

    const { body: getBody } = await context.call('get-thumbnail', {
      url: `https://dashscope.aliyuncs.com/api/v1/tasks/${task_id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.BAILIAN_API_KEY}`,
      },
    })

    const body = JSON.parse(getBody as string)
    const task_status = body.output.task_status
    if (task_status === 'SUCCEEDED') {
      tempThumbnailUrl = body.output.results[0].url
      break
    } else if (task_status === 'FAILED') {
      throw new Error('Thumbnail generation failed')
    }
  }

  if (!tempThumbnailUrl) throw new Error('Bad request')

  await context.run('cleanup-thumbnail', async () => {
    if (video.thumbnailKey) {
      await utapi.deleteFiles(video.thumbnailKey)
      await db
        .update(videos)
        .set({ thumbnailKey: null, thumbnailUrl: null })
        .where(and(eq(videos.id, videoId), eq(videos.userId, userId)))
    }
  })

  const uploadedThumbnail = await context.run('upload-thumbnail', async () => {
    const { data } = await utapi.uploadFilesFromUrl(tempThumbnailUrl!)

    if (!data) throw new Error('Bad request')
    return data
  })

  await context.run('update-video', async () => {
    await db
      .update(videos)
      .set({
        thumbnailKey: uploadedThumbnail.key,
        thumbnailUrl: uploadedThumbnail.url,
      })
      .where(and(eq(videos.id, video.id), eq(videos.userId, video.userId)))
  })
})
