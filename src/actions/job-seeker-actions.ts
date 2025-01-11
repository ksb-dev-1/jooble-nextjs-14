"use server";

import { redirect } from "next/navigation";

interface FetchJobsProps {
  search?: string;
  jobType?: string;
  location?: string;
  jobMode?: string;
  page: number;
  limit: number;
  userID: string;
}
import { revalidatePath } from "next/cache";

// lib
import { jobFilterSchema } from "@/lib/validation";

import { prisma } from "@/lib/prisma";
import { Prisma, ApplicationStatus } from "@prisma/client";

// Fetch jobs
// export async function fetchJobsAction({
//   search,
//   jobType,
//   location,
//   jobMode,
//   page = 1,
//   limit = 2,
// }: //userID
// FetchJobsProps): Promise<Jobs> {
//   const offset = (page - 1) * limit;

//   const whereClause: Prisma.JobWhereInput = {
//     ...(search && {
//       OR: [
//         {
//           role: {
//             contains: search,
//             mode: Prisma.QueryMode.insensitive,
//           },
//         },
//         {
//           role: {
//             contains: search.replace(/[-\s]+/g, ""),
//             mode: Prisma.QueryMode.insensitive,
//           },
//         },
//         {
//           role: {
//             contains: search.replace(/[-\s]+/g, "-"),
//             mode: Prisma.QueryMode.insensitive,
//           },
//         },
//         {
//           companyName: {
//             contains: search,
//             mode: Prisma.QueryMode.insensitive,
//           },
//         },
//         {
//           skills: {
//             hasSome: [
//               search,
//               search.toLowerCase(),
//               search.toUpperCase(),
//               search.charAt(0).toUpperCase() + search.slice(1).toLowerCase(),
//             ],
//           },
//         },
//       ],
//     }),
//     ...(jobType &&
//       jobType !== "All" && {
//         jobType: { contains: jobType, mode: Prisma.QueryMode.insensitive },
//       }),
//     ...(location &&
//       location !== "All" && {
//         location: { contains: location, mode: Prisma.QueryMode.insensitive },
//       }),
//     ...(jobMode &&
//       jobMode !== "All" && {
//         jobMode: { contains: jobMode, mode: Prisma.QueryMode.insensitive },
//       }),
//   };

//   try {
//     const [jobs, totalJobs]: [Job[], number] = await prisma.$transaction([
//       prisma.job.findMany({
//         where: whereClause,
//         skip: offset,
//         take: limit,
//         orderBy: {
//           createdAt: "asc", // Sort by creation date
//         },
//       }),
//       prisma.job.count({ where: whereClause }),
//     ]);

//     if (jobs.length === 0) {
//       return {
//         success: false,
//         status: 404,
//         message: "No jobs found!",
//         data: null,
//       };
//     }

//     return {
//       success: true,
//       status: 200,
//       message: "Jobs fetched successfully.",
//       data: {
//         jobs,
//         totalJobs,
//         currentPage: page,
//         totalPages: Math.ceil(totalJobs / limit),
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching jobs:", error);

//     return {
//       success: false,
//       status: 500,
//       message: "An unexpected error occurred.",
//       data: null,
//     };
//   }
// }

