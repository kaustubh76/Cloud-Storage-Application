import { router, publicProcedure } from '../../../lib/trpc';
import { z } from 'zod';
import { db } from '../../db';
import { notes } from '../../db/schema';
import { eq } from 'drizzle-orm';


export const noteRouter = router({
  createNote: publicProcedure
    .input(z.object({
      title: z.string(),
      content: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      // Check if user is authenticated
      const userId = Number(ctx.session?.user?.id);
      if (!userId) {
        throw new Error('Unauthorized');
      }

      // Insert note into the database
      const newNote = await db.insert(notes).values({
        userId,
        title: input.title,
        content: input.content,
        createdAt: new Date(),
        updatedAt: new Date(),
      }).returning();

      return newNote;
    }),

  getNotes: publicProcedure
  .input(z.object({
    id: z.number(),
  }))
  .query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
    if (!userId) {
      throw new Error('Unauthorized');
    }

    // Fetch notes for the authenticated user
    const userNotes = await db.select().from(notes).where(eq(notes.userId, Number(userId)));
    return userNotes;
  }),

  updateNote: publicProcedure
    .input(z.object({
      id: z.number(),
      title: z.string(),
      content: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      // Check if user is authenticated
      const userId = ctx.session?.user?.id;
      if (!userId) {
        throw new Error('Unauthorized');
      }

      // Update note in the database
      const updatedNote = await db.update(notes)
        .set({
          title: input.title,
          content: input.content,
          updatedAt: new Date(),
        })
        .where(eq(notes.id, input.id))
       // TODO: type defining
       // .andwhere(eq(notes.userId, Number(userId)))
        .returning();

      return updatedNote;
    }),
});