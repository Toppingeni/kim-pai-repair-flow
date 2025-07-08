import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRepairActions } from "@/hooks/useRepairActions";

interface RepairItem {
  id: string;
  machine: string;
  problem: string;
  date: string;
  status: "new" | "progress" | "waiting" | "completed" | "pending";
  engineer?: string;
}

interface RepairTableProps {
  repairs: RepairItem[];
  userRole: "production" | "engineering";
  title: string;
}

const statusConfig = {
  new: { label: "งานใหม่", variant: "new" as const },
  progress: { label: "กำลังซ่อม", variant: "progress" as const },
  waiting: { label: "รอคุณยืนยัน", variant: "waiting" as const },
  completed: { label: "ปิดงานแล้ว", variant: "completed" as const },
  pending: { label: "รออะไหล่", variant: "pending" as const },
};

const StatusBadge = ({ status }: { status: keyof typeof statusConfig }) => {
  const config = statusConfig[status];
  const baseClasses = "text-xs font-medium px-2 py-1 rounded-full";
  
  const variantClasses = {
    new: "bg-status-new/10 text-status-new border border-status-new/20",
    progress: "bg-status-progress/10 text-status-progress border border-status-progress/20",
    waiting: "bg-status-waiting/10 text-status-waiting border border-status-waiting/20",
    completed: "bg-status-completed/10 text-status-completed border border-status-completed/20",
    pending: "bg-status-pending/10 text-status-pending border border-status-pending/20",
  };

  return (
    <span className={`${baseClasses} ${variantClasses[config.variant]}`}>
      {config.label}
    </span>
  );
};

export function RepairTable({ repairs, userRole, title }: RepairTableProps) {
  const navigate = useNavigate();
  const { acceptJob, confirmCompletion, loading } = useRepairActions();
  const handleViewDetail = (repairId: string) => {
    navigate(`/repair-detail/${repairId}`);
  };

  const handleAcceptJob = async (repairId: string) => {
    const result = await acceptJob(repairId, "นายสมชาย");
    if (result.success) {
      // In a real app, you would update the repair list here
      window.location.reload(); // Simple reload for demo
    }
  };

  const handleConfirmCompletion = async (repairId: string) => {
    const result = await confirmCompletion(repairId);
    if (result.success) {
      // In a real app, you would update the repair list here
      window.location.reload(); // Simple reload for demo
    }
  };

  const handleStartRepair = (repairId: string) => {
    navigate(`/repair-action/${repairId}`);
  };

  const getActionButtons = (repair: RepairItem) => {
    if (userRole === "production") {
      if (repair.status === "waiting") {
        return (
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleViewDetail(repair.id)}
            >
              ดูรายละเอียด
            </Button>
            <Button 
              variant="success" 
              size="sm" 
              disabled={loading}
              onClick={() => handleConfirmCompletion(repair.id)}
            >
              ยืนยันปิดงาน
            </Button>
          </div>
        );
      }
      return (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleViewDetail(repair.id)}
        >
          ดูรายละเอียด
        </Button>
      );
    } else {
      if (repair.status === "new") {
        return (
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleViewDetail(repair.id)}
            >
              ดูรายละเอียด
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              disabled={loading}
              onClick={() => handleAcceptJob(repair.id)}
            >
              รับงาน
            </Button>
          </div>
        );
      }
      if (repair.status === "progress") {
        return (
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleViewDetail(repair.id)}
            >
              ดูรายละเอียด
            </Button>
            <Button 
              variant="info" 
              size="sm" 
              onClick={() => handleStartRepair(repair.id)}
            >
              บันทึกการซ่อม
            </Button>
          </div>
        );
      }
      return (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleViewDetail(repair.id)}
        >
          ดูรายละเอียด
        </Button>
      );
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>รหัสใบแจ้งซ่อม</TableHead>
              <TableHead>เครื่องจักร</TableHead>
              <TableHead>ปัญหาเบื้องต้น</TableHead>
              <TableHead>วันที่แจ้ง</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead>ผู้รับผิดชอบ</TableHead>
              <TableHead>การดำเนินการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {repairs.map((repair) => (
              <TableRow key={repair.id}>
                <TableCell className="font-medium">{repair.id}</TableCell>
                <TableCell>{repair.machine}</TableCell>
                <TableCell>{repair.problem}</TableCell>
                <TableCell>{repair.date}</TableCell>
                <TableCell>
                  <StatusBadge status={repair.status} />
                </TableCell>
                <TableCell>{repair.engineer || "-"}</TableCell>
                <TableCell>{getActionButtons(repair)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-end">
          <Button variant="outline">ดูทั้งหมด</Button>
        </div>
      </CardContent>
    </Card>
  );
}