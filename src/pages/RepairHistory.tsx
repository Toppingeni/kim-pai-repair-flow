import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar, Search, Download, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data สำหรับประวัติการซ่อม
const mockRepairHistory = [
  {
    id: "M-003",
    machine: "Boiler #1",
    problem: "แรงดันตก วาล์วเสียหาย",
    reportDate: "02/07/2568",
    startDate: "02/07/2568 14:30",
    endDate: "03/07/2568 10:15",
    engineer: "นายสมชาย",
    solution: "เปลี่ยนวาล์วใหม่ และปรับแต่งระบบความดัน",
    partsUsed: ["วาล์วขนาด 2 นิ้ว", "ปะเก็น"],
    cost: "15,500",
    downtime: "19.75 ชั่วโมง",
    status: "completed",
  },
  {
    id: "M-007",
    machine: "Cooling Tower",
    problem: "ปั๊มน้ำไม่ทำงาน",
    reportDate: "04/07/2568",
    startDate: "04/07/2568 08:00",
    endDate: "04/07/2568 16:30",
    engineer: "นายสมชาย",
    solution: "เปลี่ยนมอเตอร์ปั๊มและทำความสะอาดระบบ",
    partsUsed: ["มอเตอร์ปั๊ม 5 HP", "อิมเพลเลอร์"],
    cost: "28,000",
    downtime: "8.5 ชั่วโมง",
    status: "completed",
  },
  {
    id: "M-010",
    machine: "Extruder B",
    problem: "อุณหภูมิไม่คงที่",
    reportDate: "28/06/2568",
    startDate: "29/06/2568 09:00",
    endDate: "30/06/2568 15:00",
    engineer: "นางสาวอร",
    solution: "เปลี่ยนเซ็นเซอร์อุณหภูมิและปรับตั้งค่าระบบควบคุม",
    partsUsed: ["เซ็นเซอร์อุณหภูมิ", "รีเลย์"],
    cost: "12,300",
    downtime: "30 ชั่วโมง",
    status: "completed",
  },
  {
    id: "M-008",
    machine: "Air Compressor",
    problem: "รั่วซึมน้ำมัน",
    reportDate: "25/06/2568",
    startDate: "26/06/2568 13:00",
    endDate: "26/06/2568 17:30",
    engineer: "นายวิชัย",
    solution: "เปลี่ยนซีลและปะเก็น ตรวจสอบระบบหล่อลื่น",
    partsUsed: ["ซีล", "ปะเก็น", "น้ำมันหล่อลื่น"],
    cost: "8,900",
    downtime: "4.5 ชั่วโมง",
    status: "completed",
  },
];

export function RepairHistory() {
  return (
    <MainLayout userRole="engineering">
      <div className="p-6 space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">ประวัติการซ่อมบำรุง</h1>
          <p className="text-muted-foreground mt-2">ข้อมูลประวัติการซ่อมบำรุงและสถิติการใช้งาน</p>
        </div>

        {/* Filters */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Search className="h-5 w-5" />
              ค้นหาและกรองข้อมูล
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">ค้นหา</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="รหัสใบแจ้งซ่อม หรือเครื่องจักร"
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ช่วงเวลา</label>
                <Select defaultValue="last-month">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-week">7 วันที่แล้ว</SelectItem>
                    <SelectItem value="last-month">30 วันที่แล้ว</SelectItem>
                    <SelectItem value="last-quarter">3 เดือนที่แล้ว</SelectItem>
                    <SelectItem value="last-year">1 ปีที่แล้ว</SelectItem>
                    <SelectItem value="custom">กำหนดเอง</SelectItem>
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
                    <SelectItem value="boiler">Boiler</SelectItem>
                    <SelectItem value="compressor">Compressor</SelectItem>
                    <SelectItem value="cooling">Cooling Tower</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="outline">ล้างตัวกรอง</Button>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  ส่งออก Excel
                </Button>
                <Button variant="default">ค้นหา</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{mockRepairHistory.length}</div>
                <div className="text-sm text-muted-foreground">งานซ่อมทั้งหมด</div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-status-progress">
                  {mockRepairHistory.reduce((sum, repair) => sum + parseFloat(repair.downtime), 0).toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">ชั่วโมงหยุดเครื่อง</div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-status-warning">
                  ฿{mockRepairHistory.reduce((sum, repair) => sum + parseFloat(repair.cost.replace(',', '')), 0).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">ค่าใช้จ่ายรวม</div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-status-success">
                  {((mockRepairHistory.reduce((sum, repair) => sum + parseFloat(repair.downtime), 0) / mockRepairHistory.length) || 0).toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">เฉลี่ยชั่วโมง/งาน</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* History Table */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              ประวัติการซ่อมบำรุง
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>รหัสใบแจ้งซ่อม</TableHead>
                  <TableHead>เครื่องจักร</TableHead>
                  <TableHead>ปัญหา</TableHead>
                  <TableHead>วันที่ซ่อม</TableHead>
                  <TableHead>ผู้รับผิดชอบ</TableHead>
                  <TableHead>เวลาหยุดเครื่อง</TableHead>
                  <TableHead>ค่าใช้จ่าย</TableHead>
                  <TableHead>การดำเนินการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRepairHistory.map((repair) => (
                  <TableRow key={repair.id}>
                    <TableCell className="font-medium">{repair.id}</TableCell>
                    <TableCell>{repair.machine}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{repair.problem}</TableCell>
                    <TableCell>{repair.startDate.split(' ')[0]} - {repair.endDate.split(' ')[0]}</TableCell>
                    <TableCell>{repair.engineer}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-status-warning">
                        {repair.downtime}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">฿{repair.cost}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        ดูรายละเอียด
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                แสดง 1-{mockRepairHistory.length} จาก {mockRepairHistory.length} รายการ
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>ก่อนหน้า</Button>
                <Button variant="outline" size="sm">ถัดไป</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}