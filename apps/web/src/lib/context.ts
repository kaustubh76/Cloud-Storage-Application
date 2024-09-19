import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '@/lib/auth';
import { Session } from 'next-auth';

// Define the context for tRPC
export interface Context {
  req: NextApiRequest;
  res: NextApiResponse;
  session: Session | null;  // Make session optional since it may not always be present
}

// Create the context object
export async function createContext({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
  const session = await getServerSession(req, res, authOptions);

  return {
    req,
    res,
    session,
  };
}