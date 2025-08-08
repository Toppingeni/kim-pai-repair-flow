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

interface AddComponentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSectionId: string | null;
  sectionName?: string;
  machineName?: string;
  onAdd: (component: {
    sectionId: string;
    name: string;
    status: EntityStatus;
    description?: string;
  }) => void;
}

export function AddComponentModal({ 
  open, 
  onOpenChange, 
  selectedSectionId, 
  sectionName,
  machineName,
  onAdd 
}: AddComponentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    status: "Active" as EntityStatus,
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !selectedSectionId) return;
    
    onAdd({
      sectionId: selectedSectionId,
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
          <DialogTitle>เพิ่มชิ้นส่วนใหม่</DialogTitle>
          <DialogDescription>
            เพิ่มชิ้นส่วน (Component) ให้กับส่วนประกอบที่เลือก
          </DialogDescription>
        </DialogHeader>
        
        {!selectedSectionId ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              กรุณาเลือกส่วนประกอบ (Section) ก่อนเพิ่มชิ้นส่วน
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="bg-muted p-3 rounded-md space-y-1">
              <p className="text-sm text-muted-foreground">เครื่องจักร:</p>
              <p className="font-medium">{machineName}</p>
              <p className="text-sm text-muted-foreground">ส่วนประกอบ:</p>
              <p className="font-medium">{sectionName}</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="component-name">ชื่อชิ้นส่วน *</Label>
                <Input
                  id="component-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="เช่น กระวิกรอย, จอภาพ Super Retina XDR"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="component-status">สถานะ</Label>
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
                <Label htmlFor="component-description">คำอธิบาย</Label>
                <Textarea
                  id="component-description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="รายละเอียดเพิ่มเติมเกี่ยวกับชิ้นส่วนนี้"
                  rows={3}
                />
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  ยกเลิก
                </Button>
                <Button type="submit" disabled={!formData.name.trim()}>
                  เพิ่มชิ้นส่วน
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}