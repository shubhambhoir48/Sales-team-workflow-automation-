import { useState } from "react";
import { IndianRupee, Users, Target, TrendingUp } from "lucide-react";
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
import { useOrganization } from "@/contexts/OrganizationContext";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { formatINRCompact } from "@/lib/indian-market";

const headerConfig: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: "Dashboard", subtitle: "" },
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
  const { profile } = useOrganization();
  const { stats, loading } = useDashboardStats();
  
  const headerInfo = headerConfig[activeTab] || headerConfig.dashboard;
  const subtitle = activeTab === "dashboard" 
    ? `Welcome back, ${profile?.full_name?.split(' ')[0] || 'User'}`
    : headerInfo.subtitle;

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
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Total Pipeline"
                value={formatINRCompact(stats.totalPipeline)}
                change={stats.pipelineChange}
                icon={IndianRupee}
                variant="primary"
                loading={loading}
              />
              <MetricCard
                title="Active Deals"
                value={stats.activeDeals.toString()}
                change={stats.dealsChange}
                icon={Target}
                variant="success"
                loading={loading}
              />
              <MetricCard
                title="Team Members"
                value={stats.teamMembers.toString()}
                change={0}
                icon={Users}
                variant="default"
                loading={loading}
              />
              <MetricCard
                title="Win Rate"
                value={`${stats.winRate}%`}
                change={stats.winRateChange}
                icon={TrendingUp}
                variant="warning"
                loading={loading}
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
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
      <main className="ml-0 lg:ml-64">
        <Header title={headerInfo.title} subtitle={subtitle} />
        {renderContent()}
      </main>
    </div>
  );
}
