import { pgTable, serial, text, timestamp, integer, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).unique().notNull(),
  createdAt: timestamp('created_at').defaultNow(),

});

export const files = pgTable('files', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  filename: text('filename').notNull(),
  size: integer('size').notNull(),
  uploadDate: timestamp('upload_date').defaultNow(),
  url: text('url').notNull(),
});

export const notes = pgTable('notes', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const photos = pgTable('photos', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  filename: text('filename').notNull(),
  size: integer('size').notNull(),
  url: text('url').notNull(),
  uploadDate: timestamp('upload_date').defaultNow(),
});

export const authenticators = pgTable('authenticators', {
  id: text('id').primaryKey().notNull(),
  credentialID: text('credential_id').unique().notNull(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  providerAccountId: text('provider_account_id').notNull(),
  credentialPublicKey: text('credential_public_key').notNull(),
  counter: integer('counter').notNull(),
  credentialDeviceType: text('credential_device_type').notNull(),
  transports: text('transports'),
});

export const schema = {
  users,
  files,
  notes,
  photos,
  authenticators,
};
