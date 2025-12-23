import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts";

const revenueData = [
  { month: "Jul", revenue: 320000, target: 350000 },
  { month: "Aug", revenue: 380000, target: 370000 },
  { month: "Sep", revenue: 410000, target: 400000 },
  { month: "Oct", revenue: 420000, target: 450000 },
  { month: "Nov", revenue: 510000, target: 480000 },
  { month: "Dec", revenue: 450000, target: 500000 },
];

const conversionData = [
  { stage: "Leads", value: 450 },
  { stage: "Qualified", value: 280 },
  { stage: "Proposal", value: 145 },
  { stage: "Negotiation", value: 85 },
  { stage: "Closed", value: 45 },
];

const sourceData = [
  { name: "Outbound", value: 35, color: "hsl(199, 89%, 48%)" },
  { name: "Inbound", value: 28, color: "hsl(142, 76%, 45%)" },
  { name: "Referral", value: 22, color: "hsl(38, 92%, 50%)" },
  { name: "Partner", value: 15, color: "hsl(217, 91%, 60%)" },
];

const activityData = [
  { day: "Mon", calls: 45, emails: 120, meetings: 8 },
  { day: "Tue", calls: 52, emails: 135, meetings: 12 },
  { day: "Wed", calls: 38, emails: 98, meetings: 6 },
  { day: "Thu", calls: 61, emails: 145, meetings: 14 },
  { day: "Fri", calls: 48, emails: 110, meetings: 10 },
];

export function AnalyticsView() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Deep insights into your sales performance</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="metric-card">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Revenue Trend</h3>
              <p className="text-sm text-muted-foreground">Actual vs Target (Last 6 months)</p>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full border-2 border-dashed border-muted-foreground" />
                <span className="text-muted-foreground">Target</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 47%, 16%)" />
                <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(222, 47%, 10%)",
                    border: "1px solid hsl(222, 47%, 16%)",
                    borderRadius: "8px",
                    color: "hsl(210, 40%, 98%)",
                  }}
                  formatter={(value: number) => [`$${(value / 1000).toFixed(0)}k`]}
                />
                <Area type="monotone" dataKey="revenue" stroke="hsl(199, 89%, 48%)" strokeWidth={2} fill="url(#revenueGradient)" />
                <Line type="monotone" dataKey="target" stroke="hsl(215, 20%, 55%)" strokeDasharray="5 5" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="metric-card">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">Conversion Funnel</h3>
            <p className="text-sm text-muted-foreground">Lead to Close conversion</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 47%, 16%)" horizontal={false} />
                <XAxis type="number" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <YAxis dataKey="stage" type="category" stroke="hsl(215, 20%, 55%)" fontSize={12} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(222, 47%, 10%)",
                    border: "1px solid hsl(222, 47%, 16%)",
                    borderRadius: "8px",
                    color: "hsl(210, 40%, 98%)",
                  }}
                />
                <Bar dataKey="value" fill="hsl(199, 89%, 48%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Sources */}
        <div className="metric-card">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">Lead Sources</h3>
            <p className="text-sm text-muted-foreground">Distribution by channel</p>
          </div>
          <div className="flex h-64 items-center justify-center gap-8">
            <div className="h-48 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {sourceData.map((source) => (
                <div key={source.name} className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: source.color }} />
                  <span className="text-sm text-foreground">{source.name}</span>
                  <span className="text-sm font-semibold text-foreground">{source.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity by Day */}
        <div className="metric-card">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">Weekly Activity</h3>
            <p className="text-sm text-muted-foreground">Calls, Emails & Meetings</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 47%, 16%)" />
                <XAxis dataKey="day" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(222, 47%, 10%)",
                    border: "1px solid hsl(222, 47%, 16%)",
                    borderRadius: "8px",
                    color: "hsl(210, 40%, 98%)",
                  }}
                />
                <Bar dataKey="calls" fill="hsl(199, 89%, 48%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="emails" fill="hsl(142, 76%, 45%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="meetings" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Calls</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-success" />
              <span className="text-muted-foreground">Emails</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-warning" />
              <span className="text-muted-foreground">Meetings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
