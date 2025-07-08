import { useState } from "react";
import { useParams } from "react-router-dom";
import { OriginalRequestInfo } from "./repair-action/OriginalRequestInfo";
import { RepairDetailsForm } from "./repair-action/RepairDetailsForm";
import { PartsManagement, Part } from "./repair-action/PartsManagementEnhanced";
import { PreventionMeasures } from "./repair-action/PreventionMeasures";
import { ActionButtons } from "./repair-action/ActionButtons";

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

export function RepairActionForm() {
  const { id } = useParams();
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
          บันทึกการดำเนินการซ่อม: {id || mockOriginalRequest.id} ({mockOriginalRequest.machine})
        </h1>
      </div>

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