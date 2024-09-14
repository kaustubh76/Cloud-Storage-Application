// apps/web/src/app/api/trpc/[trpc]/route.ts
import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '@/server/api/root';
import { createContext } from '@/lib/context';

export const { GET, POST } = trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
