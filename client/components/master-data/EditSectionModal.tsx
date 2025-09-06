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
import { type Section } from "@/data/masterData";

interface EditSectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  section: Section | null;
  machineName?: string;
  onUpdate: (sectionId: string, updated: { name: string }) => void;
}

export function EditSectionModal({ open, onOpenChange, section, machineName, onUpdate }: EditSectionModalProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(section?.name ?? "");
  }, [section]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!section) return;
    const trimmed = name.trim();
    if (!trimmed) return;
    onUpdate(section.id, { name: trimmed });
    onOpenChange(false);
  };

  if (!section) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>แก้ไขชื่อส่วนประกอบ</DialogTitle>
          <DialogDescription>
            ปรับชื่อ Section สำหรับเครื่องจักร {machineName || "-"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="section-name">ชื่อส่วนประกอบ *</Label>
            <Input id="section-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="ชื่อส่วนประกอบ" />
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

