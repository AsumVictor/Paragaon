import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";
import React from "react";

function RequireRoleAccess({
  allowedUsers,
  children,
}: {
  allowedUsers: UserRole[];
  children: JSX.Element;
}) {
  const { user } = useAuth();

  if (!allowedUsers.includes(user.role)) {
    return <div className="">You dont have access</div>;
  }

  return <div className="">{children}</div>;
}

export default RequireRoleAccess;
