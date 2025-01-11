import { Metadata } from "next";
import { redirect } from "next/navigation";

// lib
import { getUserIdServer, getIsEmployerServer } from "@/lib/user";

// components
import Error from "@/components/Error";
import Container from "@/components/Container";
import PostJobForm from "@/components/employer/PostJobForm";

export const metadata: Metadata = {
  title: "Jooble | Post job",
};

export default async function PostJobPage() {
  const userID = await getUserIdServer();
  const isEmployer = await getIsEmployerServer();

  if (!userID) {
    redirect("/pages/signin");
  }

  if (!isEmployer) {
    return <Error status={401} message="Only employer can access this page." />;
  }

  return (
    <Container>
      <PostJobForm />
    </Container>
  );
}
