"use client";

import Image from "next/image";

// components
import Container from "@/components/Container";

// 3rd party
import { MdOutlineRefresh } from "react-icons/md";

export default function Error({
  status,
  message,
}: {
  status: number;
  message: string;
}) {
  return (
    <Container>
      <div className="h-full flex flex-col items-center justify-center">
        <div className="w-full h-fit flex flex-col items-center justify-center rounded-xl">
          <div className="flex flex-col sm:flex-row items-center">
            <p className="ml-4 sm:text-xl text-center font-bold text-violet-600">
              <span className="font-extrabold text-xl sm:text-2xl">
                {status}
              </span>
              <span> - {message}</span>
            </p>
            {status !== 401 && (
              <button
                type="button"
                aria-label="refresh-button"
                onClick={() => window.location.reload()}
                className="relative ml-4 h-10 w-10 rounded-full bg-violet-600 text-white hover:bg-violet-800 transition my-4 sm:mt-0"
              >
                <MdOutlineRefresh className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl" />
              </button>
            )}
          </div>
          <div className="w-full rounded-xl flex items-center justify-center p-4">
            <div className="relative h-[200px] sm:h-[250px] w-[200px] sm:w-[250px]">
              <Image
                src={`/assets/${status}.svg`}
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
