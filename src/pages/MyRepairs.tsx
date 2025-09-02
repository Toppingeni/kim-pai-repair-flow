import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { RepairTable } from "@/components/dashboard/RepairTable";
import { mockUserRepairs } from "@/data/mockRepairData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";

// ใช้ข้อมูล mockUserRepairs จาก mockRepairData

export function MyRepairs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredRepairs = mockUserRepairs.filter(repair => {
    const matchesSearch = repair.machine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repair.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repair.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || repair.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusCounts = () => ({
    all: mockUserRepairs.length,
    progress: mockUserRepairs.filter(r => r.status === "progress").length,
    waiting: mockUserRepairs.filter(r => r.status === "waiting").length,
    completed: mockUserRepairs.filter(r => r.status === "completed").length,
  });

  const statusCounts = getStatusCounts();

  return (
    <MainLayout>
      <div className="flex-1 p-6 space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">รายการใบแจ้งซ่อมของฉัน</h1>
          <p className="text-muted-foreground">ติดตามสถานะการซ่อมที่คุณแจ้ง</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{statusCounts.all}</div>
                <div className="text-sm text-muted-foreground">ทั้งหมด</div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card bg-gradient-to-br from-status-progress/10 to-status-progress/5 border-status-progress/20">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-status-progress">{statusCounts.progress}</div>
                <div className="text-sm text-muted-foreground">กำลังดำเนินการ</div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card bg-gradient-to-br from-status-waiting/10 to-status-waiting/5 border-status-waiting/20">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-status-waiting">{statusCounts.waiting}</div>
                <div className="text-sm text-muted-foreground">รอยืนยัน</div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card bg-gradient-to-br from-status-completed/10 to-status-completed/5 border-status-completed/20">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-status-completed">{statusCounts.completed}</div>
                <div className="text-sm text-muted-foreground">ปิดงานแล้ว</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Filter className="h-5 w-5" />
              ตัวกรองและค้นหา
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">ค้นหา</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="ค้นหารหัส, เครื่องจักร, หรือปัญหา"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status-filter">สถานะ</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกสถานะ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทั้งหมด ({statusCounts.all})</SelectItem>
                    <SelectItem value="progress">กำลังดำเนินการ ({statusCounts.progress})</SelectItem>
                    <SelectItem value="waiting">รอยืนยัน ({statusCounts.waiting})</SelectItem>
                    <SelectItem value="completed">ปิดงานแล้ว ({statusCounts.completed})</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                >
                  ล้างตัวกรอง
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Repair Table */}
        <RepairTable
          repairs={filteredRepairs}
          userRole="production"
          showContactColumn
          title={`รายการใบแจ้งซ่อม (${filteredRepairs.length} รายการ)`}
        />
      </div>
    </MainLayout>
  );
}
