"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

// actions
import saveRemoveJobAction from "@/actions/saveRemoveJobAction";
import checkIsJobSavedAction from "@/actions/checkIsJobSavedAction";

// 3rd party libraries
import toast from "react-hot-toast";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";

const SaveRemoveJobButton = ({ jobID }: { jobID: string }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    checkIsJobSavedAction(jobID).then((res) => {
      if (res.error) toast.error(res.error);
      if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
      setLoading(false);
    });
  }, [jobID, userId]);

  const handleClick = async () => {
    setLoading(true);
    if (!userId) {
      toast.error("You need to sign in to bookmark a job");
      setLoading(true);
      return;
    }

    saveRemoveJobAction(jobID)
      .then((res) => {
        if (res.error) return toast.error(res.error);
        setIsBookmarked(res.isBookmarked!);
        toast.success(res.message!);
      })
      .finally(() => setLoading(false));
  };

  return (
    <button
      type="button"
      className="absolute top-4 right-4 h-10 w-10 rounded-full text-lg sm:text-xl cursor-pointer bg-rose-50 hover:bg-rose-100 transition flex items-center justify-center"
      onClick={handleClick}
      aria-label="bookmark-button"
    >
      {loading ? (
        <span className="loader text-rose-600 inline-block"></span>
      ) : isBookmarked ? (
        <VscHeartFilled className="text-rose-600" />
      ) : (
        <VscHeart className="text-rose-600" />
      )}
    </button>
  );
};
export default SaveRemoveJobButton;
