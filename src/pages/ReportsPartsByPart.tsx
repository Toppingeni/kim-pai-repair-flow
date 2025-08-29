import { useMemo, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    mockMachines,
    mockSections,
    mockComponents,
    mockSpareParts,
} from "@/data/masterData";
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from "material-react-table";

type PartUsageRow = {
    id: string;
    partName: string;
    unit: string;
    qty: number; // คงเหลือ
    used: number; // ใช้
    component: string;
    section: string;
    machine: string;
};

export default function ReportsPartsByPart() {
    const [globalFilter, setGlobalFilter] = useState("");

    const data: PartUsageRow[] = useMemo(() => {
        return mockSpareParts
            .filter((p) =>
                p.name.toLowerCase().includes(globalFilter.toLowerCase())
            )
            .map((p) => {
                const comp = mockComponents.find((c) => c.id === p.componentId);
                const sec = comp
                    ? mockSections.find((s) => s.id === comp.sectionId)
                    : undefined;
                const mac = sec
                    ? mockMachines.find((m) => m.id === sec.machineId)
                    : undefined;
                return {
                    id: p.id,
                    partName: p.name,
                    unit: p.unit,
                    qty: p.qty,
                    used: p.used,
                    component: comp?.name || "-",
                    section: sec?.name || "-",
                    machine: mac?.name || "-",
                };
            });
    }, [globalFilter]);

    const columns = useMemo<MRT_ColumnDef<PartUsageRow>[]>(
        () => [
            {
                accessorKey: "partName",
                header: "อะไหล่",
                enableGrouping: true,
                size: 320,
                Cell: ({ cell, row }) => {
                    const value = cell.getValue<string>();
                    if (row.getIsGrouped()) {
                        const unit =
                            row.getLeafRows?.()[0]?.original.unit || "";
                        const totalQty = (row.getValue?.("qty") as number) ?? 0;
                        const totalUsed =
                            (row.getValue?.("used") as number) ?? 0;
                        return (
                            <div className="flex items-center justify-between w-full pr-2">
                                <span className="font-medium">{value}</span>
                                <span className="text-sm text-muted-foreground">
                                    คงเหลือรวม:{" "}
                                    <span className="text-foreground font-medium">
                                        {totalQty} {unit}
                                    </span>
                                    <span className="mx-2">•</span>
                                    ใช้รวม:{" "}
                                    <span className="text-foreground font-medium">
                                        {totalUsed} {unit}
                                    </span>
                                </span>
                            </div>
                        );
                    }
                    return value;
                },
            },
            {
                accessorKey: "qty",
                header: "คงเหลือ",
                aggregationFn: "sum",
                AggregatedCell: () => null,
                size: 100,
            },
            {
                accessorKey: "used",
                header: "ใช้",
                aggregationFn: "sum",
                AggregatedCell: () => null,
                size: 100,
            },
            { accessorKey: "unit", header: "หน่วย", size: 80 },
            { accessorKey: "component", header: "ชิ้นส่วน", size: 200 },
            { accessorKey: "section", header: "ส่วนประกอบ", size: 200 },
            { accessorKey: "machine", header: "เครื่องจักร", size: 240 },
        ],
        []
    );

    const table = useMaterialReactTable<PartUsageRow>({
        data,
        columns,
        enableGrouping: true,
        enableStickyHeader: true,
        enableTopToolbar: false,
        positionToolbarAlertBanner: "none",
        initialState: {
            grouping: ["partName"],
            expanded: true,
            showGlobalFilter: false,
            density: "compact",
        },
        state: { globalFilter, columnVisibility: { qty: false } },
        onGlobalFilterChange: setGlobalFilter,
        muiToolbarAlertBannerProps:
            data.length === 0
                ? { color: "warning", children: "ไม่พบข้อมูลตามตัวกรอง" }
                : undefined,
    });

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

                {/* ตัวกรองแบบเดิม */}
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
                                    value={globalFilter}
                                    onChange={(e) =>
                                        setGlobalFilter(e.target.value)
                                    }
                                    placeholder="พิมพ์ชื่ออะไหล่"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-card">
                    <CardHeader>
                        <CardTitle className="text-lg">ตารางอะไหล่</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <MaterialReactTable table={table} />
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
