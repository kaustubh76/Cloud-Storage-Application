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


export const session = pgTable('session', {
  id: text('id').primaryKey().notNull(),
  sessionToken: text('sessionToken').notNull().unique(),
  userId: serial('userId').notNull().references(() => users.id),
  expires: timestamp('expires', { withTimezone: true }).notNull(),
});

export const verificationTokens = pgTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: timestamp('expires', { withTimezone: true }).notNull(),
});

export const schema = {
  users,
  files,
  notes,
  photos,
  verificationTokens,
  session,
};
