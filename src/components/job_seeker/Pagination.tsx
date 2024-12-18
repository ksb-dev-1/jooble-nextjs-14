"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { GrFormPrevious, GrFormNext } from "react-icons/gr";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Pagination = ({ totalPages }: any) => {
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [jumpPage, setJumpPage] = useState<string>("");

  const router = useRouter();

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(jumpPage, 10);
    if (!isNaN(page)) {
      handlePageChange(page);
    } else {
      alert("Please enter a valid page number.");
    }
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);

      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set("page", page.toString());
      router.push(`?${newSearchParams.toString()}`);

      //window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="pagination flex items-center justify-between mt-4">
      <button
        aria-label="previous"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`relative text-white h-10 w-10 rounded-full ${
          currentPage === 1
            ? "bg-violet-300 cursor-not-allowed"
            : "bg-violet-600 hover:bg-violet-700"
        } transition`}
      >
        <GrFormPrevious className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl" />
      </button>
      <div className="flex items-center gap-2">
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <form onSubmit={handleJumpSubmit} className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            max={totalPages}
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            className="border border-slate-300 px-3 py-2 rounded-xl min-w-[100px] focus-within:outline-none focus-within:outline-violet-300"
            placeholder="Jump to"
          />
          <button
            aria-label="go to page"
            type="submit"
            className="bg-violet-600 hover:bg-violet-700 transition text-white px-4 py-2 rounded-xl"
          >
            Go
          </button>
        </form>
      </div>
      <button
        aria-label="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="relative bg-violet-600 text-white h-10 w-10 rounded-full hover:bg-violet-700 transition"
      >
        <GrFormNext className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl" />
      </button>
    </div>
  );
};

export default Pagination;
