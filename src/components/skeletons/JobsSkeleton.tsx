import Link from "next/link";
import FilterJobsButton from "@/components/job_seeker/FilterJobsButton";

const jobs = [1, 2, 3, 4, 5];

export default function JobsSkeleton() {
  return (
    <div className="flex flex-col md:flex-row items-start text-transparent w-full">
      <div className="bg-white rounded shadow-md p-4 mr-4 hidden md:block w-[400px] text-transparent">
        <form>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="search"
              className="skeleton rounded  w-fit font-medium"
            >
              Search
            </label>
            <input className="skeleton rounded  px-4 py-2 placeholder:text-sm border border-transparent" />
          </div>

          {/* Work Type Select */}
          <div className="flex flex-col gap-2 mt-6">
            <label
              htmlFor="type"
              className="skeleton rounded  w-fit font-medium"
            >
              Work Type
            </label>
            <input className="skeleton rounded  px-4 py-2 placeholder:text-sm border border-transparent" />
          </div>

          {/* Location Select */}
          <div className="flex flex-col gap-2 mt-6">
            <label
              htmlFor="location"
              className="skeleton rounded  w-fit font-medium"
            >
              Location
            </label>
            <input className="skeleton rounded  px-4 py-2 placeholder:text-sm border border-transparent" />
          </div>

          {/* Work Mode Select */}
          <div className="flex flex-col gap-2 mt-6">
            <label htmlFor="workMode" className="font-medium">
              Work Mode
            </label>
            <input className="skeleton rounded  px-4 py-2 placeholder:text-sm border border-transparent" />
          </div>
          <FilterJobsButton className="mt-4 w-full skeleton rounded  px-4">
            Filter jobs
          </FilterJobsButton>
        </form>
      </div>
      <div className="w-full text-transparent">
        {jobs.map((index: number) => (
          <div key={index} className="relative">
            <Link
              href="#"
              className="inline-block w-full bg-white shadow-md mb-4 p-4 md:p-8"
            >
              <h1 className="font-bold text-lg sm:text-xl mb-1 w-[200px] skeleton rounded ">
                Role
              </h1>
              <p className="font-semibold w-[125px] skeleton rounded ">
                Company name
              </p>
              <div className="flex items-center flex-wrap mt-2 text-sm sm:text-base">
                <div className="skeleton rounded  w-[75px] flex items-center mt-2 mr-8 text-sm">
                  <span>Icon</span>
                  <span className="ml-2">Experience</span>
                </div>
                <div className="skeleton rounded  w-[75px] flex items-center mt-2 mr-8">
                  <span>Icon</span>
                  <span className="ml-2">Salary</span>
                </div>
                <div className="skeleton rounded  w-[75px] flex items-center mt-2 mr-8">
                  <span>Icon</span>
                  <span className="ml-2">Location</span>
                </div>
                <div className="skeleton rounded  w-[75px] flex items-center mt-2 mr-8">
                  <span>Icon</span>
                  <span className="ml-2">Type</span>
                </div>
                <div className="skeleton rounded  w-[75px] flex items-center mt-2 mr-8">
                  <span>Icon</span>
                  <span className="ml-2">Mode</span>
                </div>
              </div>
              <div className="mt-2 flex items-center flex-wrap text-sm">
                <div className="mt-2">
                  <span className="w-[100px] skeleton rounded  inline-block font-semibold text-sm sm:text-base">
                    skill
                  </span>
                  <span className="h-1 w-1 mx-2 rounded-full inline-block bg-[#999]"></span>
                </div>
                <div className="mt-2">
                  <span className="w-[100px] skeleton rounded  inline-block font-semibold text-sm sm:text-base">
                    skill
                  </span>

                  <span className="h-1 w-1 mx-2 rounded-full inline-block bg-[#999]"></span>
                </div>
                <div className="mt-2">
                  <span className="w-[100px] skeleton rounded  inline-block font-semibold text-sm sm:text-base">
                    skill
                  </span>

                  <span className="h-1 w-1 mx-2 rounded-full inline-block bg-[#999]"></span>
                </div>
                <div className="mt-2">
                  <span className="w-[100px] skeleton rounded  inline-block font-semibold text-sm sm:text-base">
                    skill
                  </span>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="skeleton rounded  w-fit mt-4 flex items-center text-xs">
                  <span className="ml-2">Posted</span>
                </div>
              </div>
            </Link>
            <span className="absolute top-4 right-4 skeleton h-8 w-8 sm:h-10 sm:w-10 rounded-full inline-block"></span>
          </div>
        ))}
      </div>
    </div>
  );
}
