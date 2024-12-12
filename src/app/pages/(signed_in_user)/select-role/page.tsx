"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

// actions
import { selectRoleAction } from "@/actions/selectRoleAction";

// 3rd party libraries
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function Options() {
  const [role, setRole] = useState<string>("Job seeker");
  const router = useRouter();
  const { update, data: session, status } = useSession();
  const user = session?.user.id;
  const userRole = session?.user.role;
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!user && status !== "loading") {
      router.push("/pages/signin");
    }
    if (userRole === UserRole.JOB_SEEKER) {
      router.push("/pages/jobs");
    }

    if (userRole === UserRole.RECRUITER) {
      router.push("/pages/post-job");
    }
  }, [user, userRole, status, router]);

  const assignRole = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const roleToAssign: UserRole =
          role === "Job seeker" ? UserRole.JOB_SEEKER : UserRole.RECRUITER;
        const response = await selectRoleAction(roleToAssign);

        if (response.success) {
          await update();
          toast.success(response.success);
        }

        if (response.error) {
          toast.success(response.error);
        }
      } catch (error) {
        const typedError =
          error instanceof Error ? error : new Error("Unknown error occurred");
        console.error("Failed to assign role:", typedError);
        toast.success("Something went wrong!");
      }
    });
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-end p-4 sm:p-16 bg-white rounded shadow-md w-full sm:w-fit">
        <div className="w-full flex flex-col sm:flex-row items-center justify-center">
          <h1 className="font-extrabold text-4xl sm:text-6xl mr-4 mb-0 sm:mb-4 text-violet-600">
            I&apos;am a
          </h1>
          <div className="relative h-[calc(60px+1rem)] w-full sm:w-[calc(300px+1rem)] border border-slate-300 rounded-[50px] mt-8 sm:mt-0">
            <button
              type="button"
              onClick={() => {
                if (!isPending) {
                  setRole("Job seeker");
                }
              }}
              className={`absolute top-2 left-2 bottom-2 rounded-[50px] px-8 py-4 font-semibold text-lg flex items-center justify-center w-[50%] sm:w-fit ${
                !isPending ? "hover:bg-slate-100" : "cursor-not-allowed"
              }`}
            >
              Job seeker
            </button>
            <button
              type="button"
              onClick={() => {
                if (!isPending) {
                  setRole("Recruiter");
                }
              }}
              // className={`absolute top-2 right-2 bottom-2 rounded-[50px] px-8 py-4 font-semibold text-lg flex items-center justify-center w-[50%] sm:w-fit ${
              //   !isPending ? "hover:bg-slate-100" : "cursor-not-allowed"
              // }`}
              className="absolute top-2 right-2 bottom-2 w-[50%] sm:w-[150px] rounded-[50px] px-8 py-4 font-semibold text-lg flex items-center justify-center hover:bg-slate-100"
            >
              Recruiter
            </button>
            <div
              className={`z-10 absolute top-2 w-[50%] sm:w-[150px] flex items-center justify-center text-lg ${
                role === "Job seeker"
                  ? "translate-x-2"
                  : "translate-x-[calc(100%-0.5rem)] sm:translate-x-[calc(150px+0.35rem)]"
              } bottom-2 rounded-[50px] px-8 py-4 bg-violet-600 text-white transition font-semibold shadow-[0_2px_2px_rgba(0,0,0,75)]`}
            >
              {role}
            </div>
          </div>
        </div>
        <button
          type="button"
          disabled={isPending}
          className={`font-semibold px-8 py-4 rounded-[50px] text-white ${
            isPending
              ? "bg-[#555] cursor-not-allowed"
              : "bg-black hover:bg-[#333]"
          } transition text-white mt-4 sm:mt-8 w-full sm:w-fit`}
          onClick={assignRole}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
