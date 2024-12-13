"use client";

import Link from "next/link";

// hooks
import { useCurrentUserSession } from "@/hooks/useCurrentUserSession";

// 3rd party
import { UserRole } from "@prisma/client";

export default function Heading() {
  const { userID, userRole } = useCurrentUserSession();

  return (
    <div className="h-screen w-screen z-10 flex flex-col items-center justify-center">
      <h1 className="font-extrabold text-2xl sm:text-4xl text-center capitalize">
        Unlock your career potential
      </h1>
      <p className="sm:text-xl md:text-2xl font-bold mt-4 sm:mt-6 text-center max-w-2xl capitalize">
        Discover jobs that inspire you
      </p>
      <Link
        href={`${
          !userID
            ? "/pages/signin"
            : userRole === UserRole.JOB_SEEKER
            ? "/pages/jobs-tanstack-query"
            : userRole === UserRole.EMPLOYER
            ? "/pages/post-job"
            : userRole === UserRole.NOT_ASSIGNED
            ? "/pages/select-role"
            : ""
        }`}
        className="bg-black hover:bg-[#333] transition text-white rounded-[50px] px-8 py-4 mt-8 sm:text-lg"
      >
        Start exploring
      </Link>
    </div>
  );
}
