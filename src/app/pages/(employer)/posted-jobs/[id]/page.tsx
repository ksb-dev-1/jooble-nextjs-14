import { Suspense } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

// actions
import { fetchJobDetailsAction } from "@/actions/job-seeker-actions";

// lib
import { getUserIdServer, getIsEmployerServer } from "@/lib/user";

// components
import Error from "@/components/Error";
import Container from "@/components/Container";
import PostedJobDetails from "@/components/employer/PostedJobDetails";

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const response = await fetchJobDetailsAction(id);

  return {
    title: `Jooble | ${response.data?.jobDetails.companyName}`,
  };
}

export default async function PostedJobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userID = await getUserIdServer();
  const isEmployer = await getIsEmployerServer();

  if (!userID) {
    redirect("/pages/signin");
  }

  if (!isEmployer) {
    return (
      <Error status={401} message="Only employers can access this page." />
    );
  }

  const id = (await params).id;

  return (
    <Suspense fallback={<Container>Loading...</Container>}>
      <PostedJobDetails jobID={id} />
    </Suspense>
  );
}
