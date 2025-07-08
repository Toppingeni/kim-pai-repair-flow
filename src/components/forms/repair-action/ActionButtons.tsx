import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  repairResult: string;
}

export function ActionButtons({ repairResult }: ActionButtonsProps) {
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
    <div className="flex justify-end space-x-4">
      {getActionButtons()}
    </div>
  );
}