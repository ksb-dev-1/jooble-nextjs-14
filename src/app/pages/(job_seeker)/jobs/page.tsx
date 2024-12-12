import { Suspense } from "react";

// schemas
import { JobFilterValues } from "@/lib/validation";

// 3rd party
import { auth } from "@/auth";

// components
import JobsList from "@/components/job_seeker/JobsList";
import JobsFilterServer from "@/components/job_seeker/JobsFilterServer";
import JobsSkeleton from "@/components/skeletons/JobsSkeleton";
import { UserRole } from "@prisma/client";
import { IoWarningOutline } from "react-icons/io5";

interface JobsPageProps {
  searchParams: Promise<{
    search?: string;
    jobType?: string;
    location?: string;
    jobMode?: string;
    page?: string;
  }>;
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const { search, jobType, location, jobMode, page } = await searchParams;
  const session = await auth();
  const user = session?.user?.id;
  const isJobSeeker = session?.user?.role === UserRole.JOB_SEEKER;

  // Unauthorized Access Message
  const UnauthorizedMessage = ({ message }: { message: string }) => (
    <div className="min-h-screen pt-[calc(72px+4rem)] pb-[4rem] flex justify-center">
      <div className="relative max-w-5xl w-full px-4 flex flex-col">
        <div className="bg-red-100 text-red-600 flex flex-col items-center justify-center shadow-md px-4 py-16">
          <p className="flex items-center font-bold text-xl mb-4">
            <IoWarningOutline className="text-2xl" />
            <span className="ml-4">401 - Unauthorized! </span>
          </p>
          <p className="text-center">{message}</p>
        </div>
      </div>
    </div>
  );

  if (!user) {
    return <UnauthorizedMessage message="Sign in to access this page." />;
  }

  if (!isJobSeeker) {
    return (
      <UnauthorizedMessage message="Only job seekers can access this page." />
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
