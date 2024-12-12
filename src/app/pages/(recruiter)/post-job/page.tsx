import { Metadata } from "next";

// components
import PostJobForm from "@/components/recruiter/PostJobForm";

// 3rd party
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import { IoWarningOutline } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Post a New Job",
};

export default async function PostJobPage() {
  const session = await auth();
  const user = session?.user?.id;
  const isRecruiter = session?.user?.role === UserRole.RECRUITER;

  // Unauthorized Access Message
  const UnauthorizedMessage = ({ message }: { message: string }) => (
    <div className="min-h-screen pt-[calc(72px+4rem)] pb-[4rem] flex justify-center">
      <div className="relative max-w-5xl w-full px-4 flex flex-col">
        <div className="bg-red-100 text-red-600 flex flex-col items-center justify-center shadow-md px-4 py-16">
          <p className="flex items-center font-bold text-xl mb-4">
            <IoWarningOutline className="text-2xl" />
            <span className="ml-4">401 - Unauthorized! </span>
          </p>
          <p className="text-center">{message}</p>
        </div>
      </div>
    </div>
  );

  if (!user) {
    return <UnauthorizedMessage message="Sign in to access this page." />;
  }

  if (!isRecruiter) {
    return (
      <UnauthorizedMessage message="Only job seekers can access this page." />
    );
  }

  return (
    <div className="min-h-screen pt-[calc(72px+4rem)] pb-[4rem] flex justify-center">
      <div className="relative max-w-5xl w-full px-4 flex flex-col items-center">
        <PostJobForm />
      </div>
    </div>
  );
}
