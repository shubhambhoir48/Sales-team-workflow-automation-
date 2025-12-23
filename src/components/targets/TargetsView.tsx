import { Target, TrendingUp, DollarSign, Users, Calendar, Edit2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const quarterlyTargets = [
  { id: 1, name: "Revenue Target", current: 1250000, goal: 1500000, unit: "$", icon: DollarSign },
  { id: 2, name: "New Deals", current: 45, goal: 60, unit: "", icon: Target },
  { id: 3, name: "New Customers", current: 28, goal: 35, unit: "", icon: Users },
  { id: 4, name: "Meetings Booked", current: 156, goal: 180, unit: "", icon: Calendar },
];

const teamTargets = [
  { name: "Sarah Mitchell", role: "Senior AE", target: 525000, current: 485000, deals: 12 },
  { name: "Mike Reynolds", role: "Account Executive", target: 410000, current: 320000, deals: 9 },
  { name: "Emily Kim", role: "SDR", target: 410000, current: 290000, deals: 8 },
  { name: "John Davis", role: "Account Executive", target: 370000, current: 215000, deals: 6 },
];

const monthlyBreakdown = [
  { month: "Oct", target: 450000, actual: 420000 },
  { month: "Nov", target: 480000, actual: 510000 },
  { month: "Dec", target: 570000, actual: 320000, isCurrent: true },
];

export function TargetsView() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Target Settings</h2>
          <p className="text-muted-foreground">Configure and monitor your sales targets</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-border">
            <Calendar className="mr-2 h-4 w-4" />
            Q4 2024
          </Button>
          <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Set New Target
          </Button>
        </div>
      </div>

      {/* Quarterly Overview */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        {quarterlyTargets.map((target) => {
          const percentage = Math.round((target.current / target.goal) * 100);
          const isOnTrack = percentage >= 75;
          return (
            <div key={target.id} className="metric-card card-hover">
              <div className="flex items-start justify-between">
                <div className={cn("rounded-lg p-2.5", isOnTrack ? "bg-success/15" : "bg-warning/15")}>
                  <target.icon className={cn("h-5 w-5", isOnTrack ? "text-success" : "text-warning")} />
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">{target.name}</p>
                <p className="mt-1 text-2xl font-bold text-foreground">
                  {target.unit === "$" ? `$${(target.current / 1000).toFixed(0)}k` : target.current}
                  <span className="text-sm font-normal text-muted-foreground">
                    {" "}/ {target.unit === "$" ? `$${(target.goal / 1000).toFixed(0)}k` : target.goal}
                  </span>
                </p>
                <div className="mt-3">
                  <Progress value={percentage} className="h-2" />
                  <p className={cn("mt-1 text-xs font-medium", isOnTrack ? "text-success" : "text-warning")}>
                    {percentage}% complete
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Monthly Breakdown */}
        <div className="metric-card col-span-1">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Monthly Breakdown</h3>
          <div className="space-y-4">
            {monthlyBreakdown.map((month) => {
              const percentage = Math.round((month.actual / month.target) * 100);
              return (
                <div key={month.month} className={cn("rounded-lg border border-border/50 p-4", month.isCurrent && "border-primary/30 bg-primary/5")}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{month.month}</span>
                      {month.isCurrent && (
                        <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">Current</span>
                      )}
                    </div>
                    <span className={cn("text-sm font-medium", percentage >= 100 ? "text-success" : "text-foreground")}>
                      {percentage}%
                    </span>
                  </div>
                  <div className="mt-2">
                    <Progress value={Math.min(percentage, 100)} className="h-1.5" />
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>${(month.actual / 1000).toFixed(0)}k actual</span>
                    <span>${(month.target / 1000).toFixed(0)}k target</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Targets */}
        <div className="metric-card col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Team Targets</h3>
            <Button variant="ghost" size="sm">
              <Edit2 className="mr-2 h-4 w-4" />
              Edit Targets
            </Button>
          </div>

          <div className="space-y-4">
            {teamTargets.map((member) => {
              const percentage = Math.round((member.current / member.target) * 100);
              return (
                <div key={member.name} className="flex items-center gap-4 rounded-lg border border-border/50 bg-secondary/30 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          ${(member.current / 1000).toFixed(0)}k
                          <span className="text-sm font-normal text-muted-foreground"> / ${(member.target / 1000).toFixed(0)}k</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{member.deals} deals closed</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress value={percentage} className="h-1.5" />
                    </div>
                  </div>

                  <div className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-lg text-sm font-bold",
                    percentage >= 80 ? "bg-success/15 text-success" : percentage >= 60 ? "bg-warning/15 text-warning" : "bg-destructive/15 text-destructive"
                  )}>
                    {percentage}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
