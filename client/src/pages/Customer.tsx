import RequireRoleAccess from "@/auth/RequireRoleAccess";
import { useAuth } from "@/contexts/AuthContext";
import Customer_collector from "@/screens/collector/CustomerList";
import React from "react";

function Customer() {
  const { user } = useAuth();

  if (user.role == "admin") {
    return <div className="">Admin</div>;
  }

  if (user.role == "collector") {
    return (
      <div className="">
        <RequireRoleAccess allowedUsers={["collector"]}>
          <Customer_collector />
        </RequireRoleAccess>
      </div>
    );
  }

  if (user.role == "risk") {
    return <div className="">Risk Manager</div>;
  }

  return <div className="">You dont have access</div>;
}

export default Customer;
