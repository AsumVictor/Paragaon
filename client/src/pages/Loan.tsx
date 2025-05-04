import RequireRoleAccess from "@/auth/RequireRoleAccess";
import { useAuth } from "@/contexts/AuthContext";
import CollectorLoan from "@/screens/collector/Loan";
import CreditManagerLoan from "@/screens/credit/Loan";

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

  if (user.role == "Credit_manager") {

    return (
      <RequireRoleAccess allowedUsers={["Credit_manager"]}>
        <CreditManagerLoan />
      </RequireRoleAccess>
    );
  }

  return <></>;
};

export default Loan;
