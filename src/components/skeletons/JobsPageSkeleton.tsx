import JobCardSkeleton from "./JobCardSkeleton";
import JobsFilterSkeleton from "./JobsFilterSkeleton";

export default function JobsPageSkeleton() {
  return (
    <div className="flex flex-col md:flex-row items-start text-transparent w-full">
      <JobsFilterSkeleton />
      <div className="w-full text-transparent">
        {[1, 2, 3, 4, 5].map((el) => (
          <JobCardSkeleton key={el} />
        ))}
      </div>
    </div>
  );
}
