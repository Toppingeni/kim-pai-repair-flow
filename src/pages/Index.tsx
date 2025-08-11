import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserRole } from "@/contexts/UserRoleContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { Dashboard } from "./Dashboard";

const Index = () => {
  const { userRole } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect based on user role
    if (userRole === "production") {
      navigate("/new-repair", { replace: true });
    } else if (userRole === "engineering") {
      navigate("/all-repairs", { replace: true });
    }
  }, [userRole, navigate]);

  // Show dashboard while redirecting
  return (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  );
};

export default Index;
