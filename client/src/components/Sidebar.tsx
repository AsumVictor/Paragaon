import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Settings,
  User,
  Mail,
  Bell,
  Folder,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import roleBasedRoutes from "@/data/roleBase";

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const { user, logout } = useAuth();

  const routes = user ? roleBasedRoutes[user.role] : [];

  return (
    <aside
      className={cn(
        "fixed left-0 h-screen bg-emerald-900 text-white p-4 flex flex-col gap-4 transition-all duration-300 ease-in-out z-50",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center mb-8">
        <div className="bg-white/10 p-2 rounded-lg">
          <User className="h-6 w-6" />
        </div>
        {!isCollapsed && (
          <span className="ml-3 text-lg font-semibold">Paragon</span>
        )}
      </div>
      <nav className="flex-1">
        {routes.map((route) => (
          <NavLink
            key={route.href}
            to={route.href}
            className={({ isActive }) =>
              isActive
                ? "bg-white text-emerald-600 flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors font-semibold"
                : " flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors hover:bg-white/10 text-gray-300"
            }
          >
            <route.icon className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span>{route.label}</span>}
          </NavLink>
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
