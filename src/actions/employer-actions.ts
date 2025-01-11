"use server";

// lib
import { prisma } from "@/lib/prisma";
import { CreateJobValues } from "@/lib/validation";
import { ApplicationStatus } from "@prisma/client";

// 3rd party
import draftToHtml from "draftjs-to-html";

export async function postJobAction(data: CreateJobValues) {
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

export async function fetchPostedJobsAction(userID: string) {
  try {
    const postedJobs = await prisma.job.findMany({
      where: {
        postedById: userID, // Match jobs posted by the specific recruiter
      },
      include: {
        applications: true, // Include applications if needed
      },
    });

    if (postedJobs.length === 0) {
      return {
        success: false,
        status: 404,
        message: "No jobs found for this recruiter.",
        data: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Jobs fetched successfully.",
      data: { postedJobs },
    };
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return {
      success: false,
      status: 500,
      message: "An unexpected error occurred.",
      data: null,
    };
  }
}

export async function fetchPostedJobDetailsAction(jobID: string) {
  try {
    const jobDetails = await prisma.job.findUnique({
      where: { id: jobID },
      include: {
        applications: {
          include: {
            user: {
              select: { id: true, name: true, email: true, image: true },
            },
          },
        },
      },
    });

    if (!jobDetails) {
      return {
        success: false,
        status: 404,
        message: "Job not found.",
        data: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Job details fetched successfully.",
      data: {
        jobDetails: {
          ...jobDetails,
          applications: jobDetails.applications.map((app) => ({
            id: app.id, // Include the application id
            user: app.user,
            status: app.status, // Ensure `status` is included here
          })),
        },
      },
    };
  } catch (error) {
    console.error("Error fetching job details:", error);
    return {
      success: false,
      status: 500,
      message: "Internal server error.",
      data: null,
    };
  }
}

export async function handleApplicationAction(
  applicationId: string,
  action: ApplicationStatus
) {
  try {
    // Fetch the application to get related job and its openings
    const application = await prisma.jobApplication.findUnique({
      where: { id: applicationId },
      include: { job: true },
    });

    if (!application) {
      return {
        success: false,
        status: 404,
        message: "Application not found.",
      };
    }

    if (action === ApplicationStatus.OFFER) {
      // Check if there are available openings
      if (application.job.openings <= 0) {
        return {
          success: false,
          status: 400,
          message: "No available openings for this job.",
        };
      }

      // Deduct 1 from openings if an offer is made
      await prisma.job.update({
        where: { id: application.jobId },
        data: { openings: application.job.openings - 1 },
      });
    }

    // Update the application status
    await prisma.jobApplication.update({
      where: { id: applicationId },
      data: { status: action },
    });

    return {
      success: true,
      status: 200,
      message: `Application ${action.toLowerCase()} successfully.`,
    };
  } catch (error) {
    console.error("Failed to handle application action:", error);
    return {
      success: false,
      status: 500,
      message: "An unexpected error occurred.",
    };
  }
}
