import { ReactNode, useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
  userRole?: "production" | "engineering";
}

export function MainLayout({ children, userRole = "production" }: MainLayoutProps) {
  const [currentUser] = useState({
    name: userRole === "production" ? "คุณสมศรี" : "นายสมชาย",
    department: userRole === "production" ? "ฝ่ายผลิต" : "ฝ่ายวิศวกรรม",
  });

  return (
    <div className="min-h-screen bg-background w-full">
      <Header user={currentUser} />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar userRole={userRole} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}