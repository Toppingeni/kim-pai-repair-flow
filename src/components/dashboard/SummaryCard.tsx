import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  variant?: "default" | "new" | "progress" | "waiting" | "completed" | "pending";
}

const variantStyles = {
  default: "bg-card",
  new: "bg-gradient-to-br from-status-new/10 to-status-new/5 border-status-new/20",
  progress: "bg-gradient-to-br from-status-progress/10 to-status-progress/5 border-status-progress/20",
  waiting: "bg-gradient-to-br from-status-waiting/10 to-status-waiting/5 border-status-waiting/20",
  completed: "bg-gradient-to-br from-status-completed/10 to-status-completed/5 border-status-completed/20",
  pending: "bg-gradient-to-br from-status-pending/10 to-status-pending/5 border-status-pending/20",
};

const iconStyles = {
  default: "text-muted-foreground",
  new: "text-status-new",
  progress: "text-status-progress",
  waiting: "text-status-waiting",
  completed: "text-status-completed",
  pending: "text-status-pending",
};

export function SummaryCard({ title, value, icon, variant = "default" }: SummaryCardProps) {
  return (
    <Card className={`${variantStyles[variant]} shadow-card hover:shadow-elegant transition-shadow`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-foreground">{title}</CardTitle>
        <div className={`h-8 w-8 ${iconStyles[variant]}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
      </CardContent>
    </Card>
  );
}