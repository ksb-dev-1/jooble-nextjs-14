// actions
import { fetchJobDetailsAction } from "@/actions/job-seeker-actions";

// lib
import { formatMoney, relativeDate } from "@/utils/inedx";

// components
import Container from "@/components/Container";
import Error from "@/components/Error";
import Markdown from "@/components/job_seeker/Markdown";
import SaveRemoveJobButton from "./SaveRemoveJobButton";
import ApplyJobButton from "./ApplyJobButton";

// 3rd party
import { BsGlobeAmericas } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { LuIndianRupee } from "react-icons/lu";
import { RxLapTimer } from "react-icons/rx";
import { TbBriefcaseFilled } from "react-icons/tb";

export default async function JobDetails({
  jobID,
  isJobSeeker,
}: {
  jobID: string;
  isJobSeeker?: boolean;
}) {
  const jobDetails = await fetchJobDetailsAction(jobID);

  if (jobDetails.status === 404) {
    return (
      <Error status={jobDetails.status} message="Job details not found!" />
    );
  }

  if (jobDetails.status === 500) {
    return <Error status={jobDetails.status} message="Internal server error" />;
  }

  const jobDetail = jobDetails.data?.jobDetails;

  if (!jobDetail) {
    return <Error status={404} message="Job details unavailable!" />;
  }

  return (
    <Container>
      <div className="flex flex-col items-start">
        <div className="w-full">
          <h1 className="font-bold mb-4 text-xl">Job Details</h1>
          <div className="w-full bg-white border border-slate-300 rounded-custom p-4 sm:p-8">
            <div className="relative border-b border-slate-300 pb-8">
              <h1 className="font-bold mb-1">{jobDetail.role}</h1>
              <p className="font-semibold capitalize text-violet-600">
                {jobDetail.companyName}
              </p>
              <div className="flex items-center flex-wrap mt-2">
                <DetailItem
                  icon={TbBriefcaseFilled}
                  text={jobDetail.experience}
                />
                <DetailItem
                  icon={LuIndianRupee}
                  text={formatMoney(jobDetail.salary)?.slice(1)}
                />
                <DetailItem icon={BsGlobeAmericas} text={jobDetail.location} />
                <DetailItem icon={RxLapTimer} text={jobDetail.jobType} />
                <DetailItem icon={IoLocationSharp} text={jobDetail.jobMode} />
              </div>
              <div className="mt-2 flex items-center flex-wrap">
                {jobDetail.skills?.map((skill, index) => (
                  <SkillItem
                    key={skill}
                    skill={skill}
                    isLast={index === jobDetail.skills.length - 1}
                  />
                ))}
              </div>
              {isJobSeeker && (
                <div className="absolute top-0 right-0">
                  <SaveRemoveJobButton jobID={jobDetail.id} />
                </div>
              )}
            </div>
            <div className="w-full flex items-center justify-between mt-4">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <p className="text-base">
                  <span className="font-medium">Posted: </span>
                  <span>{relativeDate(jobDetail.createdAt)}</span>
                </p>
                <p className="text-base mt-2 sm:mt-0 sm:ml-4">
                  <span className="font-medium">Openings: </span>
                  <span>{jobDetail.openings}</span>
                </p>
              </div>
              {isJobSeeker && <ApplyJobButton jobID={jobID} />}
            </div>
          </div>
        </div>
        {jobDetail.description && (
          <div className="mt-8">
            <Markdown>{jobDetail.description}</Markdown>
          </div>
        )}
      </div>
    </Container>
  );
}

function DetailItem({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <div className="flex items-center mt-2 mr-6">
      <Icon />
      <span className="ml-2 text-base">{text}</span>
    </div>
  );
}

function SkillItem({ skill, isLast }: { skill: string; isLast: boolean }) {
  return (
    <div className="mt-2">
      <span className="inline-block rounded-custom text-base">{skill}</span>
      {!isLast && (
        <span className="h-1 w-1 mx-2 rounded-full inline-block bg-[#333]"></span>
      )}
    </div>
  );
}
