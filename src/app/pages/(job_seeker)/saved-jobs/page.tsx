import { Suspense } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

// lib
import { getUserIdServer, getIsJobSeekerServer } from "@/lib/user";

// components
import UnauthorizedAccess from "@/components/UnauthorizedAccess";
import SavedJobsSkeleton from "@/components/skeletons/SavedJobsSkeleton";
import SavedJobsList from "@/components/job_seeker/SavedJobsList";

export const metadata: Metadata = {
  title: "Jooble | Saved jobs",
};

export default async function SavedJobsPage() {
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

  if (!userID) redirect("/pages/signin");

  return (
    <div className="min-h-[calc(100vh-88px)] pt-[calc(72px+4rem)] pb-[4rem] flex justify-center">
      <div className="relative max-w-5xl w-full px-4 flex flex-col">
        <Suspense fallback={<SavedJobsSkeleton />}>
          <SavedJobsList userID={userID} />
        </Suspense>
      </div>
    </div>
  );
}
