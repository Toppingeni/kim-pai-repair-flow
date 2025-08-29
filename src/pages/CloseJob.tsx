import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { RepairRequestInfo } from "@/components/shared/RepairRequestInfo";
import { Star, Clock, Calendar, User, Wrench } from "lucide-react";

// Mock data สำหรับข้อมูลใบแจ้งซ่อม
const mockRepairData = {
    id: "R24070008",
    machine: "Conveyor Belt #3",
    problem: "สายพานขาด",
    section: "ฝ่ายผลิต A",
    location: "โรงงาน 1 ชั้น 2",
    priority: "สูง",
    reporter: "นายสมศักดิ์ ใจดี",
    contactNumber: "081-234-5678",
    reportedDate: "08/07/2568",
    reportedTime: "08:30",
    actualStartDate: "08/07/2568",
    actualStartTime: "09:15",
    actualEndDate: "08/07/2568",
    actualEndTime: "14:30",
    engineer: "นายสมชาย",
    description:
        "สายพานลำเลียงขาดจากการใช้งานหนัก ต้องเปลี่ยนสายพานใหม่ทั้งเส้น",
    images: ["/api/placeholder/300/200", "/api/placeholder/300/200"],
    usedParts: [
        {
            code: "CB-001",
            name: "สายพานลำเลียง 10m",
            quantity: 1,
            unit: "เส้น",
        },
        { code: "BT-002", name: "น็อตยึดสายพาน", quantity: 8, unit: "ตัว" },
    ],
};

// Component สำหรับให้คะแนนดาว
interface StarRatingProps {
    rating: number;
    onRatingChange: (rating: number) => void;
}

const StarRating = ({ rating, onRatingChange }: StarRatingProps) => {
    const [hoverRating, setHoverRating] = useState(0);

    const handleStarClick = (starIndex: number, isHalf: boolean) => {
        const newRating = isHalf ? starIndex - 0.5 : starIndex;
        onRatingChange(newRating);
    };

    const renderStar = (starIndex: number) => {
        const isHovered = hoverRating >= starIndex;
        const isSelected = rating >= starIndex;
        const isHalfSelected = rating === starIndex - 0.5;
        const isHalfHovered = hoverRating === starIndex - 0.5;

        return (
            <div
                key={starIndex}
                className="relative inline-block cursor-pointer"
            >
                <Star
                    className={`w-8 h-8 ${
                        isSelected || isHovered
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                    }`}
                />
                {(isHalfSelected || isHalfHovered) && (
                    <Star
                        className="absolute top-0 left-0 w-8 h-8 fill-yellow-400 text-yellow-400"
                        style={{ clipPath: "inset(0 50% 0 0)" }}
                    />
                )}
                {/* Left half for 0.5 rating */}
                <div
                    className="absolute top-0 left-0 w-4 h-8"
                    onMouseEnter={() => setHoverRating(starIndex - 0.5)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleStarClick(starIndex, true)}
                />
                {/* Right half for full rating */}
                <div
                    className="absolute top-0 right-0 w-4 h-8"
                    onMouseEnter={() => setHoverRating(starIndex)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleStarClick(starIndex, false)}
                />
            </div>
        );
    };

    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(renderStar)}
            <span className="ml-2 text-sm text-muted-foreground">
                {rating > 0 ? `${rating}/5` : "ยังไม่ได้ให้คะแนน"}
            </span>
        </div>
    );
};

