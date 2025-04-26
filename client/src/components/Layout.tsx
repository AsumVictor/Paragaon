import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    console.log("logout")
    return navigate("./login");
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isCollapsed={isCollapsed} />
      <div
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          isCollapsed ? "ml-[70px]" : "ml-[240px]",
          isMobile && "ml-0"
        )}
      >
        <nav className="h-14 border-b px-4 flex items-center justify-between bg-white">
          <button
            title=" title"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {user.name} ({user.role})
            </span>
          </div>
        </nav>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
