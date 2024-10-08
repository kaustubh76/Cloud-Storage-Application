import { router, publicProcedure } from '../../../lib/trpc';
import { z } from 'zod';
import { db } from '../../db';
import { files } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { Context } from '../../../lib/context';

export const fileRouter = router({
  uploadFile: publicProcedure
    .input(z.object({
      filename: z.string(),
      size: z.number(),
      url: z.string(),
    }))
    .mutation(async ({ input, ctx }: { input: any, ctx: Context }) => {
      // TODO: Implement type safety
      // Check if user is authenticated
      const userId = ctx.session?.user?.id;
      if (!userId) {
        throw new Error('Unauthorized');
      }

      // Insert file record into the database
      const file = {
        userId: Number(userId),
        filename: input.filename,
        size: input.size,
        url: input.url,
        uploadDate: new Date(),
      };

      return await db.insert(files).values(file).returning();
    }),

  getFiles: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
    if (!userId) {
      throw new Error('Unauthorized');
    }

    // Fetch files for the authenticated user
    return await db.select().from(files).where(eq(files.userId, Number(userId)));
  }),
});