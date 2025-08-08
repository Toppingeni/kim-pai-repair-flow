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

interface AddSectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMachineId: string | null;
  machineName?: string;
  onAdd: (section: {
    machineId: string;
    name: string;
    status: EntityStatus;
    description?: string;
  }) => void;
}

export function AddSectionModal({ 
  open, 
  onOpenChange, 
  selectedMachineId, 
  machineName,
  onAdd 
}: AddSectionModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    status: "Active" as EntityStatus,
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !selectedMachineId) return;
    
    onAdd({
      machineId: selectedMachineId,
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
          <DialogTitle>เพิ่มส่วนประกอบใหม่</DialogTitle>
          <DialogDescription>
            เพิ่มส่วนประกอบ (Section) ให้กับเครื่องจักรที่เลือก
          </DialogDescription>
        </DialogHeader>
        
        {!selectedMachineId ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              กรุณาเลือกเครื่องจักรก่อนเพิ่มส่วนประกอบ
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm text-muted-foreground">เครื่องจักรที่เลือก:</p>
              <p className="font-medium">{machineName}</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="section-name">ชื่อส่วนประกอบ *</Label>
                <Input
                  id="section-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="เช่น กล่อง, แบตเตอรี่, หน้าจอ"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="section-status">สถานะ</Label>
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
              
              <div className="space-y-2">
                <Label htmlFor="section-description">คำอธิบาย</Label>
                <Textarea
                  id="section-description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="รายละเอียดเพิ่มเติมเกี่ยวกับส่วนประกอบนี้"
                  rows={3}
                />
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  ยกเลิก
                </Button>
                <Button type="submit" disabled={!formData.name.trim()}>
                  เพิ่มส่วนประกอบ
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}