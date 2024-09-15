import { router, publicProcedure } from '../../../lib/trpc';
import { z } from 'zod';
import { db } from '../../db';
import { photos } from '../../db/schema';
export const photoRouter = router({
  uploadPhoto: publicProcedure
    .input(z.object({
      filename: z.string(),
      size: z.number(),
      url: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      // Check if user is authenticated
      const userId = ctx.session?.user?.id;
      if (!userId) {
        throw new Error('Unauthorized');
      }

      // Insert photo record into the database
      return await db.insert(photos).values({
        userId,
        filename: input.filename,
        size: input.size,
        url: input.url,
        uploadDate: new Date(),
      }).returning();
    }),

  getPhotos: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
    if (!userId) {
      throw new Error('Unauthorized');
    }

    // Fetch photos for the authenticated user
    return await db.select().from(photos).where('user_id', userId);
  }),
});