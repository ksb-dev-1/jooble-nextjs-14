// actions
import { fetchAppliedJobsAction } from "@/actions/job-seeker-actions";

// components
import Error from "@/components/Error";
import Container from "@/components/Container";
import JobCard from "@/components/JobCard";

export default async function AppliedJobsList({ userID }: { userID: string }) {
  const response = await fetchAppliedJobsAction(userID);

  if (response.status === 500) {
    return <Error status={response.status} message="Internal server error" />;
  }

  if (response.status === 404) {
    return <Error status={response.status} message="No applied jobs found!" />;
  }

  const appliedJobs =
    response.data?.appliedJobs
      .filter((appliedJob) => appliedJob.job !== null) // Filter out null jobs
      .map((appliedJob) => ({
        job: appliedJob.job as Job, // Type assertion: we've already filtered out nulls
        status: appliedJob.status,
      })) ?? [];

  return (
    <Container>
      <div className="w-full grid md:grid-cols-2 gap-x-4">
        {appliedJobs.map(({ job, status }) => (
          <JobCard key={job.id} job={job} applicationStatus={status} />
        ))}
      </div>
    </Container>
  );
}
