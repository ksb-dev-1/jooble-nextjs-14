"use client";

import Link from "next/link";
import Image from "next/image";

const Premium = () => {
  return (
    <div className="max-w-5xl w-full pt-[4rem] md:pt-[8rem] py-[2rem] md:py-[4rem] px-4">
      <div>
        <p className="text-xl font-bold mb-4">Premium services</p>
        <div className="bg-white shadow-md rounded flex flex-col lg:flex-row items-center lg:justify-between px-2 py-4 sm:px-8 sm:py-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="relative h-[150px] w-[150px] sm:h-[175px] sm:w-[175px] rounded-full">
              <Image
                src="/assets/resume.svg"
                alt="Resume"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
                className="h-[150px]"
              />
            </div>
            <div className="lg:ml-4 mt-8 lg:mt-0">
              <p className="font-bold text-violet-600 sm:text-xl text-center lg:text-start">
                Apply for more jobs with premium services
              </p>
              <p className="mt-1 font-medium text-base text-center lg:text-start">
                You can apply for more than{" "}
                <span className="font-bold text-xl">3</span> jobs a day with
                premium services.
              </p>
            </div>
          </div>
          <Link
            href="#"
            className="bg-violet-600 hover:bg-violet-700 transition text-white mt-8 lg:mt-0 rounded-[50px] px-8 py-4"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Premium;
