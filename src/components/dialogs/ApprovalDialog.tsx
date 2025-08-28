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
import { CancelDialog } from './CancelDialog';
import { X } from "lucide-react";
import { getPriorityLevelById } from "@/data/masterData";

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
}

interface ApprovalFormData {
  workType: string;
  technicians: string;
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
    technicians: "",
    startDateTime: "",
    endDateTime: "",
    totalHours: 0,
    totalMinutes: 0,
  });

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
        
        setFormData(prev => ({
          ...prev,
          totalHours: hours,
          totalMinutes: minutes,
        }));
      }
    }
  }, [formData.startDateTime, formData.endDateTime]);

  const handleInputChange = (field: keyof ApprovalFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleApprove = () => {
    if (formData.workType && formData.technicians && formData.startDateTime && formData.endDateTime) {
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
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">ข้อมูลใบแจ้งซ่อม</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      รหัสเอกสาร
                    </Label>
                    <div className="mt-1 p-2 bg-muted rounded-md">
                      {repairData.documentNumber || repairData.id}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      สถานที่ตั้ง
                    </Label>
                    <div className="mt-1 p-2 bg-muted rounded-md">
                      {repairData.location || "ไม่ระบุ"}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      เครื่องจักร
                    </Label>
                    <div className="mt-1 p-2 bg-muted rounded-md">
                      {repairData.machine}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      ส่วนประกอบ (Section)
                    </Label>
                    <div className="mt-1 p-2 bg-muted rounded-md">
                      {repairData.section || "ไม่ระบุ"}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      วันที่และเวลาที่แจ้งซ่อม
                    </Label>
                    <div className="mt-1 p-2 bg-muted rounded-md">
                      {repairData.reportedDate && repairData.reportedTime 
                        ? `${repairData.reportedDate} ${repairData.reportedTime}`
                        : repairData.date || "ไม่ระบุ"}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      ผู้แจ้งซ่อม
                    </Label>
                    <div className="mt-1 p-2 bg-muted rounded-md">
                      {repairData.reporter || "ไม่ระบุ"}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      เบอร์ติดต่อ
                    </Label>
                    <div className="mt-1 p-2 bg-muted rounded-md">
                      {repairData.contactNumber || "ไม่ระบุ"}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      ความสำคัญ
                    </Label>
                    <div className="mt-1 p-2 bg-muted rounded-md">
                      {repairData.priority || "ไม่ระบุ"}
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    ปัญหาเบื้องต้น/อาการ
                  </Label>
                  <div className="mt-1 p-2 bg-muted rounded-md min-h-[80px]">
                    {repairData.problem}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    หมายเหตุ
                  </Label>
                  <div className="mt-1 p-2 bg-muted rounded-md min-h-[60px]">
                    {repairData.description || "ไม่มีหมายเหตุ"}
                  </div>
                </div>
                {repairData.images && repairData.images.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      รูปภาพประกอบ ({repairData.images.length} รูป)
                    </Label>
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                      {repairData.images.map((image, index) => (
                        <div key={index} className="relative aspect-square cursor-pointer hover:opacity-80 transition-opacity">
                          <img
                            src={image}
                            alt={`รูปภาพ ${index + 1}`}
                            className="w-full h-full object-cover rounded-md border"
                            onClick={() => setSelectedImage(image)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* ฟอร์มอนุมัติงาน */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">ข้อมูลการอนุมัติงาน</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="workType">ประเภทงาน *</Label>
                    <Select
                      value={formData.workType}
                      onValueChange={(value) => handleInputChange("workType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกประเภทงาน" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BM">BM (Break Down Maintenance)</SelectItem>
                        <SelectItem value="CBM">CBM (Condition-Based Maintenance)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="technicians">รายชื่อช่างปฏิบัติงาน *</Label>
                    <Input
                      id="technicians"
                      value={formData.technicians}
                      onChange={(e) => handleInputChange("technicians", e.target.value)}
                      placeholder="ระบุรายชื่อช่าง"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label className="text-base font-medium">วางแผนวัน/เวลาปฏิบัติงาน</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDateTime">เริ่ม *</Label>
                      <Input
                        id="startDateTime"
                        type="datetime-local"
                        value={formData.startDateTime}
                        onChange={(e) => handleInputChange("startDateTime", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDateTime">สิ้นสุด *</Label>
                      <Input
                        id="endDateTime"
                        type="datetime-local"
                        value={formData.endDateTime}
                        onChange={(e) => handleInputChange("endDateTime", e.target.value)}
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
              disabled={!formData.workType || !formData.technicians || !formData.startDateTime || !formData.endDateTime}
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
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
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