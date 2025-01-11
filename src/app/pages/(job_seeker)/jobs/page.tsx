import { Suspense } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

// lib
import { JobFilterValues } from "@/lib/validation";
import { getUserIdServer, getIsJobSeekerServer } from "@/lib/user";

// components
import Error from "@/components/Error";
import JobsPageSkeleton from "@/components/skeletons/JobsPageSkeleton";
import JobsList from "@/components/job_seeker/JobsList";

interface JobsPageProps {
  searchParams: Promise<{
    search?: string;
    jobType?: string;
    location?: string;
    jobMode?: string;
    page?: string;
  }>;
}

export const metadata: Metadata = {
  title: "Jooble | Jobs",
};

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const { search, jobType, location, jobMode, page } = await searchParams;
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

  const filterValues: JobFilterValues = {
    search,
    jobType,
    location,
    jobMode,
    page,
  };

  return (
    <Suspense fallback={<JobsPageSkeleton />}>
      <JobsList filterValues={filterValues} userID={userID} />
    </Suspense>
  );
}
