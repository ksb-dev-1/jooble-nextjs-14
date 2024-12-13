import { Suspense } from "react";
import { Metadata } from "next";

// lib
import { JobFilterValues } from "@/lib/validation";
import { getUserIdServer, getIsJobSeekerServer } from "@/lib/user";

// components
import UnauthorizedAccess from "@/components/UnauthorizedAccess";
import JobsSkeleton from "@/components/skeletons/JobsSkeleton";
import JobsFilterServer from "@/components/job_seeker/JobsFilterServer";
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
    return <UnauthorizedAccess message="Sign in to access this page." />;
  }

  if (!isJobSeeker) {
    return (
      <UnauthorizedAccess message="Only job seekers can access this page." />
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
    <div className="min-h-screen pt-[calc(72px+4rem)] pb-[4rem] flex justify-center">
      <div className="relative max-w-5xl w-full px-4 flex flex-col">
        <Suspense fallback={<JobsSkeleton />}>
          <div className="flex flex-col md:flex-row items-start">
            <JobsFilterServer defaultValues={filterValues} />
            <JobsList filterValues={filterValues} />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
