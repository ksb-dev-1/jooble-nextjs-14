import { NextRequest, NextResponse } from "next/server";

// lib
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const userID = req.nextUrl.searchParams.get("userID");

    if (!userID) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const savedJobs = await prisma.savedJob.findMany({
      where: {
        userId: userID,
      },
      include: {
        job: true,
      },
    });

    return NextResponse.json(savedJobs, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch saved jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch saved jobs" },
      { status: 500 }
    );
  }
}
