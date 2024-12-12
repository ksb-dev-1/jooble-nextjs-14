"use client";

import { useFormStatus } from "react-dom";

import { FaGithub } from "react-icons/fa6";

const GithubSigninButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full flex items-center justify-center border ${
        pending
          ? "bg-[#555] border-[#555] cursor-not-allowed"
          : "bg-black hover:bg-[#333] border-black"
      }  text-white px-8 py-4 rounded transition`}
    >
      <FaGithub className="text-2xl mr-4" />
      <span>Sign in with Github</span>
    </button>
  );
};

export default GithubSigninButton;
