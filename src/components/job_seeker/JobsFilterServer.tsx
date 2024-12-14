/// actions
import getDistinctLocationsAction from "@/actions/getDistinctLocationsAction";
import filterJobsAction from "@/actions/filterJobsAction";

// lib
import { JobFilterValues } from "@/lib/validation";
import { JOB_MODES, JOB_TYPES } from "@/lib/constants";

// components
import Select from "@/components/Select";
import FilterJobsButton from "./FilterJobsButton";
import ClearFilters from "./ClearFilters";

interface JobFilterProps {
  defaultValues: JobFilterValues;
}

export default async function JobsFilterServer({
  defaultValues,
}: JobFilterProps) {
  const distinctLocations = await getDistinctLocationsAction();

  const isFilterApplied =
    defaultValues.search ||
    defaultValues.jobType ||
    defaultValues.location ||
    defaultValues.jobMode;

  return (
    <div className="bg-white shadow-md rounded-xl p-8 mr-4 hidden md:block w-[400px]">
      <form action={filterJobsAction} key={JSON.stringify(defaultValues)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="search" className="font-medium">
            Search
          </label>
          <input
            id="search"
            name="search"
            placeholder="Company / Designation / Skill"
            defaultValue={defaultValues.search || ""}
            className="px-3 py-2 border border-slate-300 rounded-xl focus-within:outline-none focus-within:outline-violet-300 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-sm"
          />
        </div>

        {/* Location Select */}
        <div className="flex flex-col gap-2 mt-6">
          <label htmlFor="location" className="font-medium">
            Location
          </label>
          <Select
            id="location"
            name="location"
            defaultValue={defaultValues.location || ""}
            className="border border-slate-300 rounded-xl"
          >
            <option value="">All</option>
            {distinctLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </Select>
        </div>

        {/* Job Mode Select */}
        <div className="flex flex-col gap-2 mt-6">
          <label htmlFor="jobMode" className="font-medium">
            Mode
          </label>
          <Select
            id="jobMode"
            name="jobMode" // Ensure this matches the schema field
            defaultValue={defaultValues.jobMode || ""}
            className="border border-slate-300 rounded-xl"
          >
            <option value="">All</option>
            {JOB_MODES.map((jobMode) => (
              <option key={jobMode} value={jobMode}>
                {jobMode.charAt(0).toUpperCase() + jobMode.substring(1)}
              </option>
            ))}
          </Select>
        </div>

        {/* Job JobTjobType Select */}
        <div className="flex flex-col gap-2 mt-6">
          <label htmlFor="jobType" className="font-medium">
            Type
          </label>
          <Select
            id="jobType"
            name="jobType"
            defaultValue={defaultValues.jobType || ""}
            className="border border-slate-300 rounded-xl"
          >
            <option value="">All</option>
            {JOB_TYPES.map((jobType) => (
              <option key={jobType} value={jobType}>
                {jobType.charAt(0).toUpperCase() + jobType.substring(1)}
              </option>
            ))}
          </Select>
        </div>

        <FilterJobsButton className="rounded-xl mt-4 w-full border border-violet-600 bg-violet-600 text-white hover:bg-violet-500 px-4 transition">
          Filter jobs
        </FilterJobsButton>
      </form>
      {isFilterApplied && <ClearFilters />}
    </div>
  );
}
