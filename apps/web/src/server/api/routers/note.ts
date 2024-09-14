import { router, publicProcedure } from '../../../lib/trpc';
import { z } from 'zod';
import { db } from '../../db';

export const noteRouter = router({
  createNote: publicProcedure
    .input(z.object({
      title: z.string(),
      content: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      if (!(await ctx).session?.user?.id) {
        throw new Error('Unauthorized');
      }
      return await db.insertInto('notes').values({
        userId: ctx.session.user.id,
        title: input.title,
        content: input.content,
      }).returning();
    }),
  getNotes: publicProcedure.query(async ({ ctx }) => {
    if (!(await ctx).session?.user?.id) {
      throw new Error('Unauthorized');
    }
    return await db.select().from('notes').where('user_id', ctx.session.user.id);
  }),
  
});
