import { NextApiRequest, NextApiResponse } from 'next';
import { generateRegistrationOptions } from '@simplewebauthn/server';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.body;

  const options = generateRegistrationOptions({
    rpName: 'My App',
    rpID: 'localhost',
    userID: username || 'defaultUserID',
    userName: username || 'defaultUserName',
  });

  res.status(200).json(options);
}
