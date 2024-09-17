import { UploadThing, type FileRouter } from 'uploadthing/next-legacy';
import { NextResponse } from 'next/server';
import { db } from './../../../server/db';

const f = new UploadThing();

const ourFileRouter: FileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFiles: 10,
    },
  }).onUploadComplete(async ({ metadata, file }) => {
    // Save file metadata to the database
    if (!metadata.userId) return;
    await db.insertInto('files').values({
      userId: metadata.userId,
      filename: file.originalFilename,
      size: file.size,
      url: file.url,
    });
  }),
  // Add more uploaders if needed
};

export { ourFileRouter as default };
