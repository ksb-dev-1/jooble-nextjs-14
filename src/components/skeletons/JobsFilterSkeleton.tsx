const JobsFilterSkeleton = () => {
  return (
    <div className="bg-white shadow-md rounded-xl p-8 mr-4 hidden md:block w-[400px]">
      <form>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="search"
            className="skeleton rounded-xl font-medium w-fit"
          >
            Search
          </label>
          <div className="skeleton rounded-xl h-[41.6px] w-full pl-3 pr-8 text-sm"></div>
        </div>

        {/* Job type */}
        <div className="flex flex-col gap-2 mt-6">
          <label
            htmlFor="jobType"
            className="skeleton rounded-xl font-medium w-fit"
          >
            Job type
          </label>
          <div className="skeleton rounded-xl h-[41.6px] w-full pl-3 pr-8 text-sm"></div>
        </div>

        {/* Location Select */}
        <div className="flex flex-col gap-2 mt-6">
          <label
            htmlFor="location"
            className="skeleton rounded-xl font-medium w-fit"
          >
            Location
          </label>
          <div className="skeleton rounded-xl h-[41.6px] w-full pl-3 pr-8 text-sm"></div>
        </div>

        {/* Job Mode Select */}
        <div className="flex flex-col gap-2 mt-6">
          <label
            htmlFor="jobMode"
            className="skeleton rounded-xl font-medium w-fit"
          >
            Job mode
          </label>
          <div className="skeleton rounded-xl h-[41.6px] w-full pl-3 pr-8 text-sm"></div>
        </div>

        <button className="skeleton rounded-xl h-[41.6px] mt-4 w-full px-4">
          Filter jobs
        </button>
      </form>
    </div>
  );
};

export default JobsFilterSkeleton;
