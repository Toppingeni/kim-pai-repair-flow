import { useState, useMemo } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { type SubSparePart, searchSubSpareParts } from "@/data/masterData";

interface SubSparePartPickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (subParts: SubSparePart[]) => void;
  selectedSubPartIds?: string[];
}

export function SubSparePartPickerDialog({
  open,
  onOpenChange,
  onSelect,
  selectedSubPartIds = [],
}: SubSparePartPickerDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSelectedIds, setTempSelectedIds] = useState<string[]>(selectedSubPartIds);

  // ค้นหา sub อะไหล่
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      // ถ้าไม่มีการค้นหา ให้แสดงทั้งหมด
      return searchSubSpareParts("");
    }
    return searchSubSpareParts(searchQuery);
  }, [searchQuery]);

  // จัดการการเลือก/ยกเลิกการเลือก
  const handleToggleSelect = (subPartId: string) => {
    setTempSelectedIds(prev => 
      prev.includes(subPartId)
        ? prev.filter(id => id !== subPartId)
        : [...prev, subPartId]
    );
  };

  // จัดการการเลือกทั้งหมด
  const handleSelectAll = () => {
    const allIds = searchResults.map(item => item.id);
    setTempSelectedIds(allIds);
  };

  // จัดการการยกเลิกการเลือกทั้งหมด
  const handleDeselectAll = () => {
    setTempSelectedIds([]);
  };

  // จัดการการยืนยัน
  const handleConfirm = () => {
    const selectedSubParts = searchResults.filter(item => 
      tempSelectedIds.includes(item.id)
    );
    onSelect(selectedSubParts);
    onOpenChange(false);
  };

  // จัดการการยกเลิก
  const handleCancel = () => {
    setTempSelectedIds(selectedSubPartIds);
    setSearchQuery("");
    onOpenChange(false);
  };

  // รีเซ็ตเมื่อเปิด dialog
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setTempSelectedIds(selectedSubPartIds);
      setSearchQuery("");
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>เลือกอะไหล่ย่อย</DialogTitle>
          <DialogDescription>
            เลือกอะไหล่ย่อยที่ต้องการเพิ่ม (สามารถเลือกได้หลายรายการ)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* ส่วนค้นหา */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="ค้นหาอะไหล่ย่อย..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* ปุ่มเลือกทั้งหมด/ยกเลิกทั้งหมด */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              disabled={searchResults.length === 0}
            >
              เลือกทั้งหมด
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDeselectAll}
              disabled={tempSelectedIds.length === 0}
            >
              ยกเลิกทั้งหมด
            </Button>
            <div className="flex-1" />
            <Badge variant="secondary">
              เลือกแล้ว: {tempSelectedIds.length} รายการ
            </Badge>
          </div>

          {/* ตารางแสดงรายการอะไหล่ย่อย */}
          <div className="border rounded-md max-h-[400px] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-background">
                <TableRow>
                  <TableHead className="w-[50px]">เลือก</TableHead>
                  <TableHead className="w-[200px]">ชื่อ</TableHead>
                  <TableHead className="w-[120px]">รหัส</TableHead>
                  <TableHead className="w-[120px]">หมวดหมู่</TableHead>
                  <TableHead className="w-[80px]">จำนวน</TableHead>
                  <TableHead className="w-[80px]">หน่วย</TableHead>
                  <TableHead className="w-[80px]">สถานะ</TableHead>
                  <TableHead>คำอธิบาย</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchResults.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                      {searchQuery.trim() ? "ไม่พบอะไหล่ย่อยที่ค้นหา" : "ไม่มีข้อมูลอะไหล่ย่อย"}
                    </TableCell>
                  </TableRow>
                ) : (
                  searchResults.map((subPart) => (
                    <TableRow key={subPart.id}>
                      <TableCell>
                        <Checkbox
                          checked={tempSelectedIds.includes(subPart.id)}
                          onCheckedChange={() => handleToggleSelect(subPart.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{subPart.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{subPart.code}</TableCell>
                      <TableCell className="text-sm">{subPart.category}</TableCell>
                      <TableCell className="text-sm">{subPart.qty}</TableCell>
                      <TableCell className="text-sm">{subPart.unit}</TableCell>
                      <TableCell>
                        <Badge variant={subPart.status === 'Active' ? 'default' : 'secondary'}>
                          {subPart.status === 'Active' ? 'ใช้งาน' : 'ไม่ใช้งาน'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {subPart.description || '-'}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleCancel}>
            ยกเลิก
          </Button>
          <Button 
            type="button" 
            onClick={handleConfirm}
            disabled={tempSelectedIds.length === 0}
          >
            เลือก ({tempSelectedIds.length} รายการ)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}