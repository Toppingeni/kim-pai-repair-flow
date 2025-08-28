import React, { useState } from "react";
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

// Mock data - ใช้รูปแบบรหัสเอกสารตาม NewRepairForm (R{YY}{MM}0001)
const mockAllRepairs = [
  {
    id: "R24070001",
    machine: "Extruder A",
    problem: "เสียงดังผิดปกติ จากมอเตอร์หลัก",
    date: "07/07/2568",
    status: "progress" as const,
    engineer: "นายสมชาย",
  },
  {
    id: "R24070002",
    machine: "Packing M/C",
    problem: "แพ็คไม่แน่น สายพานหลวม",
    date: "05/07/2568",
    status: "waiting" as const,
    engineer: "นางสาวอร",
  },
  {
    id: "R24070003",
    machine: "Boiler #1",
    problem: "แรงดันตก วาล์วเสียหาย",
    date: "02/07/2568",
    status: "completed" as const,
    engineer: "นายสมชาย",
  },
  {
    id: "R24070004",
    machine: "Compressor",
    problem: "อุณหภูมิสูงผิดปกติ",
    date: "08/07/2568",
    status: "new" as const,
  },
  {
    id: "R24070005",
    machine: "Conveyor",
    problem: "มอเตอร์ไม่หมุน ขาดการหล่อลื่น",
    date: "08/07/2568",
    status: "pending" as const,
    engineer: "นางสาวอร",
  },
  {
    id: "R24070006",
    machine: "Mixer A",
    problem: "ใบมีดสึกหรอ",
    date: "06/07/2568",
    status: "progress" as const,
    engineer: "นายวิชัย",
  },
  {
    id: "R24070007",
    machine: "Cooling Tower",
    problem: "ปั๊มน้ำไม่ทำงาน",
    date: "04/07/2568",
    status: "completed" as const,
    engineer: "นายสมชาย",
  },
];

export function AllRepairs() {
  const [activeTab, setActiveTab] = useState("requests");
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
      status: (request.status === "pending" ? "pending" : 
              request.status === "accepted" ? "new" : "completed") as "new" | "progress" | "waiting" | "completed" | "pending",
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
        status: (process.status === "assigned" ? "new" :
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="requests" className="flex items-center gap-2">
              ใบร้องของงานซ่อม
              <Badge variant="secondary">{repairRequests.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="processes" className="flex items-center gap-2">
              ใบแจ้งซ่อม
              <Badge variant="secondary">{repairProcesses.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-6">

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

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-br from-status-new/10 to-status-new/5 border-status-new/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-status-new">
                {mockAllRepairs.filter(r => r.status === "new").length}
              </div>
              <div className="text-sm text-muted-foreground">งานใหม่</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-status-progress/10 to-status-progress/5 border-status-progress/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-status-progress">
                {mockAllRepairs.filter(r => r.status === "progress").length}
              </div>
              <div className="text-sm text-muted-foreground">กำลังซ่อม</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-status-pending/10 to-status-pending/5 border-status-pending/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-status-pending">
                {mockAllRepairs.filter(r => r.status === "pending").length}
              </div>
              <div className="text-sm text-muted-foreground">รออะไหล่</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-status-waiting/10 to-status-waiting/5 border-status-waiting/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-status-waiting">
                {mockAllRepairs.filter(r => r.status === "waiting").length}
              </div>
              <div className="text-sm text-muted-foreground">รอยืนยัน</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-status-completed/10 to-status-completed/5 border-status-completed/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-status-completed">
                {mockAllRepairs.filter(r => r.status === "completed").length}
              </div>
              <div className="text-sm text-muted-foreground">ปิดงานแล้ว</div>
            </CardContent>
          </Card>
        </div>

            {/* Repair Requests Table */}
            <RepairTable
              repairs={convertRequestsToTableData(repairRequests)}
              userRole="engineering"
              title="รายการใบร้องของงานซ่อม"
            />
          </TabsContent>

          <TabsContent value="processes" className="space-y-6">
            {/* Filters and Search for Processes */}
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

            {/* Summary Stats for Processes */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {repairProcesses.filter(r => r.status === "assigned").length}
                  </div>
                  <div className="text-sm text-muted-foreground">มอบหมายงาน</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {repairProcesses.filter(r => r.status === "in_progress").length}
                  </div>
                  <div className="text-sm text-muted-foreground">กำลังซ่อม</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {repairProcesses.filter(r => r.status === "waiting_parts").length}
                  </div>
                  <div className="text-sm text-muted-foreground">รออะไหล่</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {repairProcesses.filter(r => r.status === "waiting_approval").length}
                  </div>
                  <div className="text-sm text-muted-foreground">รอยืนยัน</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {repairProcesses.filter(r => r.status === "completed").length}
                  </div>
                  <div className="text-sm text-muted-foreground">ปิดงานแล้ว</div>
                </CardContent>
              </Card>
            </div>

            {/* Repair Processes Table */}
            <RepairTable
              repairs={convertProcessesToTableData(repairProcesses)}
              userRole="engineering"
              title="รายการใบแจ้งซ่อม"
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}