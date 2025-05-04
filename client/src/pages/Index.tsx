import { useAuth } from "@/contexts/AuthContext";
import { Loader } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">{`Welcome back, ${user.fullName}!`}</h1>
      <div className="mt-14 flex items-center space-x-3 p-4 rounded-xl">
        <Loader className="w-6 h-6 text-emerald-600 animate-spin" />
        <p className="text-emerald-800">Fetching Dashboard Data</p>
      </div>
    </div>
  );
};

export default Index;
