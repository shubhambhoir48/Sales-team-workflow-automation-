import { useState } from "react";
import { DollarSign, Users, Target, TrendingUp } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { PipelineChart } from "@/components/dashboard/PipelineChart";
import { RecentDeals } from "@/components/dashboard/RecentDeals";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { TeamLeaderboard } from "@/components/dashboard/TeamLeaderboard";
import { PipelineView } from "@/components/pipeline/PipelineView";
import { TeamTracker } from "@/components/team/TeamTracker";
import { SchedulerView } from "@/components/scheduler/SchedulerView";
import { StrategyView } from "@/components/strategy/StrategyView";
import { TargetsView } from "@/components/targets/TargetsView";
import { AutomationView } from "@/components/automation/AutomationView";
import { AnalyticsView } from "@/components/analytics/AnalyticsView";
import { SettingsView } from "@/components/settings/SettingsView";

const headerConfig: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: "Dashboard", subtitle: "Welcome back, John" },
  pipeline: { title: "Sales Pipeline", subtitle: "Manage your opportunities" },
  team: { title: "Team Performance", subtitle: "Track your team's progress" },
  scheduler: { title: "Schedule", subtitle: "Manage meetings and calls" },
  strategy: { title: "AI Strategy", subtitle: "Data-driven recommendations" },
  targets: { title: "Targets", subtitle: "Set and track your goals" },
  automation: { title: "Automation", subtitle: "Automate your workflows" },
  analytics: { title: "Analytics", subtitle: "Deep performance insights" },
  settings: { title: "Settings", subtitle: "Manage your preferences" },
};

export default function Index() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { title, subtitle } = headerConfig[activeTab] || headerConfig.dashboard;

  const renderContent = () => {
    switch (activeTab) {
      case "pipeline":
        return <PipelineView />;
      case "team":
        return <TeamTracker />;
      case "scheduler":
        return <SchedulerView />;
      case "strategy":
        return <StrategyView />;
      case "targets":
        return <TargetsView />;
      case "automation":
        return <AutomationView />;
      case "analytics":
        return <AnalyticsView />;
      case "settings":
        return <SettingsView />;
      default:
        return (
          <div className="p-6">
            {/* Metrics Row */}
            <div className="mb-6 grid grid-cols-4 gap-4">
              <MetricCard
                title="Total Revenue"
                value="$1.25M"
                change={12.5}
                icon={DollarSign}
                variant="primary"
              />
              <MetricCard
                title="Active Deals"
                value="45"
                change={8.2}
                icon={Target}
                variant="success"
              />
              <MetricCard
                title="Team Members"
                value="12"
                change={0}
                icon={Users}
                variant="default"
              />
              <MetricCard
                title="Win Rate"
                value="32%"
                change={5.1}
                icon={TrendingUp}
                variant="warning"
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 space-y-6">
                <PipelineChart />
                <RecentDeals />
              </div>
              <div className="space-y-6">
                <TeamLeaderboard />
                <ActivityFeed />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="ml-64">
        <Header title={title} subtitle={subtitle} />
        {renderContent()}
      </main>
    </div>
  );
}
