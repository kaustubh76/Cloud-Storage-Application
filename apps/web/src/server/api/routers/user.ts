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

import { t } from '../../../lib/trpc';
import { z } from 'zod';
import { apiKeyMiddleware } from '../../../middleware/apiKeyMiddleware';
import { AnyRouter } from '@trpc/server';

// Define the user router with OpenAPI methods
export const userRouter: AnyRouter  = t.router({
  getUser: t.procedure
    .use(apiKeyMiddleware) // Use API Key middleware
    .input(z.object({
      id: z.string(),
    }))
    .query(async ({ input }: { input: { id: string } }) => {
      // Fetch user by ID (dummy data for demonstration)
      const user = {
        id: input.id,
        name: 'John Doe',
      };
      return user;
    }),
});



