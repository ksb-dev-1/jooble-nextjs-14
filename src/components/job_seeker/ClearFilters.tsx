"use client";

import Link from "next/link";

const ClearFilters = () => {
  return (
    <Link
      href="/pages/jobs"
      className="rounded-xl flex items-center justify-center gap-1 h-[41.6px] mt-2 w-full border border-red-600 bg-red-50 text-red-600 hover:bg-red-100 px-4 transition"
    >
      ClearFilters
    </Link>
  );
};

export default ClearFilters;
