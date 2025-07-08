import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserRoleProvider } from "@/contexts/UserRoleContext";
import Index from "./pages/Index";
import { NewRepair } from "./pages/NewRepair";
import { MyRepairs } from "./pages/MyRepairs";
import { Manual } from "./pages/Manual";
import { AllRepairs } from "./pages/AllRepairs";
import { RepairAction } from "./pages/RepairAction";
import { RepairDetail } from "./pages/RepairDetail";
import { RepairHistory } from "./pages/RepairHistory";
import { Reports } from "./pages/Reports";
import { PMManagement } from "./pages/PMManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserRoleProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/new-repair" element={<NewRepair />} />
            <Route path="/my-repairs" element={<MyRepairs />} />
            <Route path="/manual" element={<Manual />} />
            <Route path="/all-repairs" element={<AllRepairs />} />
            <Route path="/repair-action/:id" element={<RepairAction />} />
            <Route path="/repair-detail/:id" element={<RepairDetail />} />
            <Route path="/pm-management" element={<PMManagement />} />
            <Route path="/repair-history" element={<RepairHistory />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserRoleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
