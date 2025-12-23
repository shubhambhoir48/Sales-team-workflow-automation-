import { Lightbulb, TrendingUp, Target, AlertTriangle, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const industries = ["SaaS", "FinTech", "Healthcare", "E-commerce", "Manufacturing"];
const productCategories = ["Enterprise Software", "Marketing Tools", "Analytics", "Security", "Collaboration"];

const suggestions = [
  {
    id: 1,
    type: "opportunity",
    priority: "high",
    title: "Focus on Enterprise SaaS Segment",
    description: "Based on your win rates, Enterprise SaaS prospects have 40% higher close rates. Prioritize outreach to this segment.",
    impact: "+$125k potential",
    actions: ["Reallocate 30% of SDR capacity", "Create SaaS-specific pitch deck", "Target decision makers on LinkedIn"],
  },
  {
    id: 2,
    type: "warning",
    priority: "medium",
    title: "Long Sales Cycles in Healthcare",
    description: "Healthcare deals average 90+ days. Consider multi-threading and executive sponsorship earlier.",
    impact: "Reduce cycle by 20%",
    actions: ["Implement champion identification", "Create ROI calculator for healthcare", "Schedule bi-weekly check-ins"],
  },
  {
    id: 3,
    type: "optimization",
    priority: "high",
    title: "Improve Demo-to-Proposal Conversion",
    description: "Your demo-to-proposal rate is 45% vs industry benchmark of 60%. Focus on qualification and demo personalization.",
    impact: "+15% conversion",
    actions: ["Pre-demo discovery calls", "Industry-specific demo flows", "Post-demo summary emails"],
  },
  {
    id: 4,
    type: "opportunity",
    priority: "medium",
    title: "Cross-sell to Existing Customers",
    description: "Existing customers have 3x higher close rates. Launch targeted upsell campaigns to current customer base.",
    impact: "+$85k ARR",
    actions: ["Identify expansion opportunities", "Create customer success plays", "Train AEs on expansion selling"],
  },
];

const suggestionStyles = {
  opportunity: { icon: TrendingUp, color: "text-success", bg: "bg-success/10 border-success/30" },
  warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10 border-warning/30" },
  optimization: { icon: Target, color: "text-primary", bg: "bg-primary/10 border-primary/30" },
};

export function StrategyView() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">AI Strategy Advisor</h2>
            <p className="text-muted-foreground">Personalized recommendations based on your data</p>
          </div>
        </div>
        <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
          <Lightbulb className="mr-2 h-4 w-4" />
          Generate New Insights
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <div className="metric-card flex-1">
          <label className="mb-2 block text-sm font-medium text-muted-foreground">Industry Focus</label>
          <div className="flex flex-wrap gap-2">
            {industries.map((industry) => (
              <button
                key={industry}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  industry === "SaaS" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                )}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        <div className="metric-card flex-1">
          <label className="mb-2 block text-sm font-medium text-muted-foreground">Product Category</label>
          <div className="flex flex-wrap gap-2">
            {productCategories.map((category) => (
              <button
                key={category}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  category === "Enterprise Software" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        <div className="metric-card">
          <p className="text-sm text-muted-foreground">Win Rate</p>
          <p className="mt-2 text-3xl font-bold text-foreground">32%</p>
          <p className="mt-1 text-xs text-success">+5% vs last quarter</p>
        </div>
        <div className="metric-card">
          <p className="text-sm text-muted-foreground">Avg Deal Size</p>
          <p className="mt-2 text-3xl font-bold text-foreground">$85k</p>
          <p className="mt-1 text-xs text-success">+12% vs benchmark</p>
        </div>
        <div className="metric-card">
          <p className="text-sm text-muted-foreground">Sales Cycle</p>
          <p className="mt-2 text-3xl font-bold text-foreground">45 days</p>
          <p className="mt-1 text-xs text-warning">+8 days vs target</p>
        </div>
        <div className="metric-card">
          <p className="text-sm text-muted-foreground">Pipeline Health</p>
          <p className="mt-2 text-3xl font-bold text-foreground">3.2x</p>
          <p className="mt-1 text-xs text-success">Above 3x threshold</p>
        </div>
      </div>

      {/* Suggestions */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Strategic Recommendations</h3>
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => {
            const { icon: Icon, color, bg } = suggestionStyles[suggestion.type as keyof typeof suggestionStyles];
            return (
              <div
                key={suggestion.id}
                className={cn(
                  "rounded-xl border p-6 transition-all hover:shadow-lg animate-fade-in",
                  bg
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={cn("rounded-lg bg-background/50 p-2.5", color)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{suggestion.title}</h4>
                        <span className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-medium uppercase",
                          suggestion.priority === "high" ? "bg-destructive/20 text-destructive" : "bg-warning/20 text-warning"
                        )}>
                          {suggestion.priority}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{suggestion.description}</p>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {suggestion.actions.map((action, i) => (
                          <span key={i} className="flex items-center gap-1 rounded-full bg-background/50 px-3 py-1 text-xs">
                            <CheckCircle2 className="h-3 w-3 text-success" />
                            {action}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={cn("text-lg font-bold", color)}>{suggestion.impact}</p>
                    <Button variant="ghost" size="sm" className="mt-2">
                      Take Action <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
