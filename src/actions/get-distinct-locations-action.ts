import { prisma } from "@/lib/prisma";

export default async function getDistinctLocationsAction(): Promise<string[]> {
  try {
    const locations = await prisma.job.findMany({
      select: { location: true },
      distinct: ["location"],
    });
    return locations.map(({ location }) => location);
  } catch (error) {
    console.error("Error fetching distinct locations:", error);
    throw new Error("Failed to fetch distinct locations");
  }
}
