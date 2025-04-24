import LoginForm from "@/components/Login";
import DashboardPreview from "@/components/LoginDashView";
import React from "react";

function AuthPage() {
  return (
    <div className="flex min-h-screen">
      <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-emerald-900 to-emerald-800">
        <DashboardPreview />
      </div>
    </div>
  );
}

export default AuthPage;
