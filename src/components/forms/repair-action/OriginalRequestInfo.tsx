import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface OriginalRequest {
  id: string;
  machine: string;
  problem: string;
  reporter: string;
  reportDate: string;
  images: string[];
}

interface OriginalRequestInfoProps {
  request: OriginalRequest;
}

export function OriginalRequestInfo({ request }: OriginalRequestInfoProps) {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg">ข้อมูลใบแจ้งซ่อมต้นฉบับ</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium">ปัญหาเบื้องต้น</Label>
            <p className="text-sm text-muted-foreground mt-1">{request.problem}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">ผู้แจ้ง / วันที่แจ้ง</Label>
            <p className="text-sm text-muted-foreground mt-1">
              {request.reporter} / {request.reportDate}
            </p>
          </div>
        </div>
        <div>
          <Label className="text-sm font-medium">รูปภาพประกอบ</Label>
          <div className="flex space-x-2 mt-2">
            {request.images.map((img, index) => (
              <div key={index} className="w-20 h-20 bg-muted rounded border flex items-center justify-center">
                <span className="text-xs text-muted-foreground">IMG {index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}