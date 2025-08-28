import { useState, useEffect } from "react";
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
import { 
  mockMachines, 
  getSectionsByMachineId,
  type Section
} from "@/data/masterData";

// แปลงข้อมูลจาก masterData ให้มีข้อมูลสถานที่ตั้ง
const machines = mockMachines
  .filter(machine => machine.status === "Active")
  .map(machine => ({
    id: machine.id,
    name: machine.name,
    location: getLocationByMachineId(machine.id), // ฟังก์ชันสำหรับกำหนดสถานที่ตั้ง
  }));

// ฟังก์ชันสำหรับกำหนดสถานที่ตั้งตาม machine id
function getLocationByMachineId(machineId: string): string {
  const locationMap: { [key: string]: string } = {
    "m1": "อาคาร 1, Line 1", // เครื่องอัดฟิล์ม Extruder Line 1
    "m2": "อาคาร 1, Line 2", // เครื่องตัดฟิล์ม Slitting Machine A
    "m3": "อาคาร 2, Line 1", // เครื่องพิมพ์ฟิล์ม Printing Press B
  };
  return locationMap[machineId] || "ไม่ระบุสถานที่";
}

// ฟังก์ชันสำหรับสร้างเลขที่เอกสาร
function generateDocumentNumber(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const time = now.getTime().toString().slice(-4);
  return `REQ${year}${month}${day}${time}`;
}

export function NewRepairForm() {
  const [documentNumber] = useState(generateDocumentNumber());
  const [selectedMachine, setSelectedMachine] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [workType, setWorkType] = useState("");
  const [otherWorkType, setOtherWorkType] = useState("");
  const [availableSections, setAvailableSections] = useState<Section[]>([]);

  const selectedMachineData = machines.find(m => m.id === selectedMachine);
  const selectedSectionData = availableSections.find(s => s.id === selectedSection);

  // อัปเดตส่วนประกอบเมื่อเลือกเครื่องจักร
  useEffect(() => {
    if (selectedMachine) {
      const sections = getSectionsByMachineId(selectedMachine).filter(s => s.status === "Active");
      setAvailableSections(sections);
      setSelectedSection("");
    } else {
      setAvailableSections([]);
      setSelectedSection("");
    }
  }, [selectedMachine]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted", {
      documentNumber,
      selectedMachine,
      selectedSection,
      workType
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">สร้างใบแจ้งซ่อมใหม่</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Document Number Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">ข้อมูลเอกสาร</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="document-number">เลขที่ใบคำร้อง</Label>
              <Input 
                id="document-number" 
                value={documentNumber} 
                readOnly 
                className="bg-muted font-mono"
              />
            </div>
          </CardContent>
        </Card>
        {/* Machine Information Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">ข้อมูลเครื่องจักร/อุปกรณ์</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">สถานที่ตั้ง</Label>
                <Input 
                  id="location" 
                  value={selectedMachineData?.location || ""} 
                  readOnly 
                  className="bg-muted"
                  placeholder="เลือกเครื่องจักรเพื่อแสดงสถานที่ตั้ง"
                />
              </div>
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
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="section">ส่วนประกอบ (Section)</Label>
              <Select 
                value={selectedSection} 
                onValueChange={setSelectedSection}
                disabled={!selectedMachine}
              >
                <SelectTrigger>
                  <SelectValue placeholder={selectedMachine ? "เลือกส่วนประกอบ" : "เลือกเครื่องจักรก่อน"} />
                </SelectTrigger>
                <SelectContent>
                  {availableSections.map((section) => (
                    <SelectItem key={section.id} value={section.id}>
                      {section.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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