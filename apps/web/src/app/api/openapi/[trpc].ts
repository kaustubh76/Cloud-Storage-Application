import { appRouter } from '../../../server/api/root';
import { createNextApiHandler } from '@trpc/server/adapters/next';
import { createContext } from '../../../lib/context';
import { TRPCError } from '@trpc/server';


export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError({ error }: { error: TRPCError }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      console.error('Something went wrong', error);
    }
  },
});
