import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Plus, Settings, CheckCircle, AlertTriangle } from "lucide-react";
import { PMScheduleTable } from "@/components/pm/PMScheduleTable";
import { PMTaskTable } from "@/components/pm/PMTaskTable";
import { NewPMForm } from "@/components/forms/NewPMForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function PMManagement() {
  const [isNewPMOpen, setIsNewPMOpen] = useState(false);

  const pmStats = {
    scheduled: 12,
    inProgress: 3,
    completed: 8,
    overdue: 2
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">การจัดการ PM</h1>
            <p className="text-muted-foreground">จัดการตารางเวลาและติดตาม Preventive Maintenance</p>
          </div>
          <Dialog open={isNewPMOpen} onOpenChange={setIsNewPMOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                สร้าง PM ใหม่
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>สร้างแผน PM ใหม่</DialogTitle>
              </DialogHeader>
              <NewPMForm onClose={() => setIsNewPMOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">กำหนดการ</p>
                  <p className="text-2xl font-bold">{pmStats.scheduled}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-status-pending/10 rounded-lg">
                  <Clock className="h-5 w-5 text-status-pending" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">กำลังดำเนินการ</p>
                  <p className="text-2xl font-bold">{pmStats.inProgress}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-status-completed/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-status-completed" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">เสร็จสิ้น</p>
                  <p className="text-2xl font-bold">{pmStats.completed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-destructive/10 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">เกินกำหนด</p>
                  <p className="text-2xl font-bold text-destructive">{pmStats.overdue}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>จัดการ PM</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="schedule" className="space-y-4">
              <TabsList>
                <TabsTrigger value="schedule">ตารางเวลา PM</TabsTrigger>
                <TabsTrigger value="tasks">งาน PM วันนี้</TabsTrigger>
                <TabsTrigger value="history">ประวัติ PM</TabsTrigger>
              </TabsList>

              <TabsContent value="schedule">
                <PMScheduleTable />
              </TabsContent>

              <TabsContent value="tasks">
                <PMTaskTable />
              </TabsContent>

              <TabsContent value="history">
                <div className="text-center py-8 text-muted-foreground">
                  ประวัติ PM จะแสดงที่นี่
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}