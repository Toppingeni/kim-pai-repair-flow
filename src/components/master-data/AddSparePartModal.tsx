import { useState } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { type EntityStatus } from "@/data/masterData";

interface AddSparePartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedComponentId: string | null;
  componentName?: string;
  sectionName?: string;
  machineName?: string;
  onAdd: (sparePart: {
    componentId: string;
    name: string;
    status: EntityStatus;
    qty: number;
    minQty?: number;
    unit?: string;
    description?: string;
  }) => void;
}

export function AddSparePartModal({ 
  open, 
  onOpenChange, 
  selectedComponentId, 
  componentName,
  sectionName,
  machineName,
  onAdd 
}: AddSparePartModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    status: "Active" as EntityStatus,
    qty: 0,
    minQty: 0,
    unit: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !selectedComponentId || formData.qty < 0) return;
    
    onAdd({
      componentId: selectedComponentId,
      name: formData.name.trim(),
      status: formData.status,
      qty: formData.qty,
      minQty: formData.minQty > 0 ? formData.minQty : undefined,
      unit: formData.unit.trim() || undefined,
      description: formData.description.trim() || undefined,
    });
    
    // Reset form
    setFormData({
      name: "",
      status: "Active",
      qty: 0,
      minQty: 0,
      unit: "",
      description: "",
    });
    
    onOpenChange(false);
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      status: "Active",
      qty: 0,
      minQty: 0,
      unit: "",
      description: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>เพิ่มอะไหล่ใหม่</DialogTitle>
          <DialogDescription>
            เพิ่มอะไหล่ (Spare Part) ให้กับชิ้นส่วนที่เลือก
          </DialogDescription>
        </DialogHeader>
        
        {!selectedComponentId ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              กรุณาเลือกชิ้นส่วน (Component) ก่อนเพิ่มอะไหล่
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="bg-muted p-3 rounded-md space-y-1">
              <p className="text-sm text-muted-foreground">เครื่องจักร:</p>
              <p className="font-medium">{machineName}</p>
              <p className="text-sm text-muted-foreground">ส่วนประกอบ:</p>
              <p className="font-medium">{sectionName}</p>
              <p className="text-sm text-muted-foreground">ชิ้นส่วน:</p>
              <p className="font-medium">{componentName}</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="part-name">ชื่ออะไหล่ *</Label>
                <Input
                  id="part-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="เช่น สกรู 2mm, กระจกป้องกัน"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="part-qty">จำนวนคงเหลือ *</Label>
                  <Input
                    id="part-qty"
                    type="number"
                    min="0"
                    value={formData.qty}
                    onChange={(e) => setFormData(prev => ({ ...prev, qty: parseInt(e.target.value) || 0 }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="part-min-qty">จำนวนใช้</Label>
                  <Input
                    id="part-min-qty"
                    type="number"
                    min="0"
                    value={formData.minQty}
                    onChange={(e) => setFormData(prev => ({ ...prev, minQty: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="part-unit">หน่วย</Label>
                  <Input
                    id="part-unit"
                    value={formData.unit}
                    onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                    placeholder="เช่น ชิ้น, กิโลกรัม"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="part-status">สถานะ</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: EntityStatus) => 
                      setFormData(prev => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="part-description">คำอธิบาย</Label>
                <Textarea
                  id="part-description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="รายละเอียดเพิ่มเติมเกี่ยวกับอะไหล่นี้"
                  rows={3}
                />
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  ยกเลิก
                </Button>
                <Button type="submit" disabled={!formData.name.trim() || formData.qty < 0}>
                  เพิ่มอะไหล่
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}