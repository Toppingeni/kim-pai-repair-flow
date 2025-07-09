import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, Package } from "lucide-react";
import { Part } from "./PartsManagementEnhanced";

// Mock spare parts data
const mockSpareParts = [
  { id: "SP001", name: "มอเตอร์ X5", code: "MOT-X5-001", category: "มอเตอร์", stock: 15, unit: "ตัว" },
  { id: "SP002", name: "เซ็นเซอร์ Y2", code: "SEN-Y2-002", category: "เซ็นเซอร์", stock: 25, unit: "ตัว" },
  { id: "SP003", name: "สายไฟ 3 เมตร", code: "CAB-3M-003", category: "สายไฟ", stock: 50, unit: "เส้น" },
  { id: "SP004", name: "สกรูยึด M6", code: "SCR-M6-004", category: "น็อต/สกรู", stock: 200, unit: "ตัว" },
  { id: "SP005", name: "เฟืองขนาดเล็ก", code: "GER-SM-005", category: "เฟือง", stock: 8, unit: "ตัว" },
  { id: "SP006", name: "ลูกปืน 608ZZ", code: "BRG-608-006", category: "ลูกปืน", stock: 30, unit: "ตัว" },
  { id: "SP007", name: "สายพาน A-50", code: "BLT-A50-007", category: "สายพาน", stock: 12, unit: "เส้น" },
  { id: "SP008", name: "ปั๊มน้ำมัน", code: "PMP-OIL-008", category: "ปั๊ม", stock: 5, unit: "ตัว" },
  { id: "SP009", name: "วาล์วลม", code: "VAL-AIR-009", category: "วาล์ว", stock: 18, unit: "ตัว" },
  { id: "SP010", name: "หลอดไฟ LED 24V", code: "LED-24V-010", category: "ไฟ", stock: 40, unit: "หลอด" },
];

interface SparePartsSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedParts: Part[];
  onPartsSelected: (parts: Part[]) => void;
}

export function SparePartsSelectionDialog({
  open,
  onOpenChange,
  selectedParts,
  onPartsSelected,
}: SparePartsSelectionDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [tempSelectedParts, setTempSelectedParts] = useState<Part[]>(selectedParts);

  useEffect(() => {
    setTempSelectedParts(selectedParts);
  }, [selectedParts, open]);

  const filteredParts = mockSpareParts.filter(part => 
    part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isPartSelected = (partId: string) => {
    return tempSelectedParts.some(p => p.code === partId);
  };

  const handlePartToggle = (sparePart: typeof mockSpareParts[0], checked: boolean) => {
    if (checked) {
      const newPart: Part = {
        id: Date.now().toString(),
        name: sparePart.name,
        code: sparePart.code,
        quantity: 1,
        type: "stock",
        status: "ใหม่",
      };
      setTempSelectedParts([...tempSelectedParts, newPart]);
    } else {
      setTempSelectedParts(tempSelectedParts.filter(p => p.code !== sparePart.code));
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
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            เลือกอะไหล่จากคลัง
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
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
              />
            </div>
          </div>

          {/* Selected parts summary */}
          {tempSelectedParts.length > 0 && (
            <div className="p-3 bg-muted/50 rounded-lg">
              <Label className="text-sm font-medium mb-2 block">
                อะไหล่ที่เลือก ({tempSelectedParts.length} รายการ)
              </Label>
              <div className="flex flex-wrap gap-2">
                {tempSelectedParts.map((part) => (
                  <Badge key={part.id} variant="secondary" className="text-xs">
                    {part.name} ({part.code})
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Parts list */}
          <div className="border rounded-lg max-h-[400px] overflow-y-auto">
            <div className="p-4 space-y-3">
              {filteredParts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>ไม่พบอะไหล่ที่ค้นหา</p>
                </div>
              ) : (
                filteredParts.map((part) => (
                  <div key={part.id} className="flex items-start space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50">
                    <Checkbox
                      checked={isPartSelected(part.code)}
                      onCheckedChange={(checked) => handlePartToggle(part, checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium text-sm">{part.name}</h4>
                          <p className="text-xs text-muted-foreground">รหัส: {part.code}</p>
                          <p className="text-xs text-muted-foreground">หมวดหมู่: {part.category}</p>
                        </div>
                        <div className="text-right space-y-1">
                          <Badge variant={part.stock > 10 ? "outline" : "destructive"} className="text-xs">
                            คงเหลือ: {part.stock} {part.unit}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={handleCancel}>
              ยกเลิก
            </Button>
            <Button onClick={handleConfirm}>
              ยืนยันการเลือก ({tempSelectedParts.length} รายการ)
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}