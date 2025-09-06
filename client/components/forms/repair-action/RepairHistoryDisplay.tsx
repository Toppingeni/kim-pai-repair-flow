import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";

interface RepairHistory {
  revision: number;
  date: string;
  engineer: string;
  method: string;
  cause: string;
  result: string;
  parts: Array<{ name: string; code: string; quantity: number }>;
  status: string;
  notes: string;
}

interface RepairHistoryDisplayProps {
  history: RepairHistory[];
}

export function RepairHistoryDisplay({ history }: RepairHistoryDisplayProps) {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          ประวัติการซ่อมก่อนหน้า
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {history.map((item, index) => (
          <div key={index} className="border border-border rounded-lg p-4 bg-muted/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline">รีวิชั่น {item.revision}</Badge>
                <Badge variant="secondary">{item.status}</Badge>
              </div>
              <span className="text-sm text-muted-foreground">{item.date}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium text-muted-foreground">ผู้รับผิดชอบ</div>
                <div>{item.engineer}</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">ผลการซ่อม</div>
                <div className="text-status-completed">ซ่อมสำเร็จ</div>
              </div>
            </div>
            
            <Separator className="my-3" />
            
            <div className="space-y-2 text-sm">
              <div>
                <div className="font-medium text-muted-foreground">วิธีการซ่อม</div>
                <div>{item.method}</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">สาเหตุ</div>
                <div>{item.cause}</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">อะไหล่ที่ใช้</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {item.parts.map((part, partIndex) => (
                    <span key={partIndex} className="text-xs bg-background border border-border rounded px-2 py-1">
                      {part.name} ({part.code}) x{part.quantity}
                    </span>
                  ))}
                </div>
              </div>
              {item.notes && (
                <div>
                  <div className="font-medium text-muted-foreground">หมายเหตุ</div>
                  <div>{item.notes}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}