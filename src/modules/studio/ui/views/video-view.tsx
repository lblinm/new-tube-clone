import { FormSection } from '../sections/form-sections'
import { VideosSection } from '../sections/videos-section'

interface PageProps {
  videoId: string
}

export const VideoView = ({ videoId }: PageProps) => {
  return (
    <div className="px-4 pt-2.5 max-w-screen-lg">
      <FormSection videoId={videoId} />
    </div>
  )
}
