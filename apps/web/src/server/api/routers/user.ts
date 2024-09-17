// import { router, publicProcedure } from '../../../lib/trpc';
// import { z } from 'zod';
// import { db } from '../../db';
// import { eq } from 'drizzle-orm';
// import { users } from '../../db/schema';

// export const userRouter = router({
//   getUser: publicProcedure
//     .input(z.object({ id: z.number() }))
//     .query(async ({ input }) => {
//       return await db.query.users.findFirst({
//         where: eq(db.users.id, input.id),
//       });
//     }),
//   // TODO: Add more user-related procedures
// });



