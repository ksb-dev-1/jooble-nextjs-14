"use client";

import { handleApplicationAction } from "@/actions/employer-actions";
import { ApplicationStatus } from "@prisma/client";
import { useState } from "react";

export default function ApplicationItem({
  application,
}: {
  application: Application;
}) {
  const [status, setStatus] = useState(application.status);
  const [error, setError] = useState<string | null>(null);

  const handleAction = async (action: ApplicationStatus) => {
    try {
      const result = await handleApplicationAction(application.id, action);
      if (result.success) {
        setStatus(action); // Update local status
        setError(null);
      } else {
        setError(result.message); // Show error message
      }
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <li className="mb-4 p-4 bg-gray-100 rounded shadow-sm">
      <p>
        <strong>Name:</strong> {application.user.name || "N/A"}
      </p>
      <p>
        <strong>Email:</strong> {application.user.email}
      </p>
      <p>
        <strong>Current Status:</strong>{" "}
        {status.charAt(0) + status.substring(1).toLowerCase()}
      </p>

      <div className="mt-2 space-x-2">
        <button
          onClick={() => handleAction(ApplicationStatus.INTERVIEW)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {ApplicationStatus.INTERVIEW.charAt(0) +
            ApplicationStatus.INTERVIEW.substring(1).toLowerCase()}
        </button>
        <button
          onClick={() => handleAction(ApplicationStatus.OFFER)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {ApplicationStatus.OFFER.charAt(0) +
            ApplicationStatus.OFFER.substring(1).toLowerCase()}
        </button>
        <button
          onClick={() => handleAction(ApplicationStatus.REJECT)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          {ApplicationStatus.REJECT.charAt(0) +
            ApplicationStatus.REJECT.substring(1).toLowerCase()}
        </button>
      </div>

      {error && <p className="mt-2 text-red-500">{error}</p>}
    </li>
  );
}
