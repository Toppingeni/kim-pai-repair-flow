import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function PreventionMeasures() {
  return (
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
  );
}