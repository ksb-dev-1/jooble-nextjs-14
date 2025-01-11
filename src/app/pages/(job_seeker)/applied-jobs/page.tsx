import { Suspense } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

// lib
import { getUserIdServer, getIsJobSeekerServer } from "@/lib/user";

// components
import Error from "@/components/Error";
import SavedJobsPageSkeleton from "@/components/skeletons/SavedJobsPageSkeleton";
import AppliedJobsList from "@/components/job_seeker/AppliedJobsList";

export const metadata: Metadata = {
  title: "Jooble | Applied jobs",
};

export default async function AppliedJobsPage() {
  const userID = await getUserIdServer();
  const isJobSeeker = await getIsJobSeekerServer();

  if (!userID) {
    redirect("/pages/signin");
  }

  if (!isJobSeeker) {
    return (
      <Error status={401} message="Only job seekers can access this page." />
    );
  }

  return (
    <Suspense fallback={<SavedJobsPageSkeleton />}>
      <AppliedJobsList userID={userID} />
    </Suspense>
  );
}
