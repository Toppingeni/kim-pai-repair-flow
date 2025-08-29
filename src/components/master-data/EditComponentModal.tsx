import { useEffect, useState } from "react";
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
import { type ComponentItem } from "@/data/masterData";

interface EditComponentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  component: ComponentItem | null;
  sectionName?: string;
  machineName?: string;
  onUpdate: (componentId: string, updated: { name: string }) => void;
}

export function EditComponentModal({ open, onOpenChange, component, sectionName, machineName, onUpdate }: EditComponentModalProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(component?.name ?? "");
  }, [component]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!component) return;
    const trimmed = name.trim();
    if (!trimmed) return;
    onUpdate(component.id, { name: trimmed });
    onOpenChange(false);
  };

  if (!component) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>แก้ไขชื่อชิ้นส่วน</DialogTitle>
          <DialogDescription>
            ปรับชื่อ Component ใน {sectionName || "-"} / {machineName || "-"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="component-name">ชื่อชิ้นส่วน *</Label>
            <Input id="component-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="ชื่อชิ้นส่วน" />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              ยกเลิก
            </Button>
            <Button type="submit" disabled={!name.trim()}>บันทึก</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

