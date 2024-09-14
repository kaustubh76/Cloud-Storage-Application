import NextAuth from "next-auth";
import PasskeyProvider from "@next-auth/passkey";
import { DrizzleAdapter } from "next-auth/drizzle-adapter";
import { db } from "./db";

const options = {
  providers: [
    PasskeyProvider({
      name: "Passkey",
      type: "passkey",
      // Additional Passkey configuration
    }),
  ],
  adapter: DrizzleAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(options);
