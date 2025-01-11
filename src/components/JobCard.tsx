import Link from "next/link";

// lib
import { formatMoney, relativeDate } from "@/utils/inedx";

// components
import SaveRemoveJobButton from "@/components/SaveRemoveJobButton";

// 3rd party libraries
import { BsGlobeAmericas } from "react-icons/bs";
import { GoClock } from "react-icons/go";
import { IoLocationSharp } from "react-icons/io5";
import { LuIndianRupee } from "react-icons/lu";
import { RxLapTimer } from "react-icons/rx";
import { TbBriefcaseFilled } from "react-icons/tb";
import { ApplicationStatus } from "@prisma/client";

interface JobCardProps {
  job: Job;
  isDefaultSaved?: boolean;
  applicationStatus?: ApplicationStatus;
  isEmployer?: boolean;
  applicationsCount?: number;
  statuses?: ApplicationStatus[];
}

export default function JobCard({
  job,
  isDefaultSaved = false,
  isEmployer = false,
  applicationsCount,
}: //statuses,
JobCardProps) {
  const statusColors: Record<ApplicationStatus, string> = {
    PENDING: "bg-yellow-200 text-yellow-800",
    OFFER: "bg-green-200 text-green-800",
    INTERVIEW: "bg-blue-200 text-blue-800",
    REJECT: "bg-red-200 text-red-800",
  };
  const {
    id,
    role,
    companyName,
    experience,
    salary,
    location,
    jobType,
    jobMode,
    skills,
    createdAt,
    applicationStatus,
  } = job;

  return (
    <div className="relative w-full">
      <Link
        href={`${
          isEmployer ? `/pages/posted-jobs/${id}` : `/pages/jobs/${id}`
        }`}
        className="inline-block w-full mb-4 p-4 md:p-8 cursor-pointer bg-white border border-slate-300 rounded-xl hover:shadow-md transition"
      >
        <h1 className="font-bold mb-1 text-xl">{role}</h1>
        <p className="font-bold capitalize text-violet-600">{companyName}</p>
        <div className="flex items-center flex-wrap mt-2">
          <div className="flex items-center mt-2 mr-6 text-sm">
            <TbBriefcaseFilled />
            <span className="ml-2">{experience}</span>
          </div>
          <div className="flex items-center mt-2 mr-6 text-sm">
            <LuIndianRupee />
            <span className="ml-1">{formatMoney(salary).slice(1)}</span>
          </div>
          <div className="flex items-center mt-2 mr-6 text-sm">
            <BsGlobeAmericas />
            <span className="ml-2">{location}</span>
          </div>
          <div className="flex items-center mt-2 mr-6 text-sm">
            <RxLapTimer />
            <span className="ml-2">{jobType}</span>
          </div>
          <div className="flex items-center mt-2 mr-6 text-sm">
            <IoLocationSharp />
            <span className="ml-1">{jobMode}</span>
          </div>
        </div>
        <div className="mt-2 flex items-end flex-wrap">
          {skills?.length > 0 ? (
            <>
              {skills.slice(0, 4).map((skill: string, index: number) => (
                <div key={skill} className="mt-2 inline-block">
                  <span className="rounded-xl text-sm">{skill}</span>
                  {index !== 3 && index !== skills.slice(0, 4).length - 1 && (
                    <span className="h-1 w-1 mx-2 rounded-full inline-block bg-[#333]"></span>
                  )}
                </div>
              ))}
              {skills.length > 4 && (
                <span className="ml-2 text-sm text-gray-600">...</span>
              )}
            </>
          ) : (
            ""
          )}
        </div>
        <div className="flex items-center justify-between w-full mt-4">
          {isEmployer && (
            <p className="font-medium text-xs px-4 py-2 bg-[#555] text-white rounded-[50px]">
              Applications : {applicationsCount}
            </p>
          )}
          <div className="w-fit mt-4 flex items-center text-xs">
            <GoClock />
            <span className="ml-2">{relativeDate(createdAt)}</span>
          </div>
          {applicationStatus && (
            <p
              className={`inline-block px-4 py-2 rounded-[50px] text-xs font-medium ${statusColors[applicationStatus]}`}
            >
              {applicationStatus?.charAt(0) +
                applicationStatus?.substring(1).toLowerCase()}
            </p>
          )}
        </div>
      </Link>

      {/* Save / Remove Button */}
      {!isEmployer && (
        <div className="absolute top-4 sm:top-8 right-4 sm:right-8">
          <SaveRemoveJobButton
            key={id}
            jobID={id}
            isDefaultSaved={isDefaultSaved}
          />
        </div>
      )}
    </div>
  );
}
