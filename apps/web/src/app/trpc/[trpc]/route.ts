import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '../../../server/api/root';
import { createContext } from '../../../lib/context';

const handler = trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});

export { handler as GET, handler as POST };
