"use server";

import { CreateJobValues } from "@/lib/validation";
import draftToHtml from "draftjs-to-html";

export default async function postJobAction(data: CreateJobValues) {
  // Validate and parse input using Zod schema
  const {
    companyName,
    experience,
    role,
    salary,
    location,
    jobType,
    jobMode,
    openings,
    skills,
    description, // This is the Draft.js raw content (JSON)
  } = data;

  // Convert the Draft.js description from JSON to HTML
  let descriptionHTML = "";
  try {
    descriptionHTML = description ? draftToHtml(JSON.parse(description)) : "";
  } catch (error) {
    console.error("Failed to convert description to HTML:", error);
    throw new Error("Invalid description format");
  }

  // Prepare the job posting object
  const jobPosting = {
    companyName,
    experience,
    role,
    salary,
    location,
    jobType,
    jobMode,
    openings,
    skills,
    description: descriptionHTML, // Save as HTML
  };

  // Save the job posting to the database
  try {
    //await saveToDatabase("jobs", jobPosting);
    console.log(jobPosting);
    await new Promise((resolve) => setTimeout(resolve, 3000));
  } catch (error) {
    console.error("Failed to save job posting:", error);
    throw new Error("Failed to save job posting");
  }
}
