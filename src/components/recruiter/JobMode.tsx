"use client";

// compoennets
import Select from "@/components/Select";

// lib
import { CreateJobValues } from "@/lib/validation";
import { JOB_MODES } from "@/lib/constants";

// 3rd party
import { UseFormRegister } from "react-hook-form";

interface JobModeProps {
  register: UseFormRegister<CreateJobValues>;
  error?: string;
}

export default function JobMode({ register, error }: JobModeProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="jobMode" className="font-medium text-slate-700">
        Job mode
      </label>
      <Select
        id="jobMode"
        {...register("jobMode")}
        className="border border-slate-300 rounded"
      >
        {JOB_MODES.map((mode) => (
          <option key={mode} value={mode}>
            {mode.charAt(0).toUpperCase() + mode.substring(1)}
          </option>
        ))}
      </Select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
