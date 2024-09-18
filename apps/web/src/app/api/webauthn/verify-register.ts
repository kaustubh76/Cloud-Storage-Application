import { NextApiRequest, NextApiResponse } from 'next';
import { verifyRegistrationResponse } from '@simplewebauthn/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const credential = req.body;

  const verification = await verifyRegistrationResponse({
    response: credential,
    expectedChallenge: 'challenge',
    expectedOrigin: 'http://localhost:3000',
    expectedRPID: 'localhost',
  });

  if (verification.verified) {
    // Store credential in the database
    return res.status(200).json({ success: true });
  } else {
    return res.status(400).json({ success: false });
  }
}
