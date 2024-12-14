import Link from "next/link";

// lib
import { formatMoney, relativeDate } from "@/lib/utils";

// components
import SaveRemoveJobButton from "./SaveRemoveJobButton";

// 3rd party libraries
import { BsGlobeAmericas } from "react-icons/bs";
import { GoClock } from "react-icons/go";
import { IoLocationSharp } from "react-icons/io5";
import { LuIndianRupee } from "react-icons/lu";
import { RxLapTimer } from "react-icons/rx";
import { TbBriefcaseFilled } from "react-icons/tb";

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="relative">
      <Link
        href={`/pages/jobs/${job.id}`}
        className="inline-block w-full mb-4 p-4 md:p-8 cursor-pointer bg-white shadow-md rounded-xl hover:shadow-xl transition"
      >
        <h1 className="font-bold mb-1">{job.role}</h1>
        <p className="font-semibold capitalize text-violet-600">
          {job.companyName}
        </p>
        <div className="flex items-center flex-wrap mt-2">
          <div className="flex items-center mt-2 mr-6">
            <TbBriefcaseFilled />
            <span className="ml-2 text-sm">{job.experience}</span>
          </div>
          <div className="flex items-center mt-2 mr-6">
            <LuIndianRupee />
            <span className="ml-1 text-sm">
              {formatMoney(job.salary).slice(1)}
            </span>
          </div>
          <div className="flex items-center mt-2 mr-6">
            <BsGlobeAmericas />
            <span className="ml-2 text-sm">{job.location}</span>
          </div>
          <div className="flex items-center mt-2 mr-6">
            <RxLapTimer />
            <span className="ml-2 text-sm">{job.jobType}</span>
          </div>
          <div className="flex items-center mt-2 mr-6">
            <IoLocationSharp />
            <span className="ml-1 text-sm">{job.jobMode}</span>
          </div>
        </div>
        <div className="mt-2 flex items-center flex-wrap">
          {job.skills?.length > 0
            ? job.skills.map((skill: string, index: number) => (
                <div key={skill} className="mt-2">
                  <span className="inline-block rounded-xl text-sm">
                    {skill}
                  </span>
                  {index !== job.skills.length - 1 && (
                    <span className="h-1 w-1 mx-2 rounded-full inline-block bg-[#333]"></span>
                  )}
                </div>
              ))
            : ""}
        </div>
        <div className="flex justify-end">
          <div className="w-fit mt-4 flex items-center text-xs">
            <GoClock />
            <span className="ml-2">{relativeDate(job.createdAt)}</span>
          </div>
        </div>
      </Link>

      {/* Bookmark Button */}
      <SaveRemoveJobButton jobID={job.id} />
    </div>
  );
}
