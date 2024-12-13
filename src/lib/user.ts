import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

export async function getUserIdServer() {
  const session = await auth();
  return session?.user.id;
}

export async function getIsJobSeekerServer() {
  const session = await auth();
  return session?.user?.role === UserRole.JOB_SEEKER;
}

export async function getIsEmployerServer() {
  const session = await auth();
  return session?.user?.role === UserRole.EMPLOYER;
}
