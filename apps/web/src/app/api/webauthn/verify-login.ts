import { NextApiRequest, NextApiResponse } from 'next';
import { verifyAuthenticationResponse } from '@simplewebauthn/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = req.body;

  const verification = await verifyAuthenticationResponse({
    response,
    expectedChallenge: 'challenge',
    expectedOrigin: 'http://localhost:3000',
    expectedRPID: 'localhost',
    authenticator: {
      credentialID: new Uint8Array(Buffer.from('registered-credential-id')),
      credentialPublicKey: new Uint8Array(Buffer.from('public-key')),
      counter: 0,
    },
  });

  if (verification.verified) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(400).json({ success: false });
  }
}
