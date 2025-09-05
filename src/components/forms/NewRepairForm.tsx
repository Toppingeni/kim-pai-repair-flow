import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, X } from "lucide-react";
import { nowBEDatetimeInput } from "@/lib/thaiDate";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    mockMachines,
    getSectionsByMachineId,
    getAllPriorityLevels,
    getBranchById,
    type Section,
    type PriorityLevel,
} from "@/data/masterData";

// แปลงข้อมูลจาก masterData ให้มีข้อมูลสถานที่ตั้ง และ bchId
const machines = mockMachines
    .filter((machine) => machine.status === "Active")
    .map((machine) => ({
        id: machine.id,
        name: machine.name,
        // ดึงสถานที่จาก branchMaster โดยอ้างอิง bchId ของเครื่อง
        location:
            (machine.bchId && getBranchById(machine.bchId)?.name) ||
            "ไม่ระบุสถานที่",
        bchId: machine.bchId,
    }));

// ยกเลิกการ map แบบ hard-coded และใช้ branchMaster แทน

// ฟังก์ชันสำหรับสร้างเลขที่เอกสาร RR-[bchId]-[YYMMXXXX]
function generateDocumentNumber(bchId?: string): string {
    const now = new Date();
    const beYear = now.getFullYear() + 543; // พ.ศ.
    const yy = beYear.toString().slice(-2);
    const mm = (now.getMonth() + 1).toString().padStart(2, "0");
    const running = "0001"; // mock running number
    const branch = bchId || "X"; // ถ้าไม่ทราบ bchId ให้เป็น X
    return `RR-${branch}-${yy}${mm}${running}`;
}

// ยกเลิกเวอร์ชันเดิมของ generateDocumentNumber (ใช้เวอร์ชันที่รองรับ bchId ด้านบน)

// ข้อมูลระดับความสำคัญจาก masterData
const priorityLevels: PriorityLevel[] = getAllPriorityLevels();

