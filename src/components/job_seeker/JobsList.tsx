// actions
import { fetchJobsAction } from "@/actions/job-seeker-actions";

// lib
import { JobFilterValues } from "@/lib/validation";

// components
import Container from "@/components/Container";
import Error from "@/components/Error";
import JobCard from "@/components/JobCard";
import Pagination from "@/components/job_seeker/Pagination";
import JobsFilterServer from "@/components/job_seeker/JobsFilterServer";

interface JobsListProps {
  filterValues: JobFilterValues;
  userID: string;
}

export default async function JobsList({
  filterValues,
  userID,
}: JobsListProps) {
  let jobs: Job[] = [];
  let totalPages: number = 1;

  const response: Jobs = await fetchJobsAction({
    search: filterValues.search,
    jobType: filterValues.jobType,
    location: filterValues.location,
    jobMode: filterValues.jobMode,
    page: Number(filterValues.page || 1),
    limit: 5,
    userID,
  });

  if (response.status === 500) {
    return <Error status={response.status} message="Internal server error" />;
  }

  if (response.status === 404) {
    return <Error status={response.status} message="Jobs not found!" />;
  }

  if (response.data) {
    jobs = response.data.jobs;
    totalPages = response.data.totalPages;
  }

  return (
    <Container>
      <div className="flex flex-row items-start">
        <JobsFilterServer defaultValues={filterValues} />
        <div className="w-full">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
          <Pagination
            page={Number(filterValues.page || 1)}
            totalPages={totalPages}
          />
        </div>
      </div>
    </Container>
  );
}
