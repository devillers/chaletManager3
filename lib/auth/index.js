// lib/auth/index.js
import NextAuth, { getServerSession } from "next-auth";
import { authOptions } from "./options";

// Handler pour la route /api/auth/[...nextauth]
const handler = NextAuth(authOptions);
export const handlers = { GET: handler, POST: handler };

// Helper "auth" compatible v4 (équivalent getServerSession)
export async function auth() {
  return getServerSession(authOptions);
}
