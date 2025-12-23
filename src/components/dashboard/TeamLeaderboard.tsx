import { Trophy, TrendingUp } from "lucide-react";

const teamMembers = [
  { id: 1, name: "Sarah Mitchell", deals: 12, revenue: "$485,000", target: 92, avatar: "SM" },
  { id: 2, name: "Mike Reynolds", deals: 9, revenue: "$320,000", target: 78, avatar: "MR" },
  { id: 3, name: "Emily Kim", deals: 8, revenue: "$290,000", target: 71, avatar: "EK" },
  { id: 4, name: "John Davis", deals: 6, revenue: "$215,000", target: 58, avatar: "JD" },
];

export function TeamLeaderboard() {
  return (
    <div className="metric-card card-hover">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Team Leaderboard</h3>
          <p className="text-sm text-muted-foreground">Top performers this month</p>
        </div>
        <Trophy className="h-5 w-5 text-warning" />
      </div>

      <div className="space-y-4">
        {teamMembers.map((member, index) => (
          <div
            key={member.id}
            className="flex items-center gap-4 rounded-lg border border-border/50 bg-secondary/30 p-3 transition-all hover:border-primary/30"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-xs font-semibold text-primary-foreground">
              {index + 1}
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-medium text-foreground">
              {member.avatar}
            </div>

            <div className="flex-1">
              <p className="font-medium text-foreground">{member.name}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{member.deals} deals</span>
                <span>•</span>
                <span>{member.revenue}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1 text-sm font-semibold text-success">
                <TrendingUp className="h-4 w-4" />
                {member.target}%
              </div>
              <p className="text-xs text-muted-foreground">of target</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
