'use client'

import { trpc } from '@/trpc/client'

export const PageClient = () => {
  const [data] = trpc.hello.useSuspenseQuery({
    text: 'lblinm',
  })
  return <div>{data.greeting}</div>
}
