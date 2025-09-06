import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CancelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (reason: string) => void;
}

export function CancelDialog({
  open,
  onOpenChange,
  onConfirm,
}: CancelDialogProps) {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    if (reason.trim()) {
      onConfirm(reason.trim());
      setReason(""); // รีเซ็ตฟอร์ม
    }
  };

  const handleCancel = () => {
    setReason(""); // รีเซ็ตฟอร์ม
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-destructive">
            ยกเลิกใบสั่งงานซ่อม
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="cancelReason" className="text-sm font-medium">
              สาเหตุในการยกเลิก *
            </Label>
            <Textarea
              id="cancelReason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="กรุณาระบุสาเหตุในการยกเลิกใบสั่งงานซ่อม..."
              className="mt-2 min-h-[100px]"
              required
            />
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>⚠️ การยกเลิกใบสั่งงานจะไม่สามารถย้อนกลับได้</p>
          </div>
        </div>

        <DialogFooter className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            ยกเลิก
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={!reason.trim()}
          >
            ยืนยัน
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}