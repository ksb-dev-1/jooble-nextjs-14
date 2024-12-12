import { JobFilterValues } from "@/lib/validation";

// components
import JobCard from "@/components/job_seeker/JobCard";
import Pagination from "@/components/job_seeker/Pagination";

// 3rd party
import { auth } from "@/auth";

interface JobsListProps {
  filterValues: JobFilterValues;
}

export async function fetchJobs(filterValues: JobFilterValues) {
  const session = await auth();
  const userID = session?.user.id;

  const { search, jobType, location, jobMode, page } = filterValues;

  const queryParams = new URLSearchParams({
    ...(search && { search }),
    ...(jobType && { jobType }),
    ...(location && { location }),
    ...(jobMode && { jobMode }),
    ...(page && { page }),
    limit: "5",
  });

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/jobs?${queryParams.toString()}&userID=${userID}`,
    {
      next: {
        tags: ["jobs"],
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = await response.json();
  return data;
}

export default async function JobsList({ filterValues }: JobsListProps) {
  let jobs: Job[] = [];
  let totalPages: number = 1;

  try {
    const data = await fetchJobs(filterValues);
    jobs = data.jobs;
    totalPages = data.totalPages;
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }

  return (
    <>
      {jobs.length > 0 ? (
        <div className="w-full">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
          <Pagination totalPages={totalPages} />
        </div>
      ) : (
        <p className="w-full">No jobs found</p>
      )}
    </>
  );
}