export function NewRepairForm() {
    // แสดง AUTO บนฟอร์ม จนกว่าจะกดบันทึกและส่ง
    const [documentNumber] = useState<string>("AUTO");
    const [selectedMachine, setSelectedMachine] = useState("");
    const [selectedSection, setSelectedSection] = useState("");

    const [contactNumber, setContactNumber] = useState("");
    const [priority, setPriority] = useState("");
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [availableSections, setAvailableSections] = useState<Section[]>([]);

    // Dialog แจ้งเลขที่ใบคำร้องหลังส่ง
    const [showSubmittedDialog, setShowSubmittedDialog] = useState(false);
    const [submittedDocNumber, setSubmittedDocNumber] = useState<string>("");

    const selectedMachineData = machines.find((m) => m.id === selectedMachine);
    const selectedSectionData = availableSections.find(
        (s) => s.id === selectedSection
    );

    // เบอร์ติดต่อ: รับเป็นข้อความอิสระ ไม่บังคับรูปแบบ
    const handleContactNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setContactNumber(e.target.value);
    };

    // ฟังก์ชันสำหรับจัดการการเลือกไฟล์รูปภาพ
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files);
            setSelectedImages((prev) => [...prev, ...newImages]);
        }
    };

    // ฟังก์ชันสำหรับลบรูปภาพ
    const removeImage = (index: number) => {
        setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    };

    // ไม่ต้องอัปเดตเลขที่เอกสารตามเครื่อง ให้แสดง AUTO จนกว่าจะส่ง

    // อัปเดตส่วนประกอบเมื่อเลือกเครื่องจักร
    useEffect(() => {
        if (selectedMachine) {
            const sections = getSectionsByMachineId(selectedMachine).filter(
                (s) => s.status === "Active"
            );
            setAvailableSections(sections);
            setSelectedSection("");
        } else {
            setAvailableSections([]);
            setSelectedSection("");
        }
    }, [selectedMachine]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const m = machines.find((x) => x.id === selectedMachine);
        const generated = generateDocumentNumber(m?.bchId);
        setSubmittedDocNumber(generated);
        setShowSubmittedDialog(true);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-1">
            <div className="mb-3">
                <h1 className="text-2xl font-bold text-foreground">
                    สร้างใบร้องของงานซ่อมใหม่
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-1">
                {/* Document Number Section */}
                <div className="mb-2">
                    <div className="flex flex-row items-center space-y-1">
                        <Label
                            htmlFor="document-number"
                            className="text-sm font-medium w-32"
                        >
                            เลขที่ใบคำร้อง
                        </Label>
                        <Input
                            id="document-number"
                            value={documentNumber}
                            readOnly
                            className="bg-muted font-mono w-44"
                        />
                    </div>
                </div>
                {/* Machine Information Section */}
                <Card className="shadow-card">
                    <CardHeader>
                        <CardTitle className="text-lg">
                            ข้อมูลเครื่องจักร/อุปกรณ์
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="location">สถานที่ตั้ง</Label>
                                <Input
                                    id="location"
                                    value={selectedMachineData?.location || ""}
                                    readOnly
                                    className="bg-muted"
                                    placeholder="เลือกเครื่องจักรเพื่อแสดงสถานที่ตั้ง"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="machine">
                                    ชื่อเครื่องจักร/อุปกรณ์
                                </Label>
                                <Select
                                    value={selectedMachine}
                                    onValueChange={setSelectedMachine}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="เลือกเครื่องจักร" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {machines.map((machine) => (
                                            <SelectItem
                                                key={machine.id}
                                                value={machine.id}
                                            >
                                                {machine.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="section">
                                ส่วนประกอบ (Section)
                            </Label>
                            <Select
                                value={selectedSection}
                                onValueChange={setSelectedSection}
                                disabled={!selectedMachine}
                            >
                                <SelectTrigger>
                                    <SelectValue
                                        placeholder={
                                            selectedMachine
                                                ? "เลือกส่วนประกอบ"
                                                : "เลือกเครื่องจักรก่อน"
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableSections.map((section) => (
                                        <SelectItem
                                            key={section.id}
                                            value={section.id}
                                        >
                                            {section.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Problem Details Section */}
                <Card className="shadow-card">
                    <CardHeader>
                        <CardTitle className="text-lg">
                            รายละเอียดปัญหา
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="datetime">
                                    วันที่และเวลาที่แจ้งซ่อม
                                </Label>
                                <Input
                                    readOnly
                                    id="datetime"
                                    type="datetime-local"
                                    value={nowBEDatetimeInput()}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="reporter">ผู้แจ้งซ่อม</Label>
                                <Input
                                    id="reporter"
                                    value="สมศรี (ฝ่ายผลิต)"
                                    readOnly
                                    className="bg-muted"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="contact">เบอร์ติดต่อ</Label>
                                <Input
                                    id="contact"
                                    value={contactNumber}
                                    onChange={handleContactNumberChange}
                                    placeholder="ระบุเบอร์ติดต่อ"
                                />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 mt-2">
                                    <Label htmlFor="priority">ความสำคัญ</Label>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent className="max-w-md p-4">
                                                <div className="space-y-2">
                                                    <p className="font-semibold">
                                                        ระดับความสำคัญ:
                                                    </p>
                                                    {priorityLevels.map(
                                                        (level) => (
                                                            <div
                                                                key={level.id}
                                                                className="text-sm"
                                                            >
                                                                <p className="font-medium">
                                                                    {
                                                                        level.label
                                                                    }
                                                                </p>
                                                                <p className="text-muted-foreground">
                                                                    {
                                                                        level.tooltip
                                                                    }
                                                                </p>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <Select
                                    value={priority}
                                    onValueChange={setPriority}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="เลือกระดับความสำคัญ" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {priorityLevels.map((level) => (
                                            <SelectItem
                                                key={level.id}
                                                value={level.id}
                                            >
                                                {level.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="problem">
                                ปัญหาเบื้องต้น/อาการ
                            </Label>
                            <Textarea
                                id="problem"
                                placeholder="อธิบายอาการผิดปกติอย่างละเอียด"
                                rows={4}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="notes">หมายเหตุ</Label>
                            <Textarea
                                id="notes"
                                placeholder="หมายเหตุเพิ่มเติม"
                                rows={2}
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="images">รูปภาพประกอบ</Label>
                            <Input
                                id="images"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className="cursor-pointer"
                            />

                            {/* แสดงตัวอย่างรูปภาพที่เลือก */}
                            {selectedImages.length > 0 && (
                                <div className="space-y-2">
                                    <Label className="text-sm text-muted-foreground">
                                        รูปภาพที่เลือก ({selectedImages.length}{" "}
                                        รูป)
                                    </Label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                        {selectedImages.map((image, index) => (
                                            <div
                                                key={index}
                                                className="relative group"
                                            >
                                                <div className="aspect-square rounded-lg overflow-hidden border border-border bg-muted">
                                                    <img
                                                        src={URL.createObjectURL(
                                                            image
                                                        )}
                                                        alt={`Preview ${
                                                            index + 1
                                                        }`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    title="ลบรูปภาพนี้"
                                                    onClick={() =>
                                                        removeImage(index)
                                                    }
                                                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-destructive/90"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 rounded-b-lg truncate">
                                                    {image.name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline">
                        ยกเลิก
                    </Button>
                    <Button type="submit" variant="success">
                        บันทึกและส่งแจ้งซ่อม
                    </Button>
                </div>

                {/* Dialog แจ้งเลขที่ใบคำร้องหลังส่ง */}
                <Dialog
                    open={showSubmittedDialog}
                    onOpenChange={setShowSubmittedDialog}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>ส่งใบสั่งงานซ่อมสำเร็จ</DialogTitle>
                            <DialogDescription>
                                เลขที่ใบคำร้องของคุณคือ {submittedDocNumber}
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                onClick={() => setShowSubmittedDialog(false)}
                            >
                                OK
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </form>
        </div>
    );
}
