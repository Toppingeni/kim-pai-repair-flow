import { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useUserRole } from "@/contexts/UserRoleContext";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { userRole } = useUserRole();

  return (
    <div className="min-h-screen bg-background w-full">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar userRole={userRole} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}