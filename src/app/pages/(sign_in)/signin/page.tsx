"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// actions
import { githubSigninAction, googleSigninAction } from "@/actions/authActions";

// hooks
import { useCurrentUserSession } from "@/hooks/useCurrentUserSession";

// components
import GoogleSigninButton from "@/components/signin/GoogleSigninButton";
import GithubSigninButton from "@/components/signin/GithubSigninButton";

// 3rd party
import { UserRole } from "@prisma/client";

export default function SigninPage() {
  const { userRole, sessionStatus } = useCurrentUserSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus !== "loading" && userRole === UserRole.JOB_SEEKER)
      router.push("/pages/jobs");
    if (sessionStatus !== "loading" && userRole === UserRole.EMPLOYER)
      router.push("/pages/post-job");
    if (sessionStatus !== "loading" && userRole === UserRole.NOT_ASSIGNED)
      router.push("/pages/select-role");
  }, [userRole, sessionStatus, router]);

  if (userRole || sessionStatus === "loading") {
    return (
      <div className="min-h-screen pt-[calc(72px+4rem)] pb-[4rem] flex justify-center">
        <div className="relative max-w-5xl w-full px-4 flex flex-col items-center justify-center">
          <div className="redirecting font-bold text-xl text-violet-600 font-sans"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[calc(72px+4rem)] pb-[4rem] flex justify-center">
      <div className="relative max-w-5xl w-full px-4 flex flex-col items-center justify-center">
        <div className="w-full h-full flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-8">
          <h1 className="font-bold text-lg sm:text-2xl mb-8 sm:mb-4 text-violet-600">
            Start exploring by signing in
          </h1>
          <div className="flex flex-col items-center max-w-[500px] w-full">
            <div className="relative h-[200px] sm:h-[250px] w-[200px] sm:w-[250px]">
              <Image
                src="/assets/login_svg.svg"
                alt="login"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="w-full flex flex-col mt-8">
              <form action={googleSigninAction}>
                <GoogleSigninButton />
              </form>
              <form action={githubSigninAction}>
                <GithubSigninButton />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
