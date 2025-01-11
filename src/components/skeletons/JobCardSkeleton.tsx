import Link from "next/link";
import { BsGlobeAmericas } from "react-icons/bs";
import { GoClock } from "react-icons/go";
import { IoLocationSharp } from "react-icons/io5";
import { LuIndianRupee } from "react-icons/lu";
import { RxLapTimer } from "react-icons/rx";
import { TbBriefcaseFilled } from "react-icons/tb";

export default function JobCardSkeleton() {
  return (
    <div className="relative text-transparent">
      <Link
        href="#"
        className="block w-full mb-4 p-4 md:p-8 cursor-pointer bg-white border border-slate-300 rounded-xl hover:shadow-xl transition"
      >
        <h1 className="skeleton rounded-xl font-bold mb-1 w-fit text-xl">
          Designation / Role
        </h1>
        <p className="skeleton rounded-xl font-semibold capitalize w-fit">
          Company name
        </p>
        <div className="flex items-center flex-wrap mt-2">
          <div className="skeleton rounded-xl flex items-center mt-2 mr-6 text-sm">
            <TbBriefcaseFilled />
            <span className="ml-2">Experience</span>
          </div>
          <div className="skeleton rounded-xl flex items-center mt-2 mr-6 text-sm">
            <LuIndianRupee />
            <span className="ml-1">Salary</span>
          </div>
          <div className="skeleton rounded-xl flex items-center mt-2 mr-6 text-sm">
            <BsGlobeAmericas />
            <span className="ml-2">Location</span>
          </div>
          <div className="skeleton rounded-xl flex items-center mt-2 mr-6 text-sm">
            <RxLapTimer />
            <span className="ml-2">Job type</span>
          </div>
          <div className="skeleton rounded-xl flex items-center mt-2 mr-6 text-sm">
            <IoLocationSharp />
            <span className="ml-1">Job mode</span>
          </div>
        </div>
        <div className="mt-2 flex items-center flex-wrap">
          {[1, 2, 3, 4].map((el, index) => (
            <div key={el} className="mt-2">
              <span className="skeleton rounded-xl inline-block w-[75px] text-sm">
                skill
              </span>
              {index !== 3 && (
                <span className="h-1 w-1 mx-2 rounded-full inline-block bg-[#333]"></span>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between w-full mt-4">
          <div className="skeleton rounded-[50px] px-4 py-2 w-fit text-xs">
            Pending
          </div>
          <div className="skeleton rounded-xl w-fit mt-4 flex items-center text-xs">
            <GoClock />
            <span className="ml-2">Posted at</span>
          </div>
        </div>
      </Link>

      {/* Bookmark Button */}
      <button
        type="button"
        className="skeleton rounded-full absolute top-4 right-4 h-9 w-9 text-lg sm:text-xl cursor-pointer bg-rose-50 hover:bg-rose-100 transition flex items-center justify-center"
        aria-label="bookmark-button"
      ></button>
    </div>
  );
}
