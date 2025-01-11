"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// actions
import { githubSigninAction, googleSigninAction } from "@/actions/auth-actions";

// hooks
import { useCurrentUserSession } from "@/hooks/useCurrentUserSession";

// components
import Container from "@/components/Container";
import GoogleSigninButton from "@/components/signin/GoogleSigninButton";
import GithubSigninButton from "@/components/signin/GithubSigninButton";

// 3rd party
import { UserRole } from "@prisma/client";
import { BsShieldLockFill } from "react-icons/bs";

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

  if (sessionStatus === "loading") {
    return (
      <div className="min-h-screen pt-[calc(68px+4rem)] pb-[4rem] flex justify-center">
        <div className="relative max-w-5xl w-full px-4 flex flex-col items-center justify-center">
          <div className="flex items-end">
            <span className="font-bold text-2xl mr-2">Loading</span>
            <span className="dots inline-block mb-1"></span>
          </div>
        </div>
      </div>
    );
  }

  if (userRole) {
    return (
      <div className="min-h-screen pt-[calc(68px+4rem)] pb-[4rem] flex justify-center">
        <div className="relative max-w-5xl w-full px-4 flex flex-col items-center justify-center">
          <div className="flex items-end">
            <span className="font-bold text-2xl mr-2">Redirecting</span>
            <span className="dots inline-block mb-1"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Container>
      <div className="h-full flex flex-col items-center justify-center">
        <div className="w-full h-fit p-8 flex flex-col bg-white border border-slate-300  rounded-xl">
          <h1 className="font-bold flex items-center text-2xl mb-4">
            <BsShieldLockFill className="text-violet-600 text-2xl" />
            <span className="ml-2">Sign in</span>
          </h1>
          <div className="flex flex-col">
            <div className="bg-violet-100 p-4 flex items-center justify-center rounded-xl">
              <div className="relative h-[200px] sm:h-[250px] w-[200px] sm:w-[250px]">
                <Image
                  src="/assets/login_svg.svg"
                  alt="login"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
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
    </Container>
  );
}
