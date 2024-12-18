"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

async function saveRemoveJobAction(jobID: string) {
  const session = await auth();

  // Ensure the user is authenticated
  if (!session || !session.user.id) {
    return { error: "User ID is required" };
  }

  // Check if the job is already bookmarked
  const isBookmarked = await prisma.savedJob.findFirst({
    where: {
      jobId: jobID,
      userId: session.user.id,
    },
  });

  let message: string;

  // If the job is already bookmarked, remove it
  if (isBookmarked) {
    await prisma.savedJob.delete({
      where: {
        id: isBookmarked.id,
      },
    });
    message = "Job removed successfully";
  } else {
    // If the job is not bookmarked, add it
    await prisma.savedJob.create({
      data: {
        jobId: jobID,
        userId: session.user.id,
      },
    });
    message = "Job saved successfully";
  }

  revalidatePath("/pages/saved-jobs", "page");
  revalidatePath("/pages/jobs", "page");
  // Return the appropriate message and the new bookmark status
  return { message, isBookmarked: !isBookmarked };
}

export default saveRemoveJobAction;
