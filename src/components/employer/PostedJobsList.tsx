// actions
import { fetchPostedJobsAction } from "@/actions/employer-actions";

// components
import Error from "@/components/Error";
import Container from "@/components/Container";
import JobCard from "@/components/JobCard";

export default async function PostedJobsList({ userID }: { userID: string }) {
  const response = await fetchPostedJobsAction(userID);

  if (response.status === 500) {
    return <Error status={response.status} message="Internal server error" />;
  }

  if (response.status === 404) {
    return (
      <Error
        status={response.status}
        message="No jobs posted by this recruiter."
      />
    );
  }

  const postedJobs = response.data?.postedJobs ?? []; // Use postedJobs from the response

  return (
    <Container>
      <div className="w-full grid md:grid-cols-2 gap-x-4">
        {postedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isEmployer={true}
            applicationsCount={job.applications.length}
            //statuses={job.applications.map((application) => application.status)}
          />
        ))}
      </div>
    </Container>
  );
}
