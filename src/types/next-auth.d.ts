import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: UserRole;
  }
  interface Session {
    user: User & DefaultSession["user"];
  }
}
