import RequireRoleAccess from "@/auth/RequireRoleAccess";
import { useAuth } from "@/contexts/AuthContext";
import CollectorTransaction from "@/screens/collector/Transaction";

const Transaction = () => {
  const { user } = useAuth();

  if (user.role == "Collector") {
    return (
      <RequireRoleAccess allowedUsers={["Collector"]}>
        <CollectorTransaction />
      </RequireRoleAccess>
    );
  }
  if (user.role == "admin") {
    return (
      <RequireRoleAccess allowedUsers={["Collector"]}>
        <CollectorTransaction />
      </RequireRoleAccess>
    );
  }
  if (user.role == "Credit_manager") {
    return (
      <RequireRoleAccess allowedUsers={["Collector"]}>
        <CollectorTransaction />
      </RequireRoleAccess>
    );
  }
  return <></>;
};

export default Transaction;