export function CloseJob() {
    const { repairId } = useParams();
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    const [rating, setRating] = useState(0);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [additionalNotes, setAdditionalNotes] = useState("");

    // State สำหรับ checkbox การทดสอบ
    const [testChecks, setTestChecks] = useState({
        machineTest: false,
        safetyCheck: false,
        cleanupComplete: false,
        partsRecorded: false,
        procedureNotified: false,
    });

    // คำนวณเวลาสูญเสียทั้งหมด
    const calculateTotalLostTime = () => {
        const startDateTime = new Date(
            `2024-07-08 ${mockRepairData.actualStartTime}`
        );
        const endDateTime = new Date(
            `2024-07-08 ${mockRepairData.actualEndTime}`
        );
        const diffMs = endDateTime.getTime() - startDateTime.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor(
            (diffMs % (1000 * 60 * 60)) / (1000 * 60)
        );
        return `${diffHours} ชั่วโมง ${diffMinutes} นาที`;
    };

    const handleCheckboxChange = (key: keyof typeof testChecks) => {
        setTestChecks((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleCloseJob = () => {
        // ตรวจสอบว่าทุก checkbox ถูกเลือกแล้ว
        // const allChecked = Object.values(testChecks).every(
        //     (checked) => checked
        // );
        // if (!allChecked) {
        //     alert("กรุณาทำเครื่องหมายการทดสอบและตรวจสอบให้ครบทุกรายการ");
        //     return;
        // }

        if (rating === 0) {
            alert("กรุณาให้คะแนนการทำงานของฝ่ายวิศวกรรม");
            return;
        }

        setShowConfirmDialog(true);
    };

    const confirmCloseJob = () => {
        console.log("ปิดงาน:", {
            repairId,
            rating,
            testChecks,
            additionalNotes,
        });

        // นำทางกลับไปหน้า MyRepairs
        navigate("/my-repairs");
    };

    return (
        <MainLayout>
            <div className="flex-1 p-6 space-y-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-foreground">
                        ปิดงานซ่อม
                    </h1>
                    <p className="text-muted-foreground">
                        ยืนยันการปิดงานและประเมินผลการซ่อม
                    </p>
                </div>

                {/* ข้อมูลใบแจ้งซ่อม - ใช้ RepairRequestInfo component */}
                <RepairRequestInfo
                    request={{
                        id: mockRepairData.id,
                        machine: mockRepairData.machine,
                        problem: mockRepairData.problem,
                        section: mockRepairData.section,
                        location: mockRepairData.location,
                        priority: mockRepairData.priority,
                        reporter: mockRepairData.reporter,
                        contactNumber: mockRepairData.contactNumber,
                        reportedDate: mockRepairData.reportedDate,
                        reportedTime: mockRepairData.reportedTime,
                        description: mockRepairData.description,
                        images: mockRepairData.images,
                    }}
                    title={`ข้อมูลใบแจ้งซ่อม - ${mockRepairData.id}`}
                    defaultExpanded={isExpanded}
                />

                {/* อะไหล่ที่ใช้ */}
                <Card className="shadow-card">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-foreground">
                            อะไหล่ที่ใช้
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {mockRepairData.usedParts.map((part, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center p-2 bg-muted/50 rounded"
                                >
                                    <span>
                                        {part.code} - {part.name}
                                    </span>
                                    <span>
                                        {part.quantity} {part.unit}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* ข้อมูลเวลา */}
                <Card className="shadow-card">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            ข้อมูลเวลาการดำเนินงาน
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    วันที่แจ้งซ่อม
                                </Label>
                                <p className="text-foreground font-medium">
                                    {mockRepairData.reportedDate}{" "}
                                    {mockRepairData.reportedTime}
                                </p>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    วันที่เริ่มปฏิบัติงาน
                                </Label>
                                <p className="text-foreground font-medium">
                                    {mockRepairData.actualStartDate}{" "}
                                    {mockRepairData.actualStartTime}
                                </p>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    วันที่เสร็จสิ้น
                                </Label>
                                <p className="text-foreground font-medium">
                                    {mockRepairData.actualEndDate}{" "}
                                    {mockRepairData.actualEndTime}
                                </p>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    รวมเวลาสูญเสีย
                                </Label>
                                <p className="text-foreground font-medium text-lg text-red-600">
                                    {calculateTotalLostTime()}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* การให้คะแนนฝ่ายวิศวกรรม */}
                <Card className="shadow-card">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <User className="h-5 w-5" />
                            ประเมินการทำงานของฝ่ายวิศวกรรม
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <Label className="text-sm font-medium text-muted-foreground">
                                    ผู้รับผิดชอบ
                                </Label>
                                <p className="text-foreground font-medium">
                                    {mockRepairData.engineer}
                                </p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-muted-foreground">
                                    คะแนนความพึงพอใจ
                                </Label>
                                <div className="mt-2">
                                    <StarRating
                                        rating={rating}
                                        onRatingChange={setRating}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* การทดสอบการทำงานและการตรวจสอบความปลอดภัย */}
                <Card className="shadow-card">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-foreground">
                            การทดสอบการทำงานและการตรวจสอบความปลอดภัย
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="machineTest"
                                    checked={testChecks.machineTest}
                                    onCheckedChange={() =>
                                        handleCheckboxChange("machineTest")
                                    }
                                />
                                <Label
                                    htmlFor="machineTest"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    เครื่องจักรได้ผ่านการทดสอบและทำงานได้ตามที่คาดหวัง
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="safetyCheck"
                                    checked={testChecks.safetyCheck}
                                    onCheckedChange={() =>
                                        handleCheckboxChange("safetyCheck")
                                    }
                                />
                                <Label
                                    htmlFor="safetyCheck"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    ระบบป้องกันความปลอดภัยและฝาครอบถูกติดตั้งอย่างแน่นหนา
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="cleanupComplete"
                                    checked={testChecks.cleanupComplete}
                                    onCheckedChange={() =>
                                        handleCheckboxChange("cleanupComplete")
                                    }
                                />
                                <Label
                                    htmlFor="cleanupComplete"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    พื้นที่ได้รับการทำความสะอาดและเก็บเครื่องมือเรียบร้อย
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="partsRecorded"
                                    checked={testChecks.partsRecorded}
                                    onCheckedChange={() =>
                                        handleCheckboxChange("partsRecorded")
                                    }
                                />
                                <Label
                                    htmlFor="partsRecorded"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    มีการบันทึกอะไหล่ที่ใช้
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="procedureNotified"
                                    checked={testChecks.procedureNotified}
                                    onCheckedChange={() =>
                                        handleCheckboxChange(
                                            "procedureNotified"
                                        )
                                    }
                                />
                                <Label
                                    htmlFor="procedureNotified"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    แจ้งผู้ปฏิบัติงานเกี่ยวกับขั้นตอนที่ผิดปกติแล้ว
                                </Label>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* หมายเหตุเพิ่มเติม */}
                <Card className="shadow-card">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-foreground">
                            หมายเหตุเพิ่มเติม
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            placeholder="หมายเหตุหรือข้อเสนอแนะเพิ่มเติม (ไม่บังคับ)"
                            value={additionalNotes}
                            onChange={(e) => setAdditionalNotes(e.target.value)}
                            rows={4}
                        />
                    </CardContent>
                </Card>

                {/* ปุ่มดำเนินการ */}
                <div className="flex justify-end gap-4">
                    <Button
                        variant="outline"
                        onClick={() => navigate("/my-repairs")}
                    >
                        ยกเลิก
                    </Button>
                    <Button
                        onClick={handleCloseJob}
                        className="bg-orange-600 hover:bg-orange-700"
                    >
                        ปิดงาน
                    </Button>
                </div>

                {/* Dialog ยืนยันการปิดงาน */}
                <Dialog
                    open={showConfirmDialog}
                    onOpenChange={setShowConfirmDialog}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>ยืนยันการปิดงาน</DialogTitle>
                            <DialogDescription>
                                ท่านต้องการปิดงานซ่อม {mockRepairData.id}{" "}
                                ใช่หรือไม่?
                                <br />
                                เมื่อปิดงานแล้วจะไม่สามารถแก้ไขได้อีก
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setShowConfirmDialog(false)}
                            >
                                ยกเลิก
                            </Button>
                            <Button
                                onClick={confirmCloseJob}
                                className="bg-orange-600 hover:bg-orange-700"
                            >
                                ตกลง
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </MainLayout>
    );
}
