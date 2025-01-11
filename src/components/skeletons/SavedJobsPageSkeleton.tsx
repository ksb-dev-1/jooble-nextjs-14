// components
import Container from "@/components/Container";
import JobCardSkeleton from "./JobCardSkeleton";

export default function SavedJobsPageSkeleton() {
  return (
    <Container>
      {/* <h1 className="flex items-center font-bold text-xl mb-8">
        <span>Saved jobs</span>
        <div className="skeleton text-transparent ml-2 relative h-7 w-7 rounded-full">
          <span className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-normal">
            2
          </span>
        </div>
      </h1> */}
      <div className="w-full grid sm:grid-cols-2 gap-x-4 text-transparent">
        {[1, 2, 3, 4].map((el) => (
          <JobCardSkeleton key={el} />
        ))}
      </div>
    </Container>
  );
}
