interface Job {
  id: string;
  companyLogo?: string | null;
  companyName: string;
  experience: string;
  role: string;
  jobType: string;
  location: string;
  jobMode: string;
  salary: number;
  skills: string[];
  openings: number;
  description?: string | null;
  applicationStatus?: "PENDING" | "INTERVIEW" | "OFFER" | "REJECT";
  createdAt: Date;
  updatedAt: Date;
}

interface Jobs {
  success: boolean;
  status: number;
  message: string;
  data: {
    jobs: Job[];
    totalJobs: number;
    currentPage: number;
    totalPages: number;
  } | null;
}

interface JobDetail {
  success: boolean;
  status: number;
  message: string;
  data: Job | null;
}

interface CheckSaveRemoveJob {
  success: boolean;
  status: number;
  message: string;
  data: {
    isSaved: boolen;
  } | null;
}

interface SavedJob {
  id: string;
  userId: string;
  jobId: string;
  createdAt: Date;
  job: Job | null;
}

interface SavedJobs {
  success: boolean;
  status: number;
  message: string;
  data: {
    savedJobs: SavedJob[];
  } | null;
}

interface IsApplied {
  id: string;
  userId: string;
  jobId: string;
  createdAt: Date;
  updatedAt: Date;
  status: ApplicationStatus;
}

interface CheckIsApplied {
  success: boolean;
  status: number;
  message: string;
  data: {
    isApplied: boolean;
  } | null;
}

interface Application {
  id: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
  status: string;
}

interface JobSeekerJobDetails {
  success: boolean;
  status: number;
  message: string;
  data: {
    jobDetails: Job;
  } | null;
}

interface AppliedJob {
  id: string;
  userId: string;
  jobId: string;
  createdAt: Date;
  status: ApplicationStatus;
  job: Job | null;
}

interface AppliedJobs {
  success: boolean;
  status: number;
  message: string;
  data: {
    appliedJobs: AppliedJob[];
  } | null;
}
