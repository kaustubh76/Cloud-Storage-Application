import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { db } from './../../../server/db';
import { notes } from './../../../server/db/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session?.user?.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const userNotes = await db.select().from(notes).where('user_id', session.user.id);
      return res.status(200).json(userNotes);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching notes', error });
    }
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
