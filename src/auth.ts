// auth.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { Adapter } from "next-auth/adapters";

// lib
import { prisma } from "./lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [Google, GitHub],
  pages: {
    signIn: "/pages/signin",
  },
  callbacks: {
    async session({ session, user }) {
      if (session && user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
  },
});
