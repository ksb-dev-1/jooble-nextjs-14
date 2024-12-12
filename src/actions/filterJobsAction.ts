"use server";

import { redirect } from "next/navigation";

// lib
import { jobFilterSchema } from "@/lib/validation";

export default async function filterJobsAction(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const { search, jobType, location, jobMode } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(search && { search: search.trim() }),
    ...(jobType && { jobType }),
    ...(location && { location }),
    ...(jobMode && { jobMode }),
  });

  redirect(`/pages/jobs/?${searchParams.toString()}`);
}
