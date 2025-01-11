"use client";

import { useState, useEffect } from "react";

// actions
import {
  checkIsJobSavedAction,
  saveRemoveJobAction,
} from "@/actions/job-seeker-actions";

// hooks
import { useCurrentUserSession } from "@/hooks/useCurrentUserSession";

// 3rd party libraries
import toast from "react-hot-toast";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";

const SaveRemoveJobButton = ({
  jobID,
  isDefaultSaved = false,
}: {
  jobID: string;
  isDefaultSaved?: boolean;
}) => {
  const [saved, setSaved] = useState(isDefaultSaved);
  const [loading, setLoading] = useState(false);

  const { userID, sessionStatus } = useCurrentUserSession();

  useEffect(() => {
    // Skip checking saved status if already defaulted
    if (!isDefaultSaved && userID) {
      const fetchSavedStatus = async () => {
        setLoading(true);
        try {
          const { success, data, message } = await checkIsJobSavedAction(
            jobID,
            userID
          );
          if (success) {
            setSaved(data?.isSaved || false);
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
  }, [jobID, userID, isDefaultSaved]);

  const handleClick = async () => {
    if (!userID) {
      toast.error("You need to sign in to save a job.");
      return;
    }

    try {
      setLoading(true);
      const { success, data, message } = await saveRemoveJobAction(
        jobID,
        userID
      );
      if (success) {
        setSaved(data?.isSaved || false);
        toast.success(message);
      } else {
        toast.error(message || "Failed to update saved status.");
      }
    } catch (error) {
      console.error("Error updating saved status:", error);
      toast.error("An unexpected error occurred while saving the job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      className="h-9 w-9 rounded-full text-xl cursor-pointer bg-red-100 hover:bg-red-200 transition flex items-center justify-center"
      onClick={handleClick}
      aria-label="bookmark-button"
    >
      {sessionStatus === "loading" || loading ? (
        <span className="loader text-red-600 inline-block"></span>
      ) : saved ? (
        <VscHeartFilled className="text-red-600" />
      ) : (
        <VscHeart className="text-red-600" />
      )}
    </button>
  );
};

export default SaveRemoveJobButton;
