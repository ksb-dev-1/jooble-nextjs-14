import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userID = searchParams.get("userID");
  const search = searchParams.get("search")?.toLowerCase() || undefined;
  const jobType = searchParams.get("jobType") || undefined;
  const location = searchParams.get("location") || undefined;
  const jobMode = searchParams.get("jobMode") || undefined;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "2", 10);
  const offset = (page - 1) * limit;

  if (!userID) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

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
          createdAt: "desc", // Add sorting by creation date
        },
      }),
      prisma.job.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      jobs,
      totalJobs,
      currentPage: page,
      totalPages: Math.ceil(totalJobs / limit),
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
