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
import { type EntityStatus } from "@/data/masterData";

interface AddMachineModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (machine: {
    name: string;
    status: EntityStatus;
    description?: string;
  }) => void;
}

export function AddMachineModal({ open, onOpenChange, onAdd }: AddMachineModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    status: "Active" as "Active" | "Inactive",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    
    onAdd({
      name: formData.name.trim(),
      status: formData.status,
      description: formData.description.trim() || undefined,
    });
    
    // Reset form
    setFormData({
      name: "",
      status: "Active",
      description: "",
    });
    
    onOpenChange(false);
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      status: "Active",
      description: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>เพิ่มเครื่องจักรใหม่</DialogTitle>
          <DialogDescription>
            กรอกข้อมูลเครื่องจักรที่ต้องการเพิ่มเข้าสู่ระบบ
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="machine-name">ชื่อเครื่องจักร *</Label>
            <Input
              id="machine-name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="เช่น Apple Watch Series 9"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="machine-status">สถานะ</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "Active" | "Inactive") => 
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
          
          <div className="space-y-2">
            <Label htmlFor="machine-description">คำอธิบาย</Label>
            <Textarea
              id="machine-description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="รายละเอียดเพิ่มเติมเกี่ยวกับเครื่องจักร"
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              ยกเลิก
            </Button>
            <Button type="submit" disabled={!formData.name.trim()}>
              เพิ่มเครื่องจักร
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}