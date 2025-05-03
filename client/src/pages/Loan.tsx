import RequireRoleAccess from "@/auth/RequireRoleAccess";
import { useAuth } from "@/contexts/AuthContext";
import CollectorLoan from "@/screens/collector/Loan";

const Loan = () => {
  const { user } = useAuth();

  if (user.role == "Collector") {
    return (
      <RequireRoleAccess allowedUsers={["Collector"]}>
        <CollectorLoan />
      </RequireRoleAccess>
    );
  }

  if (user.role == "admin") {
    return (
      <RequireRoleAccess allowedUsers={["Collector"]}>
        <CollectorLoan />
      </RequireRoleAccess>
    );
  }

  if (user.role == "risk") {
    return (
      <RequireRoleAccess allowedUsers={["Collector"]}>
        <CollectorLoan />
      </RequireRoleAccess>
    );
  }

  return <></>;
};

export default Loan;
