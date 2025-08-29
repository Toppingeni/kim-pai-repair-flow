import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock } from "lucide-react";
import {
    getAllWorkTypes,
    getAllProblemCauses,
    getWorkTypeById,
    getProblemCauseById,
} from "@/data/masterData";
import { mockWorkOrderApproval } from "@/data/mockRepairData";
import { PreventionMeasures } from "./PreventionMeasures";

interface Engineer {
    id: string;
    name: string;
}

interface RepairDetailsFormProps {
    selectedEngineer: string;
    onEngineerChange: (value: string) => void;
    repairResult: string;
    onRepairResultChange: (value: string) => void;
    engineers: Engineer[];
}

// ฟังก์ชันคำนวณเวลาสูญเสีย
const calculateTotalLostTime = (
    reportDateTime: string,
    actualEndDateTime: string
): { hours: number; minutes: number } => {
    if (!reportDateTime || !actualEndDateTime) return { hours: 0, minutes: 0 };

    const reportDate = new Date(reportDateTime);
    const endDate = new Date(actualEndDateTime);
    const diffMs = endDate.getTime() - reportDate.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    return {
        hours: Math.floor(diffMinutes / 60),
        minutes: diffMinutes % 60,
    };
};

// ฟังก์ชันคำนวณระยะเวลาระหว่างสองเวลา
const calculateDuration = (
    startDateTime: string,
    endDateTime: string
): { hours: number; minutes: number } => {
    if (!startDateTime || !endDateTime) return { hours: 0, minutes: 0 };

    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);
    const diffMs = endDate.getTime() - startDate.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    return {
        hours: Math.floor(diffMinutes / 60),
        minutes: diffMinutes % 60,
    };
};

