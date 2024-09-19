import { createUploadthing } from 'uploadthing/next-legacy';
import type { FileRouter } from 'uploadthing/next-legacy';
import { db } from './../../../server/db';

const f = createUploadthing();

const ourFileRouter: FileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
    },
  }).onUploadComplete(async ({ metadata, file }) => {

    const userId = metadata.userId;
    // Save file metadata to the database
    if (!userId) return;
    await db.insertInto('files').values({
      userId:userId,
      filename: file.originalFilename,
      size: file.size,
      url: file.url,
    });
  }),
  // Add more uploaders if needed
};

export { ourFileRouter as default };
