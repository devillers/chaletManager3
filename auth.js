// auth.js
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    // ➜ ajoute/retire des providers selon ton besoin
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Credentials(), GitHub(), etc. si nécessaire
  ],
  callbacks: {
    // Propager le rôle dans le JWT puis la session
    async jwt({ token, user }) {
      // Si ton process d'auth (Credentials/DB) fournit un role, on le garde
      if (user?.role) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (!session.user) session.user = {};
      if (token?.role) session.user.role = token.role;
      return session;
    },
  },
});
