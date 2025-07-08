import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Play, 
  Download, 
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users
} from "lucide-react";

const manualSections = [
  {
    id: "quick-start",
    title: "เริ่มต้นใช้งาน",
    description: "วิธีการใช้งานระบบแจ้งซ่อมเบื้องต้น",
    icon: <Play className="h-5 w-5" />,
    badge: "แนะนำ",
    badgeVariant: "secondary" as const,
    items: [
      "การเข้าสู่ระบบ",
      "การสร้างใบแจ้งซ่อมใหม่",
      "การติดตามสถานะการซ่อม",
      "การยืนยันการปิดงาน"
    ]
  },
  {
    id: "repair-request",
    title: "การแจ้งซ่อม",
    description: "คู่มือการสร้างและจัดการใบแจ้งซ่อม",
    icon: <AlertTriangle className="h-5 w-5" />,
    badge: "สำคัญ",
    badgeVariant: "destructive" as const,
    items: [
      "การเลือกเครื่องจักรที่ต้องซ่อม",
      "การระบุปัญหาให้ชัดเจน",
      "การแนบรูปภาพประกอบ",
      "การระบุความเร่งด่วน"
    ]
  },
  {
    id: "status-tracking",
    title: "การติดตามสถานะ",
    description: "การตรวจสอบสถานะการซ่อมและการดำเนินการ",
    icon: <Clock className="h-5 w-5" />,
    badge: "ทั่วไป",
    badgeVariant: "secondary" as const,
    items: [
      "ความหมายของสถานะต่างๆ",
      "การรับแจ้งเตือน",
      "การตรวจสอบข้อมูลการซ่อม",
      "การให้ข้อมูลเพิ่มเติม"
    ]
  },
  {
    id: "confirmation",
    title: "การยืนยันงาน",
    description: "ขั้นตอนการยืนยันการปิดงานซ่อม",
    icon: <CheckCircle className="h-5 w-5" />,
    badge: "สำคัญ",
    badgeVariant: "outline" as const,
    items: [
      "การตรวจสอบงานที่ซ่อมเสร็จ",
      "การทดสอบการทำงาน",
      "การยืนยันการปิดงาน",
      "การบันทึกหมายเหตุ"
    ]
  }
];

const downloadResources = [
  {
    title: "คู่มือการใช้งานฉบับเต็ม",
    description: "ไฟล์ PDF คู่มือการใช้งานระบบครบถ้วน",
    type: "PDF",
    size: "2.1 MB"
  },
  {
    title: "รายการเครื่องจักรและรหัส",
    description: "ตารางข้อมูลเครื่องจักรในโรงงาน",
    type: "Excel",
    size: "156 KB"
  },
  {
    title: "แบบฟอร์มแจ้งซ่อมฉุกเฉิน",
    description: "แบบฟอร์มสำหรับกรณีระบบขัดข้อง",
    type: "PDF",
    size: "524 KB"
  }
];

export function Manual() {
  return (
    <MainLayout>
      <div className="flex-1 p-6 space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">คู่มือการใช้งาน</h1>
          <p className="text-muted-foreground">เรียนรู้วิธีการใช้งานระบบแจ้งซ่อมอย่างมีประสิทธิภาพ</p>
        </div>

        {/* Quick Access */}
        <Card className="shadow-card bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              เข้าถึงได้ทันที
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto flex-col p-4 space-y-2">
                <Play className="h-6 w-6 text-primary" />
                <span className="font-medium">วิดีโอสอนการใช้งาน</span>
                <span className="text-xs text-muted-foreground">5 นาที</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col p-4 space-y-2">
                <Users className="h-6 w-6 text-primary" />
                <span className="font-medium">ติดต่อฝ่าย IT</span>
                <span className="text-xs text-muted-foreground">ext. 1234</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col p-4 space-y-2">
                <ExternalLink className="h-6 w-6 text-primary" />
                <span className="font-medium">FAQ ออนไลน์</span>
                <span className="text-xs text-muted-foreground">คำถามพบบ่อย</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Manual Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {manualSections.map((section) => (
            <Card key={section.id} className="shadow-card hover:shadow-elegant transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {section.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-foreground">
                        {section.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <Badge variant={section.badgeVariant} className="text-xs">
                    {section.badge}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Separator className="my-4" />
                <Button variant="ghost" size="sm" className="w-full">
                  อ่านเพิ่มเติม
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Download Resources */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Download className="h-5 w-5" />
              เอกสารดาวน์โหลด
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {downloadResources.map((resource, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{resource.title}</h4>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {resource.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{resource.size}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    ดาวน์โหลด
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="shadow-card bg-gradient-to-br from-muted/50 to-muted/25">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              ต้องการความช่วยเหลือเพิ่มเติม?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">ฝ่าย IT Support</h4>
                <p className="text-sm text-muted-foreground">
                  โทร: ext. 1234<br />
                  อีเมล: it.support@kimpaithai.com<br />
                  เวลาทำการ: จันทร์-ศุกร์ 08:00-17:00
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">ฝ่ายวิศวกรรม</h4>
                <p className="text-sm text-muted-foreground">
                  โทร: ext. 1567<br />
                  อีเมล: engineering@kimpaithai.com<br />
                  เวลาทำการ: จันทร์-ศุกร์ 07:00-19:00
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}