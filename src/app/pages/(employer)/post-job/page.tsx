import { Metadata } from "next";

// lib
import { getUserIdServer, getIsEmployerServer } from "@/lib/user";

// components
import UnauthorizedAccess from "@/components/UnauthorizedAccess";
import PostJobForm from "@/components/employer/PostJobForm";

export const metadata: Metadata = {
  title: "Jooble | Post job",
};

export default async function PostJobPage() {
  const userID = await getUserIdServer();
  const isEmployer = await getIsEmployerServer();

  if (!userID) {
    return <UnauthorizedAccess message="Sign in to access this page." />;
  }

  if (!isEmployer) {
    return <UnauthorizedAccess message="Only employer can access this page." />;
  }

  return (
    <div className="min-h-screen pt-[calc(72px+4rem)] pb-[4rem] flex justify-center">
      <div className="relative max-w-5xl w-full px-4 flex flex-col items-center">
        <PostJobForm />
      </div>
    </div>
  );
}
