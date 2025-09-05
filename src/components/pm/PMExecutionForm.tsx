import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Calendar, CheckCircle, FileText, Plus, Wrench, AlertTriangle } from "lucide-react";
import { toBEDatetimeInput, toCEDatetimeInput } from "@/lib/thaiDate";
import { useToast } from "@/hooks/use-toast";

interface PMSchedule {
    id: string;
    machine: string;
    pmType: string;
    frequency: string;
    nextDue: string;
    assignedTo: string;
    status: string;
    priority: string;
    lastPerformed: string;
    checklist?: string[];
}

interface PMExecutionFormProps {
    pmSchedule: PMSchedule;
    onClose: () => void;
}

const defaultChecklist = [
    "ตรวจสอบระดับน้ำมัน",
    "เติมน้ำมันหล่อลื่น",
    "ตรวจสอบการรั่วไหล",
    "ทำความสะอาดส่วนประกอบ",
    "ตรวจสอบการทำงาน",
];

export function PMExecutionForm({ pmSchedule, onClose }: PMExecutionFormProps) {
    const { toast } = useToast();
    const [checklistStatus, setChecklistStatus] = useState<
        Record<string, boolean>
    >({});
    const [result, setResult] = useState("");
    const [foundIssues, setFoundIssues] = useState(false);
    const [needsRepair, setNeedsRepair] = useState(false);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const checklist = pmSchedule.checklist || defaultChecklist;

    const handleChecklistChange = (item: string, checked: boolean) => {
        setChecklistStatus((prev) => ({
            ...prev,
            [item]: checked,
        }));
    };

    const handleComplete = () => {
        const completedItems =
            Object.values(checklistStatus).filter(Boolean).length;
        const totalItems = checklist.length;

        if (completedItems < totalItems) {
            toast({
                title: "กรุณาทำรายการให้ครบ",
                description: `ยังเหลือรายการที่ยังไม่ได้ตรวจสอบ ${
                    totalItems - completedItems
                } รายการ`,
                variant: "destructive",
            });
            return;
        }

        toast({
            title: "บันทึก PM สำเร็จ",
            description: `PM ${pmSchedule.id} ได้รับการบันทึกเรียบร้อยแล้ว`,
        });
        onClose();
    };

    const handleCreateRepairRequest = () => {
        toast({
            title: "สร้างใบสั่งงานซ่อมสำเร็จ",
            description: "ระบบได้สร้างใบสั่งงานซ่อมจากปัญหาที่พบใน PM แล้ว",
        });
        onClose();
    };

    const completedItems =
        Object.values(checklistStatus).filter(Boolean).length;
    const progressPercentage = (completedItems / checklist.length) * 100;

    return (
        <div className="space-y-6">
            {/* PM Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Wrench className="h-5 w-5" />
                        <span>ข้อมูล PM</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <Label className="text-muted-foreground">
                                รหัส PM
                            </Label>
                            <p className="font-medium">{pmSchedule.id}</p>
                        </div>
                        <div>
                            <Label className="text-muted-foreground">
                                เครื่องจักร
                            </Label>
                            <p className="font-medium">{pmSchedule.machine}</p>
                        </div>
                        <div>
                            <Label className="text-muted-foreground">
                                ประเภท PM
                            </Label>
                            <p className="font-medium">{pmSchedule.pmType}</p>
                        </div>
                        <div>
                            <Label className="text-muted-foreground">
                                ผู้รับผิดชอบ
                            </Label>
                            <p className="font-medium">
                                {pmSchedule.assignedTo}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Time Tracking */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">บันทึกเวลา</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="startTime">เวลาเริ่มต้น</Label>
                            <div className="relative">
                                <Input
                                    id="startTime"
                                    type="datetime-local"
                                    value={toBEDatetimeInput(startTime)}
                                    onChange={(e) =>
                                        setStartTime(toCEDatetimeInput(e.target.value))
                                    }
                                    required
                                />
                                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endTime">เวลาสิ้นสุด</Label>
                            <div className="relative">
                                <Input
                                    id="endTime"
                                    type="datetime-local"
                                    value={toBEDatetimeInput(endTime)}
                                    onChange={(e) =>
                                        setEndTime(toCEDatetimeInput(e.target.value))
                                    }
                                />
                                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Checklist */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="h-5 w-5" />
                            <span>Checklist</span>
                        </div>
                        <Badge variant="outline">
                            {completedItems}/{checklist.length} เสร็จ (
                            {Math.round(progressPercentage)}%)
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="w-full bg-muted rounded-full h-2">
                        <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>

                    <div className="space-y-3">
                        {checklist.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50"
                            >
                                <Checkbox
                                    id={`check-${index}`}
                                    checked={checklistStatus[item] || false}
                                    onCheckedChange={(checked) =>
                                        handleChecklistChange(
                                            item,
                                            checked as boolean
                                        )
                                    }
                                />
                                <Label
                                    htmlFor={`check-${index}`}
                                    className={`flex-1 cursor-pointer ${
                                        checklistStatus[item]
                                            ? "line-through text-muted-foreground"
                                            : ""
                                    }`}
                                >
                                    {item}
                                </Label>
                                {checklistStatus[item] && (
                                    <CheckCircle className="h-4 w-4 text-status-completed" />
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Work Details */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">
                        รายละเอียดการดำเนินงาน
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="workDetails">รายละเอียดงานที่ทำ</Label>
                        <Textarea
                            id="workDetails"
                            placeholder="อธิบายรายละเอียดงาน PM ที่ดำเนินการ"
                            rows={3}
                        />
                    </div>

                    <div className="space-y-3">
                        <Label>ผลการตรวจสอบ</Label>
                        <RadioGroup value={result} onValueChange={setResult}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="normal" id="normal" />
                                <Label
                                    htmlFor="normal"
                                    className="text-status-completed cursor-pointer"
                                >
                                    ปกติ - ไม่พบปัญหา
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="minor-issues"
                                    id="minor-issues"
                                />
                                <Label
                                    htmlFor="minor-issues"
                                    className="text-status-pending cursor-pointer"
                                >
                                    พบปัญหาเล็กน้อย - แก้ไขได้แล้ว
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="major-issues"
                                    id="major-issues"
                                />
                                <Label
                                    htmlFor="major-issues"
                                    className="text-destructive cursor-pointer"
                                >
                                    พบปัญหาร้ายแรง - ต้องซ่อมแซม
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {(result === "minor-issues" ||
                        result === "major-issues") && (
                        <div className="space-y-2">
                            <Label htmlFor="issueDetails">
                                รายละเอียดปัญหา
                            </Label>
                            <Textarea
                                id="issueDetails"
                                placeholder="อธิบายปัญหาที่พบและการแก้ไข"
                                rows={3}
                                required
                            />
                        </div>
                    )}

                    {result === "major-issues" && (
                        <div className="p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
                            <div className="flex items-center space-x-2 text-destructive mb-2">
                                <AlertTriangle className="h-4 w-4" />
                                <span className="font-medium">
                                    ต้องการซ่อมแซม
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                                เนื่องจากพบปัญหาร้ายแรง
                                ระบบจะสร้างใบสั่งงานซ่อมอัตโนมัติ
                            </p>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="needsRepair"
                                    checked={needsRepair}
                                    onCheckedChange={(checked) =>
                                        setNeedsRepair(checked as boolean)
                                    }
                                />
                                <Label
                                    htmlFor="needsRepair"
                                    className="text-sm"
                                >
                                    สร้างใบสั่งงานซ่อมอัตโนมัติ
                                </Label>
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="notes">หมายเหตุเพิ่มเติม</Label>
                        <Textarea
                            id="notes"
                            placeholder="หมายเหตุหรือข้อเสนอแนะ"
                            rows={2}
                        />
                    </div>
                </CardContent>
            </Card>

            <Separator />

            {/* Action Buttons */}
            <div className="flex justify-between">
                <Button variant="outline" onClick={onClose}>
                    ยกเลิก
                </Button>

                <div className="flex space-x-2">
                    {result === "major-issues" && needsRepair && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">
                                    <Plus className="h-4 w-4 mr-2" />
                                    สร้างใบสั่งงานซ่อม
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        สร้างใบสั่งงานซ่อม
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        ระบบจะสร้างใบสั่งงานซ่อมจากปัญหาที่พบใน
                                        PM นี้ ต้องการดำเนินการหรือไม่?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        ยกเลิก
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleCreateRepairRequest}
                                    >
                                        สร้างใบสั่งงานซ่อม
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}

                    <Button onClick={handleComplete}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        บันทึก PM เสร็จสิ้น
                    </Button>
                </div>
            </div>
        </div>
    );
}
