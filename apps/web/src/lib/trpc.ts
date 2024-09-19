import { TRPCError, initTRPC } from '@trpc/server';
import { Context } from './context';
import { OpenApiMeta } from 'trpc-openapi';

import { AppRouter } from '../server/api/root';




export const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

