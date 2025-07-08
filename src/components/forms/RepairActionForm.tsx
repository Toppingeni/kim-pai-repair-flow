import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { OriginalRequestInfo } from "./repair-action/OriginalRequestInfo";
import { RepairDetailsForm } from "./repair-action/RepairDetailsForm";
import { PartsManagement, Part } from "./repair-action/PartsManagementEnhanced";
import { PreventionMeasures } from "./repair-action/PreventionMeasures";
import { ActionButtons } from "./repair-action/ActionButtons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Wrench, AlertTriangle } from "lucide-react";

const mockOriginalRequest = {
  id: "M-001",
  machine: "Extruder A",
  problem: "เสียงดังผิดปกติ จากมอเตอร์หลัก เมื่อเครื่องทำงานนานกว่า 2 ชั่วโมง",
  reporter: "สมศรี (ฝ่ายผลิต)",
  reportDate: "07/07/2568 09:30",
  images: ["image1.jpg", "image2.jpg"],
};

const engineers = [
  { id: "eng1", name: "นายสมชาย" },
  { id: "eng2", name: "นางสาวอร" },
  { id: "eng3", name: "นายวิชัย" },
];

// Mock data for previous repair history
const mockRepairHistory = [
  {
    revision: 1,
    date: "05/07/2568 14:00 - 16:30",
    engineer: "นายสมชาย",
    method: "เปลี่ยนแบริ่งมอเตอร์หลัก และปรับแรงดันลมเขา้ระบบ",
    cause: "แบริ่งมอเตอร์สึกหรอเนื่องจากใช้งานมานาน",
    result: "success",
    parts: [
      { name: "แบริ่ง SKF 6308", code: "BRG-001", quantity: 2 }
    ],
    status: "ปิดงานแล้ว"
  }
];

export function RepairActionForm() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isRevision = searchParams.get('revision') === 'true';
  const [selectedEngineer, setSelectedEngineer] = useState("eng1");
  const [repairResult, setRepairResult] = useState("");
  const [parts, setParts] = useState<Part[]>([
    {
      id: "1",
      name: "มอเตอร์ (Motor X)",
      code: "MOT-001",
      quantity: 1,
      type: "stock",
      status: "เบิกแล้ว",
    },
    {
      id: "2", 
      name: "เซ็นเซอร์ (Sensor Y)",
      code: "SEN-002",
      quantity: 2,
      type: "purchase",
      status: "รอรับของ",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Repair action form submitted");
  };

  const addPart = () => {
    const newPart: Part = {
      id: Date.now().toString(),
      name: "",
      code: "",
      quantity: 1,
      type: "stock",
      status: "ใหม่",
    };
    setParts([...parts, newPart]);
  };

  const removePart = (id: string) => {
    setParts(parts.filter(p => p.id !== id));
  };

  const handleSave = () => {
    console.log("Saving repair action for:", id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          {isRevision ? 'บันทึกการซ่อมใหม่ (รีวิชั่น)' : 'บันทึกการดำเนินการซ่อม'}: {id || mockOriginalRequest.id} ({mockOriginalRequest.machine})
        </h1>
        {isRevision && (
          <p className="text-muted-foreground mt-2">
            การซ่อมครั้งใหม่เนื่องจากเสียซ้ำที่เดิม
          </p>
        )}
      </div>

      {/* แสดงประวัติการซ่อมก่อนหน้าเมื่อเป็นโหมดรีวิชั่น */}
      {isRevision && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              ประวัติการซ่อมก่อนหน้า
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockRepairHistory.map((history, index) => (
              <div key={index} className="border border-border rounded-lg p-4 bg-muted/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">รีวิชั่น {history.revision}</Badge>
                    <Badge variant="secondary">{history.status}</Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{history.date}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-muted-foreground">ผู้รับผิดชอบ</div>
                    <div>{history.engineer}</div>
                  </div>
                  <div>
                    <div className="font-medium text-muted-foreground">ผลการซ่อม</div>
                    <div className="text-status-completed">ซ่อมสำเร็จ</div>
                  </div>
                </div>
                
                <Separator className="my-3" />
                
                <div className="space-y-2 text-sm">
                  <div>
                    <div className="font-medium text-muted-foreground">วิธีการซ่อม</div>
                    <div>{history.method}</div>
                  </div>
                  <div>
                    <div className="font-medium text-muted-foreground">สาเหตุ</div>
                    <div>{history.cause}</div>
                  </div>
                  <div>
                    <div className="font-medium text-muted-foreground">อะไหล่ที่ใช้</div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {history.parts.map((part, partIndex) => (
                        <span key={partIndex} className="text-xs bg-background border border-border rounded px-2 py-1">
                          {part.name} ({part.code}) x{part.quantity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <OriginalRequestInfo request={mockOriginalRequest} />

        <RepairDetailsForm
          selectedEngineer={selectedEngineer}
          onEngineerChange={setSelectedEngineer}
          repairResult={repairResult}
          onRepairResultChange={setRepairResult}
          engineers={engineers}
        />

        <PartsManagement
          parts={parts}
          onAddPart={addPart}
          onRemovePart={removePart}
        />

        <PreventionMeasures />

        <ActionButtons 
          repairResult={repairResult} 
          repairId={id || mockOriginalRequest.id}
          onSave={handleSave}
        />
      </form>
    </div>
  );
}