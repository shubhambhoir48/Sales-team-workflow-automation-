import { Phone, Mail, Calendar, Target, TrendingUp, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const teamMembers = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Senior Account Executive",
    avatar: "SM",
    status: "online",
    metrics: { calls: 24, emails: 45, meetings: 8, deals: 12 },
    target: { current: 485000, goal: 525000, percentage: 92 },
    activities: 156,
  },
  {
    id: 2,
    name: "Mike Reynolds",
    role: "Account Executive",
    avatar: "MR",
    status: "busy",
    metrics: { calls: 18, emails: 32, meetings: 5, deals: 9 },
    target: { current: 320000, goal: 410000, percentage: 78 },
    activities: 112,
  },
  {
    id: 3,
    name: "Emily Kim",
    role: "Sales Development Rep",
    avatar: "EK",
    status: "online",
    metrics: { calls: 42, emails: 78, meetings: 12, deals: 8 },
    target: { current: 290000, goal: 410000, percentage: 71 },
    activities: 198,
  },
  {
    id: 4,
    name: "John Davis",
    role: "Account Executive",
    avatar: "JD",
    status: "offline",
    metrics: { calls: 15, emails: 28, meetings: 4, deals: 6 },
    target: { current: 215000, goal: 370000, percentage: 58 },
    activities: 87,
  },
];

const statusColors = {
  online: "bg-success",
  busy: "bg-warning",
  offline: "bg-muted-foreground",
};

export function TeamTracker() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Team Performance</h2>
          <p className="text-muted-foreground">Monitor your team's activities and targets</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-border">
            Export Report
          </Button>
          <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
            Add Team Member
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        <div className="metric-card">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/15 p-2.5">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">99</p>
              <p className="text-sm text-muted-foreground">Total Calls Today</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-info/15 p-2.5">
              <Mail className="h-5 w-5 text-info" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">183</p>
              <p className="text-sm text-muted-foreground">Emails Sent</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-warning/15 p-2.5">
              <Calendar className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">29</p>
              <p className="text-sm text-muted-foreground">Meetings Booked</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-success/15 p-2.5">
              <Target className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">75%</p>
              <p className="text-sm text-muted-foreground">Avg Target Hit</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Table */}
      <div className="metric-card">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Team Members</h3>
          <div className="flex gap-2 text-sm">
            <button className="rounded-lg bg-primary/10 px-3 py-1.5 font-medium text-primary">All</button>
            <button className="rounded-lg px-3 py-1.5 text-muted-foreground hover:bg-secondary">Online</button>
            <button className="rounded-lg px-3 py-1.5 text-muted-foreground hover:bg-secondary">Top Performers</button>
          </div>
        </div>

        <div className="space-y-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-6 rounded-xl border border-border/50 bg-secondary/30 p-5 transition-all hover:border-primary/30"
            >
              {/* Avatar & Status */}
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary text-lg font-semibold text-primary-foreground">
                  {member.avatar}
                </div>
                <div className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-card ${statusColors[member.status as keyof typeof statusColors]}`} />
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="font-semibold text-foreground">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>

              {/* Metrics */}
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">{member.metrics.calls}</p>
                  <p className="text-xs text-muted-foreground">Calls</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">{member.metrics.emails}</p>
                  <p className="text-xs text-muted-foreground">Emails</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">{member.metrics.meetings}</p>
                  <p className="text-xs text-muted-foreground">Meetings</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">{member.metrics.deals}</p>
                  <p className="text-xs text-muted-foreground">Deals</p>
                </div>
              </div>

              {/* Target Progress */}
              <div className="w-48">
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Target</span>
                  <span className="font-medium text-foreground">{member.target.percentage}%</span>
                </div>
                <Progress value={member.target.percentage} className="h-2" />
                <p className="mt-1 text-xs text-muted-foreground">
                  ${(member.target.current / 1000).toFixed(0)}k / ${(member.target.goal / 1000).toFixed(0)}k
                </p>
              </div>

              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
