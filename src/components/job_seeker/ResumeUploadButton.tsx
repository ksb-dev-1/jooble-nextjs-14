"use client";

import { cn } from "@/utils/inedx";
import { UploadButton } from "@/utils/uploadthing";

export default function ResumeUploadButton() {
  return (
    <div className="custom-upload-container">
      <UploadButton
        endpoint="pdfUploader"
        onClientUploadComplete={(res) => {
          console.log("Files uploaded successfully:", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          console.error("Upload Error:", error.message);
          alert(`ERROR! ${error.message}`);
        }}
        className={cn("rounded-custom mt-4")}
      />
    </div>
  );
}
