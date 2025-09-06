
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserRoleProvider } from "@/contexts/UserRoleContext";
import { AuthProvider, PrivateRoute, LoginPage, TokenLogin } from "@/auth";
import Index from "./pages/Index";
import { NewRepair } from "./pages/NewRepair";
import { MyRepairs } from "./pages/MyRepairs";
import { Manual } from "./pages/Manual";
import { AllRepairs } from "./pages/AllRepairs";
import { RepairAction } from "./pages/RepairAction";
import { RepairDetail } from "./pages/RepairDetail";
import { RepairHistory } from "./pages/RepairHistory";
import { CloseJob } from "./pages/CloseJob";
import { Reports } from "./pages/Reports";
import ReportsStats from "./pages/ReportsStats";
import ReportsRequests from "./pages/ReportsRequests";
import ReportsPartsByMachine from "./pages/ReportsPartsByMachine";
import ReportsPartsByPart from "./pages/ReportsPartsByPart";
import { PMManagement } from "./pages/PMManagement";
import MasterData from "./pages/MasterData";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <UserRoleProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/auth/authen" element={<TokenLogin />} />

              <Route path="/" element={<PrivateRoute><Index /></PrivateRoute>} />
              <Route path="/new-repair" element={<PrivateRoute><NewRepair /></PrivateRoute>} />
              <Route path="/my-repairs" element={<PrivateRoute><MyRepairs /></PrivateRoute>} />
              <Route path="/manual" element={<PrivateRoute><Manual /></PrivateRoute>} />
              <Route path="/all-repairs" element={<PrivateRoute><AllRepairs /></PrivateRoute>} />
              <Route path="/repair-action/:id" element={<PrivateRoute><RepairAction /></PrivateRoute>} />
              <Route path="/repair-detail/:id" element={<PrivateRoute><RepairDetail /></PrivateRoute>} />
              <Route path="/close-job/:id" element={<PrivateRoute><CloseJob /></PrivateRoute>} />
              <Route path="/pm-management" element={<PrivateRoute><PMManagement /></PrivateRoute>} />
              <Route path="/repair-history" element={<PrivateRoute><RepairHistory /></PrivateRoute>} />
              {/* Legacy reports route kept for compatibility */}
              <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
              <Route path="/reports-stats" element={<PrivateRoute><ReportsStats /></PrivateRoute>} />
              <Route path="/reports-requests" element={<PrivateRoute><ReportsRequests /></PrivateRoute>} />
              <Route path="/reports-parts-by-machine" element={<PrivateRoute><ReportsPartsByMachine /></PrivateRoute>} />
              <Route path="/reports-parts-by-part" element={<PrivateRoute><ReportsPartsByPart /></PrivateRoute>} />
              <Route path="/master-data" element={<PrivateRoute><MasterData /></PrivateRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UserRoleProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
