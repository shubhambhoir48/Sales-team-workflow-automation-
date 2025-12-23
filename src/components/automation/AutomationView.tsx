import { Zap, Play, Pause, Plus, Mail, Clock, Users, Target, ArrowRight, MoreHorizontal, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const automations = [
  {
    id: 1,
    name: "Lead Follow-up Sequence",
    description: "Automatically send follow-up emails to new leads after 24, 72, and 168 hours",
    trigger: "New lead created",
    actions: ["Send email", "Create task", "Update status"],
    active: true,
    runs: 245,
    successRate: 94,
  },
  {
    id: 2,
    name: "Deal Stage Notifications",
    description: "Notify team members when deals move to negotiation or closing stages",
    trigger: "Deal stage changed",
    actions: ["Send Slack notification", "Update dashboard"],
    active: true,
    runs: 128,
    successRate: 100,
  },
  {
    id: 3,
    name: "Stale Deal Alert",
    description: "Alert when a deal hasn't been updated in 7+ days",
    trigger: "No activity for 7 days",
    actions: ["Send email to rep", "Create follow-up task"],
    active: true,
    runs: 67,
    successRate: 92,
  },
  {
    id: 4,
    name: "Meeting Reminder",
    description: "Send reminder emails 24 hours and 1 hour before scheduled meetings",
    trigger: "Meeting scheduled",
    actions: ["Send email", "SMS reminder"],
    active: false,
    runs: 89,
    successRate: 98,
  },
];

const templates = [
  { id: 1, name: "Welcome Sequence", category: "Onboarding", icon: Mail },
  { id: 2, name: "Re-engagement Flow", category: "Nurturing", icon: Users },
  { id: 3, name: "Quote Follow-up", category: "Sales", icon: Target },
  { id: 4, name: "Meeting Scheduler", category: "Productivity", icon: Clock },
];

export function AutomationView() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary">
            <Zap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Automation Hub</h2>
            <p className="text-muted-foreground">Automate repetitive tasks and workflows</p>
          </div>
        </div>
        <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
          <Plus className="mr-2 h-4 w-4" />
          Create Automation
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        <div className="metric-card">
          <p className="text-sm text-muted-foreground">Active Automations</p>
          <p className="mt-2 text-3xl font-bold text-foreground">3</p>
        </div>
        <div className="metric-card">
          <p className="text-sm text-muted-foreground">Total Runs This Month</p>
          <p className="mt-2 text-3xl font-bold text-foreground">529</p>
        </div>
        <div className="metric-card">
          <p className="text-sm text-muted-foreground">Time Saved</p>
          <p className="mt-2 text-3xl font-bold text-foreground">42h</p>
        </div>
        <div className="metric-card">
          <p className="text-sm text-muted-foreground">Success Rate</p>
          <p className="mt-2 text-3xl font-bold text-success">96%</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Active Automations */}
        <div className="col-span-2 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Your Automations</h3>
          {automations.map((automation, index) => (
            <div
              key={automation.id}
              className={cn(
                "rounded-xl border p-5 transition-all hover:shadow-lg animate-fade-in",
                automation.active ? "border-primary/30 bg-card" : "border-border bg-card opacity-60"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "rounded-lg p-2.5",
                    automation.active ? "bg-primary/15" : "bg-secondary"
                  )}>
                    <Zap className={cn("h-5 w-5", automation.active ? "text-primary" : "text-muted-foreground")} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-foreground">{automation.name}</h4>
                      {automation.active && (
                        <span className="flex items-center gap-1 text-xs text-success">
                          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                          Active
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{automation.description}</p>
                    
                    <div className="mt-3 flex items-center gap-2">
                      <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                        {automation.trigger}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      {automation.actions.map((action, i) => (
                        <span key={i} className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                          {action}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right text-sm">
                    <p className="text-muted-foreground">{automation.runs} runs</p>
                    <p className="text-success">{automation.successRate}% success</p>
                  </div>
                  <Switch checked={automation.active} />
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Templates */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-foreground">Quick Templates</h3>
          <div className="space-y-3">
            {templates.map((template) => (
              <button
                key={template.id}
                className="flex w-full items-center gap-3 rounded-xl border border-border/50 bg-card p-4 text-left transition-all hover:border-primary/30 hover:bg-secondary/50"
              >
                <div className="rounded-lg bg-secondary p-2.5">
                  <template.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{template.name}</p>
                  <p className="text-xs text-muted-foreground">{template.category}</p>
                </div>
                <Plus className="h-5 w-5 text-muted-foreground" />
              </button>
            ))}
          </div>

          {/* Recent Activity */}
          <h3 className="mb-4 mt-6 text-lg font-semibold text-foreground">Recent Activity</h3>
          <div className="metric-card space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <div className="flex-1">
                  <p className="text-sm text-foreground">Lead Follow-up executed</p>
                  <p className="text-xs text-muted-foreground">{i * 2} hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
