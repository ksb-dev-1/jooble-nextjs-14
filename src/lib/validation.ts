import { z } from "zod";
import { JOB_MODES, JOB_TYPES } from "@/lib/constants";

export const jobFilterSchema = z.object({
  search: z.string().optional(),
  jobType: z.string().optional(),
  location: z.string().optional(),
  jobMode: z.string().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;

const experienceSchema = z
  .string()
  .min(1, "Experience required")
  .regex(/^[0-9]-[1-9]$/, "Format should be 'X-Y', where X is smaller than Y")
  .refine(
    (val) => {
      const [x, y] = val.split("-").map(Number);
      return x < y;
    },
    {
      message: "The first number must be smaller than the second number",
    }
  );

export const createJobSchema = z.object({
  companyName: z
    .string()
    .min(3, "Company name should be atleast 3 characters long"),
  experience: experienceSchema,
  role: z.string().min(3, "Role name should be atleast 3 characters long"),
  salary: z
    .string()
    .min(1, "Salary required")
    .regex(/^\d+$/, "Must be a number")
    .max(9, "Number can't be longer than 9 digits"),
  location: z.string().min(3, "Location required."),
  jobType: z.enum(JOB_TYPES, {
    errorMap: () => ({ message: "Please select a valid job type" }),
  }),
  jobMode: z.enum(JOB_MODES, {
    errorMap: () => ({ message: "Please select a valid job type" }),
  }),
  openings: z
    .string()
    .min(1, "Openings required")
    .regex(/^\d+$/, "Must be a number"),
  skills: z
    .array(z.string().min(1, "Skill cannot be empty"))
    .min(1, "At least one skill is required")
    .refine((skills) => new Set(skills).size === skills.length, {
      message: "Duplicate skills are not allowed",
    }),
  description: z.string().optional(),
});

export type CreateJobValues = z.infer<typeof createJobSchema>;
