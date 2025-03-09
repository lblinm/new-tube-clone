'use client'
import { Button } from '@/components/ui/button'
import { trpc } from '@/trpc/client'
import { error } from 'console'

import { Loader2Icon, PlusIcon } from 'lucide-react'
import { toast } from 'sonner'

export const StudioUploadModal = () => {
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
  return (
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
  )
}
