import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "email",
          placeholder: "Email",
        },

        password: {
          label: "Password:",
          type: "password",
          placeholder: "Password",
        },
      },
      //@ts-ignore
      async authorize(credentials) {
        if (
          credentials?.email === "admin@gmail.com" &&
          credentials?.password === "password"
        ) {
          return credentials;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};
