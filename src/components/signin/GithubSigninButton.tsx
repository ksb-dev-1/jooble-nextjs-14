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
      className={`w-full flex items-center justify-center rounded text-white ${
        pending
          ? "bg-[#555] border-[#333] cursor-not-allowed"
          : "bg-black border-black hover:bg-[#333]"
      } border px-8 py-4 rounded-xl transition`}
    >
      <FaGithub className="text-2xl mr-4" />
      <span>Sign in with Github</span>
      {pending && <Loader2 size={24} className="ml-2 animate-spin" />}
    </button>
  );
}
