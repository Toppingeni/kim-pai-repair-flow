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
import { ApprovalDialog } from "@/components/dialogs/ApprovalDialog";
import { mockOriginalRequest } from "@/data/mockRepairData";

interface RepairItem {
    id: string;
    machine: string;
    problem: string;
    date: string;
    contactNumber?: string;
    status:
        | "new"
        | "progress"
        | "waiting"
        | "completed"
        | "pending"
        | "cancelled";
    engineer?: string | string[]; // รองรับทั้ง string และ array
}

interface RepairTableProps {
    repairs: RepairItem[];
    userRole: "production" | "engineering";
    title: string;
    showEngineerColumn?: boolean; // เพิ่ม prop สำหรับควบคุมการแสดงคอลัมน์ผู้รับผิดชอบ
    showContactColumn?: boolean; // แสดงคอลัมน์เบอร์ติดต่อ
}

interface ApprovalFormData {
    workType: string;
    technicians: string[];
    startDateTime: string;
    endDateTime: string;
    totalHours: number;
    totalMinutes: number;
}

const statusConfig = {
    new: { label: "งานใหม่", variant: "new" as const },
    progress: { label: "กำลังซ่อม", variant: "progress" as const },
    waiting: { label: "รอยืนยันปิดงาน", variant: "waiting" as const },
    completed: { label: "ปิดงานแล้ว", variant: "completed" as const },
    pending: { label: "รออะไหล่", variant: "pending" as const },
    cancelled: { label: "ยกเลิก", variant: "cancelled" as const },
};

const StatusBadge = ({ status }: { status: keyof typeof statusConfig }) => {
    const config = statusConfig[status];
    return (
        <Badge
            variant="outline"
            className={`
        ${status === "new" ? "bg-blue-100 text-blue-800 border-blue-200" : ""}
        ${
            status === "progress"
                ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                : ""
        }
        ${
            status === "waiting"
                ? "bg-orange-100 text-orange-800 border-orange-200"
                : ""
        }
        ${
            status === "completed"
                ? "bg-green-100 text-green-800 border-green-200"
                : ""
        }
        ${status === "pending" ? "bg-red-100 text-red-800 border-red-200" : ""}
        ${
            status === "cancelled"
                ? "bg-red-300 text-red-800 border-gray-200"
                : ""
        }
      `}
        >
            {config.label}
        </Badge>
    );
};

