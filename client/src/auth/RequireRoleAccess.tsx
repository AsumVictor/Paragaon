import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";

function RequireRoleAccess({
  allowedUsers,
  children,
}: {
  allowedUsers: UserRole[];
  children: JSX.Element;
}) {
  const { user } = useAuth();

  console.log(user.role)
  console.log(allowedUsers)

  if (!allowedUsers.includes(user.role)) {
    return <div className="">You dont have access</div>;
  }

  return <div className="">{children}</div>;
}

export default RequireRoleAccess;
