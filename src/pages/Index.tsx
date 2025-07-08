import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Dashboard } from "./Dashboard";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [userRole, setUserRole] = useState<"production" | "engineering">("production");

  return (
    <MainLayout userRole={userRole}>
      <div className="p-6">
        {/* Role switcher for demo purposes */}
        <div className="mb-4 flex space-x-2">
          <Button 
            variant={userRole === "production" ? "default" : "outline"}
            onClick={() => setUserRole("production")}
          >
            ฝ่ายผลิต
          </Button>
          <Button 
            variant={userRole === "engineering" ? "default" : "outline"}
            onClick={() => setUserRole("engineering")}
          >
            ฝ่ายวิศวกรรม
          </Button>
        </div>
        <Dashboard userRole={userRole} />
      </div>
    </MainLayout>
  );
};

export default Index;
