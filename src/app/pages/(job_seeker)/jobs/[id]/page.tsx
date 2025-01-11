import { Suspense } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

// actions
import { fetchJobDetailsAction } from "@/actions/job-seeker-actions";

// lib
import { getUserIdServer, getIsJobSeekerServer } from "@/lib/user";

// components
import Error from "@/components/Error";
import Container from "@/components/Container";
import JobDetails from "@/components/job_seeker/JobDetails";

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const job = await fetchJobDetailsAction(id);

  return {
    title: `Jooble | ${job.data?.jobDetails.companyName}`,
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userID = await getUserIdServer();
  const isJobSeeker = await getIsJobSeekerServer();

  if (!userID) {
    redirect("/pages/signin");
  }

  if (!isJobSeeker) {
    return (
      <Error status={401} message="Only job seekers can access this page." />
    );
  }

  const id = (await params).id;

  return (
    <Suspense fallback={<Container>Loading...</Container>}>
      <JobDetails jobID={id} isJobSeeker={isJobSeeker} />
    </Suspense>
  );
}
