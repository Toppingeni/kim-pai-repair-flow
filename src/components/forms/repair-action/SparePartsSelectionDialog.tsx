import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Search, Package, AlertCircle } from "lucide-react";
import { Part } from "./PartsManagementEnhanced";
import { 
  mockMachines, 
  mockSections, 
  mockComponents, 
  mockSpareParts,
  getSectionsByMachineId,
  getComponentsBySectionId,
  getSparePartsByComponentId,
  type Machine,
  type Section,
  type ComponentItem,
  type SparePart
} from "@/data/masterData";

interface SparePartsSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedParts: Part[];
  onPartsSelected: (parts: Part[]) => void;
  machineId?: string; // เครื่องจักรที่แจ้งซ่อม
}

export function SparePartsSelectionDialog({
  open,
  onOpenChange,
  selectedParts,
  onPartsSelected,
  machineId,
}: SparePartsSelectionDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [tempSelectedParts, setTempSelectedParts] = useState<Part[]>(selectedParts);
  const [selectedMachineId, setSelectedMachineId] = useState<string>(machineId || "");
  const [selectedSectionId, setSelectedSectionId] = useState<string>("");
  const [selectedComponentId, setSelectedComponentId] = useState<string>("");

  useEffect(() => {
    setTempSelectedParts(selectedParts);
  }, [selectedParts, open]);

  // ฟิลเตอร์ข้อมูลตามการเลือก
  const availableSections = getSectionsByMachineId(selectedMachineId);
  const availableComponents = getComponentsBySectionId(selectedSectionId);
  const availableParts = getSparePartsByComponentId(selectedComponentId);

  // ฟิลเตอร์อะไหล่ตามคำค้นหา
  const filteredParts = availableParts.filter((part) =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isPartSelected = (partId: string) => {
    return tempSelectedParts.some(p => p.id === partId);
  };

  const handlePartToggle = (part: SparePart) => {
    const existingPart = tempSelectedParts.find(p => p.id === part.id);
    
    if (existingPart) {
      setTempSelectedParts(prev => prev.filter(p => p.id !== part.id));
    } else {
      const newPart: Part = {
        id: part.id,
        name: part.name,
        code: part.code,
        quantity: part.defaultUsage, // ใช้ defaultUsage แทน 1
        type: "stock",
        status: "ใหม่",
      };
      setTempSelectedParts(prev => [...prev, newPart]);
    }
  };

  const handleConfirm = () => {
    onPartsSelected(tempSelectedParts);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setTempSelectedParts(selectedParts);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            เลือกอะไหล่จากคลัง
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          {/* Machine, Section, Component Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>เครื่องจักร</Label>
              <Select value={selectedMachineId} onValueChange={(value) => {
                setSelectedMachineId(value);
                setSelectedSectionId("");
                setSelectedComponentId("");
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกเครื่องจักร" />
                </SelectTrigger>
                <SelectContent>
                  {mockMachines.map((machine) => (
                    <SelectItem key={machine.id} value={machine.id}>
                      {machine.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>ส่วนประกอบ (Section)</Label>
              <Select 
                value={selectedSectionId} 
                onValueChange={(value) => {
                  setSelectedSectionId(value);
                  setSelectedComponentId("");
                }}
                disabled={!selectedMachineId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกส่วนประกอบ" />
                </SelectTrigger>
                <SelectContent>
                  {availableSections.map((section) => (
                    <SelectItem key={section.id} value={section.id}>
                      {section.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>ชิ้นส่วน (Component)</Label>
              <Select 
                value={selectedComponentId} 
                onValueChange={setSelectedComponentId}
                disabled={!selectedSectionId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกชิ้นส่วน" />
                </SelectTrigger>
                <SelectContent>
                  {availableComponents.map((component) => (
                    <SelectItem key={component.id} value={component.id}>
                      {component.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search">ค้นหาอะไหล่</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="ค้นหาด้วยชื่อหรือรหัสอะไหล่"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                disabled={!selectedComponentId}
              />
            </div>
          </div>



          {/* Parts list */}
          <div className="space-y-2 flex-1 flex flex-col">
            <Label>รายการอะไหล่ ({filteredParts.length} รายการ)</Label>
            {!selectedComponentId ? (
              <div className="h-64 border border-border rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Package className="mx-auto h-12 w-12 mb-2" />
                  <p>กรุณาเลือกเครื่องจักร ส่วนประกอบ และชิ้นส่วนก่อน</p>
                </div>
              </div>
            ) : (
              <ScrollArea className="h-64 border border-border rounded-lg">
                <div className="p-4 space-y-3">
                  {filteredParts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Package className="mx-auto h-12 w-12 mb-2" />
                      <p>ไม่พบอะไหล่ที่ค้นหา</p>
                    </div>
                  ) : (
                    filteredParts.map((part) => {
                      const remainingStock = part.stock - part.used;
                      const isLowStock = remainingStock < part.defaultUsage;
                      
                      return (
                        <div key={part.id} className="flex items-start space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50">
                          <Checkbox
                            checked={isPartSelected(part.id)}
                            onCheckedChange={() => handlePartToggle(part)}
                            className="mt-1"
                            disabled={remainingStock < part.defaultUsage}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-sm">{part.name}</h4>
                              <Badge variant="outline" className="text-xs">
                                {part.code}
                              </Badge>
                            </div>
                            <div className="mt-1 flex items-center space-x-4 text-xs text-muted-foreground">
                              <span className={isLowStock ? "text-red-500 font-medium" : ""}>
                                คงเหลือ: {remainingStock} {part.unit}
                              </span>
                              <span>ใช้งาน: {part.defaultUsage} {part.unit}</span>
                              {isLowStock && (
                                <div className="flex items-center text-red-500">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  <span>ไม่เพียงพอ</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </ScrollArea>
            )}
          </div>

        </div>
        
        <DialogFooter className="mt-4">
        <Button variant="outline" onClick={handleCancel}>
          ยกเลิก
        </Button>
        <Button onClick={handleConfirm}>
          ยืนยันการเลือก ({tempSelectedParts.length} รายการ)
        </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}