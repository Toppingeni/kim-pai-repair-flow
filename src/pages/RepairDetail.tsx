import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useUserRole } from "@/contexts/UserRoleContext";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Wrench, 
  AlertTriangle,
  Clock,
  CheckCircle,
  Image,
  FileText
} from "lucide-react";

// Mock data for repair details
const mockRepairData: Record<string, any> = {
  "M-001": {
    id: "M-001",
    machine: "Extruder A",
    machineCode: "EXT-001",
    location: "อาคาร 1, Line 1",
    problem: "เสียงดังผิดปกติจากมอเตอร์หลัก เมื่อเครื่องทำงานที่ความเร็วสูง",
    requestDate: "07/07/2568 14:30",
    reporter: "สมศรี (ฝ่ายผลิต)",
    workType: "maintenance",
    status: "completed",
    engineer: "นายสมชาย",
    urgency: "normal",
    images: ["machine-sound.jpg", "motor-close.jpg"],
    notes: "เสียงดังมากขึ้นเรื่อยๆ ต้องการตรวจสอบด่วน",
    repairDetails: {
      startDate: "07/07/2568 15:00",
      endDate: "08/07/2568 16:30",
      description: "เปลี่ยนแบริ่งมอเตอร์หลักและตรวจสอบระบบขับเคลื่อน",
      cause: "แบริ่งมอเตอร์สึกหรอเนื่องจากใช้งานมานาน",
      result: "success",
      usedParts: [
        { name: "แบริ่ง SKF 6308", code: "BRG-001", quantity: 2, status: "ใช้แล้ว" },
        { name: "น้ำมันเกียร์", code: "OIL-001", quantity: 1, status: "ใช้แล้ว" }
      ]
    }
  },
  "M-002": {
    id: "M-002", 
    machine: "Packing M/C",
    machineCode: "PACK-001",
    location: "อาคาร 1, Line 2",
    problem: "แพ็คไม่แน่น สินค้าหลุดออกจากบรรจุภัณฑ์",
    requestDate: "05/07/2568 09:15",
    reporter: "สมศรี (ฝ่ายผลิต)",
    workType: "emergency",
    status: "waiting",
    engineer: "นางสาวอร",
    urgency: "high",
    images: ["packing-loose.jpg"],
    notes: "ส่งผลกระทบต่อคุณภาพสินค้า",
    repairDetails: {
      startDate: "05/07/2568 10:00",
      endDate: "06/07/2568 16:30",
      description: "ปรับแรงดันระบบนิวเมติก และเปลี่ยนซีลยาง",
      cause: "ซีลยางชำรุด ทำให้แรงดันลด",
      result: "success",
      usedParts: [
        { name: "ซีลยาง", code: "SEAL-002", quantity: 4, status: "ใช้แล้ว" }
      ]
    }
  },
  "M-003": {
    id: "M-003",
    machine: "Conveyor Belt",
    machineCode: "CONV-001",
    location: "อาคาร 2, Line 1",
    problem: "สายพานลื่น ทำให้ขนส่งสินค้าไม่ได้",
    requestDate: "01/07/2568 08:00",
    reporter: "สมชาย (ฝ่ายผลิต)",
    workType: "maintenance",
    status: "progress",
    engineer: "นายวิชัย",
    urgency: "high",
    images: ["conveyor-belt.jpg"],
    notes: "ส่งผลกระทบต่อการผลิต",
    repairDetails: {
      startDate: "01/07/2568 09:00",
      endDate: null,
      description: "ตรวจสอบสายพานและระบบขับเคลื่อน",
      cause: "สายพานยืดเนื่องจากใช้งานมานาน",
      result: null,
      usedParts: [
        { name: "สายพาน", code: "BELT-001", quantity: 1, status: "รอรับของ" }
      ]
    }
  }
};

interface RepairDetailProps {}

