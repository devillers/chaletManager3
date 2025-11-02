const authSecret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;

if (!authSecret) {
  throw new Error(
    "Missing AUTH_SECRET (or NEXTAUTH_SECRET) environment variable required for NextAuth",
  );
}

export const AUTH_SECRET = authSecret;
