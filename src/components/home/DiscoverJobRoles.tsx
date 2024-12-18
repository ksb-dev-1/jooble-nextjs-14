import Image from "next/image";

export function DiscoverJobRolesLarge() {
  return (
    <div className="max-w-5xl w-full py-[4rem] px-4 hidden custom:block">
      <div className="">
        <h2 className="text-xl font-bold mb-4">
          Discover jobs across popular roles
        </h2>
        <div className="relative w-full h-[220px] flex items-center bg-white shadow-md rounded-xl">
          <div className="flex w-full justify-start">
            <div className="relative w-[150px] h-[150px]">
              <Image
                src="/assets/discover.svg"
                alt="discover"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
                className="ml-8 "
              />
            </div>
          </div>
          <div className="absolute shadow-2xl right-5 bg-white flex flex-col items-center justify-center rounded-xl">
            <div className="grid grid-cols-2 gap-4 p-8">
              <p className="border border-slate-300 hover:bg-violet-100 transition cursor-pointer p-4 font-medium rounded-xl">
                Full Stack Developer
              </p>
              <p className="border border-slate-300 hover:bg-violet-100 transition cursor-pointer p-4 font-medium rounded-xl">
                Android Developer
              </p>
              <p className="border border-slate-300 hover:bg-violet-100 transition cursor-pointer p-4 font-medium rounded-xl">
                Front End Developer
              </p>
              <p className="border border-slate-300 hover:bg-violet-100 transition cursor-pointer p-4 font-medium rounded-xl">
                Data Analyst
              </p>
              <p className="border border-slate-300 hover:bg-violet-100 transition cursor-pointer p-4 font-medium rounded-xl">
                Back End Developer
              </p>
              <p className="border border-slate-300 hover:bg-violet-100 transition cursor-pointer p-4 font-medium rounded-xl">
                DevOps Engineer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DiscoverJobRolesSmall() {
  return (
    <div className="w-full flex flex-col items-center justify-center custom:hidden py-[2rem] md:py-[4rem] px-4">
      <div className="w-full">
        <h2 className="text-xl font-bold mb-4">
          Discover jobs across popular roles
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 p-4 sm:p-8 bg-white shadow-md rounded-xl">
          <p className="text-base border border-slate-300 bg-white hover:bg-violet-100 rounded-xl transition cursor-pointer p-4 font-medium">
            Full Stack Developer
          </p>
          <p className="text-base border border-slate-300 bg-white hover:bg-violet-100 rounded-xl transition cursor-pointer p-4 font-medium">
            Android Developer
          </p>
          <p className="text-base border border-slate-300 bg-white hover:bg-violet-100 rounded-xl transition cursor-pointer p-4 font-medium">
            Front End Developer
          </p>
          <p className="text-base border border-slate-300 bg-white hover:bg-violet-100 rounded-xl transition cursor-pointer p-4 font-medium">
            Data Analyst
          </p>
          <p className="text-base border border-slate-300 bg-white hover:bg-violet-100 rounded-xl transition cursor-pointer p-4 font-medium">
            Back End Developer
          </p>
          <p className="text-base border border-slate-300 bg-white hover:bg-violet-100 rounded-xl transition cursor-pointer p-4 font-medium">
            DevOps Engineer
          </p>
        </div>
      </div>
    </div>
  );
}
