import { Suspense } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

// lib
import { getUserIdServer, getIsEmployerServer } from "@/lib/user";

// components
import Error from "@/components/Error";
import SavedJobsPageSkeleton from "@/components/skeletons/SavedJobsPageSkeleton";
import PostedJobsList from "@/components/employer/PostedJobsList";

export const metadata: Metadata = {
  title: "Jooble | Posted jobs",
};

export default async function PostedJobsPage() {
  const userID = await getUserIdServer();
  const isEmployer = await getIsEmployerServer();

  if (!userID) {
    redirect("/pages/signin");
  }

  if (!isEmployer) {
    return (
      <Error status={401} message="Only employers can access this page." />
    );
  }

  return (
    <Suspense fallback={<SavedJobsPageSkeleton />}>
      <PostedJobsList userID={userID} />
    </Suspense>
  );
}
