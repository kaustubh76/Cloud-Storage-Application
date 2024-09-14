import { router, publicProcedure } from '../../../lib/trpc';
import { z } from 'zod';
import { db } from '../../db';

export const fileRouter = router({
  uploadFile: publicProcedure
    .input(z.object({
      filename: z.string(),
      size: z.number(),
      url: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      if (!(await ctx).session?.user?.id) {
        throw new Error('Unauthorized');
      }
    const file: {
      userId: number;
      filename: string;
      size: number;
      url: string;
    } = {
      userId: ctx.session.user.id as number, // Assuming the type of `id` is number
      filename: input.filename,
      size: input.size,
      url: input.url,
    };

    return await db.insertInto('files').values(file).returning();
    }),
  getFiles: publicProcedure.query(async ({ ctx }) => {
    if (!(await ctx).session?.user?.id) {
      throw new Error('Unauthorized');
    }
    return await db.select().from('files').where('user_id', ctx.session.user.id);
  }),
  // TODO: Add more file-related procedures
});
