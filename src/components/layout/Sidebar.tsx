import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Target, 
  Zap, 
  TrendingUp, 
  Settings, 
  BarChart3,
  Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "pipeline", label: "Pipeline", icon: BarChart3 },
  { id: "team", label: "Team Tracker", icon: Users },
  { id: "scheduler", label: "Scheduler", icon: Calendar },
  { id: "strategy", label: "Strategy", icon: Lightbulb },
  { id: "targets", label: "Targets", icon: Target },
  { id: "automation", label: "Automation", icon: Zap },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">SalesForge</h1>
            <p className="text-xs text-muted-foreground">B2B Sales Platform</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn("nav-item w-full", activeTab === item.id && "active")}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-foreground">John Doe</p>
              <p className="truncate text-xs text-muted-foreground">Sales Manager</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
