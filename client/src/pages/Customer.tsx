import RequireRoleAccess from "@/auth/RequireRoleAccess";
import { useAuth } from "@/contexts/AuthContext";
import Customer_collector from "@/screens/collector/CustomerList";

function Customer() {
  const { user } = useAuth();

  if (user.role == "admin") {
    return <div className="">Admin</div>;
  }

  if (user.role == "Collector") {
    return (
      <div className="">
        <RequireRoleAccess allowedUsers={["Collector"]}>
          <Customer_collector />
        </RequireRoleAccess>
      </div>
    );
  }

  if (user.role == "Credit_manager") {
    return <div className="">Risk Manager</div>;
  }

  return <div className="">You dont have access</div>;
}

export default Customer;
