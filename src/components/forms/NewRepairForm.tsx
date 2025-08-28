import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { Info } from "lucide-react";
import {
    mockMachines,
    getSectionsByMachineId,
    type Section,
} from "@/data/masterData";

// แปลงข้อมูลจาก masterData ให้มีข้อมูลสถานที่ตั้ง
const machines = mockMachines
    .filter((machine) => machine.status === "Active")
    .map((machine) => ({
        id: machine.id,
        name: machine.name,
        location: getLocationByMachineId(machine.id), // ฟังก์ชันสำหรับกำหนดสถานที่ตั้ง
    }));

// ฟังก์ชันสำหรับกำหนดสถานที่ตั้งตาม machine id
function getLocationByMachineId(machineId: string): string {
    const locationMap: { [key: string]: string } = {
        m1: "อาคาร 1, Line 1", // เครื่องอัดฟิล์ม Extruder Line 1
        m2: "อาคาร 1, Line 2", // เครื่องตัดฟิล์ม Slitting Machine A
        m3: "อาคาร 2, Line 1", // เครื่องพิมพ์ฟิล์ม Printing Press B
    };
    return locationMap[machineId] || "ไม่ระบุสถานที่";
}

// ฟังก์ชันสำหรับสร้างเลขที่เอกสาร
function generateDocumentNumber(): string {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const time = now.getTime().toString().slice(-4);
    return `REQ${year}${month}${day}${time}`;
}

// ข้อมูลระดับความสำคัญ
const priorityLevels = [
    {
        id: "level1",
        label: "ระดับ 1 หยุดทันที",
        tooltip: "เช่น Break down ฉุกเฉินที่ส่งผลด้านความปลอดภัย หรือความเสียหายของทรัพย์สิน"
    },
    {
        id: "level2",
        label: "ระดับ 2 วิ่งอยู่แต่เสี่ยงต่อคุณภาพ",
        tooltip: "เช่น เครื่องจักรยังสามารถใช้งานได้ แต่มีผลต่อด้าน คุณภาพ"
    },
    {
        id: "level3",
        label: "ระดับ 3 วิ่งอยู่แต่ output drop ยังไม่กระทบคุณภาพ (ไม่ควรปล่อยทิ้งใว้)",
        tooltip: "เช่น เร่งด่วน แต่ยังสามารถรอได้ แต่ต้องลด Speed หรือ มีของเสียที่เกิดขึ้นในกระบวณการที่สามารถรับได้ (แต่ต้องกำหนดเวลาที่ชัดเจน เช่น ไม่เกิน 15 นาทีที่รอ)"
    },
    {
        id: "level4",
        label: "ระดับ 4 เครื่องจักรมีปัญหา แต่ไม่ส่งผลต่อการผลิต",
        tooltip: "เช่น มีโอกาสที่จะเสียหาย หรือเสียหาย แต่ยังไม่ส่งผลกระทบ สามารถกำหนดวันลงซ่อมได้ (โดยทีมช่างและ PD ต้องทำการประเมินและกำหนดเวลาซ่อม)"
    }
];

export function NewRepairForm() {
    const [documentNumber] = useState(generateDocumentNumber());
    const [selectedMachine, setSelectedMachine] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [workType, setWorkType] = useState("");
    const [otherWorkType, setOtherWorkType] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [priority, setPriority] = useState("");
    const [availableSections, setAvailableSections] = useState<Section[]>([]);

    const selectedMachineData = machines.find((m) => m.id === selectedMachine);
    const selectedSectionData = availableSections.find(
        (s) => s.id === selectedSection
    );

    // ฟังก์ชันสำหรับจัดการ format เบอร์ติดต่อ
    const handleContactNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ''); // เอาตัวอักษรที่ไม่ใช่ตัวเลขออก
        if (value.length <= 10) {
            let formatted = value;
            if (value.length > 3) {
                formatted = value.slice(0, 3) + '-' + value.slice(3);
            }
            setContactNumber(formatted);
        }
    };

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
        // Handle form submission
        console.log("Form submitted", {
            documentNumber,
            selectedMachine,
            selectedSection,
            workType,
            contactNumber,
            priority,
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-1">
            <div className="mb-3">
                <h1 className="text-2xl font-bold text-foreground">
                    สร้างใบแจ้งซ่อมใหม่
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
                                    id="datetime"
                                    type="datetime-local"
                                    defaultValue={new Date()
                                        .toISOString()
                                        .slice(0, 16)}
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
                                    placeholder="xxx-xxxxxxx"
                                    maxLength={11}
                                />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="priority">ความสำคัญ</Label>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent className="max-w-md p-4">
                                                <div className="space-y-2">
                                                    <p className="font-semibold">ระดับความสำคัญ:</p>
                                                    {priorityLevels.map((level) => (
                                                        <div key={level.id} className="text-sm">
                                                            <p className="font-medium">{level.label}</p>
                                                            <p className="text-muted-foreground">{level.tooltip}</p>
                                                        </div>
                                                    ))}
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

                        <div className="space-y-3">
                            <Label>ประเภทงาน</Label>
                            <RadioGroup
                                value={workType}
                                onValueChange={setWorkType}
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="maintenance"
                                        id="maintenance"
                                    />
                                    <Label htmlFor="maintenance">
                                        งานซ่อมบำรุง
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="emergency"
                                        id="emergency"
                                    />
                                    <Label htmlFor="emergency">
                                        งานซ่อมฉุกเฉิน
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="other" id="other" />
                                    <Label htmlFor="other">อื่นๆ</Label>
                                </div>
                            </RadioGroup>
                            {workType === "other" && (
                                <Input
                                    placeholder="ระบุประเภทงาน"
                                    value={otherWorkType}
                                    onChange={(e) =>
                                        setOtherWorkType(e.target.value)
                                    }
                                />
                            )}
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
                            <Label htmlFor="images">รูปภาพประกอบ</Label>
                            <Input
                                id="images"
                                type="file"
                                multiple
                                accept="image/*"
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
            </form>
        </div>
    );
}
