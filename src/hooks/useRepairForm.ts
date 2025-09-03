import { useState } from "react";
import { Part } from "@/components/forms/repair-action/PartsManagementEnhanced";

export function useRepairForm() {
  const [selectedEngineer, setSelectedEngineer] = useState("eng1");
  const [repairResult, setRepairResult] = useState("");
  const [repairReason, setRepairReason] = useState("");
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

  const handlePartsSelected = (selectedParts: Part[]) => {
    setParts(selectedParts);
  };

  const removePart = (id: string) => {
    const partToRemove = parts.find(p => p.id === id);
    
    // If part has PO number, remove all parts with the same PO number
    if (partToRemove && (partToRemove as any).poNumber) {
      const poNumber = (partToRemove as any).poNumber;
      setParts(parts.filter(p => (p as any).poNumber !== poNumber));
    } else {
      // Regular single part removal
      setParts(parts.filter(p => p.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Repair action form submitted");
  };

  const handleSave = () => {
    console.log("Saving repair action");
  };

  return {
    selectedEngineer,
    setSelectedEngineer,
    repairResult,
    setRepairResult,
    repairReason,
    setRepairReason,
    parts,
    addPart,
    removePart,
    handleSubmit,
    handleSave,
    handlePartsSelected,
  };
}
