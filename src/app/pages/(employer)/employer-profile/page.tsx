import { Metadata } from "next";
import { redirect } from "next/navigation";

// lib
import { getUserIdServer, getIsEmployerServer } from "@/lib/user";

// components
import UnauthorizedAccess from "@/components/errors/UnauthorizedAccess";

export const metadata: Metadata = {
  title: "Jooble | Profile",
};

export default async function EmployerProfilePage() {
  const userID = await getUserIdServer();
  const isEmployer = await getIsEmployerServer();

  if (!userID) {
    redirect("/pages/signin");
  }

  if (!isEmployer) {
    return <UnauthorizedAccess message="Only employer can access this page." />;
  }

  return (
    <div className="min-h-screen pt-[calc(72px+4rem)] pb-[4rem] flex justify-center">
      <div className="relative max-w-5xl w-full px-4 flex flex-col items-center">
        Employer profile
      </div>
    </div>
  );
}
