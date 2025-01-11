// components
import Container from "@/components/Container";
import JobCardSkeleton from "./JobCardSkeleton";
import JobsFilterSkeleton from "./JobsFilterSkeleton";

export default function JobsPageSkeleton() {
  return (
    <Container>
      <div className="flex flex-row items-start">
        <div className="flex flex-row items-start text-transparent w-full">
          <JobsFilterSkeleton />
          <div className="w-full text-transparent">
            {[1, 2, 3, 4, 5].map((el) => (
              <JobCardSkeleton key={el} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
