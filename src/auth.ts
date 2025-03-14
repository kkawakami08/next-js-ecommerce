import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import type { NextAuthConfig } from "next-auth";

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        //find user in DB
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        //check if user exists and if password matches
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );

          //if password is correct, return user
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        //if user doesn't exists or password doesn't match then return null
        return null;
      },
    }),
  ],
  callbacks: {
    //runs when session is accessed
    //trigger - reason why it ran (update, sign in, etc)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, user, trigger, token }: any) {
      //set the user id from the token
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      //if there is an update, set the user name
      if (trigger === "update") {
        session.user.name = user.name;
      }

      return session;
    },
    //jwt callback - customize what is in the token (default to user.id)
    //called whenever jwt is created

    async jwt({ token, user, trigger, session }: any) {
      //assign user fields to token
      if (user) {
        token.role = user.role;

        //if user has no name then use the email
        if (user.name == "NO_NAME") {
          token.name = user.email!.split("@")[0];

          //update DB to reflect the token name
          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: { name: token.name },
          });
        }
      }
      return token;
    },
  },
} satisfies NextAuthConfig;

//handlers - object containing HTTP handlers for endpoints next auth uses. will use this to make next auth api routes
//signIn - sign in with provider
//singOut - sign out user
//auth - gets session to check is user is logged in or not
export const { handlers, signIn, signOut, auth } = NextAuth(config);
