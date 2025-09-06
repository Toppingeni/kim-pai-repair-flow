import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Clock, Edit, Eye, Wrench } from "lucide-react";
import { PMExecutionForm } from "./PMExecutionForm";

interface PMSchedule {
  id: string;
  machine: string;
  pmType: string;
  frequency: string;
  nextDue: string;
  assignedTo: string;
  status: "scheduled" | "overdue" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  lastPerformed: string;
}

const mockPMSchedules: PMSchedule[] = [
  {
    id: "PM-001",
    machine: "Extruder A",
    pmType: "การหล่อลื่น",
    frequency: "รายสัปดาห์",
    nextDue: "2025-07-10",
    assignedTo: "นายสมชาย",
    status: "scheduled",
    priority: "medium",
    lastPerformed: "2025-07-03"
  },
  {
    id: "PM-002", 
    machine: "Conveyor B",
    pmType: "ตรวจสอบเบลท์",
    frequency: "รายเดือน",
    nextDue: "2025-07-05",
    assignedTo: "นางสาวอร",
    status: "overdue",
    priority: "high",
    lastPerformed: "2025-06-05"
  },
  {
    id: "PM-003",
    machine: "Pump C",
    pmType: "เปลี่ยนน้ำมัน",
    frequency: "ทุก 2 เดือน",
    nextDue: "2025-07-15",
    assignedTo: "นายวิชัย",
    status: "in-progress",
    priority: "medium",
    lastPerformed: "2025-05-15"
  }
];

export function PMScheduleTable() {
  const [selectedPM, setSelectedPM] = useState<PMSchedule | null>(null);
  const [isExecuteOpen, setIsExecuteOpen] = useState(false);

  const getStatusBadge = (status: PMSchedule["status"]) => {
    const variants = {
      scheduled: "default",
      overdue: "destructive", 
      "in-progress": "secondary",
      completed: "default"
    } as const;

    const labels = {
      scheduled: "กำหนดการ",
      overdue: "เกินกำหนด",
      "in-progress": "กำลังดำเนินการ", 
      completed: "เสร็จสิ้น"
    };

    return (
      <Badge variant={variants[status]} className={
        status === "completed" ? "bg-status-completed text-status-completed-foreground" :
        status === "in-progress" ? "bg-status-pending text-status-pending-foreground" : ""
      }>
        {labels[status]}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: PMSchedule["priority"]) => {
    const variants = {
      low: "outline",
      medium: "secondary",
      high: "destructive"
    } as const;

    const labels = {
      low: "ต่ำ",
      medium: "ปานกลาง", 
      high: "สูง"
    };

    return <Badge variant={variants[priority]}>{labels[priority]}</Badge>;
  };

  const handleExecutePM = (pm: PMSchedule) => {
    setSelectedPM(pm);
    setIsExecuteOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">ตารางเวลา PM</h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            ดูปฏิทิน
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>รหัส PM</TableHead>
              <TableHead>เครื่องจักร</TableHead>
              <TableHead>ประเภท PM</TableHead>
              <TableHead>ความถี่</TableHead>
              <TableHead>กำหนดครั้งถัดไป</TableHead>
              <TableHead>ผู้รับผิดชอบ</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead>ความสำคัญ</TableHead>
              <TableHead>การดำเนินการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPMSchedules.map((pm) => (
              <TableRow key={pm.id}>
                <TableCell className="font-medium">{pm.id}</TableCell>
                <TableCell>{pm.machine}</TableCell>
                <TableCell>{pm.pmType}</TableCell>
                <TableCell>{pm.frequency}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{pm.nextDue}</span>
                  </div>
                </TableCell>
                <TableCell>{pm.assignedTo}</TableCell>
                <TableCell>{getStatusBadge(pm.status)}</TableCell>
                <TableCell>{getPriorityBadge(pm.priority)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleExecutePM(pm)}
                      disabled={pm.status === "completed"}
                    >
                      <Wrench className="h-4 w-4 mr-1" />
                      ดำเนินการ
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isExecuteOpen} onOpenChange={setIsExecuteOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              ดำเนินการ PM: {selectedPM?.id} - {selectedPM?.machine}
            </DialogTitle>
          </DialogHeader>
          {selectedPM && (
            <PMExecutionForm 
              pmSchedule={selectedPM}
              onClose={() => setIsExecuteOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}