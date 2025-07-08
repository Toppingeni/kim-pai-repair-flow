import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const machines = [
  { id: "EXT-001", name: "Extruder A", location: "อาคาร 1, Line 1" },
  { id: "EXT-002", name: "Extruder B", location: "อาคาร 2, Line 3" },
  { id: "PACK-001", name: "Packing Machine 1", location: "อาคาร 1, Line 2" },
  { id: "COMP-001", name: "Compressor", location: "อาคาร 2, Utility" },
  { id: "CONV-001", name: "Conveyor", location: "อาคาร 1, Line 1" },
];

export function NewRepairForm() {
  const [selectedMachine, setSelectedMachine] = useState("");
  const [workType, setWorkType] = useState("");
  const [otherWorkType, setOtherWorkType] = useState("");

  const selectedMachineData = machines.find(m => m.id === selectedMachine);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">สร้างใบแจ้งซ่อมใหม่</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Machine Information Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">ข้อมูลเครื่องจักร/อุปกรณ์</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="machine">ชื่อเครื่องจักร/อุปกรณ์</Label>
                <Select value={selectedMachine} onValueChange={setSelectedMachine}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกเครื่องจักร" />
                  </SelectTrigger>
                  <SelectContent>
                    {machines.map((machine) => (
                      <SelectItem key={machine.id} value={machine.id}>
                        {machine.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="machine-code">รหัสเครื่องจักร</Label>
                <Input 
                  id="machine-code" 
                  value={selectedMachineData?.id || ""} 
                  readOnly 
                  className="bg-muted"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">สถานที่ตั้ง</Label>
              <Input 
                id="location" 
                value={selectedMachineData?.location || ""} 
                readOnly 
                className="bg-muted"
              />
            </div>
          </CardContent>
        </Card>

        {/* Problem Details Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">รายละเอียดปัญหา</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="datetime">วันที่และเวลาที่แจ้งซ่อม</Label>
                <Input 
                  id="datetime" 
                  type="datetime-local" 
                  defaultValue={new Date().toISOString().slice(0, 16)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reporter">ผู้แจ้งซ่อม</Label>
                <Input 
                  id="reporter" 
                  value="สมศรี (ฝ่ายผลิต)" 
                  readOnly 
                  className="bg-muted"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>ประเภทงาน</Label>
              <RadioGroup value={workType} onValueChange={setWorkType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="maintenance" id="maintenance" />
                  <Label htmlFor="maintenance">งานซ่อมบำรุง</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="emergency" id="emergency" />
                  <Label htmlFor="emergency">งานซ่อมฉุกเฉิน</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">อื่นๆ</Label>
                </div>
              </RadioGroup>
              {workType === "other" && (
                <Input 
                  placeholder="ระบุประเภทงาน"
                  value={otherWorkType}
                  onChange={(e) => setOtherWorkType(e.target.value)}
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="problem">ปัญหาเบื้องต้น/อาการ</Label>
              <Textarea 
                id="problem"
                placeholder="อธิบายอาการผิดปกติอย่างละเอียด"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">รูปภาพประกอบ</Label>
              <Input id="images" type="file" multiple accept="image/*" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">หมายเหตุ</Label>
              <Textarea 
                id="notes"
                placeholder="หมายเหตุเพิ่มเติม"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">ยกเลิก</Button>
          <Button type="submit" variant="success">บันทึกและส่งแจ้งซ่อม</Button>
        </div>
      </form>
    </div>
  );
}