import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { FileText } from "lucide-react";
import { ReportFilters } from "@/components/reports/ReportFilters";
import { getReportsAllRepairsRows } from "@/data/reportsData";

const getStatusBadge = (status: string) => {
    const statusConfig = {
        new: { label: "ใหม่", className: "bg-blue-100 text-blue-800" },
        waiting: {
            label: "รอยืนยัน",
            className: "bg-yellow-100 text-yellow-800",
        },
        progress: {
            label: "กำลังดำเนินการ",
            className: "bg-orange-100 text-orange-800",
        },
        completed: {
            label: "เสร็จสิ้น",
            className: "bg-green-100 text-green-800",
        },
        pending: { label: "รออะไหล่", className: "bg-red-100 text-red-800" },
    } as const;
    const config = (statusConfig as any)[status] || statusConfig.new;
    return config;
};

export function ReportsRequests() {
    const allRepairRequests = getReportsAllRepairsRows();

    return (
        <MainLayout>
            <div className="p-6 space-y-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-foreground">
                        รายงานแจ้งซ่อม
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        รายการสั่งซ่อมทั้งหมดตามช่วงที่เลือก
                    </p>
                </div>

                <ReportFilters />

                <Card className="shadow-card">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            รายการสั่งซ่อมทั้งหมด
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="min-w-[100px]">
                                            รหัสใบสั่งงานซ่อม
                                        </TableHead>
                                        <TableHead className="min-w-[120px]">
                                            เครื่องจักร
                                        </TableHead>
                                        <TableHead className="min-w-[200px]">
                                            ปัญหาเบื้องต้น
                                        </TableHead>
                                        <TableHead className="min-w-[100px]">
                                            วันที่แจ้ง
                                        </TableHead>
                                        <TableHead className="min-w-[100px]">
                                            สถานะ
                                        </TableHead>
                                        <TableHead className="min-w-[150px]">
                                            ผู้แจ้ง
                                        </TableHead>
                                        <TableHead className="min-w-[120px]">
                                            ผู้รับผิดชอบ
                                        </TableHead>
                                        <TableHead className="min-w-[140px]">
                                            วันที่/เวลาเริ่ม
                                        </TableHead>
                                        <TableHead className="min-w-[140px]">
                                            วันที่/เวลาสิ้นสุด
                                        </TableHead>
                                        <TableHead className="min-w-[100px]">
                                            ระยะเวลา
                                        </TableHead>
                                        <TableHead className="min-w-[250px]">
                                            ลักษณะงานที่ทำ/วิธีการซ่อม
                                        </TableHead>
                                        <TableHead className="min-w-[200px]">
                                            สาเหตุความเสียหาย
                                        </TableHead>
                                        <TableHead className="min-w-[250px]">
                                            การป้องกันและแก้ไขที่ต้นเหตุ
                                        </TableHead>
                                        <TableHead className="min-w-[100px]">
                                            ค่าใช้จ่าย
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {allRepairRequests.map((repair) => {
                                        const statusBadge = getStatusBadge(
                                            repair.status
                                        );
                                        return (
                                            <TableRow key={repair.id}>
                                                <TableCell className="font-medium">
                                                    {repair.id}
                                                </TableCell>
                                                <TableCell>
                                                    {repair.machine}
                                                </TableCell>
                                                <TableCell className="max-w-[200px]">
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger
                                                                asChild
                                                            >
                                                                <div className="truncate cursor-help">
                                                                    {
                                                                        repair.problem
                                                                    }
                                                                </div>
                                                            </TooltipTrigger>
                                                            <TooltipContent className="max-w-xs">
                                                                <p>
                                                                    {
                                                                        repair.problem
                                                                    }
                                                                </p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </TableCell>
                                                <TableCell>
                                                    {repair.reportDate}
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge.className}`}
                                                    >
                                                        {statusBadge.label}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    {repair.reporter}
                                                </TableCell>
                                                <TableCell>
                                                    {repair.engineer}
                                                </TableCell>
                                                <TableCell>
                                                    {repair.startDate}
                                                </TableCell>
                                                <TableCell>
                                                    {repair.endDate}
                                                </TableCell>
                                                <TableCell>
                                                    {repair.durationHours !==
                                                    null
                                                        ? `${repair.durationHours.toFixed(
                                                              1
                                                          )} ชม.`
                                                        : "-"}
                                                </TableCell>
                                                <TableCell className="max-w-[250px]">
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger
                                                                asChild
                                                            >
                                                                <div className="truncate cursor-help">
                                                                    {
                                                                        repair.workMethod
                                                                    }
                                                                </div>
                                                            </TooltipTrigger>
                                                            <TooltipContent className="max-w-xs">
                                                                <p>
                                                                    {
                                                                        repair.workMethod
                                                                    }
                                                                </p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </TableCell>
                                                <TableCell className="max-w-[200px]">
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger
                                                                asChild
                                                            >
                                                                <div className="truncate cursor-help">
                                                                    {
                                                                        repair.rootCause
                                                                    }
                                                                </div>
                                                            </TooltipTrigger>
                                                            <TooltipContent className="max-w-xs">
                                                                <p>
                                                                    {
                                                                        repair.rootCause
                                                                    }
                                                                </p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </TableCell>
                                                <TableCell className="max-w-[250px]">
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger
                                                                asChild
                                                            >
                                                                <div className="truncate cursor-help">
                                                                    {
                                                                        repair.prevention
                                                                    }
                                                                </div>
                                                            </TooltipTrigger>
                                                            <TooltipContent className="max-w-xs">
                                                                <p>
                                                                    {
                                                                        repair.prevention
                                                                    }
                                                                </p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {repair.cost !== "-"
                                                        ? `฿${repair.cost}`
                                                        : "-"}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="mt-4 text-sm text-muted-foreground">
                            แสดง {allRepairRequests.length} รายการจากทั้งหมด{" "}
                            {allRepairRequests.length} รายการ
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}

export default ReportsRequests;
