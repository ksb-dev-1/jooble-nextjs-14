"use client";

import { useState, useEffect } from "react";

// actions
import {
  checkIsJobAppliedAction,
  applyForJobAction,
} from "@/actions/job-seeker-actions";

// hooks
import { useCurrentUserSession } from "@/hooks/useCurrentUserSession";

// 3rd party
import toast from "react-hot-toast";

export default function ApplyJobButton({ jobID }: { jobID: string }) {
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userID, sessionStatus } = useCurrentUserSession();

  useEffect(() => {
    // Skip checking saved status if already defaulted
    if (userID) {
      const fetchSavedStatus = async () => {
        setLoading(true);
        try {
          const { success, data, message } = await checkIsJobAppliedAction(
            jobID,
            userID
          );
          if (success) {
            setApplied(data?.isApplied || false);
          } else {
            toast.error(message || "Failed to check saved status.");
          }
        } catch (error) {
          console.error("Error fetching saved status:", error);
          toast.error(
            "An unexpected error occurred while checking job status."
          );
        } finally {
          setLoading(false);
        }
      };

      fetchSavedStatus();
    }
  }, [jobID, userID]);

  const handleApply = async () => {
    if (!userID) {
      toast.error("You need to sign in to save a job.");
      return;
    }

    try {
      setLoading(true);
      const { success, data, message } = await applyForJobAction(userID, jobID);
      if (success) {
        setApplied(data?.isApplied || false);
        toast.success(message);
      } else {
        toast.error(message || "Failed to update applied status.");
      }
    } catch (error) {
      console.error("Error updating applied status:", error);
      toast.error("An unexpected error occurred while saving the job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      disabled={loading || applied}
      onClick={handleApply}
      className={`flex items-center justify-center w-[136.65px] h-[41.6px] rounded-[50px] mt-2 bg-violet-600 text-white ${
        loading || applied ? "cursor-not-allowed" : "hover:bg-violet-800"
      }  transition`}
    >
      {sessionStatus === "loading" || loading ? (
        <span className="loader text-white inline-block"></span>
      ) : applied ? (
        <span>Applied</span>
      ) : (
        <span>Apply for a job</span>
      )}
    </button>
  );
}
