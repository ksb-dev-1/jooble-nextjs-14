"use client";

import { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  inputType: string;
  htmlFor: string;
  labelName: string;
  placeholder: string;
  register: UseFormRegisterReturn; // Corrected type
  error?: string;
}

const InputField = ({
  htmlFor,
  labelName,
  inputType,
  placeholder,
  register,
  error,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col mt-4">
      <label htmlFor={htmlFor} className="font-semibold text-slate-700">
        {labelName}
      </label>
      <input
        {...register} // Spread register directly
        id={htmlFor}
        type={inputType}
        placeholder={placeholder}
        className={`mt-2 px-3 py-2 border rounded-xl ${
          error ? "border-red-500" : "border-slate-300"
        } focus-within:outline-none focus-within:outline-violet-300 `}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
