"use client";

import { useFormStatus } from "react-dom";

import { FcGoogle } from "react-icons/fc";

const GoogleSigninButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full flex items-center justify-center mb-4 rounded ${
        pending
          ? "text-[#999] cursor-not-allowed"
          : "bg-white hover:bg-slate-100"
      } border border-slate-300 px-8 py-4 rounded transition`}
    >
      <FcGoogle className="text-2xl mr-4" />
      <span className="font-medium">Sign in with Google</span>
    </button>
  );
};

export default GoogleSigninButton;
