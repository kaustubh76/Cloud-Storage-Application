import { TRPCError } from '@trpc/server';
import { t } from '../lib/trpc';  // Ensure that this points to your initialized tRPC instance

export const apiKeyMiddleware = t.middleware(({ ctx, next }) => {
  const apiKey = ctx.req?.headers['x-api-key'];

  if (apiKey !== process.env.API_KEY) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid API Key' });
  }

  return next();
});