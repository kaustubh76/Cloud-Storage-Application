
import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import authOptions from './../lib/auth';

import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

export async function createContext({ req, res }: { req: NextApiRequest, res: NextApiResponse }): Promise<Context> {
  const session = await getSession({ req });
  return { req, res, session };
}

export interface Context {
  req: NextApiRequest;
  res: NextApiResponse;
  session: Session | null;
}