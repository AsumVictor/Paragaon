
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Settings,
  User,
  Mail,
  Bell,
  Folder,
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/contexts/AuthContext";

// Define which routes are accessible by which roles
const roleBasedRoutes = {
  admin: [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
    },
    {
      label: "Messages",
      icon: Mail,
      href: "/messages",
    },
    {
      label: "Notifications",
      icon: Bell,
      href: "/notifications",
    },
    {
      label: "Projects",
      icon: Folder,
      href: "/projects",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ],
  user: [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
    },
    {
      label: "Messages",
      icon: Mail,
      href: "/messages",
    },
    {
      label: "Notifications",
      icon: Bell,
      href: "/notifications",
    },
    {
      label: "Projects",
      icon: Folder,
      href: "/projects",
    },
  ],
  guest: [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
    },
  ],
};

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  // Get the appropriate routes based on user role
  const routes = user ? roleBasedRoutes[user.role] || roleBasedRoutes.guest : roleBasedRoutes.guest;

  return (
    <aside
      className={cn(
        "fixed left-0 h-screen bg-[#1A1F2C] text-white p-4 flex flex-col gap-4 transition-all duration-300 ease-in-out z-50",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center mb-8">
        <div className="bg-white/10 p-2 rounded-lg">
          <User className="h-6 w-6" />
        </div>
        {!isCollapsed && (
          <span className="ml-3 text-lg font-semibold">Your App</span>
        )}
      </div>
      <nav className="flex-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            to={route.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors",
              location.pathname === route.href
                ? "bg-[#9b87f5] text-white"
                : "hover:bg-white/10 text-gray-300"
            )}
          >
            <route.icon className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span>{route.label}</span>}
          </Link>
        ))}
      </nav>
      
      {!isCollapsed && (
        <button 
          onClick={logout}
          className="mt-auto flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-white/10 text-gray-300"
        >
          <User className="h-5 w-5 shrink-0" />
          <span>Logout</span>
        </button>
      )}
      
      {isCollapsed && (
        <button 
          onClick={logout}
          className="mt-auto flex items-center justify-center p-2 rounded-lg transition-colors hover:bg-white/10 text-gray-300"
          title="Logout"
        >
          <User className="h-5 w-5 shrink-0" />
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
