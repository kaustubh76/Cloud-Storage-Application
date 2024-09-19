import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { db } from './../../server/db';
import { photos } from './../../server/db/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session?.user?.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { filename, size, url } = req.body;

    try {
      await db.insert(photos).values({
        userId: Number(session.user.id),
        filename,
        size,
        url,
        uploadDate: new Date(),
      });

      return res.status(200).json({ message: 'Photo uploaded successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error uploading photo', error });
    }
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default DriveSection;
