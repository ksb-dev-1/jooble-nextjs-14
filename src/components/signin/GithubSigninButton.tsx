"use client";

import { useFormStatus } from "react-dom";

// 3rd party
import { Loader2 } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

export default function GithubSigninButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full flex items-center justify-center rounded ${
        pending
          ? "text-[#999] cursor-not-allowed"
          : "bg-white hover:bg-slate-100"
      } border border-slate-300 px-8 py-4 mt-4 rounded-[50px] transition`}
    >
      <FaGithub className="text-2xl mr-4" />
      <span className="font-medium">Sign in with Github</span>
      {pending && <Loader2 size={24} className="ml-2 animate-spin" />}
    </button>
  );
}
