import { MoreHorizontal, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const deals = [
  { id: 1, company: "TechCorp Inc.", value: "$125,000", stage: "Proposal", probability: 75, rep: "Sarah M." },
  { id: 2, company: "Global Systems", value: "$89,000", stage: "Negotiation", probability: 60, rep: "Mike R." },
  { id: 3, company: "DataFlow Ltd.", value: "$245,000", stage: "Qualified", probability: 40, rep: "Emily K." },
  { id: 4, company: "CloudBase Pro", value: "$67,000", stage: "Lead", probability: 20, rep: "John D." },
  { id: 5, company: "Enterprise AI", value: "$340,000", stage: "Negotiation", probability: 85, rep: "Sarah M." },
];

const stageColors: Record<string, string> = {
  Lead: "status-pending",
  Qualified: "status-active",
  Proposal: "status-active",
  Negotiation: "status-won",
};

export function RecentDeals() {
  return (
    <div className="metric-card card-hover">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Active Deals</h3>
          <p className="text-sm text-muted-foreground">Top opportunities this quarter</p>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>

      <div className="space-y-4">
        {deals.map((deal, index) => (
          <div
            key={deal.id}
            className="flex items-center gap-4 rounded-lg border border-border/50 bg-secondary/30 p-4 transition-all hover:border-primary/30"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate font-medium text-foreground">{deal.company}</p>
                <span className={cn("status-badge", stageColors[deal.stage])}>{deal.stage}</span>
              </div>
              <p className="text-sm text-muted-foreground">{deal.rep}</p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-foreground">{deal.value}</p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-primary"
                    style={{ width: `${deal.probability}%` }}
                  />
                </div>
                {deal.probability}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
