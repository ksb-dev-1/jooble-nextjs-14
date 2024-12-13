/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";

// lib
import citiesList from "@/lib/cities-list";

// 3rd party
import { UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";
import { CreateJobValues } from "@/lib/validation";

interface InputFieldProps {
  inputType: string;
  htmlFor: string;
  labelName: string;
  placeholder: string;
  register: UseFormRegisterReturn; // Correct type
  error?: string;
  setValue: UseFormSetValue<CreateJobValues>;
}

const LocationInputNew = ({
  htmlFor,
  labelName,
  inputType,
  placeholder,
  register,
  error,
  setValue,
}: InputFieldProps) => {
  const [locationSearchInput, setLocationSearchInput] = useState("");
  const [hasFocus, setHasFocus] = useState(false);
  const [locationError, setLocationError] = useState<string>("");

  const filteredCities = useMemo(() => {
    if (!locationSearchInput.trim()) return [];

    const searchWords = locationSearchInput.split(" ");

    return citiesList
      .map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
      .filter(
        (city) =>
          city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
          searchWords.every((word) =>
            city.toLowerCase().includes(word.toLowerCase())
          )
      )
      .slice(0, 5);
  }, [locationSearchInput]);

  return (
    <div className="relative flex flex-col">
      <label htmlFor={htmlFor} className="font-semibold text-gray-700">
        {labelName}
      </label>
      <input
        {...register}
        id={htmlFor}
        type={inputType}
        placeholder={placeholder}
        onChange={(e) => {
          setLocationSearchInput(e.target.value);
          setValue("location", e.target.value); // Trigger validation
          if (e.target.value === "") setLocationError("Location required");
          else setLocationError("");
        }}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        className={`mt-2 px-3 py-2 rounded-xl border ${
          error ? "border-red-500" : "border-slate-300"
        } focus-within:outline-none focus-within:outline-violet-300`}
      />
      {(error || locationError) && (
        <p className="text-red-600 text-sm mt-1">
          {error ? error : locationError}
        </p>
      )}

      {locationSearchInput.trim() && hasFocus && (
        <ul className="absolute top-20 z-10 w-full bg-white border rounded shadow">
          {!filteredCities.length && <li className="p-3">No results found.</li>}
          {filteredCities.map((city) => (
            <li key={city}>
              <button
                type="button"
                className="block w-full p-2 text-left hover:bg-gray-100"
                onMouseDown={(e) => {
                  e.preventDefault(); // Prevent losing focus
                  setLocationSearchInput("");
                  setValue("location", city); // Trigger validation
                  setLocationError("");
                }}
              >
                {city}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationInputNew;