// Filter jobs
export async function filterJobsAction(formData: FormData): Promise<void> {
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

export async function fetchJobsAction({
  search,
  jobType,
  location,
  jobMode,
  page = 1,
  limit = 2,
  userID,
}: FetchJobsProps): Promise<Jobs> {
  const offset = (page - 1) * limit;

  const whereClause: Prisma.JobWhereInput = {
    ...(search && {
      OR: [
        {
          role: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
        {
          role: {
            contains: search.replace(/[-\s]+/g, ""),
            mode: Prisma.QueryMode.insensitive,
          },
        },
        {
          role: {
            contains: search.replace(/[-\s]+/g, "-"),
            mode: Prisma.QueryMode.insensitive,
          },
        },
        {
          companyName: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
        {
          skills: {
            hasSome: [
              search,
              search.toLowerCase(),
              search.toUpperCase(),
              search.charAt(0).toUpperCase() + search.slice(1).toLowerCase(),
            ],
          },
        },
      ],
    }),
    ...(jobType &&
      jobType !== "All" && {
        jobType: { contains: jobType, mode: Prisma.QueryMode.insensitive },
      }),
    ...(location &&
      location !== "All" && {
        location: { contains: location, mode: Prisma.QueryMode.insensitive },
      }),
    ...(jobMode &&
      jobMode !== "All" && {
        jobMode: { contains: jobMode, mode: Prisma.QueryMode.insensitive },
      }),
  };

  try {
    // Define a narrower type for the applications relation
    type JobWithApplicationStatus = Prisma.JobGetPayload<{
      include: {
        applications: {
          select: {
            status: true;
          };
        };
      };
    }>;

    const [jobs, totalJobs]: [JobWithApplicationStatus[], number] =
      await prisma.$transaction([
        prisma.job.findMany({
          where: whereClause,
          skip: offset,
          take: limit,
          orderBy: {
            createdAt: "asc", // Sort by creation date
          },
          include: {
            applications: {
              where: { userId: userID },
              select: { status: true }, // Select only the status field
            },
          },
        }),
        prisma.job.count({ where: whereClause }),
      ]);

    if (jobs.length === 0) {
      return {
        success: false,
        status: 404,
        message: "No jobs found!",
        data: null,
      };
    }

    // Map jobs to include the applicationStatus
    const jobsWithStatus = jobs.map((job) => ({
      ...job,
      applicationStatus: job.applications[0]?.status || null,
    }));

    return {
      success: true,
      status: 200,
      message: "Jobs fetched successfully.",
      data: {
        jobs: jobsWithStatus,
        totalJobs,
        currentPage: page,
        totalPages: Math.ceil(totalJobs / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching jobs:", error);

    return {
      success: false,
      status: 500,
      message: "An unexpected error occurred.",
      data: null,
    };
  }
}

// Check is job saved
export async function checkIsJobSavedAction(
  jobID: string,
  userID: string
): Promise<CheckSaveRemoveJob> {
  try {
    // Check if the job is saved for the logged-in user
    const isSaved: {
      id: string;
      userId: string;
      jobId: string;
      createdAt: Date;
    } | null = await prisma.savedJob.findFirst({
      where: {
        jobId: jobID,
        userId: userID,
      },
    });

    return {
      success: true,
      status: 200,
      message: "",
      data: { isSaved: Boolean(isSaved) },
    };
  } catch (error) {
    console.error("Error in checkIsJobSavedAction:", error);
    return {
      success: false,
      status: 500,
      message: "An unexpected error occurred.",
      data: null,
    };
  }
}

// Save / Remove job
export async function saveRemoveJobAction(
  jobID: string,
  userID: string
): Promise<CheckSaveRemoveJob> {
  try {
    // Check if the job is already bookmarked
    const existingSavedJob: {
      id: string;
      userId: string;
      jobId: string;
      createdAt: Date;
    } | null = await prisma.savedJob.findFirst({
      where: {
        jobId: jobID,
        userId: userID,
      },
    });

    let message: string;
    let isSaved: boolean;

    if (existingSavedJob) {
      // Remove the bookmark
      await prisma.savedJob.delete({
        where: { id: existingSavedJob.id },
      });
      message = "Job removed successfully.";
      isSaved = false;
    } else {
      // Add a new bookmark
      await prisma.savedJob.create({
        data: {
          jobId: jobID,
          userId: userID,
        },
      });
      message = "Job saved successfully.";
      isSaved = true;
    }

    // Revalidate necessary pages
    revalidatePath("/pages/saved-jobs");
    revalidatePath("/pages/jobs");
    revalidatePath("/pages/applied-jobs");

    return {
      success: true,
      status: 200,
      message,
      data: { isSaved },
    };
  } catch (error) {
    console.error("Error in saveRemoveJobAction:", error);
    return {
      success: false,
      status: 500,
      message: "An unexpected error occurred.",
      data: null,
    };
  }
}

// Fetch saved jobs
export async function fetchSavedJobsAction(userID: string): Promise<SavedJobs> {
  try {
    const savedJobs: SavedJob[] = await prisma.savedJob.findMany({
      where: {
        userId: userID,
      },
      include: {
        job: true,
      },
    });

    if (savedJobs.length === 0) {
      return {
        success: false,
        status: 404,
        message: "No saved jobs found!",
        data: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Jobs fetched successfully.",
      data: {
        savedJobs,
      },
    };
  } catch (error) {
    console.error("Failed to fetch saved jobs:", error);
    return {
      success: false,
      status: 500,
      message: "An unexpected error occurred.",
      data: null,
    };
  }
}

// Fetch job details
export async function fetchJobDetailsAction(
  jobID: string
): Promise<JobSeekerJobDetails> {
  try {
    const jobDetails: Job | null = await prisma.job.findUnique({
      where: { id: jobID },
    });

    if (!jobDetails) {
      return {
        success: false,
        status: 404,
        message: "The requested job could not be located.",
        data: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Job details fetched successfully.",
      data: { jobDetails },
    };
  } catch (error) {
    console.error("Error fetching job details:", error);

    return {
      success: false,
      status: 500,
      message: "An unexpected error occurred.",
      data: null,
    };
  }
}

// Check user applied for a job
export async function checkIsJobAppliedAction(
  jobID: string,
  userID: string
): Promise<CheckIsApplied> {
  try {
    // Check if the job is applied for the logged-in user
    const isApplied: IsApplied | null = await prisma.jobApplication.findFirst({
      where: {
        jobId: jobID,
        userId: userID,
      },
    });

    return {
      success: true,
      status: 200,
      message: "",
      data: { isApplied: Boolean(isApplied) },
    };
  } catch (error) {
    console.error("Error in checkIsJobAppliedAction:", error);
    return {
      success: false,
      status: 500,
      message: "An unexpected error occurred.",
      data: null,
    };
  }
}

// Apply for a job
export async function applyForJobAction(
  userID: string,
  jobID: string
): Promise<CheckIsApplied> {
  // Check if the job exists
  const job: Job | null = await prisma.job.findUnique({
    where: { id: jobID },
  });

  if (!job) {
    return {
      success: false,
      status: 404,
      message: "The job you're trying to apply doesn't exist",
      data: null,
    };
  }

  await prisma.jobApplication.create({
    data: {
      jobId: jobID,
      userId: userID,
      status: ApplicationStatus.PENDING,
    },
  });

  // Revalidate necessary pages
  revalidatePath(`/pages/jobs`);
  revalidatePath(`/pages/jobs/${jobID}`);
  revalidatePath(`/pages/saved-jobs}`);
  revalidatePath(`/pages/applied-jobs`);

  return {
    success: true,
    status: 200,
    message: "Your application has been submitted successfully",
    data: { isApplied: true },
  };
}

// Fetch applied jobs
export async function fetchAppliedJobsAction(
  userID: string
): Promise<AppliedJobs> {
  try {
    const appliedJobs: AppliedJob[] = await prisma.jobApplication.findMany({
      where: {
        userId: userID,
      },
      include: {
        job: true,
      },
    });

    if (appliedJobs.length === 0) {
      return {
        success: false,
        status: 404,
        message: "No applied jobs found!",
        data: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Applied jobs fetched successfully.",
      data: {
        appliedJobs,
      },
    };
  } catch (error) {
    console.error("Failed to fetch applied jobs:", error);
    return {
      success: false,
      status: 500,
      message: "An unexpected error occurred.",
      data: null,
    };
  }
}
