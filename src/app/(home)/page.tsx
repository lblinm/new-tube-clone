import { HydrateClient, trpc } from '@/trpc/server'
import { PageClient } from './client'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export default async function Home() {
  // const { data } = trpc.hello.useQuery({ text: 'lblinm2' }) // 客户端获取数据
  // const data = await trpc.hello({ text: 'lblinm' }) // 服务端获取数据
  void trpc.hello.prefetch({ text: 'lblinm' })
  return (
    <HydrateClient>
      <Suspense fallback={<p>Loading</p>}>
        <ErrorBoundary fallback={<p>Error</p>}>
          <PageClient />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  )
}
