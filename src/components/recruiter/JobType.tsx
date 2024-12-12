"use client";

// compoennets
import Select from "@/components/Select";

// lib
import { CreateJobValues } from "@/lib/validation";
import { JOB_TYPES } from "@/lib/constants";

// 3rd party
import { UseFormRegister } from "react-hook-form";

interface JobTypeProps {
  register: UseFormRegister<CreateJobValues>;
  error?: string;
}

export default function JobType({ register, error }: JobTypeProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="jobType" className="font-medium text-slate-700">
        Job type
      </label>
      <Select
        id="jobType"
        {...register("jobType")}
        className="border border-slate-300 rounded"
      >
        {JOB_TYPES.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.substring(1)}
          </option>
        ))}
      </Select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
