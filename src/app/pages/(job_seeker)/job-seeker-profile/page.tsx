import { Suspense } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

// lib
import { getUserIdServer, getIsJobSeekerServer } from "@/lib/user";

// components
import UnauthorizedAccess from "@/components/errors/UnauthorizedAccess";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Jooble | Profile",
};

export default async function AppliedJobsPage() {
  const userID = await getUserIdServer();
  const isJobSeeker = await getIsJobSeekerServer();

  if (!userID) {
    redirect("/pages/signin");
  }

  if (!isJobSeeker) {
    return (
      <UnauthorizedAccess message="Only job seekers can access this page." />
    );
  }

  return (
    <Container>
      <Suspense fallback={<div>Loading...</div>}>Job seeker profile</Suspense>
    </Container>
  );
}
