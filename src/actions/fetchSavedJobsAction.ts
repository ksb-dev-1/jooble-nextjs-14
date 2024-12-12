import { prisma } from "@/lib/prisma";

export default async function fetchSavedJobsAction(userID: string) {
  if (!userID) {
    throw new Error("User not authenticated");
  }

  try {
    const savedJobs = await prisma.savedJob.findMany({
      where: {
        userId: userID,
      },
      include: {
        job: true,
      },
    });

    return savedJobs;
  } catch (error) {
    console.error("Failed to fetch saved jobs:", error);
    throw new Error("Failed to fetch saved jobs");
  }
}
