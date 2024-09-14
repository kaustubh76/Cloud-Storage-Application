import { router, publicProcedure } from '../../../lib/trpc';
import { z } from 'zod';
import { db } from '../../db';

export const photoRouter = router({
  uploadPhoto: publicProcedure
    .input(z.object({
      filename: z.string(),
      size: z.number(),
      url: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user?.id) {
        throw new Error('Unauthorized');
      }
      return await db.insertInto('photos').values({
        userId: ctx.session.user.id,
        filename: input.filename,
        size: input.size,
        url: input.url,
      }).returning();
    }),
  getPhotos: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user?.id) {
      throw new Error('Unauthorized');
    }
    return await db.select().from('photos').where('user_id', ctx.session.user.id);
  }),
  
});
