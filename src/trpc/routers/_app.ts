import { studioRouter } from '@/modules/studio/server/procedure'
import { createTRPCRouter } from '../init'
import { categoriesRouter } from '@/modules/categories/server/procedures'
import { videosRouter } from '@/modules/videos/server/procedure'
import { videoViewsRouter } from '@/modules/video-views/server/procedure'
import { videoReactionsRouter } from '@/modules/video-reactions/server/procedure'
export const appRouter = createTRPCRouter({
  videos: videosRouter,
  studio: studioRouter,
  categories: categoriesRouter,
  videoViews: videoViewsRouter,
  videoReactions: videoReactionsRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
