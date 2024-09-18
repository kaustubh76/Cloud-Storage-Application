import { initTRPC } from '@trpc/server';
import { userRouter } from './routers/user';
import { fileRouter } from './routers/file';
import { noteRouter } from './routers/note';
import { photoRouter } from './routers/photo';
import { OpenApiMeta } from 'trpc-openapi';
import { createContext } from '../../lib/context';

const t = initTRPC.meta<OpenApiMeta>().context<ReturnType<typeof createContext>>().create();

// Create the main tRPC router
import { AnyRouter } from '@trpc/server';

export const appRouter: AnyRouter = t.router({
  user: userRouter,
  file: fileRouter,
  note: noteRouter,
  photo: photoRouter,
});

export type AppRouter = typeof appRouter;
