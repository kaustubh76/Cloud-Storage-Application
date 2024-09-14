import NextAuth from "next-auth";
import PassKeyProvider from "next-auth/providers/passkey";
import { DrizzleAdapter } from "next-auth/drizzle-adapter";
import { db } from "../../db";

import { SessionStrategy } from "next-auth";

const options = {
  providers: [
    PassKeyProvider({
      name: "Passkey",
      type: "passkey",
      // Additional Passkey configuration
    }),
  ],
  adapter: DrizzleAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as SessionStrategy,
  },
};

export default NextAuth(options);
