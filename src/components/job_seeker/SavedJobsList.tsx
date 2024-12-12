// actions
import fetchSavedJobsAction from "@/actions/fetchSavedJobsAction";

// components
import JobCard from "@/components/job_seeker/JobCard";

export default async function SavedJobs({ userID }: { userID: string }) {
  let jobs = [];

  try {
    // Call the server action to fetch saved jobs
    const savedJobs = await fetchSavedJobsAction(userID);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jobs = savedJobs.map((savedJob: any) => savedJob.job);
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }

  return (
    <div className="w-full">
      {jobs.length > 0 ? (
        jobs.map((job: Job) => <JobCard key={job.id} job={job} />)
      ) : (
        <p>No bookmarks found</p>
      )}
    </div>
  );
}
