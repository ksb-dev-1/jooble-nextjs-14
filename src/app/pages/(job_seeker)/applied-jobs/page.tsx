import { Suspense } from "react";
import { Metadata } from "next";

// lib
import { getUserIdServer, getIsJobSeekerServer } from "@/lib/user";

// components
import UnauthorizedAccess from "@/components/UnauthorizedAccess";

export const metadata: Metadata = {
  title: "Jooble | Applied jobs",
};

export default async function AppliedJobsPage() {
  const userID = await getUserIdServer();
  const isJobSeeker = await getIsJobSeekerServer();

  if (!userID) {
    return <UnauthorizedAccess message="Sign in to access this page." />;
  }

  if (!isJobSeeker) {
    return (
      <UnauthorizedAccess message="Only job seekers can access this page." />
    );
  }

  return (
    <div className="min-h-screen pt-[calc(72px+4rem)] pb-[4rem] flex justify-center">
      <div className="relative max-w-5xl w-full px-4 flex flex-col">
        <Suspense fallback={<div>Loading...</div>}>Applied jobs</Suspense>
      </div>
    </div>
  );
}
