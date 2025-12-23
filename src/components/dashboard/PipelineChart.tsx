import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { stage: "Lead", value: 45, fill: "hsl(199, 89%, 48%)" },
  { stage: "Qualified", value: 32, fill: "hsl(217, 91%, 60%)" },
  { stage: "Proposal", value: 24, fill: "hsl(142, 76%, 45%)" },
  { stage: "Negotiation", value: 18, fill: "hsl(166, 72%, 40%)" },
  { stage: "Closed", value: 12, fill: "hsl(38, 92%, 50%)" },
];

export function PipelineChart() {
  return (
    <div className="metric-card card-hover">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Pipeline Overview</h3>
          <p className="text-sm text-muted-foreground">Deals by stage this month</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
            This Month
          </button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary">
            This Quarter
          </button>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
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
            <Bar dataKey="value" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
