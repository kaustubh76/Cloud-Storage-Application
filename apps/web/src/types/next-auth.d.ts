import { DefaultSession } from 'next-auth';

// Extend the default Session type to include user id
declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // assuming id is a string in your database
    } & DefaultSession['user'];
  }
}