import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock, PlayCircle, CheckCircle, AlertTriangle } from "lucide-react";
import { PMExecutionForm } from "./PMExecutionForm";

interface PMTask {
  id: string;
  machine: string;
  pmType: string;
  scheduledTime: string;
  estimatedDuration: string;
  assignedTo: string;
  status: "pending" | "in-progress" | "completed" | "delayed";
  priority: "low" | "medium" | "high";
  checklist: string[];
}

const mockTodayTasks: PMTask[] = [
  {
    id: "PM-001",
    machine: "Extruder A", 
    pmType: "การหล่อลื่น",
    scheduledTime: "09:00",
    estimatedDuration: "1 ชม.",
    assignedTo: "นายสมชาย",
    status: "completed",
    priority: "medium",
    checklist: ["ตรวจสอบระดับน้ำมัน", "เติมน้ำมันหล่อลื่น", "ตรวจสอบการรั่วไหล"]
  },
  {
    id: "PM-004",
    machine: "Conveyor B",
    pmType: "ตรวจสอบเบลท์", 
    scheduledTime: "11:00",
    estimatedDuration: "2 ชม.",
    assignedTo: "นางสาวอร",
    status: "in-progress",
    priority: "high",
    checklist: ["ตรวจสอบความตึงเบลท์", "ตรวจสอบร่องรอยสึกหรอ", "ทำความสะอาดเบลท์"]
  },
  {
    id: "PM-005",
    machine: "Motor D",
    pmType: "ตรวจสอบมอเตอร์",
    scheduledTime: "14:00", 
    estimatedDuration: "3 ชม.",
    assignedTo: "นายวิชัย",
    status: "pending",
    priority: "medium",
    checklist: ["วัดกระแสไฟฟ้า", "ตรวจสอบเสียง", "ตรวจสอบอุณหภูมิ", "ทำความสะอาด"]
  },
  {
    id: "PM-006", 
    machine: "Pump E",
    pmType: "เปลี่ยนฟิลเตอร์",
    scheduledTime: "16:00",
    estimatedDuration: "1.5 ชม.",
    assignedTo: "นายสมชาย", 
    status: "delayed",
    priority: "high",
    checklist: ["ถอดฟิลเตอร์เก่า", "ติดตั้งฟิลเตอร์ใหม่", "ทดสอบการทำงาน"]
  }
];

export function PMTaskTable() {
  const [selectedTask, setSelectedTask] = useState<PMTask | null>(null);
  const [isExecuteOpen, setIsExecuteOpen] = useState(false);

  const getStatusBadge = (status: PMTask["status"]) => {
    const variants = {
      pending: "outline",
      "in-progress": "secondary", 
      completed: "default",
      delayed: "destructive"
    } as const;

    const labels = {
      pending: "รอดำเนินการ",
      "in-progress": "กำลังดำเนินการ",
      completed: "เสร็จสิ้น", 
      delayed: "ล่าช้า"
    };

    const icons = {
      pending: <Clock className="h-3 w-3 mr-1" />,
      "in-progress": <PlayCircle className="h-3 w-3 mr-1" />,
      completed: <CheckCircle className="h-3 w-3 mr-1" />,
      delayed: <AlertTriangle className="h-3 w-3 mr-1" />
    };

    return (
      <Badge variant={variants[status]} className={
        status === "completed" ? "bg-status-completed text-status-completed-foreground" :
        status === "in-progress" ? "bg-status-pending text-status-pending-foreground" : ""
      }>
        {icons[status]}
        {labels[status]}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: PMTask["priority"]) => {
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

  const handleStartTask = (task: PMTask) => {
    setSelectedTask(task);
    setIsExecuteOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">งาน PM วันนี้ ({new Date().toLocaleDateString('th-TH')})</h3>
        <div className="flex space-x-2">
          <Badge variant="outline" className="bg-status-completed/10">
            เสร็จ: {mockTodayTasks.filter(t => t.status === "completed").length}
          </Badge>
          <Badge variant="outline" className="bg-status-pending/10">
            กำลังทำ: {mockTodayTasks.filter(t => t.status === "in-progress").length}
          </Badge>
          <Badge variant="outline" className="bg-destructive/10">
            ล่าช้า: {mockTodayTasks.filter(t => t.status === "delayed").length}
          </Badge>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>รหัส PM</TableHead>
              <TableHead>เครื่องจักร</TableHead>
              <TableHead>ประเภท PM</TableHead>
              <TableHead>เวลา</TableHead>
              <TableHead>ระยะเวลา</TableHead>
              <TableHead>ผู้รับผิดชอบ</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead>ความสำคัญ</TableHead>
              <TableHead>การดำเนินการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTodayTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.id}</TableCell>
                <TableCell>{task.machine}</TableCell>
                <TableCell>{task.pmType}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{task.scheduledTime}</span>
                  </div>
                </TableCell>
                <TableCell>{task.estimatedDuration}</TableCell>
                <TableCell>{task.assignedTo}</TableCell>
                <TableCell>{getStatusBadge(task.status)}</TableCell>
                <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleStartTask(task)}
                    disabled={task.status === "completed"}
                  >
                    {task.status === "pending" ? "เริ่มงาน" : 
                     task.status === "in-progress" ? "ดำเนินการต่อ" : "ดูรายละเอียด"}
                  </Button>
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
              ดำเนินการ PM: {selectedTask?.id} - {selectedTask?.machine}
            </DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <PMExecutionForm 
              pmSchedule={selectedTask as any}
              onClose={() => setIsExecuteOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}