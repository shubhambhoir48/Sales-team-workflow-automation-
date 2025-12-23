import { Plus, MoreHorizontal, Building2, DollarSign, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const stages = [
  {
    id: "lead",
    name: "Lead",
    deals: [
      { id: 1, company: "Acme Corp", value: 45000, daysInStage: 3, contact: "Jane Smith" },
      { id: 2, company: "Beta Inc", value: 28000, daysInStage: 5, contact: "Tom Brown" },
    ],
    total: 73000,
    color: "border-primary/50 bg-primary/5",
  },
  {
    id: "qualified",
    name: "Qualified",
    deals: [
      { id: 3, company: "TechCorp", value: 125000, daysInStage: 7, contact: "Sarah Johnson" },
      { id: 4, company: "DataFlow", value: 89000, daysInStage: 4, contact: "Mike Wilson" },
      { id: 5, company: "CloudBase", value: 67000, daysInStage: 2, contact: "Emily Chen" },
    ],
    total: 281000,
    color: "border-info/50 bg-info/5",
  },
  {
    id: "proposal",
    name: "Proposal",
    deals: [
      { id: 6, company: "Global Systems", value: 245000, daysInStage: 10, contact: "David Lee" },
      { id: 7, company: "Enterprise AI", value: 340000, daysInStage: 6, contact: "Anna White" },
    ],
    total: 585000,
    color: "border-warning/50 bg-warning/5",
  },
  {
    id: "negotiation",
    name: "Negotiation",
    deals: [
      { id: 8, company: "MegaCorp", value: 520000, daysInStage: 14, contact: "Robert Kim" },
    ],
    total: 520000,
    color: "border-success/50 bg-success/5",
  },
];

export function PipelineView() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Sales Pipeline</h2>
          <p className="text-muted-foreground">Drag and drop deals between stages</p>
        </div>
        <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
          <Plus className="mr-2 h-4 w-4" />
          Add Deal
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stages.map((stage) => (
          <div key={stage.id} className={cn("rounded-xl border p-4", stage.color)}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">{stage.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {stage.deals.length} deals • ${(stage.total / 1000).toFixed(0)}k
                </p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {stage.deals.map((deal) => (
                <div
                  key={deal.id}
                  className="cursor-pointer rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-secondary">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{deal.company}</p>
                        <p className="text-xs text-muted-foreground">{deal.contact}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-success">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-semibold">${(deal.value / 1000).toFixed(0)}k</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span className="text-xs">{deal.daysInStage}d</span>
                    </div>
                  </div>
                </div>
              ))}

              <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border py-3 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary">
                <Plus className="h-4 w-4" />
                Add deal
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
