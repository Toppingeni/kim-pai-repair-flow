import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { RepairTable } from "@/components/dashboard/RepairTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, RefreshCw } from "lucide-react";
import { 
  getAllRepairRequests, 
  getAllRepairProcesses, 
  RepairRequest, 
  RepairProcess 
} from "@/data/masterData";
import { getSimpleRepairs } from "@/data/allRepairsMockData";

// ใช้ข้อมูล Mock จากไฟล์รวม
const mockAllRepairs = getSimpleRepairs();

export function AllRepairs() {
  // โหลด tab ที่เลือกไว้จาก localStorage หรือใช้ "requests" เป็นค่าเริ่มต้น
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('allRepairs-activeTab') || 'requests';
  });
  
  // บันทึก tab ที่เลือกลง localStorage เมื่อมีการเปลี่ยนแปลง
  useEffect(() => {
    localStorage.setItem('allRepairs-activeTab', activeTab);
  }, [activeTab]);
  const repairRequests = getAllRepairRequests();
  const repairProcesses = getAllRepairProcesses();
  
  // แปลงข้อมูลจาก RepairRequest และ RepairProcess ให้เข้ากับ RepairTable
  const convertRequestsToTableData = (requests: RepairRequest[]) => {
    return requests.map(request => ({
      id: request.id,
      documentNumber: request.documentNumber,
      machine: request.machine,
      location: request.location,
      problem: request.problem,
      reporter: request.reporter,
      reportDate: request.reportDate,
      date: request.reportDate, // เพิ่ม field date ที่ RepairItem ต้องการ
      priority: request.priorityLabel,
      status: (request.status === "pending" ? "new" : "cancelled") as "new" | "progress" | "waiting" | "completed" | "pending" | "cancelled",
      engineers: "", // ใบร้องของงานซ่อมยังไม่มีช่างที่รับผิดชอบ
      estimatedCompletion: "",
      actualCompletion: ""
    }));
  };
  
  const convertProcessesToTableData = (processes: RepairProcess[]) => {
    return processes.map(process => {
      const relatedRequest = repairRequests.find(r => r.id === process.requestId);
      return {
        id: process.id,
        documentNumber: process.documentNumber,
        machine: relatedRequest?.machine || "",
        location: relatedRequest?.location || "",
        problem: relatedRequest?.problem || "",
        reporter: relatedRequest?.reporter || "",
        reportDate: relatedRequest?.reportDate || "",
        date: relatedRequest?.reportDate || "", // เพิ่ม field date ที่ RepairItem ต้องการ
        priority: relatedRequest?.priorityLabel || "",
        status: (process.status === "assigned" ? "progress" :
                 process.status === "in_progress" ? "progress" :
                 process.status === "waiting_parts" ? "pending" :
                 process.status === "waiting_approval" ? "waiting" :
                 process.status === "completed" ? "completed" : "completed") as "new" | "progress" | "waiting" | "completed" | "pending",
        engineers: process.assignedTechnicians.join(", "),
        estimatedCompletion: process.estimatedEndDate || "",
        actualCompletion: process.actualEndDate || ""
      };
    });
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">รายการงานซ่อมทั้งหมด</h1>
          <p className="text-muted-foreground mt-2">จัดการและติดตามใบร้องของงานซ่อมและใบแจ้งซ่อม</p>
        </div>

        {/* Filters and Search */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              ตัวกรองและการค้นหา
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">ค้นหา</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="ค้นหารหัสใบแจ้งซ่อม หรือเครื่องจักร"
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">สถานะ</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    <SelectItem value="new">งานใหม่</SelectItem>
                    <SelectItem value="progress">กำลังซ่อม</SelectItem>
                    <SelectItem value="pending">รออะไหล่</SelectItem>
                    <SelectItem value="waiting">รอยืนยัน</SelectItem>
                    <SelectItem value="completed">ปิดงานแล้ว</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ผู้รับผิดชอบ</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    <SelectItem value="นายสมชาย">นายสมชาย</SelectItem>
                    <SelectItem value="นางสาวอร">นางสาวอร</SelectItem>
                    <SelectItem value="นายวิชัย">นายวิชัย</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">เครื่องจักร</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    <SelectItem value="extruder">Extruder</SelectItem>
                    <SelectItem value="packing">Packing Machine</SelectItem>
                    <SelectItem value="boiler">Boiler</SelectItem>
                    <SelectItem value="compressor">Compressor</SelectItem>
                    <SelectItem value="conveyor">Conveyor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <Button variant="outline">ล้างตัวกรอง</Button>
              <Button variant="default">ค้นหา</Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats - แสดงสถิติรวมของทั้งสองประเภท */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-br from-status-new/10 to-status-new/5 border-status-new/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-status-new">
                {repairRequests.filter(r => r.status === "pending").length + repairProcesses.filter(r => r.status === "assigned").length}
              </div>
              <div className="text-sm text-muted-foreground">งานใหม่</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-status-progress/10 to-status-progress/5 border-status-progress/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-status-progress">
                {repairProcesses.filter(r => r.status === "in_progress").length}
              </div>
              <div className="text-sm text-muted-foreground">กำลังซ่อม</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-status-pending/10 to-status-pending/5 border-status-pending/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-status-pending">
                {repairProcesses.filter(r => r.status === "waiting_parts").length}
              </div>
              <div className="text-sm text-muted-foreground">รออะไหล่</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-status-waiting/10 to-status-waiting/5 border-status-waiting/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-status-waiting">
                {repairProcesses.filter(r => r.status === "waiting_approval").length}
              </div>
              <div className="text-sm text-muted-foreground">รอยืนยัน</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {repairRequests.filter(r => r.status === "rejected").length}
              </div>
              <div className="text-sm text-muted-foreground">ยกเลิก</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-status-completed/10 to-status-completed/5 border-status-completed/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-status-completed">
                {repairProcesses.filter(r => r.status === "completed").length}
              </div>
              <div className="text-sm text-muted-foreground">ปิดงานแล้ว</div>
            </CardContent>
          </Card>
        </div>

        {/* Data Table with Tabs */}
        <Card className="shadow-card">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b">
                <TabsList className="grid w-full grid-cols-2 h-auto rounded-none bg-transparent">
                  <TabsTrigger 
                    value="requests" 
                    className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    ใบร้องของงานซ่อม
                    <Badge variant="secondary">{repairRequests.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="processes" 
                    className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    ใบแจ้งซ่อม
                    <Badge variant="secondary">{repairProcesses.length}</Badge>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="requests" className="m-0">
                <RepairTable
                  repairs={convertRequestsToTableData(repairRequests)}
                  userRole="engineering"
                  title="รายการใบร้องของงานซ่อม"
                />
              </TabsContent>

              <TabsContent value="processes" className="m-0">
                <RepairTable
                  repairs={convertProcessesToTableData(repairProcesses)}
                  userRole="engineering"
                  title="รายการใบแจ้งซ่อม"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}