// actions
import { fetchSavedJobsAction } from "@/actions/job-seeker-actions";

// components
import Error from "@/components/Error";
import Container from "@/components/Container";
import JobCard from "@/components/JobCard";

export default async function SavedJobsList({ userID }: { userID: string }) {
  const response = await fetchSavedJobsAction(userID);

  if (response.status === 500) {
    return <Error status={response.status} message="Internal server error" />;
  }

  if (response.status === 404) {
    return <Error status={response.status} message="No saved jobs found!" />;
  }

  const savedJobs =
    response.data?.savedJobs
      .map((savedJob) => savedJob.job)
      .filter((job): job is Job => job !== null) ?? [];

  return (
    <Container>
      <div className="flex items-center justify-between mb-4 w-fit">
        <h1 className="font-bold text-xl">Saved jobs - {savedJobs.length}</h1>
        {/* <div className="ml-2 relative h-10 w-10 rounded-full bg-[#333] text-white">
          <span className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium">
            {savedJobs.length}
          </span>
        </div> */}
      </div>
      <div className="w-full grid md:grid-cols-2 gap-x-4">
        {savedJobs.map((job: Job) => (
          <JobCard key={job.id} job={job} isDefaultSaved={true} />
        ))}
      </div>
      <div></div>
    </Container>
  );
}
