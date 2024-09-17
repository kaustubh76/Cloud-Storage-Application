import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
 import { SessionStrategy } from "next-auth";
 import { db } from "../server/db";

const options = {
  providers: [
    // Example of a custom credentials provider for Passkey/WebAuthn integration
    CredentialsProvider({
      id: "passkey",
      name: "Passkey",
      credentials: {},
      async authorize(credentials, req) {
        // Add your WebAuthn authorization logic here
        // You may use WebAuthn API or any Passkey solution you are integrating
        const user = {}; // Dummy user object to simulate a successful login

        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  adapter: DrizzleAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  experimental: { enableWebAuthn: true }, // Enable experimental WebAuthn
  session: {
    strategy: "jwt" as SessionStrategy,
  },
};

export default NextAuth(options);