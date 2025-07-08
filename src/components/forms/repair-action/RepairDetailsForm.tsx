import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Engineer {
  id: string;
  name: string;
}

interface RepairDetailsFormProps {
  selectedEngineer: string;
  onEngineerChange: (value: string) => void;
  repairResult: string;
  onRepairResultChange: (value: string) => void;
  engineers: Engineer[];
}

export function RepairDetailsForm({
  selectedEngineer,
  onEngineerChange,
  repairResult,
  onRepairResultChange,
  engineers
}: RepairDetailsFormProps) {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg">ข้อมูลการดำเนินการซ่อม</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="engineer">ผู้รับผิดชอบ</Label>
            <Select value={selectedEngineer} onValueChange={onEngineerChange}>
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
          <RadioGroup value={repairResult} onValueChange={onRepairResultChange}>
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
  );
}