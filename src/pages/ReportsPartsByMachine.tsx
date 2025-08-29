import { useMemo, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
    mockMachines,
    mockSections,
    mockComponents,
    mockSpareParts,
    type Machine,
    type Section,
    type ComponentItem,
    type SparePart,
} from "@/data/masterData";

export default function ReportsPartsByMachine() {
    // current selections (UI)
    const [machineId, setMachineId] = useState<string>("");
    const [sectionId, setSectionId] = useState<string>("");
    const [componentId, setComponentId] = useState<string>("");
    // applied filters (used for table)
    const [appliedMachineId, setAppliedMachineId] = useState<string>("");
    const [appliedSectionId, setAppliedSectionId] = useState<string>("");
    const [appliedComponentId, setAppliedComponentId] = useState<string>("");

    const machines = useMemo(
        () => mockMachines.filter((m) => m.status === "Active"),
        []
    );
    const sections = useMemo<Section[]>(() => {
        if (!machineId) return mockSections;
        return mockSections.filter((s) => s.machineId === machineId);
    }, [machineId]);
    const components = useMemo<ComponentItem[]>(() => {
        if (!sectionId) return mockComponents;
        return mockComponents.filter((c) => c.sectionId === sectionId);
    }, [sectionId]);

    const rows = useMemo(() => {
        let parts: SparePart[] = mockSpareParts;
        if (appliedComponentId) {
            parts = parts.filter((p) => p.componentId === appliedComponentId);
        } else if (appliedSectionId) {
            const compIds = mockComponents
                .filter((c) => c.sectionId === appliedSectionId)
                .map((c) => c.id);
            parts = parts.filter((p) => compIds.includes(p.componentId));
        } else if (appliedMachineId) {
            const secIds = mockSections
                .filter((s) => s.machineId === appliedMachineId)
                .map((s) => s.id);
            const compIds = mockComponents
                .filter((c) => secIds.includes(c.sectionId))
                .map((c) => c.id);
            parts = parts.filter((p) => compIds.includes(p.componentId));
        }

        return parts.map((p) => {
            const comp = mockComponents.find((c) => c.id === p.componentId);
            const sec = comp
                ? mockSections.find((s) => s.id === comp.sectionId)
                : undefined;
            const mac = sec
                ? mockMachines.find((m) => m.id === sec.machineId)
                : undefined;
            return {
                id: p.id,
                machine: mac?.name || "-",
                section: sec?.name || "-",
                component: comp?.name || "-",
                part: p.name,
                qty: p.qty,
                used: p.used,
                unit: p.unit,
            };
        });
    }, [appliedMachineId, appliedSectionId, appliedComponentId]);

    const handleSelectMachine = (id: string) => {
        setMachineId(id);
        setSectionId("");
        setComponentId("");
    };
    const handleSelectSection = (id: string) => {
        setSectionId(id);
        setComponentId("");
    };

    const clearFilters = () => {
        setMachineId("");
        setSectionId("");
        setComponentId("");
        setAppliedMachineId("");
        setAppliedSectionId("");
        setAppliedComponentId("");
    };
    const applySearch = () => {
        setAppliedMachineId(machineId);
        setAppliedSectionId(sectionId);
        setAppliedComponentId(componentId);
    };

    return (
        <MainLayout>
            <div className="p-6 space-y-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-foreground">
                        รายงานข้อมูลอะไหล่ (ดูตามเครื่องจักร)
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        ดูรายการอะไหล่ทั้งหมดของเครื่องจักรที่เลือก
                        พร้อมจำนวนคงเหลือและจำนวนใช้
                    </p>
                </div>

                <Card className="shadow-card">
                    <CardHeader>
                        <CardTitle className="text-lg">ตัวกรอง</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>เครื่องจักร</Label>
                                <Select
                                    value={machineId}
                                    onValueChange={handleSelectMachine}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="เลือกเครื่องจักร" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {machines.map((m) => (
                                            <SelectItem key={m.id} value={m.id}>
                                                {m.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>ส่วนประกอบ</Label>
                                <Select
                                    value={sectionId}
                                    onValueChange={handleSelectSection}
                                    disabled={!machineId}
                                >
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={
                                                machineId
                                                    ? "เลือกส่วนประกอบ"
                                                    : "เลือกเครื่องจักรก่อน"
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {sections.map((s) => (
                                            <SelectItem key={s.id} value={s.id}>
                                                {s.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>ชิ้นส่วน</Label>
                                <Select
                                    value={componentId}
                                    onValueChange={setComponentId}
                                    disabled={!sectionId}
                                >
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={
                                                sectionId
                                                    ? "เลือกชิ้นส่วน"
                                                    : "เลือกส่วนประกอบก่อน"
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {components.map((c) => (
                                            <SelectItem key={c.id} value={c.id}>
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <Button onClick={applySearch} disabled={!machineId}>ค้นหา</Button>
                            <Button
                                variant="outline"
                                onClick={clearFilters}
                                disabled={
                                    !machineId && !sectionId && !componentId &&
                                    !appliedMachineId && !appliedSectionId && !appliedComponentId
                                }
                            >
                                ล้างการค้นหา
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-card">
                    <CardHeader>
                        <CardTitle className="text-lg">ตารางอะไหล่</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>เครื่องจักร</TableHead>
                                        <TableHead>ส่วนประกอบ</TableHead>
                                        <TableHead>ชิ้นส่วน</TableHead>
                                        <TableHead>อะไหล่</TableHead>
                                        <TableHead>จำนวนคงเหลือ</TableHead>
                                        <TableHead>จำนวนใช้</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rows.map((r) => (
                                        <TableRow key={r.id}>
                                            <TableCell className="font-medium">
                                                {r.machine}
                                            </TableCell>
                                            <TableCell>{r.section}</TableCell>
                                            <TableCell>{r.component}</TableCell>
                                            <TableCell>{r.part}</TableCell>
                                            <TableCell>
                                                {r.qty} {r.unit}
                                            </TableCell>
                                            <TableCell>
                                                {r.used} {r.unit}
                                            </TableCell>
                                        </TableRow>
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
