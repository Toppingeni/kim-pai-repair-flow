
import { MainLayout } from "@/components/layout/MainLayout";
import { MasterDataManager } from "@/components/master-data/MasterDataManager";

const MasterData = () => {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">ข้อมูล Master</h1>
          <p className="text-muted-foreground">
            จัดการข้อมูลหลักของระบบ เช่น อุปกรณ์ อะไหล่ และผู้จำหน่าย
          </p>
        </div>
        <MasterDataManager />
      </div>
    </MainLayout>
  );
};

export default MasterData;
