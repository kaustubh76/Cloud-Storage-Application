
import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import authOptions from './../lib/auth';

export async function createContext({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
  const session = await getServerSession(req, res, authOptions);
  return { req, res, session };
}

export type Context = ReturnType<typeof createContext>;
