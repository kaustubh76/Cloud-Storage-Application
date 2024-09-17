import { router } from './../../lib/trpc';
import { userRouter } from './routers/user';
import { fileRouter } from './routers/file';
import { noteRouter } from './routers/note';
import { photoRouter } from './routers/photo';
import { openApiIntegration } from 'trpc-openapi';

const openApi = openApiIntegration({
  basePath: '/api',
  apiKey: process.env.API_KEY!,
});

export const appRouter = router({})
  .merge('user.', userRouter)
  .merge('file.', fileRouter)
  .merge('note.', noteRouter)
  .merge('photo.', photoRouter)
  .transformer(openApiIntegration({
    basePath: '/api',
    apiKey: process.env.API_KEY!,
  }));

// Export type definition of API
export type AppRouter = typeof appRouter;
