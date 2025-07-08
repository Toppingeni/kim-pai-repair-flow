import { Plus, FileText, Calendar, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { RepairTable } from "@/components/dashboard/RepairTable";
import { useUserRole } from "@/contexts/UserRoleContext";
import { Link } from "react-router-dom";

// Mock data for repairs
const mockRepairs = [
  {
    id: "M-001",
    machine: "Extruder A",
    problem: "เสียงดังผิดปกติ",
    date: "07/07/2568",
    status: "progress" as const,
    reporter: "สมศรี"
  },
  {
    id: "M-002",
    machine: "Packing M/C",
    problem: "แพ็คไม่แน่น",
    date: "06/07/2568",
    status: "waiting" as const,
    reporter: "สมศรี"
  },
  {
    id: "M-003",
    machine: "Conveyor Belt",
    problem: "สายพานขาด",
    date: "05/07/2568",
    status: "completed" as const,
    reporter: "สมศรี"
  },
  {
    id: "M-004",
    machine: "Injection M/C",
    problem: "อุณหภูมิไม่คงที่",
    date: "04/07/2568",
    status: "new" as const,
    reporter: "สมศรี"
  },
  {
    id: "M-005",
    machine: "Dryer Unit",
    problem: "เซ็นเซอร์ขัดข้อง",
    date: "03/07/2568",
    status: "pending" as const,
    reporter: "สมศรี"
  }
];

export function Dashboard() {
  const { userRole } = useUserRole();
  const getProductionSummaryData = () => [
    {
      title: "กำลังดำเนินการ",
      value: mockRepairs.filter(r => r.status === "progress" || r.status === "new" || r.status === "pending").length,
      icon: <FileText className="h-8 w-8" />,
      variant: "progress" as const,
    },
    {
      title: "รอคุณยืนยัน",
      value: mockRepairs.filter(r => r.status === "waiting").length,
      icon: <Bell className="h-8 w-8" />,
      variant: "waiting" as const,
    },
    {
      title: "ปิดงานแล้ว",
      value: mockRepairs.filter(r => r.status === "completed").length,
      icon: <Calendar className="h-8 w-8" />,
      variant: "completed" as const,
    },
  ];

  const getEngineeringSummaryData = () => [
    {
      title: "งานใหม่",
      value: mockRepairs.filter(r => r.status === "new").length,
      icon: <Plus className="h-8 w-8" />,
      variant: "new" as const,
    },
    {
      title: "กำลังดำเนินการ",
      value: mockRepairs.filter(r => r.status === "progress").length,
      icon: <FileText className="h-8 w-8" />,
      variant: "progress" as const,
    },
    {
      title: "รออะไหล่",
      value: mockRepairs.filter(r => r.status === "pending").length,
      icon: <Calendar className="h-8 w-8" />,
      variant: "pending" as const,
    },
    {
      title: "รอฝ่ายผลิตยืนยัน",
      value: mockRepairs.filter(r => r.status === "waiting").length,
      icon: <User className="h-8 w-8" />,
      variant: "waiting" as const,
    },
  ];

  const summaryData = userRole === "production" ? getProductionSummaryData() : getEngineeringSummaryData();
  const dashboardTitle = userRole === "production" ? "ภาพรวมใบแจ้งซ่อมของคุณ" : "ภาพรวมงานแจ้งซ่อม";
  const tableTitle = userRole === "production" ? "รายการใบแจ้งซ่อมล่าสุด" : "งานแจ้งซ่อมที่ต้องดำเนินการ";

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">{dashboardTitle}</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryData.map((card) => (
          <SummaryCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            variant={card.variant}
          />
        ))}
      </div>

      {/* Repair Table */}
      <RepairTable
        repairs={mockRepairs}
        userRole={userRole}
        title={tableTitle}
      />

      {/* Floating Action Button for Production */}
      {userRole === "production" && (
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-glow"
          variant="floating"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}