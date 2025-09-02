import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CancelDialog } from "./CancelDialog";
import { X } from "lucide-react";
import {
    getPriorityLevelById,
    getAllTechnicians,
    getAllTechniciansPreferred,
    getTechniciansByIds,
    getAllWorkTypes,
    Technician,
} from "@/data/masterData";
import { RepairRequestInfo } from "@/components/shared/RepairRequestInfo";

interface RepairData {
    id: string;
    machine: string;
    problem: string;
    date: string;
    status: string;
    // เพิ่มข้อมูลอื่นๆ ที่จำเป็น (จะต้องดูจาก NewRepairForm)
    documentNumber?: string;
    section?: string;
    contactNumber?: string;
    priority?: string;
    description?: string;
    images?: string[];
    location?: string;
    reportedDate?: string;
    reportedTime?: string;
    reporter?: string;
    bchId?: string;
}

interface ApprovalFormData {
    workType: string;
    technicians: string[];
    startDateTime: string;
    endDateTime: string;
    totalHours: number;
    totalMinutes: number;
}

interface ApprovalDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    repairData: RepairData;
    onApprove: (formData: ApprovalFormData) => void;
    onCancel: (reason: string) => void;
}

export function ApprovalDialog({
    open,
    onOpenChange,
    repairData,
    onApprove,
    onCancel,
}: ApprovalDialogProps) {
    const [formData, setFormData] = useState<ApprovalFormData>({
        workType: "",
        technicians: [],
        startDateTime: "",
        endDateTime: "",
        totalHours: 0,
        totalMinutes: 0,
    });

    const [availableTechnicians, setAvailableTechnicians] = useState<
        Technician[]
    >([]);
    const [showTechnicianDropdown, setShowTechnicianDropdown] = useState(false);
    const [technicianSearchQuery, setTechnicianSearchQuery] = useState("");
    const [filteredTechnicians, setFilteredTechnicians] = useState<Technician[]>([]);

    // โหลดข้อมูลช่างเทคนิค
    useEffect(() => {
        // เรียงช่างให้สาขาที่เกี่ยวข้องอยู่บนสุด หากทราบ bchId
        const technicians = getAllTechniciansPreferred(repairData.bchId);
        setAvailableTechnicians(technicians);
        setFilteredTechnicians(technicians);
    }, [repairData.bchId]);

    // กรองช่างตามคำค้นหา
    useEffect(() => {
        if (technicianSearchQuery.trim() === "") {
            setFilteredTechnicians(availableTechnicians.filter(tech => !formData.technicians.includes(tech.id)));
        } else {
            const filtered = availableTechnicians.filter(tech => 
                !formData.technicians.includes(tech.id) && (
                    tech.name.toLowerCase().includes(technicianSearchQuery.toLowerCase()) ||
                    tech.employeeId.toLowerCase().includes(technicianSearchQuery.toLowerCase()) ||
                    tech.specialization.some(spec => spec.toLowerCase().includes(technicianSearchQuery.toLowerCase()))
                )
            );
            setFilteredTechnicians(filtered);
        }
    }, [technicianSearchQuery, availableTechnicians, formData.technicians]);

    // ปิด dropdown เมื่อคลิกข้างนอก
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (!target.closest("[data-technician-dropdown]")) {
                setShowTechnicianDropdown(false);
                setTechnicianSearchQuery("");
            }
        };

        if (showTechnicianDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
            return () =>
                document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [showTechnicianDropdown]);

    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // คำนวณเวลารวม
    useEffect(() => {
        if (formData.startDateTime && formData.endDateTime) {
            const start = new Date(formData.startDateTime);
            const end = new Date(formData.endDateTime);
            const diffMs = end.getTime() - start.getTime();

            if (diffMs > 0) {
                const totalMinutes = Math.floor(diffMs / (1000 * 60));
                const hours = Math.floor(totalMinutes / 60);
                const minutes = totalMinutes % 60;

                setFormData((prev) => ({
                    ...prev,
                    totalHours: hours,
                    totalMinutes: minutes,
                }));
            }
        }
    }, [formData.startDateTime, formData.endDateTime]);

    const handleInputChange = (
        field: keyof ApprovalFormData,
        value: string
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddTechnician = (technicianId: string) => {
        setFormData((prev) => ({
            ...prev,
            technicians: [...prev.technicians, technicianId],
        }));
        setShowTechnicianDropdown(false);
        setTechnicianSearchQuery("");
    };

    const handleRemoveTechnician = (technicianId: string) => {
        setFormData((prev) => ({
            ...prev,
            technicians: prev.technicians.filter((id) => id !== technicianId),
        }));
    };

    const handleApprove = () => {
        if (
            formData.workType &&
            formData.technicians.length > 0 &&
            formData.startDateTime &&
            formData.endDateTime
        ) {
            onApprove(formData);
            onOpenChange(false);
        }
    };

    const handleCancelOrder = (reason: string) => {
        onCancel(reason);
        setShowCancelDialog(false);
        onOpenChange(false);
    };

    const statusConfig = {
        new: { label: "งานใหม่", variant: "new" as const },
        progress: { label: "กำลังซ่อม", variant: "progress" as const },
        waiting: { label: "รอยืนยันปิดงาน", variant: "waiting" as const },
        completed: { label: "ปิดงานแล้ว", variant: "completed" as const },
        pending: { label: "รออะไหล่", variant: "pending" as const },
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">
                            อนุมัติใบสั่งงานซ่อม - {repairData.id}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                        {/* ข้อมูลใบแจ้งซ่อม (Read-only) */}
                        <RepairRequestInfo 
                            request={{
                                id: repairData.id,
                                documentNumber: repairData.documentNumber,
                                location: repairData.location,
                                machine: repairData.machine,
                                section: repairData.section,
                                reportedDate: repairData.reportedDate,
                                reportedTime: repairData.reportedTime,
                                reporter: repairData.reporter,
                                contactNumber: repairData.contactNumber,
                                priority: repairData.priority,
                                problem: repairData.problem,
                                description: repairData.description,
                                images: repairData.images,
                                date: repairData.date,
                            }}
                            title="ข้อมูลใบแจ้งซ่อม"
                            defaultExpanded={true}
                        />

                        {/* ฟอร์มอนุมัติงาน */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    ข้อมูลการอนุมัติงาน
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="workType">
                                            ประเภทงาน *
                                        </Label>
                                        <Select
                                            value={formData.workType}
                                            onValueChange={(value) =>
                                                handleInputChange(
                                                    "workType",
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="เลือกประเภทงาน" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {getAllWorkTypes().map((workType) => (
                                                    <SelectItem key={workType.id} value={workType.id}>
                                                        {workType.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="technicians">
                                            รายชื่อช่างปฏิบัติงาน *
                                        </Label>
                                        <div
                                            className="relative"
                                            data-technician-dropdown
                                        >
                                            <div
                                                className="min-h-[40px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer flex flex-wrap gap-1 items-center"
                                                onClick={() =>
                                                    setShowTechnicianDropdown(
                                                        !showTechnicianDropdown
                                                    )
                                                }
                                            >
                                                {formData.technicians.length ===
                                                0 ? (
                                                    <span className="text-muted-foreground">
                                                        เลือกช่างปฏิบัติงาน
                                                    </span>
                                                ) : (
                                                    formData.technicians.map(
                                                        (techId) => {
                                                            const tech =
                                                                availableTechnicians.find(
                                                                    (t) =>
                                                                        t.id ===
                                                                        techId
                                                                );
                                                            return tech ? (
                                                                <Badge
                                                                    key={techId}
                                                                    variant="secondary"
                                                                    className="flex items-center gap-1"
                                                                >
                                                                    {tech.name}
                                                                    <X
                                                                        className="h-3 w-3 cursor-pointer hover:text-destructive"
                                                                        onClick={(
                                                                            e
                                                                        ) => {
                                                                            e.stopPropagation();
                                                                            handleRemoveTechnician(
                                                                                techId
                                                                            );
                                                                        }}
                                                                    />
                                                                </Badge>
                                                            ) : null;
                                                        }
                                                    )
                                                )}
                                            </div>
                                            {showTechnicianDropdown && (
                                                <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-md max-h-60 overflow-hidden">
                                                    <div className="p-2 border-b">
                                                        <Input
                                                            placeholder="ค้นหาช่าง..."
                                                            value={technicianSearchQuery}
                                                            onChange={(e) => setTechnicianSearchQuery(e.target.value)}
                                                            className="h-8 text-sm"
                                                            autoFocus
                                                        />
                                                    </div>
                                                    <div className="max-h-48 overflow-auto">
                                                        {filteredTechnicians.map((tech) => (
                                                            <div
                                                                key={tech.id}
                                                                className="px-3 py-2 hover:bg-accent cursor-pointer text-sm"
                                                                onClick={() => {
                                                                    handleAddTechnician(tech.id);
                                                                    setTechnicianSearchQuery("");
                                                                }}
                                                            >
                                                                <div className="font-medium">
                                                                    {tech.name}
                                                                </div>
                                                                <div className="text-xs text-muted-foreground">
                                                                    {
                                                                        tech.organization
                                                                    }
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {filteredTechnicians.length === 0 && (
                                                            <div className="px-3 py-2 text-sm text-muted-foreground">
                                                                {technicianSearchQuery ? "ไม่พบช่างที่ตรงกับการค้นหา" : "ไม่มีช่างที่สามารถเลือกได้"}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Label className="text-base font-medium">
                                        วางแผนวัน/เวลาปฏิบัติงาน
                                    </Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="startDateTime">
                                                เริ่ม *
                                            </Label>
                                            <Input
                                                id="startDateTime"
                                                type="datetime-local"
                                                value={formData.startDateTime}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "startDateTime",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="endDateTime">
                                                สิ้นสุด *
                                            </Label>
                                            <Input
                                                id="endDateTime"
                                                type="datetime-local"
                                                value={formData.endDateTime}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "endDateTime",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>รวมเวลา (ชั่วโมง)</Label>
                                            <div className="mt-1 p-2 bg-muted rounded-md text-center font-medium">
                                                {formData.totalHours} ชม.
                                            </div>
                                        </div>
                                        <div>
                                            <Label>รวมเวลา (นาที)</Label>
                                            <div className="mt-1 p-2 bg-muted rounded-md text-center font-medium">
                                                {formData.totalMinutes} นาที
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <DialogFooter className="flex justify-end space-x-2">
                        <Button
                            variant="destructive"
                            onClick={() => setShowCancelDialog(true)}
                        >
                            ยกเลิกใบสั่งงาน
                        </Button>
                        <Button
                            variant="default"
                            onClick={handleApprove}
                            disabled={
                                !formData.workType ||
                                !formData.technicians ||
                                !formData.startDateTime ||
                                !formData.endDateTime
                            }
                        >
                            อนุมัติใบสั่งงาน
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <CancelDialog
                open={showCancelDialog}
                onOpenChange={setShowCancelDialog}
                onConfirm={handleCancelOrder}
            />

            {/* Image Fullscreen Modal */}
            {selectedImage && (
                <Dialog
                    open={!!selectedImage}
                    onOpenChange={() => setSelectedImage(null)}
                >
                    <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                        <div className="relative">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white"
                                onClick={() => setSelectedImage(null)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                            <img
                                src={selectedImage}
                                alt="รูปภาพขนาดใหญ่"
                                className="w-full h-auto max-h-[85vh] object-contain"
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
