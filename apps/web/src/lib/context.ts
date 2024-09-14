import { getServerSession } from "next-auth";
import authOptions  from "./auth";

export async function createContext({ req, res }) {
  const session = await getServerSession(req, res, authOptions);
  return { session };
}

export type Context = ReturnType<typeof createContext>;
