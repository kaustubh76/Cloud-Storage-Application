import { router, publicProcedure } from '../../../lib/trpc';
import { z } from 'zod';
import { db } from '../../db';

export const userRouter = router({
  getUser: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await db.query.users.findFirst({
        where: (user) => user.id.equals(input.id),
      });
    }),
  // TODO: Add more user-related procedures
});
