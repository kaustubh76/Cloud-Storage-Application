import { router, publicProcedure } from '../../../lib/trpc';
import { z } from 'zod';
import { apiKeyMiddleware } from '../../../middleware/apiKeyMiddleware';
import { AnyRouter } from '@trpc/server';

export const secureRouter: AnyRouter  = router({
  getUserData: publicProcedure
    .use(apiKeyMiddleware)  // Use the middleware here
    .input(z.object({
      userId: z.string(),
    }))
    .query(async ({ input }) => {
      // Fetch user data securely
      return {
        message: `Secure data for user ${input.userId}`,
      };
    }),
});