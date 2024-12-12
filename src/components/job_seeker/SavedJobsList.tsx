import JobCard from "@/components/job_seeker/JobCard";
import { auth } from "@/auth";

export default async function SavedJobs() {
  const session = await auth();
  const userID = session?.user.id;

  //console.log(userID);

  let jobs = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/saved-jobs?userID=${userID}`,
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
    jobs = data.map((savedJob: { job: Job }) => savedJob.job);
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
