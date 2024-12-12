"use client";

import { useState, useRef } from "react";

// actions
import postJobAction from "@/actions/postJobAction";

// components
import InputField from "@/components/recruiter/InputField";
import LocationInput from "@/components/recruiter/LocationInput";
import JobType from "@/components/recruiter/JobType";
import JobMode from "@/components/recruiter/JobMode";
import SkillsInput from "@/components/recruiter/SkillsInput";
import RichTextEditor from "@/components/recruiter/RichTextEditor";

// lib
import { CreateJobValues, createJobSchema } from "@/lib/validation";
import { serializeEditorState } from "@/lib/editor";

// 3rd party
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EditorState } from "draft-js";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

const ReactHookForm = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [skills, setSkills] = useState<string[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<CreateJobValues>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      jobType: "full-time",
      jobMode: "office",
      skills: [],
    },
  });

  const onSubmit = async (values: CreateJobValues) => {
    if (skills.length === 0) {
      alert("At least one skill is required.");
      return;
    }

    try {
      await postJobAction(values);
    } catch (error) {
      console.error(error);
      alert("Something went wrong, please try again.");
    }
  };

  const handleEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    const serializedContent = serializeEditorState(newEditorState);
    setValue("description", serializedContent);

    const rawContent = convertToRaw(newEditorState.getCurrentContent());
    const htmlContent = draftToHtml(rawContent);
    console.log("HTML Content:", htmlContent);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white max-w-3xl shadow-md rounded w-full p-4 sm:p-8"
    >
      <h1 className="font-extrabold text-2xl mb-6">Post a new job</h1>
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <InputField
          htmlFor="companyName"
          labelName="Company name"
          inputType="text"
          placeholder="Enter company name"
          register={register("companyName")}
          error={errors.companyName?.message}
        />
        <InputField
          htmlFor="experience"
          labelName="Experience"
          inputType="text"
          placeholder="Enter experience (e.g. 0-2)"
          register={register("experience")}
          error={errors.experience?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-6">
        <InputField
          htmlFor="role"
          labelName="Designation"
          inputType="text"
          placeholder="Enter designation (e.g. frontend developer)"
          register={register("role")}
          error={errors.role?.message}
        />
        <InputField
          htmlFor="salary"
          labelName="Salary"
          inputType="number"
          placeholder="Enter salary in INR"
          register={register("salary")}
          error={errors.salary?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-6">
        <LocationInput
          htmlFor="location"
          labelName="Location"
          inputType="text"
          placeholder="Enter office location"
          register={register("location")}
          error={errors.location?.message}
          setValue={setValue}
        />
        <InputField
          htmlFor="openings"
          labelName="Openings"
          inputType="number"
          placeholder="Enter openings"
          register={register("openings")}
          error={errors.openings?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-6">
        <JobType register={register} error={errors.jobType?.message} />
        <JobMode register={register} error={errors.jobMode?.message} />
      </div>

      <div className="mt-6">
        <SkillsInput
          skills={skills}
          setSkills={setSkills}
          setValue={setValue}
          error={errors.skills?.message}
          setError={setError}
          clearErrors={clearErrors}
        />
      </div>

      <div className="mt-6">
        <label className="block font-semibold text-gray-700 mb-2">
          Description
        </label>
        <RichTextEditor
          ref={editorRef}
          editorState={editorState}
          onEditorStateChange={handleEditorStateChange}
          //error={errors.description?.message}
        />
      </div>

      <button
        type="submit"
        className={`mt-4 w-full rounded px-4 py-2 text-white ${
          isSubmitting
            ? "bg-violet-300 cursor-not-allowed focus:ring-2 focus:ring-violet-600 focus:ring-offset-2"
            : "bg-violet-600 hover:bg-violet-700"
        } focus:outline-none transition`}
      >
        Post
      </button>
    </form>
  );
};

export default ReactHookForm;
