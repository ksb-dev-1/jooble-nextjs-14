import Link from "next/link";
import Image from "next/image";

// 3rd party
import { IoWarningOutline } from "react-icons/io5";

const UnauthorizedAccess = ({ message }: { message: string }) => {
  return (
    <div className="min-h-screen pt-[calc(72px+4rem)] pb-[4rem] flex justify-center">
      <div className="relative max-w-5xl w-full px-4 flex flex-col items-center justify-center">
        <div className="w-full h-full flex flex-col items-center justify-center bg-white shadow-md rounded-xl">
          <p className="flex items-center font-bold text-lg sm:text-2xl mb-4 text-red-600">
            <IoWarningOutline className="text-2xl sm:text-3xl" />
            <span className="ml-4">401 - Unauthorized! </span>
          </p>
          <Link href="/pages/signin" className="text-violet-600 underline">
            {message}
          </Link>
          <div className="relative h-[200px] sm:h-[250px] w-[200px] sm:w-[250px]">
            <Image
              src="/assets/401_unauthorized.svg"
              alt="unauthorized"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;
