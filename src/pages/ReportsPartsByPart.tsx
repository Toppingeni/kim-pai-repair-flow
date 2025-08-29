import { useMemo, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    mockMachines,
    mockSections,
    mockComponents,
    mockSpareParts,
} from "@/data/masterData";

type Group = {
    part: string;
    unit: string;
    qty: number; // คงเหลือของกลุ่ม ใช้แถวแรก
    totalUsed: number; // รวมการใช้ทุกแถว
    items: {
        id: string;
        component: string;
        section: string;
        machine: string;
        used: number;
        unit: string;
        qty: number;
    }[];
};

export default function ReportsPartsByPart() {
    const [query, setQuery] = useState("");

    const groups = useMemo<Group[]>(() => {
        const byName = new Map<string, Group>();
        const filtered = mockSpareParts.filter((p) =>
            p.name.toLowerCase().includes(query.toLowerCase())
        );
        for (const p of filtered) {
            const comp = mockComponents.find((c) => c.id === p.componentId);
            const sec = comp
                ? mockSections.find((s) => s.id === comp.sectionId)
                : undefined;
            const mac = sec
                ? mockMachines.find((m) => m.id === sec.machineId)
                : undefined;
            const key = p.name;
            const g = byName.get(key) || {
                part: key,
                unit: p.unit,
                qty: p.qty,
                totalUsed: 0,
                items: [],
            };
            // คงเหลือของกลุ่มใช้ค่าแถวแรกเท่านั้น ถ้ามีอยู่แล้วไม่ต้องอัปเดต
            if (g.qty === undefined || g.qty === null) {
                g.qty = p.qty;
            }
            g.totalUsed += p.used;
            g.items.push({
                id: p.id,
                component: comp?.name || "-",
                section: sec?.name || "-",
                machine: mac?.name || "-",
                used: p.used,
                unit: p.unit,
                qty: p.qty,
            });
            byName.set(key, g);
        }
        return Array.from(byName.values()).sort((a, b) =>
            a.part.localeCompare(b.part, "th")
        );
    }, [query]);

    return (
        <MainLayout>
            <div className="p-6 space-y-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-foreground">
                        รายงานข้อมูลอะไหล่ (ดูตามอะไหล่)
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        จัดกลุ่มตามอะไหล่ สรุปคงเหลือ/ใช้รวม
                        และแสดงตำแหน่งการใช้งาน
                    </p>
                </div>

                <Card className="shadow-card">
                    <CardHeader>
                        <CardTitle className="text-lg">ตัวกรอง</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2 md:col-span-1">
                                <Label htmlFor="search">ค้นหาอะไหล่</Label>
                                <Input
                                    id="search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="พิมพ์ชื่ออะไหล่"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-card">
                    <CardHeader>
                        <CardTitle className="text-lg">
                            ผลการค้นหา (จัดกลุ่มตามอะไหล่)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="min-w-[240px]">
                                            อะไหล่
                                        </TableHead>
                                        <TableHead className="min-w-[180px]">
                                            ชิ้นส่วน
                                        </TableHead>
                                        <TableHead className="min-w-[180px]">
                                            ส่วนประกอบ
                                        </TableHead>
                                        <TableHead className="min-w-[200px]">
                                            เครื่องจักร
                                        </TableHead>
                                        <TableHead className="min-w-[120px]">
                                            จำนวนใช้
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {groups.length === 0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={5}
                                                className="text-center text-muted-foreground"
                                            >
                                                ไม่พบข้อมูล
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {groups.map((g) => (
                                        <>
                                            <TableRow
                                                key={`${g.part}-summary`}
                                                className="bg-muted/40"
                                            >
                                                <TableCell className="font-semibold">
                                                    {g.part}
                                                </TableCell>
                                                <TableCell
                                                    colSpan={4}
                                                    className="text-muted-foreground text-right whitespace-nowrap"
                                                >
                                                    คงเหลือ {g.qty} {g.unit} •
                                                    จำนวนใช้รวม {g.totalUsed}{" "}
                                                    {g.unit}
                                                </TableCell>
                                            </TableRow>
                                            {g.items.map((item) => (
                                                <TableRow
                                                    key={`${g.part}-${item.id}`}
                                                >
                                                    <TableCell />
                                                    <TableCell className="font-medium">
                                                        {item.component}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.section}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.machine}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.used} {item.unit}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
