import { User, Bell, Shield, Palette, Database, Users, Mail, Webhook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const settingsSections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "team", label: "Team", icon: Users },
  { id: "integrations", label: "Integrations", icon: Webhook },
  { id: "security", label: "Security", icon: Shield },
  { id: "data", label: "Data & Export", icon: Database },
];

const notificationSettings = [
  { id: "deal_updates", label: "Deal Updates", description: "Get notified when deals change stages", enabled: true },
  { id: "team_activity", label: "Team Activity", description: "Notifications for team member actions", enabled: true },
  { id: "daily_digest", label: "Daily Digest", description: "Daily summary of sales activity", enabled: false },
  { id: "target_alerts", label: "Target Alerts", description: "Alerts when approaching or missing targets", enabled: true },
  { id: "meeting_reminders", label: "Meeting Reminders", description: "Reminders before scheduled meetings", enabled: true },
];

const integrations = [
  { id: "slack", name: "Slack", description: "Send notifications to Slack channels", connected: true },
  { id: "salesforce", name: "Salesforce", description: "Sync data with Salesforce CRM", connected: false },
  { id: "hubspot", name: "HubSpot", description: "Connect with HubSpot marketing", connected: false },
  { id: "gmail", name: "Gmail", description: "Track emails and sync contacts", connected: true },
  { id: "calendar", name: "Google Calendar", description: "Sync meetings and events", connected: true },
];

export function SettingsView() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="col-span-1">
          <div className="metric-card">
            <nav className="space-y-1">
              {settingsSections.map((section, index) => (
                <button
                  key={section.id}
                  className={cn(
                    "nav-item w-full",
                    index === 0 && "active"
                  )}
                >
                  <section.icon className="h-5 w-5" />
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="col-span-3 space-y-6">
          {/* Profile Section */}
          <div className="metric-card">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Profile Settings</h3>
            
            <div className="flex items-start gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary text-2xl font-bold text-primary-foreground">
                JD
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-muted-foreground">First Name</label>
                    <Input defaultValue="John" className="bg-secondary/50 border-border" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Last Name</label>
                    <Input defaultValue="Doe" className="bg-secondary/50 border-border" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Email</label>
                  <Input defaultValue="john.doe@company.com" className="bg-secondary/50 border-border" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Role</label>
                  <Input defaultValue="Sales Manager" className="bg-secondary/50 border-border" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" className="border-border">Cancel</Button>
              <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">Save Changes</Button>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="metric-card">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Notification Preferences</h3>
            
            <div className="space-y-4">
              {notificationSettings.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 p-4">
                  <div>
                    <p className="font-medium text-foreground">{setting.label}</p>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <Switch defaultChecked={setting.enabled} />
                </div>
              ))}
            </div>
          </div>

          {/* Integrations Section */}
          <div className="metric-card">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Integrations</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {integrations.map((integration) => (
                <div key={integration.id} className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{integration.name}</p>
                      <p className="text-xs text-muted-foreground">{integration.description}</p>
                    </div>
                  </div>
                  <Button
                    variant={integration.connected ? "outline" : "default"}
                    size="sm"
                    className={integration.connected ? "border-success text-success" : "bg-gradient-primary text-primary-foreground"}
                  >
                    {integration.connected ? "Connected" : "Connect"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
