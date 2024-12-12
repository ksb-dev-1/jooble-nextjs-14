import { Suspense } from "react";
import { redirect } from "next/navigation";

// components
import SavedJobsSkeleton from "@/components/skeletons/SavedJobsSkeleton";
import SavedJobsList from "@/components/job_seeker/SavedJobsList";

// 3rd party
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

export default async function SavedJobsPage() {
  const session = await auth();
  const userID = session?.user.id;
  const role = session?.user.role === UserRole.JOB_SEEKER;

  let isAccessible: React.ReactNode;

  if (!userID) {
    isAccessible = (
      <div className="bg-red-100 text-red-600 flex items-center justify-center shadow-md p-8">
        <div>Sign in to access this page.</div>
      </div>
    );
  }

  if (!role) {
    isAccessible = (
      <div className="bg-red-100 text-red-600 flex items-center justify-center shadow-md p-8">
        <p className="font-bold text-xl mb-4">401 - Unauthorized!</p>
        <p>Sorry, only user with job seeker role can access this page.</p>
      </div>
    );
  }

  if (!session?.user.id) redirect("/pages/signin");
  return (
    <div className="min-h-[calc(100vh-88px)] pt-[calc(72px+4rem)] pb-[4rem] flex justify-center">
      <div className="relative max-w-5xl w-full px-4 flex flex-col">
        {isAccessible}
        {userID && role ? (
          <Suspense fallback={<SavedJobsSkeleton />}>
            <SavedJobsList userID={userID} />
          </Suspense>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
