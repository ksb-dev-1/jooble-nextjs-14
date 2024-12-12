"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function FilterJobsButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { pending } = useFormStatus();

  return (
    <button {...props} type="submit" disabled={props.disabled || pending}>
      <span className="flex items-center justify-center gap-1 h-[41.6px] rounded">
        {pending && <Loader2 size={16} className="animate-spin" />}
        {!pending && props.children}
      </span>
    </button>
  );
}
