import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  DollarSign, 
  BarChart3, 
  PieChart, 
  Download,
  Calendar,
  AlertTriangle
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for reports
const monthlyStats = {
  totalRepairs: 15,
  completedRepairs: 12,
  avgRepairTime: 14.2,
  totalCost: 186500,
  mostProblematicMachine: "Extruder A",
  topEngineer: "นายสมชาย",
};

const machineBreakdown = [
  { machine: "Extruder A", repairs: 4, downtime: "28.5 ชม.", cost: "65,000" },
  { machine: "Packing M/C", repairs: 3, downtime: "15.2 ชม.", cost: "32,500" },
  { machine: "Boiler #1", repairs: 2, downtime: "19.8 ชม.", cost: "43,500" },
  { machine: "Compressor", repairs: 3, downtime: "12.3 ชม.", cost: "28,000" },
  { machine: "Conveyor", repairs: 2, downtime: "8.5 ชม.", cost: "12,500" },
  { machine: "Cooling Tower", repairs: 1, downtime: "4.5 ชม.", cost: "5,000" },
];

const engineerPerformance = [
  { name: "นายสมชาย", repairs: 6, avgTime: "12.5 ชม.", efficiency: "92%" },
  { name: "นางสาวอร", repairs: 4, avgTime: "15.8 ชม.", efficiency: "88%" },
  { name: "นายวิชัย", repairs: 2, avgTime: "18.3 ชม.", efficiency: "85%" },
];

const costAnalysis = [
  { category: "อะไหล่", amount: 125000, percentage: "67%" },
  { category: "ค่าแรง", amount: 45000, percentage: "24%" },
  { category: "วัสดุสิ้นเปลือง", amount: 16500, percentage: "9%" },
];

export function Reports() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">รายงานและสถิติ</h1>
          <p className="text-muted-foreground mt-2">วิเคราะห์ข้อมูลการซ่อมบำรุงและประสิทธิภาพ</p>
        </div>

        {/* Report Controls */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              ตัวเลือกรายงาน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">ประเภทรายงาน</label>
                <Select defaultValue="monthly">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">รายวัน</SelectItem>
                    <SelectItem value="weekly">รายสัปดาห์</SelectItem>
                    <SelectItem value="monthly">รายเดือน</SelectItem>
                    <SelectItem value="quarterly">รายไตรมาส</SelectItem>
                    <SelectItem value="yearly">รายปี</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">เดือน/ปี</label>
                <Select defaultValue="07-2568">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="07-2568">กรกฎาคม 2568</SelectItem>
                    <SelectItem value="06-2568">มิถุนายน 2568</SelectItem>
                    <SelectItem value="05-2568">พฤษภาคม 2568</SelectItem>
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
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">การดำเนินการ</label>
                <div className="flex space-x-2">
                  <Button variant="default" className="flex-1">สร้างรายงาน</Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics - ซ่อนไว้สำหรับ Phase 2 */}
        {/*
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">{monthlyStats.totalRepairs}</div>
                  <div className="text-sm text-muted-foreground">งานซ่อมทั้งหมด</div>
                </div>
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="h-4 w-4 text-success mr-1" />
                <span className="text-success">+15%</span>
                <span className="text-muted-foreground ml-1">จากเดือนก่อน</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">{monthlyStats.avgRepairTime}</div>
                  <div className="text-sm text-muted-foreground">เฉลี่ยชั่วโมง/งาน</div>
                </div>
                <Clock className="h-8 w-8 text-status-progress" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingDown className="h-4 w-4 text-success mr-1" />
                <span className="text-success">-8%</span>
                <span className="text-muted-foreground ml-1">ดีขึ้น</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">฿{monthlyStats.totalCost.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">ค่าใช้จ่ายรวม</div>
                </div>
                <DollarSign className="h-8 w-8 text-status-warning" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="h-4 w-4 text-destructive mr-1" />
                <span className="text-destructive">+12%</span>
                <span className="text-muted-foreground ml-1">จากเดือนก่อน</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">{((monthlyStats.completedRepairs / monthlyStats.totalRepairs) * 100).toFixed(0)}%</div>
                  <div className="text-sm text-muted-foreground">อัตราซ่อมสำเร็จ</div>
                </div>
                <PieChart className="h-8 w-8 text-success" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="h-4 w-4 text-success mr-1" />
                <span className="text-success">+5%</span>
                <span className="text-muted-foreground ml-1">จากเดือนก่อน</span>
              </div>
            </CardContent>
          </Card>
        </div>
        */}

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6">
          {/* Machine Breakdown */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                การแจ้งซ่อมแยกตามเครื่องจักร
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>เครื่องจักร</TableHead>
                    <TableHead>จำนวนครั้ง</TableHead>
                    <TableHead>เวลาหยุด</TableHead>
                    <TableHead>ค่าใช้จ่าย</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {machineBreakdown.map((machine) => (
                    <TableRow key={machine.machine}>
                      <TableCell className="font-medium">{machine.machine}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{machine.repairs}</span>
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${(machine.repairs / 4) * 100}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{machine.downtime}</TableCell>
                      <TableCell>฿{machine.cost}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Engineer Performance - ซ่อนไว้สำหรับ Phase 2 */}
          {/*
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">ประสิทธิภาพทีมวิศวกร</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ชื่อ</TableHead>
                    <TableHead>งานที่รับ</TableHead>
                    <TableHead>เฉลี่ยเวลา</TableHead>
                    <TableHead>ประสิทธิภาพ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {engineerPerformance.map((engineer) => (
                    <TableRow key={engineer.name}>
                      <TableCell className="font-medium">{engineer.name}</TableCell>
                      <TableCell>{engineer.repairs}</TableCell>
                      <TableCell>{engineer.avgTime}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-success font-medium">{engineer.efficiency}</span>
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div 
                              className="bg-success h-2 rounded-full" 
                              style={{ width: engineer.efficiency }}
                            />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          */}
        </div>

        {/* Cost Analysis - ซ่อนไว้สำหรับ Phase 2 */}
        {/*
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              การวิเคราะห์ค่าใช้จ่าย
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {costAnalysis.map((item) => (
                <div key={item.category} className="text-center p-4 bg-muted/10 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">฿{item.amount.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">{item.category}</div>
                  <div className="text-lg font-medium text-primary mt-1">{item.percentage}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-card border rounded-lg">
              <h4 className="font-medium mb-2">ข้อเสนอแนะ:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• ค่าใช้จ่ายอะไหล่สูง ควรพิจารณาซื้อล่วงหน้าเพื่อลดราคา</li>
                <li>• Extruder A มีปัญหาบ่อย ควรจัดบำรุงรักษาเชิงป้องกัน</li>
                <li>• เวลาซ่อมเฉลี่ยดีขึ้น แสดงว่าทีมมีประสิทธิภาพเพิ่มขึ้น</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        */}
      </div>
    </MainLayout>
  );
}