import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Upload, FileText, Plus } from "lucide-react";

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
  const [documents, setDocuments] = useState<string[]>([]);
  const [newDocument, setNewDocument] = useState("");

  const addDocument = () => {
    if (newDocument.trim()) {
      setDocuments([...documents, newDocument.trim()]);
      setNewDocument("");
    }
  };

  const removeDocument = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg">ข้อมูลการดำเนินการซ่อม</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Engineer and Dates Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="engineer">ผู้รับผิดชอบ</Label>
            <Select value={selectedEngineer} onValueChange={onEngineerChange}>
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
            <Label htmlFor="start-date">วันที่/เวลาเริ่มซ่อม</Label>
            <div className="relative">
              <Input 
                id="start-date" 
                type="datetime-local" 
                defaultValue={new Date().toISOString().slice(0, 16)}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-date">วันที่/เวลาสิ้นสุดซ่อม</Label>
            <div className="relative">
              <Input 
                id="end-date" 
                type="datetime-local" 
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Repair Method Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="repair-method">ลักษณะงานที่ทำ/วิธีการซ่อม</Label>
            <Textarea 
              id="repair-method"
              placeholder="อธิบายวิธีการซ่อมและขั้นตอนการดำเนินงานอย่างละเอียด"
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="damage-cause">สาเหตุความเสียหาย</Label>
            <Textarea 
              id="damage-cause"
              placeholder="ระบุสาเหตุที่ทำให้เกิดความเสียหาย"
              rows={3}
            />
          </div>
        </div>

        <Separator />

        {/* Work Result Section */}
        <div className="space-y-3">
          <Label>ผลการปฏิบัติงาน</Label>
          <RadioGroup value={repairResult} onValueChange={onRepairResultChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="success" id="success" />
              <Label htmlFor="success" className="text-status-completed cursor-pointer">
                ซ่อมสำเร็จ (ใช้งานได้)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="failed" id="failed" />
              <Label htmlFor="failed" className="text-destructive cursor-pointer">
                ซ่อมไม่สำเร็จ (ใช้งานไม่ได้)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pending" id="pending" />
              <Label htmlFor="pending" className="text-status-pending cursor-pointer">
                รออะไหล่
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no-repair" id="no-repair" />
              <Label htmlFor="no-repair" className="text-muted-foreground cursor-pointer">
                ไม่ซ่อม (ระบุเหตุผล)
              </Label>
            </div>
          </RadioGroup>
          
          {repairResult === "no-repair" && (
            <div className="mt-3">
              <Textarea 
                placeholder="ระบุเหตุผลที่ไม่ซ่อม"
                rows={2}
              />
            </div>
          )}
        </div>

        <Separator />

        {/* Reference Documents Section */}
        <div className="space-y-4">
          <Label className="text-base font-medium">เอกสารอ้างอิง</Label>
          
          {/* Upload Documents */}
          <div className="space-y-2">
            <Label htmlFor="document-upload" className="text-sm font-medium">อัปโหลดเอกสาร</Label>
            <div className="flex items-center space-x-2">
              <Input 
                id="document-upload" 
                type="file" 
                multiple 
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="flex-1"
              />
              <Button type="button" variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              รองรับไฟล์ PDF, Word, รูปภาพ (สูงสุด 10MB ต่อไฟล์)
            </p>
          </div>

          {/* Add Document Reference */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">เพิ่มเอกสารอ้างอิง</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="ชื่อเอกสารหรือหมายเลขอ้างอิง เช่น Manual ABC-001"
                value={newDocument}
                onChange={(e) => setNewDocument(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addDocument()}
              />
              <Button type="button" variant="outline" onClick={addDocument}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Document List */}
          {documents.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">เอกสารที่เพิ่มแล้ว</Label>
              <div className="space-y-2">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border border-border rounded-md bg-muted/50">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{doc}</span>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeDocument(index)}
                    >
                      ลบ
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Additional Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">หมายเหตุเพิ่มเติม</Label>
          <Textarea 
            id="notes"
            placeholder="บันทึกข้อมูลเพิ่มเติมหรือข้อสังเกต"
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
}