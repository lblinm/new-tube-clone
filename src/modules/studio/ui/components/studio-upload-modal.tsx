'use client'
import { ResponsiveModal } from '@/components/responsive-modal'
import { Button } from '@/components/ui/button'
import { trpc } from '@/trpc/client'
import { error } from 'console'

import { Loader2Icon, PlusIcon } from 'lucide-react'
import { toast } from 'sonner'
import { StudioUploader } from './studio-uplodaer'
import { useRouter } from 'next/navigation'

export const StudioUploadModal = () => {
  const router = useRouter()
  const utils = trpc.useUtils()
  const create = trpc.videos.create.useMutation({
    onSuccess: () => {
      toast.success('Video created')
      utils.studio.getMany.invalidate()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSuccess = () => {
    if (!create.data?.video.id) return
    create.reset()
    router.push(`/studio/videos/${create.data.video.id}`)
  }

  return (
    <>
      <ResponsiveModal
        title="Uploader"
        open={!!create.data?.url}
        onOpenChange={() => create.reset()}>
        {create.data?.url ? (
          <StudioUploader endpoint={create.data.url} onSuccess={onSuccess} />
        ) : (
          <Loader2Icon />
        )}
      </ResponsiveModal>
      <Button
        variant="secondary"
        disabled={create.isPending}
        onClick={() => create.mutate()}>
        {create.isPending ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <PlusIcon />
        )}
        Create
      </Button>
    </>
  )
}
