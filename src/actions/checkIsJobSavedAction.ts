"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

async function checkIsJobSavedAction(propertyId: string) {
  const session = await auth();

  if (!session || !session.user.id) {
    return { error: "User ID is required" };
  }

  const isBookmarked = await prisma.savedJob.findFirst({
    where: {
      jobId: propertyId,
      userId: session.user.id,
    },
  });

  return { isBookmarked: !!isBookmarked };
}

export default checkIsJobSavedAction;
