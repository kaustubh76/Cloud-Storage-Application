import { TRPCError } from '@trpc/server';
import { middleware } from '@trpc/server';

export const apiKeyMiddleware = middleware(({ ctx, next }: { ctx: any, next: () => Promise<void> }) => {
  const apiKey = ctx.req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid API Key' });
  }
  return next();
});