export function RepairTable({
    repairs,
    userRole,
    title,
    showEngineerColumn = true,
    showContactColumn = false,
}: RepairTableProps) {
    const navigate = useNavigate();
    const { acceptJob } = useRepairActions();
    const [selectedRepair, setSelectedRepair] = useState<RepairItem | null>(
        null
    );
    const [showApprovalDialog, setShowApprovalDialog] = useState(false);

    const handleViewDetail = (repairId: string) => {
        navigate(`/repair-detail/${repairId}`);
    };

    const handleAcceptJob = (repair: RepairItem) => {
        setSelectedRepair(repair);
        setShowApprovalDialog(true);
    };

    const handleStartRepair = (repairId: string) => {
        navigate(`/repair-action/${repairId}`);
    };

    const handleCloseJob = (repairId: string) => {
        navigate(`/close-job/${repairId}`);
    };

    const handleApproveRepair = (formData: ApprovalFormData) => {
        console.log("อนุมัติใบสั่งงาน:", {
            repairId: selectedRepair?.id,
            ...formData,
        });
        setShowApprovalDialog(false);
        setSelectedRepair(null);
    };

    const handleCancelRepair = (reason: string) => {
        console.log("ยกเลิกใบสั่งงาน:", {
            repairId: selectedRepair?.id,
            reason,
        });
        setShowApprovalDialog(false);
        setSelectedRepair(null);
    };

    const getActionButtons = (repair: RepairItem) => {
        const buttons = [];

        // buttons.push(
        //     <Button
        //         key="view"
        //         variant="outline"
        //         size="sm"
        //         onClick={() => handleViewDetail(repair.id)}
        //         className="mr-2"
        //     >
        //         ดูรายละเอียด
        //     </Button>
        // );

        if (userRole === "engineering") {
            if (repair.status === "new") {
                buttons.push(
                    <Button
                        key="accept"
                        variant="default"
                        size="sm"
                        onClick={() => handleAcceptJob(repair)}
                        className="mr-2 bg-blue-600 hover:bg-blue-700"
                    >
                        รับงาน
                    </Button>
                );
            } else if (repair.status === "progress") {
                buttons.push(
                    <Button
                        key="start"
                        variant="default"
                        size="sm"
                        onClick={() => handleStartRepair(repair.id)}
                        className="mr-2 bg-green-600 hover:bg-green-700"
                    >
                        เริ่มซ่อม
                    </Button>
                );
            }
        }

        // เพิ่มปุ่มปิดงานสำหรับฝ่ายผลิตเมื่อสถานะเป็น "รอยืนยันปิดงาน"
        if (userRole === "production" && repair.status === "waiting") {
            buttons.push(
                <Button
                    key="close-job"
                    variant="default"
                    size="sm"
                    onClick={() => handleCloseJob(repair.id)}
                    className="mr-2 bg-orange-600 hover:bg-orange-700"
                >
                    ปิดงาน
                </Button>
            );
        }

        return <div className="flex">{buttons}</div>;
    };

    return (
        <>
            <Card className="shadow-card">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground">
                        {title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>รหัสใบสั่งงานซ่อม</TableHead>
                                <TableHead>เครื่องจักร</TableHead>
                                <TableHead>ปัญหาเบื้องต้น</TableHead>
                                {showContactColumn && (
                                    <TableHead>เบอร์ติดต่อ</TableHead>
                                )}
                                <TableHead>วันที่แจ้ง</TableHead>
                                <TableHead>สถานะ</TableHead>
                                {showEngineerColumn && (
                                    <TableHead>ผู้รับผิดชอบ</TableHead>
                                )}
                                <TableHead>การดำเนินการ</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {repairs.map((repair) => (
                                <TableRow key={repair.id}>
                                    <TableCell className="font-medium">
                                        {repair.id}
                                    </TableCell>
                                    <TableCell>{repair.machine}</TableCell>
                                    <TableCell>{repair.problem}</TableCell>
                                    {showContactColumn && (
                                        <TableCell>
                                            {repair.contactNumber || "-"}
                                        </TableCell>
                                    )}
                                    <TableCell>{repair.date}</TableCell>
                                    <TableCell>
                                        <StatusBadge status={repair.status} />
                                    </TableCell>
                                    {showEngineerColumn && (
                                        <TableCell>
                                            {Array.isArray(repair.engineer) ? (
                                                <div className="space-y-1">
                                                    {repair.engineer.map(
                                                        (name, index) => (
                                                            <div
                                                                key={index}
                                                                className="text-xs"
                                                            >
                                                                {name}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            ) : (
                                                repair.engineer || "-"
                                            )}
                                        </TableCell>
                                    )}
                                    <TableCell>
                                        {getActionButtons(repair)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="mt-4 flex justify-end">
                        <Button variant="outline">ดูทั้งหมด</Button>
                    </div>
                </CardContent>
            </Card>

            {selectedRepair && (
                <ApprovalDialog
                    open={showApprovalDialog}
                    onOpenChange={setShowApprovalDialog}
                    repairData={{
                        id: selectedRepair.id,
                        machine: selectedRepair.machine,
                        problem: selectedRepair.problem,
                        date: selectedRepair.date,
                        status: selectedRepair.status,
                        documentNumber: selectedRepair.id,
                        section: mockOriginalRequest.section,
                        contactNumber: mockOriginalRequest.contactNumber,
                        priority: mockOriginalRequest.priorityLabel,
                        description: mockOriginalRequest.additionalDetails,
                        images: mockOriginalRequest.images,
                        location: mockOriginalRequest.location,
                        bchId: (mockOriginalRequest as any).bchId,
                        reportedDate: mockOriginalRequest.reportedDate,
                        reportedTime: mockOriginalRequest.reportedTime,
                        reporter: mockOriginalRequest.reporter,
                    }}
                    onApprove={handleApproveRepair}
                    onCancel={handleCancelRepair}
                />
            )}
        </>
    );
}
