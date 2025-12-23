import { ChevronLeft, ChevronRight, Plus, Clock, Video, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

const days = [
  { name: "Mon", date: "18", isToday: false },
  { name: "Tue", date: "19", isToday: false },
  { name: "Wed", date: "20", isToday: true },
  { name: "Thu", date: "21", isToday: false },
  { name: "Fri", date: "22", isToday: false },
];

const events = [
  { id: 1, title: "Demo - TechCorp", type: "video", time: "10:00 AM", duration: 60, day: 0, contact: "Sarah Johnson" },
  { id: 2, title: "Follow-up Call", type: "call", time: "2:00 PM", duration: 30, day: 0, contact: "Mike Wilson" },
  { id: 3, title: "Product Demo", type: "video", time: "11:00 AM", duration: 90, day: 2, contact: "Global Systems" },
  { id: 4, title: "Discovery Call", type: "call", time: "9:00 AM", duration: 45, day: 2, contact: "DataFlow Ltd" },
  { id: 5, title: "Contract Review", type: "meeting", time: "3:00 PM", duration: 60, day: 2, contact: "Enterprise AI" },
  { id: 6, title: "Quarterly Review", type: "meeting", time: "1:00 PM", duration: 120, day: 3, contact: "Internal" },
  { id: 7, title: "Closing Call", type: "call", time: "4:00 PM", duration: 30, day: 4, contact: "MegaCorp" },
];

const eventTypes = {
  video: { icon: Video, color: "bg-primary/15 border-primary/30 text-primary" },
  call: { icon: Phone, color: "bg-success/15 border-success/30 text-success" },
  meeting: { icon: User, color: "bg-warning/15 border-warning/30 text-warning" },
};

export function SchedulerView() {
  return (
    <div className="flex h-full flex-col p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Schedule</h2>
          <p className="text-muted-foreground">Manage your meetings and calls</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="min-w-[140px] text-center font-medium text-foreground">December 2024</span>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Button>
        </div>
      </div>

      {/* Upcoming Today */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">UPCOMING TODAY</h3>
        <div className="flex gap-4">
          {events.filter(e => e.day === 2).slice(0, 3).map((event) => {
            const { icon: Icon, color } = eventTypes[event.type as keyof typeof eventTypes];
            return (
              <div key={event.id} className={cn("flex-1 rounded-xl border p-4", color)}>
                <div className="flex items-start justify-between">
                  <Icon className="h-5 w-5" />
                  <span className="text-xs opacity-70">{event.time}</span>
                </div>
                <h4 className="mt-3 font-semibold">{event.title}</h4>
                <p className="mt-1 text-sm opacity-70">{event.contact}</p>
                <div className="mt-3 flex items-center gap-1 text-xs opacity-70">
                  <Clock className="h-3 w-3" />
                  {event.duration} min
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="metric-card flex-1">
        {/* Day Headers */}
        <div className="mb-4 grid grid-cols-[80px_repeat(5,1fr)] gap-2">
          <div />
          {days.map((day) => (
            <div
              key={day.date}
              className={cn(
                "rounded-lg py-3 text-center",
                day.isToday ? "bg-primary/10" : "bg-secondary/50"
              )}
            >
              <p className="text-xs text-muted-foreground">{day.name}</p>
              <p className={cn("text-xl font-bold", day.isToday ? "text-primary" : "text-foreground")}>
                {day.date}
              </p>
            </div>
          ))}
        </div>

        {/* Time Grid */}
        <div className="relative">
          {timeSlots.map((time, timeIndex) => (
            <div key={time} className="grid grid-cols-[80px_repeat(5,1fr)] gap-2">
              <div className="py-4 text-right text-xs text-muted-foreground pr-3">{time}</div>
              {days.map((day, dayIndex) => {
                const event = events.find(
                  e => e.day === dayIndex && e.time === time
                );
                return (
                  <div
                    key={`${day.date}-${time}`}
                    className="min-h-[60px] border-t border-border/50 py-1"
                  >
                    {event && (
                      <div
                        className={cn(
                          "rounded-lg border p-2 text-xs",
                          eventTypes[event.type as keyof typeof eventTypes].color
                        )}
                      >
                        <p className="font-medium truncate">{event.title}</p>
                        <p className="opacity-70 truncate">{event.contact}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
