import { MainLayout } from "@/components/layout/MainLayout";
import { NewRepairForm } from "@/components/forms/NewRepairForm";

export function NewRepair() {
  return (
    <MainLayout userRole="production">
      <NewRepairForm />
    </MainLayout>
  );
}