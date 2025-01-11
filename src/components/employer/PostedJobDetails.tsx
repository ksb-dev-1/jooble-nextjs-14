import { fetchPostedJobDetailsAction } from "@/actions/employer-actions";

// components
import Container from "@/components/Container";
import Error from "@/components/Error";
import ApplicationItem from "./ApplicationItem";

export default async function PostedJobDetails({ jobID }: { jobID: string }) {
  const response = await fetchPostedJobDetailsAction(jobID);

  if (response.status === 500) {
    return <Error status={response.status} message="Internal server error" />;
  }

  if (response.status === 404) {
    return <Error status={response.status} message="Job detail not found!" />;
  }

  if (!response.success) {
    return <p>{response.message}</p>;
  }

  // Use the extended type JobWithApplications
  const jobDetails = response.data?.jobDetails;

  if (!jobDetails) {
    return <p>No job details available.</p>;
  }

  // Ensure the application includes the 'id' property
  const { applications } = jobDetails;

  return (
    <Container>
      <div className="flex flex-col items-start">
        <div className="w-full">
          <div>
            <h1 className="font-bold mb-4 text-xl">Job Details</h1>
            <h2>Applicants:</h2>
            <ul>
              {applications.map((application) => (
                <ApplicationItem
                  key={application.id} // Use application.id here
                  application={application} // Pass full application data, including 'id'
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}
