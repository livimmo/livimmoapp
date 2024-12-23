import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Home,
  Users,
  UserCog,
  Settings,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Properties", href: "/admin/properties", icon: Home },
  { name: "Agents", href: "/admin/agents", icon: UserCog },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white">
        <div className="flex flex-grow flex-col">
          <nav className="flex-1 space-y-1 px-2 pb-4 pt-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    isActive
                      ? "bg-gray-100 text-primary"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
                  )
                }
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    "text-gray-400 group-hover:text-gray-500"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}