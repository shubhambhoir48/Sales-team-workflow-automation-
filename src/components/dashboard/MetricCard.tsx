import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  variant?: "default" | "primary" | "success" | "warning";
}

export function MetricCard({ title, value, change, icon: Icon, variant = "default" }: MetricCardProps) {
  const isPositive = change >= 0;

  const iconVariants = {
    default: "bg-secondary text-foreground",
    primary: "bg-primary/15 text-primary",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning",
  };

  return (
    <div className="metric-card card-hover group">
      <div className="flex items-start justify-between">
        <div className={cn("rounded-lg p-2.5", iconVariants[variant])}>
          <Icon className="h-5 w-5" />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-medium",
          isPositive ? "text-success" : "text-destructive"
        )}>
          {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {Math.abs(change)}%
        </div>
      </div>

      <div className="mt-4">
        <p className="text-2xl font-bold text-foreground animate-count-up">{value}</p>
        <p className="mt-1 text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
}