export function RepairDetail({}: RepairDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userRole } = useUserRole();

  const repairData = id ? mockRepairData[id] : null;

  if (!repairData) {
    return (
      <MainLayout>
        <div className="flex-1 p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">ไม่พบข้อมูลใบแจ้งซ่อม</h1>
            <Button onClick={() => navigate(-1)} className="mt-4">
              กลับหน้าเดิม
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const statusConfig = {
    new: { label: "งานใหม่", variant: "secondary" as const, color: "text-status-new" },
    progress: { label: "กำลังซ่อม", variant: "outline" as const, color: "text-status-progress" },
    waiting: { label: "รอยืนยัน", variant: "destructive" as const, color: "text-status-waiting" },
    completed: { label: "ปิดงานแล้ว", variant: "outline" as const, color: "text-status-completed" },
    pending: { label: "รออะไหล่", variant: "secondary" as const, color: "text-status-pending" },
  };

  const urgencyConfig = {
    low: { label: "ต่ำ", variant: "secondary" as const },
    normal: { label: "ปกติ", variant: "outline" as const },
    high: { label: "สูง", variant: "destructive" as const },
    emergency: { label: "ฉุกเฉิน", variant: "destructive" as const },
  };

  const handleAcceptJob = () => {
    toast({
      title: "รับงานสำเร็จ",
      description: `รับงานซ่อม ${repairData.id} เรียบร้อยแล้ว`,
    });
  };

  const handleConfirmCompletion = () => {
    toast({
      title: "ยืนยันการปิดงาน",
      description: `ยืนยันการปิดงาน ${repairData.id} เรียบร้อยแล้ว`,
    });
  };

  const handleStartRepair = () => {
    navigate(`/repair-action/${id}`);
  };

  const getActionButtons = () => {
    if (userRole === "production") {
      if (repairData.status === "waiting") {
        return (
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              กลับ
            </Button>
            <Button variant="success" onClick={handleConfirmCompletion}>
              <CheckCircle className="h-4 w-4 mr-2" />
              ยืนยันปิดงาน
            </Button>
          </div>
        );
      }
      return (
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          กลับ
        </Button>
      );
    } else {
      // Engineering role
      if (repairData.status === "new") {
        return (
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              กลับ
            </Button>
            <Button variant="default" onClick={handleAcceptJob}>
              <User className="h-4 w-4 mr-2" />
              รับงาน
            </Button>
          </div>
        );
      }
      if (repairData.status === "progress") {
        return (
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              กลับ
            </Button>
            <Button variant="info" onClick={handleStartRepair}>
              <Wrench className="h-4 w-4 mr-2" />
              บันทึกการซ่อม
            </Button>
          </div>
        );
      }
      if (repairData.status === "completed") {
        return (
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              กลับ
            </Button>
            <Button variant="warning" onClick={() => navigate(`/repair-action/${id}?revision=true`)}>
              <Wrench className="h-4 w-4 mr-2" />
              ซ่อมใหม่/เพิ่มรีวิชั่น
            </Button>
          </div>
        );
      }
      return (
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          กลับ
        </Button>
      );
    }
  };

  return (
    <MainLayout>
      <div className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              รายละเอียดใบแจ้งซ่อม {repairData.id}
            </h1>
            <p className="text-muted-foreground">
              {repairData.machine} - {repairData.location}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={statusConfig[repairData.status as keyof typeof statusConfig].variant}>
              {statusConfig[repairData.status as keyof typeof statusConfig].label}
            </Badge>
            <Badge variant={urgencyConfig[repairData.urgency as keyof typeof urgencyConfig].variant}>
              ความเร่งด่วน: {urgencyConfig[repairData.urgency as keyof typeof urgencyConfig].label}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Original Request Info */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  ข้อมูลการแจ้งซ่อม
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">เครื่องจักร</div>
                    <div className="font-medium">{repairData.machine}</div>
                    <div className="text-sm text-muted-foreground">รหัส: {repairData.machineCode}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">สถานที่ตั้ง</div>
                    <div className="font-medium">{repairData.location}</div>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-2">ปัญหาเบื้องต้น</div>
                  <p className="text-foreground">{repairData.problem}</p>
                </div>

                {repairData.notes && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-2">หมายเหตุ</div>
                    <p className="text-foreground">{repairData.notes}</p>
                  </div>
                )}

                {repairData.images && repairData.images.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-2">รูปภาพประกอบ</div>
                    <div className="flex space-x-2">
                      {repairData.images.map((image: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2 p-2 border border-border rounded-md">
                          <Image className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{image}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Repair Details (if available) */}
            {repairData.repairDetails && (repairData.status === "progress" || repairData.status === "waiting" || repairData.status === "completed") && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-primary" />
                    รายละเอียดการซ่อม
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">เริ่มซ่อม</div>
                      <div className="font-medium">{repairData.repairDetails.startDate}</div>
                    </div>
                    {repairData.repairDetails.endDate && (
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">เสร็จสิ้น</div>
                        <div className="font-medium">{repairData.repairDetails.endDate}</div>
                      </div>
                    )}
                  </div>

                  {repairData.repairDetails.description && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-2">วิธีการซ่อม</div>
                      <p className="text-foreground">{repairData.repairDetails.description}</p>
                    </div>
                  )}

                  {repairData.repairDetails.cause && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-2">สาเหตุความเสียหาย</div>
                      <p className="text-foreground">{repairData.repairDetails.cause}</p>
                    </div>
                  )}

                  {repairData.repairDetails.usedParts && repairData.repairDetails.usedParts.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-2">อะไหล่ที่ใช้</div>
                      <div className="space-y-2">
                        {repairData.repairDetails.usedParts.map((part: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-2 border border-border rounded-md">
                            <div>
                              <div className="font-medium">{part.name}</div>
                              <div className="text-sm text-muted-foreground">รหัส: {part.code} | จำนวน: {part.quantity}</div>
                            </div>
                            <Badge variant="secondary">{part.status}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Timeline */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  สถานะและเวลา
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">วันที่แจ้ง</div>
                    <div className="font-medium">{repairData.requestDate}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">ผู้แจ้ง</div>
                    <div className="font-medium">{repairData.reporter}</div>
                  </div>
                </div>

                {repairData.engineer && (
                  <div className="flex items-center space-x-2">
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">ผู้รับผิดชอบ</div>
                      <div className="font-medium">{repairData.engineer}</div>
                    </div>
                  </div>
                )}

                <Separator />

                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-2">ประเภทงาน</div>
                  <Badge variant={repairData.workType === "emergency" ? "destructive" : "secondary"}>
                    {repairData.workType === "emergency" ? "ฉุกเฉิน" : "ซ่อมบำรุง"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  เอกสารที่เกี่ยวข้อง
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    รายงานการซ่อม PDF
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    ใบเบิกอะไหล่
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end border-t border-border pt-6">
          {getActionButtons()}
        </div>
      </div>
    </MainLayout>
  );
}