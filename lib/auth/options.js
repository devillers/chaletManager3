import Credentials from "next-auth/providers/credentials";
import { connectToDatabase } from "../db/connect";
import User from "../../models/User";

export const authOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/fr/signin",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        await connectToDatabase();
        const user = await User.findOne({ email: credentials.email }).select("+password");
        if (!user) {
          throw new Error("Invalid credentials");
        }
        const passwordMatches = await user.comparePassword(credentials.password);
        if (!passwordMatches) {
          throw new Error("Invalid credentials");
        }
        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};
