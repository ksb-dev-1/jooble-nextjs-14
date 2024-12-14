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
    <>
      <h1 className="flex items-center font-bold text-xl mb-8">
        <span>Saved jobs</span>
        <div className="ml-2 relative h-7 w-7 rounded-full bg-[#333] text-white">
          <span className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-normal">
            {jobs.length}
          </span>
        </div>
      </h1>
      <div className="w-full grid sm:grid-cols-2 gap-x-4">
        {jobs.length > 0 ? (
          jobs.map((job: Job) => <JobCard key={job.id} job={job} />)
        ) : (
          <p>No bookmarks found</p>
        )}
      </div>
    </>
  );
}
