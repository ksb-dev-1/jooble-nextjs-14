import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface FetchJobsProps {
  userID: string;
  search?: string;
  jobType?: string;
  location?: string;
  jobMode?: string;
  page: number;
  limit: number;
}

export default async function fetchJobsAction({
  userID,
  search,
  jobType,
  location,
  jobMode,
  page = 1,
  limit = 2,
}: FetchJobsProps) {
  if (!userID) {
    throw new Error("User not authenticated");
  }

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
    const [jobs, totalJobs] = await prisma.$transaction([
      prisma.job.findMany({
        where: whereClause,
        skip: offset,
        take: limit,
        orderBy: {
          createdAt: "desc", // Sort by creation date
        },
      }),
      prisma.job.count({ where: whereClause }),
    ]);

    return {
      jobs,
      totalJobs,
      currentPage: page,
      totalPages: Math.ceil(totalJobs / limit),
    };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw new Error("Failed to fetch jobs");
  }
}
