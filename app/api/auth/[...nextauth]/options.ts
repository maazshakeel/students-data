import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
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
      async authorize(credentials) {
        if (
          credentials?.email === "admin@gmail.com" &&
          credentials?.password === "password"
        ) {
          return credentials;
        }
        return null;

        // try {
        //   const user = await login(credentials.email, credentials.password);
        //   return user;
        // } catch (e: any) {
        //   console.error(e);
        //   return null;
        // }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};
