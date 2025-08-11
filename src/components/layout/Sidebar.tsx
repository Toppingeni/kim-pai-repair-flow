
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FileText,
  Plus,
  User,
  Calendar,
  Search,
  Bell,
  Database,
} from "lucide-react";

interface SidebarProps {
  userRole: "production" | "engineering";
}

export function Sidebar({ userRole }: SidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const productionMenuItems = [
    // { title: "Dashboard", url: "/", icon: Search }, // ซ่อนไว้สำหรับ Phase 2
    { title: "แจ้งซ่อมใหม่", url: "/new-repair", icon: Plus },
    { title: "รายการใบแจ้งซ่อม", url: "/my-repairs", icon: User },
    // { title: "คู่มือการใช้งาน", url: "/manual", icon: FileText }, // ซ่อนไว้สำหรับ Phase 2
    // { title: "ข้อมูล Master", url: "/master-data", icon: Database }, // เฉพาะฝ่ายวิศวกรรม
  ];

  const engineeringMenuItems = [
    // { title: "Dashboard", url: "/", icon: Search }, // ซ่อนไว้สำหรับ Phase 2
    { title: "ข้อมูล Master", url: "/master-data", icon: Database },
    { title: "รายการใบแจ้งซ่อม", url: "/all-repairs", icon: FileText },
    { title: "รายงาน", url: "/reports", icon: Bell },
    // { title: "การจัดการ PM", url: "/pm-management", icon: Calendar }, // ซ่อนไว้สำหรับ Phase 2
    // { title: "ประวัติการซ่อมบำรุง", url: "/repair-history", icon: Calendar }, // ซ่อนไว้สำหรับ Phase 2
  ];

  const menuItems = userRole === "production" ? productionMenuItems : engineeringMenuItems;

  const isActive = (path: string) => currentPath === path;

  return (
    <aside className="w-64 bg-card border-r border-border h-full">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(item.url)
                ? "bg-primary text-primary-foreground shadow-card"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
