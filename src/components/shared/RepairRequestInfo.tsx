import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface RepairRequestData {
  id: string;
  documentNumber?: string;
  location?: string;
  machine: string;
  section?: string;
  reportedDate?: string;
  reportedTime?: string;
  reporter?: string;
  contactNumber?: string;
  priority?: string;
  problem: string;
  description?: string;
  images?: string[];
  date?: string; // fallback for old format
}

interface RepairRequestInfoProps {
  request: RepairRequestData;
  title?: string;
  defaultExpanded?: boolean;
  className?: string;
}

export function RepairRequestInfo({ 
  request, 
  title = "ข้อมูลใบแจ้งซ่อม",
  defaultExpanded = false,
  className 
}: RepairRequestInfoProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <Card className={cn("shadow-card", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 p-0"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-4 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                รหัสเอกสาร
              </Label>
              <div className="mt-1 p-2 bg-muted rounded-md">
                {request.documentNumber || request.id}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                สถานที่ตั้ง
              </Label>
              <div className="mt-1 p-2 bg-muted rounded-md">
                {request.location || "ไม่ระบุ"}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                เครื่องจักร
              </Label>
              <div className="mt-1 p-2 bg-muted rounded-md">
                {request.machine}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                ส่วนประกอบ (Section)
              </Label>
              <div className="mt-1 p-2 bg-muted rounded-md">
                {request.section || "ไม่ระบุ"}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                วันที่และเวลาที่แจ้งซ่อม
              </Label>
              <div className="mt-1 p-2 bg-muted rounded-md">
                {request.reportedDate && request.reportedTime
                  ? `${request.reportedDate} ${request.reportedTime}`
                  : request.date || "ไม่ระบุ"}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                ผู้แจ้งซ่อม
              </Label>
              <div className="mt-1 p-2 bg-muted rounded-md">
                {request.reporter || "ไม่ระบุ"}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                เบอร์ติดต่อ
              </Label>
              <div className="mt-1 p-2 bg-muted rounded-md">
                {request.contactNumber || "ไม่ระบุ"}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                ความสำคัญ
              </Label>
              <div className="mt-1 p-2 bg-muted rounded-md">
                {request.priority || "ไม่ระบุ"}
              </div>
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              ปัญหาเบื้องต้น/อาการ
            </Label>
            <div className="mt-1 p-2 bg-muted rounded-md min-h-[80px]">
              {request.problem}
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              หมายเหตุ
            </Label>
            <div className="mt-1 p-2 bg-muted rounded-md min-h-[60px]">
              {request.description || "ไม่มีหมายเหตุ"}
            </div>
          </div>
          
          {request.images && request.images.length > 0 && (
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                รูปภาพประกอบ ({request.images.length} รูป)
              </Label>
              <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                {request.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={image}
                      alt={`รูปภาพ ${index + 1}`}
                      className="w-full h-full object-cover rounded-md border"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* แสดงรูปภาพแบบ placeholder ถ้าไม่มีรูปภาพจริง */}
          {(!request.images || request.images.length === 0) && (
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                รูปภาพประกอบ
              </Label>
              <div className="mt-2 flex space-x-2">
                {[1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="w-20 h-20 bg-muted rounded border flex items-center justify-center"
                  >
                    <span className="text-xs text-muted-foreground">
                      IMG {index}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}