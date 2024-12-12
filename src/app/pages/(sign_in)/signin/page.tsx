"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// actions
import { githubSigninAction, googleSigninAction } from "@/actions/authActions";

// components
import GoogleSigninButton from "@/components/signin/GoogleSigninButton";
import GithubSigninButton from "@/components/signin/GithubSigninButton";

// 3rd party
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";

const SigninPage = () => {
  const { data: session, status } = useSession();
  const role = session?.user.role;
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && role === UserRole.JOB_SEEKER)
      router.push("/pages/jobs");
    if (status !== "loading" && role === UserRole.RECRUITER)
      router.push("/pages/post-job");
    if (status !== "loading" && role === UserRole.NOT_ASSIGNED)
      router.push("/pages/select-role");
  }, [role, status, router]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4">
      <div className="w-full sm:w-[400px]">
        <p className="font-bold text-xl mb-4">Sign in</p>
        <div className="p-8 shadow-md bg-white rounded">
          <form action={googleSigninAction}>
            <GoogleSigninButton />
          </form>
          <form action={githubSigninAction}>
            <GithubSigninButton />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
