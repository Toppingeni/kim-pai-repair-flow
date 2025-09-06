import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewPMFormProps {
  onClose: () => void;
}

const engineers = [
  { id: "eng1", name: "นายสมชาย" },
  { id: "eng2", name: "นางสาวอร" },
  { id: "eng3", name: "นายวิชัย" },
];

const machines = [
  "Extruder A",
  "Extruder B", 
  "Conveyor A",
  "Conveyor B",
  "Pump A",
  "Pump B",
  "Motor A",
  "Motor B"
];

const pmTypes = [
  "การหล่อลื่น",
  "ตรวจสอบเบลท์",
  "เปลี่ยนน้ำมัน",
  "ตรวจสอบมอเตอร์",
  "เปลี่ยนฟิลเตอร์",
  "ทำความสะอาด",
  "ตรวจสอบระบบไฟฟ้า",
  "เปลี่ยนอะไหล่"
];

export function NewPMForm({ onClose }: NewPMFormProps) {
  const { toast } = useToast();
  const [checklist, setChecklist] = useState<string[]>([]);
  const [newCheckItem, setNewCheckItem] = useState("");

  const addChecklistItem = () => {
    if (newCheckItem.trim()) {
      setChecklist([...checklist, newCheckItem.trim()]);
      setNewCheckItem("");
    }
  };

  const removeChecklistItem = (index: number) => {
    setChecklist(checklist.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "สร้าง PM สำเร็จ",
      description: "แผน PM ใหม่ถูกสร้างเรียบร้อยแล้ว",
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">ข้อมูลพื้นฐาน</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="machine">เครื่องจักร</Label>
              <Select name="machine" required>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกเครื่องจักร" />
                </SelectTrigger>
                <SelectContent>
                  {machines.map((machine) => (
                    <SelectItem key={machine} value={machine}>
                      {machine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pmType">ประเภท PM</Label>
              <Select name="pmType" required>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกประเภท PM" />
                </SelectTrigger>
                <SelectContent>
                  {pmTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignedTo">ผู้รับผิดชอบ</Label>
              <Select name="assignedTo" required>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกวิศวกร" />
                </SelectTrigger>
                <SelectContent>
                  {engineers.map((engineer) => (
                    <SelectItem key={engineer.id} value={engineer.id}>
                      {engineer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">ความสำคัญ</Label>
              <Select name="priority" required>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกความสำคัญ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">ต่ำ</SelectItem>
                  <SelectItem value="medium">ปานกลาง</SelectItem>
                  <SelectItem value="high">สูง</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">กำหนดการ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">ความถี่</Label>
              <Select name="frequency" required>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกความถี่" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">รายวัน</SelectItem>
                  <SelectItem value="weekly">รายสัปดาห์</SelectItem>
                  <SelectItem value="monthly">รายเดือน</SelectItem>
                  <SelectItem value="quarterly">รายไตรมาส</SelectItem>
                  <SelectItem value="yearly">รายปี</SelectItem>
                  <SelectItem value="hours-based">ตามชั่วโมงการทำงาน</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">วันที่เริ่มต้น</Label>
              <div className="relative">
                <Input 
                  id="startDate"
                  name="startDate"
                  type="date" 
                  required
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedDuration">ระยะเวลาโดยประมาณ (ชั่วโมง)</Label>
              <Input 
                id="estimatedDuration"
                name="estimatedDuration"
                type="number"
                step="0.5"
                min="0.5"
                placeholder="เช่น 2.5"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredTime">เวลาที่ต้องการ (ไม่บังคับ)</Label>
              <div className="relative">
                <Input 
                  id="preferredTime"
                  name="preferredTime"
                  type="time"
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">รายละเอียด</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">คำอธิบาย</Label>
            <Textarea 
              id="description"
              name="description"
              placeholder="อธิบายรายละเอียดของงาน PM นี้"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">หมายเหตุเพิ่มเติม</Label>
            <Textarea 
              id="notes"
              name="notes"
              placeholder="หมายเหตุหรือข้อควรระวัง"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="เพิ่มรายการตรวจสอบ"
              value={newCheckItem}
              onChange={(e) => setNewCheckItem(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addChecklistItem()}
            />
            <Button type="button" variant="outline" onClick={addChecklistItem}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {checklist.length > 0 && (
            <div className="space-y-2">
              <Label>รายการตรวจสอบ</Label>
              <div className="space-y-2">
                {checklist.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border border-border rounded-md bg-muted/50">
                    <span className="text-sm">{item}</span>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeChecklistItem(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          ยกเลิก
        </Button>
        <Button type="submit">
          สร้าง PM
        </Button>
      </div>
    </form>
  );
}