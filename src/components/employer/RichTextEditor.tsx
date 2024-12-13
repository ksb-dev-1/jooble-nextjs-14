"use client";

import { forwardRef, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const RichTextEditor = forwardRef<object, EditorProps>(function RichTextEditor(
  { ...props },
  ref
) {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true; // Component is mounted
    return () => {
      isMounted.current = false; // Component is unmounted
    };
  }, []);

  return (
    <div className="rich-text-editor">
      <Editor
        editorClassName={`border rounded-xl px-3 min-h-[150px] cursor-text border-slate-300  focus-within:outline-none focus-within:outline-violet-300`}
        toolbar={{
          options: ["inline", "list", "link", "history"],
          inline: {
            options: ["bold", "italic", "underline"],
          },
        }}
        editorRef={(r) => {
          if (isMounted.current) {
            if (typeof ref === "function") {
              ref(r);
            } else if (ref) {
              (ref as React.MutableRefObject<object | null>).current = r;
            }
          }
        }}
        {...props}
      />
      {/* {error && <p className="mt-1 text-sm text-red-600">{error}</p>} */}
    </div>
  );
});

export default RichTextEditor;
