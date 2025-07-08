import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

interface Part {
  id: string;
  name: string;
  code: string;
  quantity: number;
  type: "stock" | "purchase";
  status: string;
}

const mockOriginalRequest = {
  id: "M-001",
  machine: "Extruder A",
  problem: "เสียงดังผิดปกติ จากมอเตอร์หลัก เมื่อเครื่องทำงานนานกว่า 2 ชั่วโมง",
  reporter: "สมศรี (ฝ่ายผลิต)",
  reportDate: "07/07/2568 09:30",
  images: ["image1.jpg", "image2.jpg"],
};

const engineers = [
  { id: "eng1", name: "นายสมชาย" },
  { id: "eng2", name: "นางสาวอร" },
  { id: "eng3", name: "นายวิชัย" },
];

export function RepairActionForm() {
  const [selectedEngineer, setSelectedEngineer] = useState("eng1");
  const [repairResult, setRepairResult] = useState("");
  const [parts, setParts] = useState<Part[]>([
    {
      id: "1",
      name: "มอเตอร์ (Motor X)",
      code: "MOT-001",
      quantity: 1,
      type: "stock",
      status: "เบิกแล้ว",
    },
    {
      id: "2", 
      name: "เซ็นเซอร์ (Sensor Y)",
      code: "SEN-002",
      quantity: 2,
      type: "purchase",
      status: "รอรับของ",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Repair action form submitted");
  };

  const addPart = () => {
    const newPart: Part = {
      id: Date.now().toString(),
      name: "",
      code: "",
      quantity: 1,
      type: "stock",
      status: "ใหม่",
    };
    setParts([...parts, newPart]);
  };

  const removePart = (id: string) => {
    setParts(parts.filter(p => p.id !== id));
  };

  const getActionButtons = () => {
    const buttons = [
      <Button key="save" type="button" variant="info">บันทึกการดำเนินการ</Button>
    ];

    if (repairResult === "success") {
      buttons.push(
        <Button key="confirm" type="button" variant="success">
          ส่งให้ฝ่ายผลิตยืนยันการปิดงาน
        </Button>
      );
      buttons.push(
        <Button key="close" type="button" variant="destructive">
          ปิดงาน
        </Button>
      );
    }

    if (repairResult === "failed") {
      buttons.push(
        <Button key="retry" type="button" variant="warning">
          แจ้งซ่อมซ้ำ
        </Button>
      );
    }

    return buttons;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          บันทึกการดำเนินการซ่อม: {mockOriginalRequest.id} ({mockOriginalRequest.machine})
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Original Request Information */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">ข้อมูลใบแจ้งซ่อมต้นฉบับ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">ปัญหาเบื้องต้น</Label>
                <p className="text-sm text-muted-foreground mt-1">{mockOriginalRequest.problem}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">ผู้แจ้ง / วันที่แจ้ง</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {mockOriginalRequest.reporter} / {mockOriginalRequest.reportDate}
                </p>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">รูปภาพประกอบ</Label>
              <div className="flex space-x-2 mt-2">
                {mockOriginalRequest.images.map((img, index) => (
                  <div key={index} className="w-20 h-20 bg-muted rounded border flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">IMG {index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Repair Action Information */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">ข้อมูลการดำเนินการซ่อม</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="engineer">ผู้รับผิดชอบ</Label>
                <Select value={selectedEngineer} onValueChange={setSelectedEngineer}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {engineers.map((eng) => (
                      <SelectItem key={eng.id} value={eng.id}>
                        {eng.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-time">วันที่/เวลาเริ่มซ่อม</Label>
                <Input 
                  id="start-time" 
                  type="datetime-local"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-time">วันที่/เวลาสิ้นสุดซ่อม</Label>
                <Input 
                  id="end-time" 
                  type="datetime-local"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="repair-method">ลักษณะงานที่ทำ/วิธีการซ่อม</Label>
              <Textarea 
                id="repair-method"
                placeholder="อธิบายการซ่อมอย่างละเอียด"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cause">สาเหตุความเสียหาย</Label>
              <Textarea 
                id="cause"
                placeholder="วิเคราะห์สาเหตุของความเสียหาย"
                rows={3}
              />
            </div>

            <div className="space-y-3">
              <Label>ผลการปฏิบัติงาน</Label>
              <RadioGroup value={repairResult} onValueChange={setRepairResult}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="success" id="success" />
                  <Label htmlFor="success">ซ่อมสำเร็จ (ใช้งานได้)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="failed" id="failed" />
                  <Label htmlFor="failed">ซ่อมไม่สำเร็จ (ใช้งานไม่ได้)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="waiting-parts" id="waiting-parts" />
                  <Label htmlFor="waiting-parts">รออะไหล่</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no-repair" id="no-repair" />
                  <Label htmlFor="no-repair">ไม่ซ่อม (ระบุเหตุผล)</Label>
                </div>
              </RadioGroup>
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

        {/* Parts Management */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">การเบิกใช้อะไหล่</CardTitle>
            <Button type="button" variant="info" onClick={addPart}>
              <Plus className="h-4 w-4 mr-2" />
              เพิ่มอะไหล่
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ชื่ออะไหล่</TableHead>
                  <TableHead>รหัส</TableHead>
                  <TableHead>จำนวน</TableHead>
                  <TableHead>ประเภท</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>การดำเนินการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parts.map((part) => (
                  <TableRow key={part.id}>
                    <TableCell>{part.name}</TableCell>
                    <TableCell>{part.code}</TableCell>
                    <TableCell>{part.quantity}</TableCell>
                    <TableCell>
                      {part.type === "stock" ? "เบิกจาก Stock" : "สั่งซื้อใหม่"}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        part.status === "เบิกแล้ว" 
                          ? "bg-success/10 text-success" 
                          : "bg-warning/10 text-warning"
                      }`}>
                        {part.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removePart(part.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Prevention Measures */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">การป้องกันและแก้ไขที่ต้นเหตุ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="prevention">แนวทางการป้องกัน</Label>
              <Textarea 
                id="prevention"
                placeholder="เสนอแนวทางการป้องกันปัญหาในอนาคต"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          {getActionButtons()}
        </div>
      </form>
    </div>
  );
}