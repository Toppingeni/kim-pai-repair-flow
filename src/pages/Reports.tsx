import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertTriangle, FileText } from "lucide-react";

import { ReportFilters } from "@/components/reports/ReportFilters";
import { getReportsAllRepairsRows, getReportsMachineBreakdown } from "@/data/reportsData";

const getStatusBadge = (status: string) => {
  const statusConfig = {
    new: { label: "ใหม่", className: "bg-blue-100 text-blue-800" },
    waiting: { label: "รอยืนยัน", className: "bg-yellow-100 text-yellow-800" },
    progress: { label: "กำลังดำเนินการ", className: "bg-orange-100 text-orange-800" },
    completed: { label: "เสร็จสิ้น", className: "bg-green-100 text-green-800" },
    pending: { label: "รออะไหล่", className: "bg-red-100 text-red-800" },
  } as const;
  const config = (statusConfig as any)[status] || statusConfig.new;
  return config;
};

export function Reports() {
  const machineBreakdown = getReportsMachineBreakdown();
  const allRepairRequests = getReportsAllRepairsRows();

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">รายงานและสถิติ</h1>
          <p className="text-muted-foreground mt-2">วิเคราะห์ข้อมูลการซ่อมบำรุงและประสิทธิภาพ</p>
        </div>

        <Tabs defaultValue="stats" className="w-full">
          <div className="border-b">
            <TabsList className="grid w-full grid-cols-2 h-auto rounded-none bg-transparent">
              <TabsTrigger value="stats" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
                รายงานสถิติ
              </TabsTrigger>
              <TabsTrigger value="requests" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
                รายงานแจ้งซ่อม
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="stats" className="space-y-6">
            <ReportFilters />
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
                                style={{ width: `${Math.min(100, (machine.repairs / (machineBreakdown[0]?.repairs || 1)) * 100)}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{machine.downtimeHours.toFixed(1)} ชม.</TableCell>
                        <TableCell>฿{machine.cost.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <ReportFilters />
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  รายการแจ้งซ่อมทั้งหมด
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[100px]">รหัสใบแจ้งซ่อม</TableHead>
                        <TableHead className="min-w-[120px]">เครื่องจักร</TableHead>
                        <TableHead className="min-w-[200px]">ปัญหาเบื้องต้น</TableHead>
                        <TableHead className="min-w-[100px]">วันที่แจ้ง</TableHead>
                        <TableHead className="min-w-[100px]">สถานะ</TableHead>
                        <TableHead className="min-w-[150px]">ผู้แจ้ง</TableHead>
                        <TableHead className="min-w-[120px]">ผู้รับผิดชอบ</TableHead>
                        <TableHead className="min-w-[140px]">วันที่/เวลาเริ่ม</TableHead>
                        <TableHead className="min-w-[140px]">วันที่/เวลาสิ้นสุด</TableHead>
                        <TableHead className="min-w-[100px]">ระยะเวลา</TableHead>
                        <TableHead className="min-w-[250px]">ลักษณะงานที่ทำ/วิธีการซ่อม</TableHead>
                        <TableHead className="min-w-[200px]">สาเหตุความเสียหาย</TableHead>
                        <TableHead className="min-w-[250px]">การป้องกันและแก้ไขที่ต้นเหตุ</TableHead>
                        <TableHead className="min-w-[100px]">ค่าใช้จ่าย</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allRepairRequests.map((repair) => {
                        const statusBadge = getStatusBadge(repair.status);
                        return (
                          <TableRow key={repair.id}>
                            <TableCell className="font-medium">{repair.id}</TableCell>
                            <TableCell>{repair.machine}</TableCell>
                            <TableCell className="max-w-[200px]">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="truncate cursor-help">{repair.problem}</div>
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-xs">
                                    <p>{repair.problem}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell>{repair.reportDate}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge.className}`}>
                                {statusBadge.label}
                              </span>
                            </TableCell>
                            <TableCell>{repair.reporter}</TableCell>
                            <TableCell>{repair.engineer}</TableCell>
                            <TableCell>{repair.startDate}</TableCell>
                            <TableCell>{repair.endDate}</TableCell>
                            <TableCell>{repair.durationHours !== null ? `${repair.durationHours.toFixed(1)} ชม.` : '-'}</TableCell>
                            <TableCell className="max-w-[250px]">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="truncate cursor-help">{repair.workMethod}</div>
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-xs">
                                    <p>{repair.workMethod}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell className="max-w-[200px]">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="truncate cursor-help">{repair.rootCause}</div>
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-xs">
                                    <p>{repair.rootCause}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell className="max-w-[250px]">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="truncate cursor-help">{repair.prevention}</div>
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-xs">
                                    <p>{repair.prevention}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell className="font-medium">{repair.cost !== '-' ? `฿${repair.cost}` : '-'}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  แสดง {allRepairRequests.length} รายการจากทั้งหมด {allRepairRequests.length} รายการ
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

