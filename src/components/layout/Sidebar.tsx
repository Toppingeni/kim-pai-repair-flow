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
        { title: "ใบร้องของงานซ่อมใหม่", url: "/new-repair", icon: Plus },
        { title: "รายการใบร้องขอ", url: "/my-repairs", icon: User },
        // { title: "คู่มือการใช้งาน", url: "/manual", icon: FileText }, // ซ่อนไว้สำหรับ Phase 2
        // { title: "ข้อมูล Master", url: "/master-data", icon: Database }, // เฉพาะฝ่ายวิศวกรรม
    ];

    const engineeringMenuItems = [
        // { title: "Dashboard", url: "/", icon: Search }, // ซ่อนไว้สำหรับ Phase 2
        { title: "ข้อมูล Master", url: "/master-data", icon: Database },
        {
            title: "รายการใบสั่งงานซ่อม",
            url: "/all-repairs",
            icon: FileText,
        },
        {
            title: "รายงาน",
            children: [
                { title: "รายงานสถิติ", url: "/reports-stats", icon: Bell },
                {
                    title: "รายงานแจ้งซ่อม",
                    url: "/reports-requests",
                    icon: FileText,
                },
                {
                    title: "รายงานข้อมูลอะไหล่",
                    subtitle: "(ดูตามเครื่องจักร)",
                    url: "/reports-parts-by-machine",
                    icon: FileText,
                },
                {
                    title: "รายงานข้อมูลอะไหล่",
                    subtitle: "(ดูตามอะไหล่)",
                    url: "/reports-parts-by-part",
                    icon: FileText,
                },
            ],
        },
        // { title: "การจัดการ PM", url: "/pm-management", icon: Calendar }, // ซ่อนไว้สำหรับ Phase 2
        // { title: "ประวัติการซ่อมบำรุง", url: "/repair-history", icon: Calendar }, // ซ่อนไว้สำหรับ Phase 2
    ];

    const menuItems =
        userRole === "production" ? productionMenuItems : engineeringMenuItems;

    const isActive = (path: string) => currentPath === path;

    return (
        <aside className="w-64 bg-card border-r border-border h-full">
            <nav className="p-4 space-y-2">
                {menuItems.map((item: any) => {
                    if (item.children && Array.isArray(item.children)) {
                        return (
                            <div key={item.title} className="mt-4">
                                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                    {item.title}
                                </div>
                                <div className="space-y-2 mt-1">
                                    {item.children.map((child: any) => (
                                        <NavLink
                                            key={child.title}
                                            to={child.url}
                                            className={`flex items-center space-x-3 px-6 py-2 rounded-lg transition-colors ${
                                                isActive(child.url)
                                                    ? "bg-primary text-primary-foreground shadow-card"
                                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                            }`}
                                        >
                                            {child.icon && (
                                                <child.icon className="h-4 w-4" />
                                            )}
                                            <span className="flex flex-col leading-tight">
                                                <span className="font-medium">
                                                    {child.title}
                                                </span>
                                                {child.subtitle && (
                                                    <span className="text-xs text-muted-foreground">
                                                        {child.subtitle}
                                                    </span>
                                                )}
                                            </span>
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        );
                    }

                    return (
                        <NavLink
                            key={item.title}
                            to={item.url}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                isActive(item.url)
                                    ? "bg-primary text-primary-foreground shadow-card"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                        >
                            {item.icon && <item.icon className="h-5 w-5" />}
                            <span className="font-medium">{item.title}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
}
