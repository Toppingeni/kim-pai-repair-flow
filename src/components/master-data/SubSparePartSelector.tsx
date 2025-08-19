import { useState } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import { type SubSparePart, type EntityStatus } from "@/data/masterData";
import { SubSparePartPickerDialog } from "./SubSparePartPickerDialog";

export interface SelectedSubPart {
  subPart: SubSparePart;
  qty: number;
  unit: string;
  status: EntityStatus;
  description?: string;
}

interface SubSparePartSelectorProps {
  selectedSubParts: SelectedSubPart[];
  onSubPartsChange: (subParts: SelectedSubPart[]) => void;
}

export function SubSparePartSelector({ selectedSubParts, onSubPartsChange }: SubSparePartSelectorProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [addFormData, setAddFormData] = useState({
    qty: 1,
    unit: "",
    status: "Active" as EntityStatus,
    description: "",
  });

  // จัดการการเลือกอะไหล่ย่อยจาก dialog
  const handleSelectSubParts = (subParts: SubSparePart[]) => {
    const newSelectedSubParts: SelectedSubPart[] = subParts.map(subPart => ({
      subPart,
      qty: 1,
      unit: subPart.unit,
      status: "Active" as EntityStatus,
      description: "",
    }));
    
    // เพิ่มเฉพาะรายการที่ยังไม่ได้เลือก
    const existingIds = selectedSubParts.map(item => item.subPart.id);
    const filteredNewItems = newSelectedSubParts.filter(
      item => !existingIds.includes(item.subPart.id)
    );
    
    onSubPartsChange([...selectedSubParts, ...filteredNewItems]);
  };

  // ดึง ID ของอะไหล่ย่อยที่เลือกแล้ว
  const selectedSubPartIds = selectedSubParts.map(item => item.subPart.id);

  // ลบ sub อะไหล่
  const handleRemoveSubPart = (subPartId: string) => {
    onSubPartsChange(selectedSubParts.filter(item => item.subPart.id !== subPartId));
  };

  // อัปเดตข้อมูล sub อะไหล่ที่เลือกแล้ว
  const handleUpdateSubPart = (subPartId: string, field: keyof SelectedSubPart, value: number | string | EntityStatus) => {
    onSubPartsChange(
      selectedSubParts.map(item => 
        item.subPart.id === subPartId 
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-lg">อะไหล่ย่อย (Sub Parts)</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col space-y-4 min-h-0">
        {/* ปุ่มเพิ่มอะไหล่ย่อย */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsPickerOpen(true)}
            className="w-full flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            เลือกอะไหล่ย่อย
          </Button>
        </div>
        
        {/* ตารางแสดง sub อะไหล่ที่เลือกแล้ว */}
        {selectedSubParts.length > 0 && (
          <div className="flex-1 flex flex-col min-h-0">
            <Label className="text-sm font-medium mb-2 block">อะไหล่ย่อยที่เลือก:</Label>
            <div className="border rounded-md flex-1 overflow-hidden">
              <div className="h-full overflow-y-auto">
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">ชื่อ</TableHead>
                    <TableHead className="w-[100px]">รหัส</TableHead>
                    <TableHead className="w-[80px]">จำนวน</TableHead>
                    <TableHead className="w-[80px]">หน่วย</TableHead>
                    <TableHead className="w-[80px]">สถานะ</TableHead>
                    <TableHead className="w-[150px]">คำอธิบาย</TableHead>
                    <TableHead className="w-[60px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedSubParts.map((item) => (
                    <TableRow key={item.subPart.id}>
                      <TableCell className="font-medium">{item.subPart.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{item.subPart.code}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) => handleUpdateSubPart(item.subPart.id, 'qty', parseInt(e.target.value) || 1)}
                          className="h-7 w-16"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={item.unit}
                          onChange={(e) => handleUpdateSubPart(item.subPart.id, 'unit', e.target.value)}
                          className="h-7 w-16"
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={item.status}
                          onValueChange={(value: EntityStatus) => handleUpdateSubPart(item.subPart.id, 'status', value)}
                        >
                          <SelectTrigger className="h-7 w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={item.description || ''}
                          onChange={(e) => handleUpdateSubPart(item.subPart.id, 'description', e.target.value)}
                          placeholder="คำอธิบาย"
                          className="h-7"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveSubPart(item.subPart.id)}
                          className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      {/* Dialog เลือกอะไหล่ย่อย */}
      <SubSparePartPickerDialog
        open={isPickerOpen}
        onOpenChange={setIsPickerOpen}
        onSelect={handleSelectSubParts}
        selectedSubPartIds={selectedSubPartIds}
      />
    </Card>
  );
}