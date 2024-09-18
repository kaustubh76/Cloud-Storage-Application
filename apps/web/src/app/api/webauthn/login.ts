import { NextApiRequest, NextApiResponse } from 'next';
import { generateAuthenticationOptions } from '@simplewebauthn/server';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const options = generateAuthenticationOptions({
    rpID: 'localhost',
    allowCredentials: [
      {
        id: new TextEncoder().encode('registered-credential-id'),
        type: 'public-key',
        transports: ['usb', 'ble', 'nfc', 'internal'],
      },
    ],
  });

  res.status(200).json(options);
}
