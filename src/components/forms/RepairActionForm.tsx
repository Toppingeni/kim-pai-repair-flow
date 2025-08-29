import { useParams, useSearchParams } from "react-router-dom";
import { OriginalRequestInfo } from "./repair-action/OriginalRequestInfo";
import { RepairDetailsForm } from "./repair-action/RepairDetailsForm";
import { PartsManagement } from "./repair-action/PartsManagementEnhanced";
import { PreventionMeasures } from "./repair-action/PreventionMeasures";
import { ActionButtons } from "./repair-action/ActionButtons";
import { RepairHistoryDisplay } from "./repair-action/RepairHistoryDisplay";
import {
    mockOriginalRequest,
    engineers,
    mockRepairHistory,
} from "@/data/mockRepairData";
import { useRepairForm } from "@/hooks/useRepairForm";

export function RepairActionForm() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const isRevision = searchParams.get("revision") === "true";

    const {
        selectedEngineer,
        setSelectedEngineer,
        repairResult,
        setRepairResult,
        parts,
        addPart,
        removePart,
        handleSubmit,
        handleSave,
        handlePartsSelected,
    } = useRepairForm();

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground">
                    {isRevision
                        ? "บันทึกการซ่อมใหม่ (รีวิชั่น)"
                        : "บันทึกการดำเนินการซ่อม"}
                    : {id || mockOriginalRequest.id} (
                    {mockOriginalRequest.machine})
                </h1>
                {isRevision && (
                    <p className="text-muted-foreground mt-2">
                        การซ่อมครั้งใหม่เนื่องจากเสียซ้ำที่เดิม
                    </p>
                )}
            </div>

            {/* แสดงประวัติการซ่อมก่อนหน้าเมื่อเป็นโหมดรีวิชั่น */}
            {isRevision && <RepairHistoryDisplay history={mockRepairHistory} />}

            <form onSubmit={handleSubmit} className="space-y-6">
                <OriginalRequestInfo request={mockOriginalRequest} />

                <RepairDetailsForm
                    selectedEngineer={selectedEngineer}
                    onEngineerChange={setSelectedEngineer}
                    repairResult={repairResult}
                    onRepairResultChange={setRepairResult}
                    engineers={engineers}
                />

                <PartsManagement
                    parts={parts}
                    onAddPart={addPart}
                    onRemovePart={removePart}
                    onPartsSelected={handlePartsSelected}
                    machineId={mockOriginalRequest.machineId}
                />
                <ActionButtons
                    repairResult={repairResult}
                    repairId={id || mockOriginalRequest.id}
                    onSave={() => handleSave()}
                />
            </form>
        </div>
    );
}
