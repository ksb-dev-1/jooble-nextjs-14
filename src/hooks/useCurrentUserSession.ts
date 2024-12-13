import { useSession } from "next-auth/react";

export const useCurrentUserSession = () => {
  const { data: session, status: sessionStatus, update } = useSession();

  const userID = session?.user.id;
  const userRole = session?.user.role;
  const userImage = session?.user.image;

  return { userID, userRole, userImage, sessionStatus, update };
};
