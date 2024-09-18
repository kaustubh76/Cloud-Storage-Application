import { appRouter } from '../../../server/api/root';
import { generateOpenApiDocument } from 'trpc-openapi';
import { NextApiRequest, NextApiResponse } from 'next';

const openApiSchema = generateOpenApiDocument(appRouter, {
  title: 'My API',
  version: '1.0.0',
  baseUrl: 'http://localhost:3000/api',
  description: 'OpenAPI schema for my tRPC API',
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(openApiSchema);
}
