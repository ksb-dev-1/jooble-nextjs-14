"use client";

import Link from "next/link";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";

export default function Heading() {
  const session = useSession();

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
          !session.data?.user.id
            ? "/pages/signin"
            : session.data?.user.role === UserRole.JOB_SEEKER
            ? "/pages/jobs-tanstack-query"
            : session.data?.user.role === UserRole.RECRUITER
            ? "/pages/post-job"
            : session.data?.user.role === UserRole.NOT_ASSIGNED
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