export function RepairDetailsForm({
    selectedEngineer,
    onEngineerChange,
    repairResult,
    onRepairResultChange,
    engineers,
}: RepairDetailsFormProps) {
    const [selectedWorkType, setSelectedWorkType] = useState("");
    const [selectedProblemCause, setSelectedProblemCause] = useState("");
    const [actualStartDateTime, setActualStartDateTime] = useState("");
    const [actualEndDateTime, setActualEndDateTime] = useState("");

    const workTypes = getAllWorkTypes();
    const problemCauses = getAllProblemCauses();

    // คำนวณเวลาปฏิบัติงานจริง
    const actualDuration = calculateDuration(
        actualStartDateTime,
        actualEndDateTime
    );

    // คำนวณเวลาสูญเสียทั้งหมด (จากวันที่แจ้งซ่อมถึงวันที่สิ้นสุดงานจริง)
    const reportDateTime = `2024-07-15T14:30`; // จาก mockOriginalRequest
    const totalLostTime = calculateTotalLostTime(
        reportDateTime,
        actualEndDateTime
    );
    return (
        <Card className="shadow-card">
            <CardHeader>
                <CardTitle className="text-lg">
                    ข้อมูลการดำเนินการซ่อม
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Work Type and Problem Cause Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="work-type">ประเภทงาน</Label>
                        <Input
                            id="work-type"
                            value={mockWorkOrderApproval.workTypeLabel}
                            readOnly
                            className="bg-muted"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="problem-cause">สาเหตุของปัญหา</Label>
                        <Select
                            value={selectedProblemCause}
                            onValueChange={setSelectedProblemCause}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="เลือกสาเหตุของปัญหา" />
                            </SelectTrigger>
                            <SelectContent>
                                {problemCauses.map((cause) => (
                                    <SelectItem key={cause.id} value={cause.id}>
                                        {cause.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Planned Operation Time Section */}
                <div className="space-y-4">
                    <Label className="text-base font-medium">
                        วางแผน วัน/เวลาปฏิบัติงาน
                    </Label>
                    <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-3">
                                <Label className="text-sm min-w-[40px]">
                                    เริ่ม:
                                </Label>
                                <Input
                                    value={`${mockWorkOrderApproval.plannedStartDate} ${mockWorkOrderApproval.plannedStartTime}`}
                                    readOnly
                                    className="bg-muted flex-1"
                                />
                            </div>
                            <div className="flex items-center space-x-3">
                                <Label className="text-sm min-w-[50px]">
                                    สิ้นสุด:
                                </Label>
                                <Input
                                    value={`${mockWorkOrderApproval.plannedEndDate} ${mockWorkOrderApproval.plannedEndTime}`}
                                    readOnly
                                    className="bg-muted flex-1"
                                />
                            </div>
                            <div className="flex items-center space-x-3">
                                <Label className="text-sm min-w-[35px]">
                                    รวม:
                                </Label>
                                <div className="flex items-center space-x-2 flex-1">
                                    <Input
                                        value={`${mockWorkOrderApproval.plannedDurationHours}`}
                                        readOnly
                                        className="bg-muted w-16"
                                    />
                                    <span className="text-sm">ชม</span>
                                    <Input
                                        value={`${mockWorkOrderApproval.plannedDurationMinutes}`}
                                        readOnly
                                        className="bg-muted w-16"
                                    />
                                    <span className="text-sm">นาที</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actual Operation Time Section */}
                <div className="space-y-4">
                    <Label className="text-base font-medium">
                        วัน/เวลาปฏิบัติงาน จริง
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-3">
                            <Label
                                htmlFor="actual-start"
                                className="text-sm min-w-[40px]"
                            >
                                เริ่ม:
                            </Label>
                            <div className="relative flex-1">
                                <Input
                                    id="actual-start"
                                    type="datetime-local"
                                    value={actualStartDateTime}
                                    onChange={(e) =>
                                        setActualStartDateTime(e.target.value)
                                    }
                                />
                                {/* <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" /> */}
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Label
                                htmlFor="actual-end"
                                className="text-sm min-w-[50px]"
                            >
                                สิ้นสุด:
                            </Label>
                            <div className="relative flex-1">
                                <Input
                                    id="actual-end"
                                    type="datetime-local"
                                    value={actualEndDateTime}
                                    onChange={(e) =>
                                        setActualEndDateTime(e.target.value)
                                    }
                                />
                                {/* <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" /> */}
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Label className="text-sm min-w-[35px]">รวม:</Label>
                            <div className="flex items-center space-x-2 flex-1">
                                <Input
                                    value={actualDuration.hours.toString()}
                                    readOnly
                                    className="bg-muted w-16"
                                />
                                <span className="text-sm">ชม</span>
                                <Input
                                    value={actualDuration.minutes.toString()}
                                    readOnly
                                    className="bg-muted w-16"
                                />
                                <span className="text-sm">นาที</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Total Lost Time Section */}
                <div className="space-y-4">
                    <Label className="text-base font-medium">
                        รวมเวลาสูญเสียทั้งหมด
                    </Label>
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                            <Clock className="h-5 w-5 text-orange-600" />
                            <div className="flex items-center space-x-2">
                                <span className="text-lg font-semibold text-orange-800">
                                    {totalLostTime.hours}
                                </span>
                                <span className="text-sm text-orange-600">
                                    ชั่วโมง
                                </span>
                                <span className="text-lg font-semibold text-orange-800">
                                    {totalLostTime.minutes}
                                </span>
                                <span className="text-sm text-orange-600">
                                    นาที
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Repair Details Section */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="repair-details">
                            รายละเอียดการซ่อม
                        </Label>
                        <Textarea
                            id="repair-details"
                            placeholder="อธิบายวิธีการซ่อมและขั้นตอนการดำเนินงานอย่างละเอียด"
                            rows={4}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    {" "}
                    <div className="space-y-2">
                        <Label htmlFor="prevention">แนวทางการป้องกัน</Label>
                        <Textarea
                            id="prevention"
                            placeholder="เสนอแนวทางการป้องกันปัญหาในอนาคต"
                            rows={3}
                        />
                    </div>
                </div>

                {/* Work Result Section */}
                <div className="space-y-3">
                    <Label>ผลการปฏิบัติงาน</Label>
                    <RadioGroup
                        value={repairResult}
                        onValueChange={onRepairResultChange}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="success" id="success" />
                            <Label
                                htmlFor="success"
                                className="text-status-completed cursor-pointer"
                            >
                                ซ่อมสำเร็จ (ใช้งานได้)
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="failed" id="failed" />
                            <Label
                                htmlFor="failed"
                                className="text-destructive cursor-pointer"
                            >
                                ซ่อมไม่สำเร็จ (ใช้งานไม่ได้)
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="pending" id="pending" />
                            <Label
                                htmlFor="pending"
                                className="text-status-pending cursor-pointer"
                            >
                                รออะไหล่
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no-repair" id="no-repair" />
                            <Label
                                htmlFor="no-repair"
                                className="text-muted-foreground cursor-pointer"
                            >
                                ไม่ซ่อม (ระบุเหตุผล)
                            </Label>
                        </div>
                    </RadioGroup>

                    {repairResult === "no-repair" && (
                        <div className="mt-3">
                            <Textarea
                                placeholder="ระบุเหตุผลที่ไม่ซ่อม"
                                rows={2}
                            />
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
