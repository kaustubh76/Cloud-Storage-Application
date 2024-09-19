import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "../../../../server/db";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Passkey",
      id: "passkey",
      credentials: {},
      async authorize(credentials, req) {
        const user = { id: '1', name: 'John Doe', email: 'john@example.com' };
        return user ? user : null;
      },
    }),
  ],
  adapter: DrizzleAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
  },
});
