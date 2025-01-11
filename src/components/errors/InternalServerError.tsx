"use client";

import Image from "next/image";

// components
import Container from "@/components/Container";

// 3rd party
import { MdOutlineRefresh } from "react-icons/md";

export default function InternalServerError() {
  return (
    <Container>
      <div className="h-full flex flex-col items-center justify-center">
        <div className="w-full h-fit p-8 flex flex-col items-center justify-center bg-white shadow-md rounded-xl">
          <div className="flex items-center font-bold mb-4 text-violet-600">
            <p className="ml-4 sm:text-xl">
              <span className="font-extrabold text-xl sm:text-2xl">500 </span>
              <span> - Internal server error</span>
            </p>
            <button
              type="button"
              aria-label="refresh-button"
              onClick={() => window.location.reload()}
              className="relative ml-4 h-10 w-10 rounded-full bg-violet-600 text-white hover:bg-violet-800 transition"
            >
              <MdOutlineRefresh className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl" />
            </button>
          </div>
          <div className="w-full rounded-xl flex items-center justify-center p-4 bg-violet-100">
            <div className="relative h-[200px] sm:h-[250px] w-[200px] sm:w-[250px]">
              <Image
                src="/assets/500_internal_server_error.svg"
                alt="unauthorized"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
