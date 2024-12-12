import { JobFilterValues } from "@/lib/validation";
import JobCard from "@/components/job_seeker/JobCard";
import Pagination from "@/components/job_seeker/Pagination";
import fetchJobsAction from "@/actions/fetchJobsAction"; // Use server action here

interface JobsListProps {
  filterValues: JobFilterValues;
}

export default async function JobsList({ filterValues }: JobsListProps) {
  let jobs: Job[] = [];
  let totalPages: number = 1;

  try {
    // Call the server action directly
    const data = await fetchJobsAction({
      userID: "user_id_placeholder", // Replace with actual userID if available
      search: filterValues.search,
      jobType: filterValues.jobType,
      location: filterValues.location,
      jobMode: filterValues.jobMode,
      page: Number(filterValues.page || 1),
      limit: 5,
    });
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
