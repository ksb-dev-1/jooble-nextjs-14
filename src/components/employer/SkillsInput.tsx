/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface SkillsInputProps {
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
  setValue: any;
  error: string | undefined;
  setError: any;
  clearErrors: any;
}

const SkillsInput = ({
  skills,
  setSkills,
  setValue,
  error,
  setError,
  clearErrors,
}: SkillsInputProps) => {
  const [skill, setSkill] = useState<string>(""); // local skill input state
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    if (skills.length > 0) {
      clearErrors("skills");
    }

    if (skills.length === 0) {
      setError("skills", { message: "At least one skill is required." });
    }

    // Update form value whenever the skills array changes
    setValue("skills", skills, { shouldValidate: false });
  }, [skills, setValue, setError, clearErrors]);

  useEffect(() => {
    // Clear the error message after 3 seconds
    if (isError) {
      const timeout = setTimeout(() => setIsError(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [isError]);

  const handleSubmit = () => {
    const normalizedSkill = skill.trim().toLowerCase();

    // Prevent adding duplicate skills
    if (skills.some((s) => s.toLowerCase() === normalizedSkill)) {
      setIsError("Duplicate skills are not allowed.");
      return;
    }

    if (normalizedSkill) {
      // Add the new skill and reset the input
      setSkills((prevSkills) => [...prevSkills, skill.trim()]);
      setSkill(""); // Clear input field
      setIsError(null); // Clear error message
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills((prevSkills) => prevSkills.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="mt-6">
      <div className="relative flex flex-col">
        <label htmlFor="skills" className="font-semibold text-gray-700">
          Skills
        </label>
        <input
          type="text"
          placeholder="Enter skills one by one"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className={`mt-2 px-3 py-2 rounded-xl border ${
            error ? "border-red-500" : "border-slate-300"
          } focus-within:outline-none focus-within:outline-violet-300`}
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!skill.trim()}
          className={`absolute right-[0.5px] top-[33px] px-4 py-2 rounded-tr-xl rounded-br-xl ${
            skill.trim()
              ? "bg-violet-500 text-white hover:bg-violet-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Add skill
        </button>
      </div>
      {isError && <p className="mt-1 text-sm text-red-500">{isError}</p>}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {skills.length > 0 && (
        <div className="mt-4 flex items-center flex-wrap">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="relative flex items-center mr-2 pl-3 pr-9 h-[41.6px] border border-slate-300 rounded-xl"
            >
              <span className="mr-2">{skill}</span>
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="absolute right-1 h-[32.6px] w-[32.6px] rounded-[50px] bg-red-100 hover:bg-red-200 transition-colors"
              >
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600">
                  <IoClose className="text-xl" />
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsInput;
