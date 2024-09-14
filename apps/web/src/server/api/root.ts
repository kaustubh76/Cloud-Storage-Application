import { router } from "../../lib/trpc";
import { userRouter } from './routers/user';
import { fileRouter } from './routers/file';
import { noteRouter } from './routers/note';
import { photoRouter } from './routers/photo';


export const appRouter = router({
  user: userRouter,
  file: fileRouter,
  note: noteRouter,
  photo: photoRouter,
});

export type AppRouter = typeof appRouter;
