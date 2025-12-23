import { Phone, Mail, Calendar, FileText, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  { id: 1, type: "call", description: "Call with TechCorp - Demo scheduled", time: "10 min ago", user: "Sarah M." },
  { id: 2, type: "email", description: "Proposal sent to Global Systems", time: "25 min ago", user: "Mike R." },
  { id: 3, type: "meeting", description: "Meeting with DataFlow - Requirements", time: "1 hour ago", user: "Emily K." },
  { id: 4, type: "document", description: "Contract uploaded for CloudBase Pro", time: "2 hours ago", user: "John D." },
  { id: 5, type: "won", description: "Deal closed with Enterprise AI", time: "3 hours ago", user: "Sarah M." },
];

const activityIcons: Record<string, { icon: typeof Phone; color: string }> = {
  call: { icon: Phone, color: "text-primary bg-primary/15" },
  email: { icon: Mail, color: "text-info bg-info/15" },
  meeting: { icon: Calendar, color: "text-warning bg-warning/15" },
  document: { icon: FileText, color: "text-muted-foreground bg-secondary" },
  won: { icon: CheckCircle2, color: "text-success bg-success/15" },
};

export function ActivityFeed() {
  return (
    <div className="metric-card card-hover">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <p className="text-sm text-muted-foreground">Team updates and actions</p>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const { icon: Icon, color } = activityIcons[activity.type];
          return (
            <div
              key={activity.id}
              className="flex gap-4 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", color)}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{activity.description}</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{activity.user}</span>
                  <span>•</span>
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
