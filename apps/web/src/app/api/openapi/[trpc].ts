import { appRouter } from '../../../server/api/root';
import { createOpenApiNextHandler } from '@trpc/server/adapters/next';
import { createContext } from '../../../lib/context';

export default createOpenApiNextHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      console.error('Something went wrong', error);
    }
  },
});
