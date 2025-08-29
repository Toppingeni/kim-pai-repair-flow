import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle } from "lucide-react";
import { ReportFilters } from "@/components/reports/ReportFilters";
import { getReportsMachineBreakdown } from "@/data/reportsData";

export function ReportsStats() {
  const machineBreakdown = getReportsMachineBreakdown();
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">รายงานสถิติ</h1>
          <p className="text-muted-foreground mt-2">สรุปการแจ้งซ่อมตามเครื่องจักร</p>
        </div>

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
      </div>
    </MainLayout>
  );
}

export default ReportsStats;

