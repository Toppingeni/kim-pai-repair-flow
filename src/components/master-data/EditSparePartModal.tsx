import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { type EntityStatus, type SparePart } from "@/data/masterData";

interface EditSparePartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sparePart: SparePart | null;
  componentName?: string;
  sectionName?: string;
  machineName?: string;
  onUpdate: (sparePartId: string, updatedData: {
    name: string;
    status: EntityStatus;
    qty: number;
    minQty?: number;
    unit?: string;
    description?: string;
  }) => void;
}

export function EditSparePartModal({ 
  open, 
  onOpenChange, 
  sparePart,
  componentName,
  sectionName,
  machineName,
  onUpdate 
}: EditSparePartModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    status: "Active" as EntityStatus,
    qty: 0,
    minQty: 0,
    unit: "",
    description: "",
  });
  

  // อัปเดตข้อมูลฟอร์มเมื่อ sparePart เปลี่ยน
  useEffect(() => {
    if (sparePart) {
      setFormData({
        name: sparePart.name,
        status: sparePart.status,
        qty: sparePart.qty,
        minQty: 0, // ไม่มีใน interface เดิม
        unit: sparePart.unit,
        description: "", // ไม่มีใน interface เดิม
      });
    }
  }, [sparePart]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sparePart) return;
    
    if (!formData.name.trim()) {
      alert("กรุณากรอกชื่ออะไหล่");
      return;
    }
    
    if (formData.qty < 0) {
      alert("จำนวนต้องมากกว่าหรือเท่ากับ 0");
      return;
    }
    
    onUpdate(sparePart.id, {
      name: formData.name.trim(),
      status: formData.status,
      qty: formData.qty,
      minQty: formData.minQty || undefined,
      unit: formData.unit.trim() || undefined,
      description: formData.description.trim() || undefined,
    });
    
    onOpenChange(false);
  };

  const handleCancel = () => {
    // รีเซ็ตข้อมูลกลับเป็นค่าเดิม
    if (sparePart) {
      setFormData({
        name: sparePart.name,
        status: sparePart.status,
        qty: sparePart.qty,
        minQty: 0,
        unit: sparePart.unit,
        description: "",
      });
    }
    onOpenChange(false);
  };

  if (!sparePart) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>แก้ไขอะไหล่</DialogTitle>
          <DialogDescription>
            แก้ไขข้อมูลอะไหล่ (Spare Part) ของชิ้นส่วนที่เลือก
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex gap-6 h-full min-h-[500px]">
          {/* ข้อมูลเครื่องจักรและแบบฟอร์มอะไหล่ */}
          <div className="flex-1 flex-shrink-0 flex flex-col space-y-4 min-h-0">
            {/* กล่องข้อมูลเครื่องจักร */}
            <div className="bg-muted p-3 rounded-md space-y-1">
              <p className="text-sm text-muted-foreground">เครื่องจักร:</p>
              <p className="font-medium">{machineName}</p>
              <p className="text-sm text-muted-foreground">ส่วนประกอบ:</p>
              <p className="font-medium">{sectionName}</p>
              <p className="text-sm text-muted-foreground">ชิ้นส่วน:</p>
              <p className="font-medium">{componentName}</p>
            </div>
            
            {/* กล่องข้อมูลอะไหล่หลัก */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">ชื่ออะไหล่ *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="กรอกชื่ออะไหล่"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">สถานะ</Label>
                  <Select value={formData.status} onValueChange={(value: EntityStatus) => setFormData(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">ใช้งาน</SelectItem>
                      <SelectItem value="Inactive">ไม่ใช้งาน</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="qty">จำนวน *</Label>
                  <Input
                    id="qty"
                    type="number"
                    min="0"
                    value={formData.qty}
                    onChange={(e) => setFormData(prev => ({ ...prev, qty: parseInt(e.target.value) || 0 }))}
                    placeholder="0"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="minQty">จำนวนขั้นต่ำ</Label>
                  <Input
                    id="minQty"
                    type="number"
                    min="0"
                    value={formData.minQty}
                    onChange={(e) => setFormData(prev => ({ ...prev, minQty: parseInt(e.target.value) || 0 }))}
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="unit">หน่วย</Label>
                <Input
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                  placeholder="เช่น ตัว, ชิ้น, เมตร"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">คำอธิบาย</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="รายละเอียดเพิ่มเติม (ไม่บังคับ)"
                  rows={3}
                />
              </div>
            </form>
          </div>
          
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleCancel}>
            ยกเลิก
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            บันทึกการแก้ไข
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
