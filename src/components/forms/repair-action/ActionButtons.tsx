import { Button } from "@/components/ui/button";
import { useRepairActions } from "@/hooks/useRepairActions";

interface ActionButtonsProps {
    repairResult: string;
    repairReason?: string;
    repairId: string;
    onSave?: () => void;
}

export function ActionButtons({
    repairResult,
    repairReason,
    repairId,
    onSave,
}: ActionButtonsProps) {
    const { completeRepair, closeJob, retryRepair, loading } =
        useRepairActions();

    const handleSave = () => {
        onSave?.();
    };

    const handleCompleteRepair = async () => {
        const repairData = { result: repairResult, reason: repairReason };
        const result = await completeRepair(repairId, repairData);
        if (result.success) {
            // Handle success - could navigate or update state
        }
    };

    const handleCloseJob = async () => {
        const result = await closeJob(repairId);
        if (result.success) {
            // Handle success
        }
    };

    const handleRetryRepair = async () => {
        const result = await retryRepair(repairId);
        if (result.success) {
            // Handle success
        }
    };

    const getActionButtons = () => {
        const buttons = [
            <Button
                key="save"
                type="button"
                variant="info"
                onClick={handleSave}
                disabled={loading}
            >
                บันทึกการดำเนินการ
            </Button>,
        ];

        if (repairResult === "success" || repairResult === "failed") {
            buttons.push(
                <Button
                    key="confirm"
                    type="button"
                    variant="success"
                    onClick={handleCompleteRepair}
                    disabled={loading}
                >
                    ส่งให้ฝ่ายผลิตยืนยันการปิดงาน
                </Button>
            );
            buttons.push(
                <Button
                    key="close"
                    type="button"
                    variant="destructive"
                    onClick={handleCloseJob}
                    disabled={loading}
                >
                    ปิดงาน
                </Button>
            );
        }

        if (repairResult === "failed") {
            buttons.push(
                <Button
                    key="retry"
                    type="button"
                    variant="warning"
                    onClick={handleRetryRepair}
                    disabled={loading}
                >
                    แจ้งซ่อมซ้ำ
                </Button>
            );
        }

        return buttons;
    };

    return (
        <div className="flex justify-end space-x-4">{getActionButtons()}</div>
    );
}
