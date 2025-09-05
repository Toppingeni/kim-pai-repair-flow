import { useMemo, useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search, Package } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Part } from "./PartsManagementEnhanced";
import {
    mockSections,
    mockComponents,
    mockIssuedSpareParts,
    type Section,
    type ComponentItem,
    type SparePart,
} from "@/data/masterData";

interface SparePartsSelectionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedParts: Part[];
    onPartsSelected: (parts: Part[]) => void;
    machineId?: string; // เครื่องจักรที่แจ้งซ่อม
}

export function SparePartsSelectionDialog({
    open,
    onOpenChange,
    selectedParts,
    onPartsSelected,
    machineId,
}: SparePartsSelectionDialogProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [tempSelectedParts, setTempSelectedParts] =
        useState<Part[]>(selectedParts);
    const [randomParts, setRandomParts] = useState<SparePart[]>([]);

    useEffect(() => {
        setTempSelectedParts(selectedParts);
    }, [selectedParts, open]);

    // เมื่อเปิด Dialog ให้สุ่มอะไหล่ที่สัมพันธ์กับเครื่องจักร 3 รายการ
    useEffect(() => {
        if (!open) return;
        const partsForMachine = ((): SparePart[] => {
            if (!machineId) return mockIssuedSpareParts;
            const sectionIds = new Set(
                mockSections
                    .filter((s) => s.machineId === machineId)
                    .map((s) => s.id)
            );
            const componentIds = new Set(
                mockComponents
                    .filter((c) => sectionIds.has(c.sectionId))
                    .map((c) => c.id)
            );
            return mockIssuedSpareParts.filter((p) =>
                componentIds.has(p.componentId)
            );
        })();

        const shuffled = [...partsForMachine].sort(() => Math.random() - 0.5);
        setRandomParts(shuffled.slice(0, 3));
    }, [open, machineId]);

    // ฟิลเตอร์อะไหล่ตามคำค้นหา (ในกลุ่มที่สุ่มมา)
    const filteredParts = useMemo(
        () =>
            randomParts.filter(
                (part) =>
                    part.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    part.code.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        [randomParts, searchTerm]
    );

    // จัดกลุ่มตาม Section และ Component จากรายการที่คัดมา
    const grouped = useMemo(() => {
        const compById: Record<string, ComponentItem> = Object.fromEntries(
            mockComponents.map((c) => [c.id, c])
        );
        const secById: Record<string, Section> = Object.fromEntries(
            mockSections.map((s) => [s.id, s])
        );

        const groups: Record<
            string,
            {
                section: Section;
                components: Record<
                    string,
                    { component: ComponentItem; parts: SparePart[] }
                >;
            }
        > = {};

        for (const part of filteredParts) {
            const comp = compById[part.componentId];
            if (!comp) continue;
            const sec = secById[comp.sectionId];
            if (!sec) continue;
            if (!groups[sec.id]) {
                groups[sec.id] = { section: sec, components: {} };
            }
            if (!groups[sec.id].components[comp.id]) {
                groups[sec.id].components[comp.id] = {
                    component: comp,
                    parts: [],
                };
            }
            groups[sec.id].components[comp.id].parts.push(part);
        }
        return groups;
    }, [filteredParts]);

    const isPartSelected = (partId: string) => {
        return tempSelectedParts.some((p) => p.id === partId);
    };

    const handlePartToggle = (part: SparePart) => {
        const existingPart = tempSelectedParts.find((p) => p.id === part.id);

        if (existingPart) {
            setTempSelectedParts((prev) =>
                prev.filter((p) => p.id !== part.id)
            );
        } else {
            const newPart: Part = {
                id: part.id,
                name: part.name,
                code: part.code,
                quantity: part.defaultUsage, // ใช้ defaultUsage แทน 1
                type: "stock",
                status: "ใหม่",
            };
            setTempSelectedParts((prev) => [...prev, newPart]);
        }
    };

    const handleConfirm = () => {
        onPartsSelected(tempSelectedParts);
        onOpenChange(false);
    };

    const handleCancel = () => {
        setTempSelectedParts(selectedParts);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[95vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        เลือกอะไหล่จากการเบิก
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
                    {/* ตัวกรองเครื่องจักร/ส่วนประกอบ/ชิ้นส่วนถูกเอาออกตามคำขอ */}

                    <Separator />

                    {/* Search */}
                    <div className="space-y-2">
                        <Label htmlFor="search">ค้นหาอะไหล่</Label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="search"
                                placeholder="ค้นหาด้วยชื่อหรือรหัสอะไหล่"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Parts list as single table with grouped rows (สุ่มมา 3 รายการ) */}
                    <div className="space-y-2 flex-1 flex flex-col">
                        <Label>
                            รายการอะไหล่ ({filteredParts.length} รายการ)
                        </Label>
                        <ScrollArea className="flex-1 border border-border rounded-lg">
                            <div className="p-3">
                                {filteredParts.length === 0 ? (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <Package className="mx-auto h-12 w-12 mb-2" />
                                        <p>ไม่พบอะไหล่ที่ค้นหา</p>
                                    </div>
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="h-9">
                                                <TableHead className="w-[100px] py-2">
                                                    เลือก
                                                </TableHead>
                                                <TableHead className="w-[200px] py-2">
                                                    เลขที่การเบิก
                                                </TableHead>
                                                <TableHead className="w-[140px] py-2">
                                                    รหัส
                                                </TableHead>
                                                <TableHead className="py-2">
                                                    ชื่ออะไหล่
                                                </TableHead>
                                                <TableHead className="w-[140px] py-2">
                                                    ใช้งาน
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {Object.values(grouped).map((sec) =>
                                                Object.values(
                                                    sec.components
                                                ).map((comp) => (
                                                    <>
                                                        <TableRow
                                                            key={`group-${sec.section.id}-${comp.component.id}`}
                                                            className="h-8"
                                                        >
                                                            <TableCell
                                                                colSpan={5}
                                                                className="py-1.5"
                                                            >
                                                                <div className="text-sm font-medium">
                                                                    ส่วนประกอบ:{" "}
                                                                    {
                                                                        sec
                                                                            .section
                                                                            .name
                                                                    }
                                                                    <span className="ml-2">
                                                                        ชิ้นส่วน:{" "}
                                                                        {
                                                                            comp
                                                                                .component
                                                                                .name
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                        {comp.parts.map(
                                                            (part) => (
                                                                <TableRow
                                                                    key={
                                                                        part.id
                                                                    }
                                                                    className="h-9"
                                                                >
                                                                    <TableCell className="py-1.5">
                                                                        <Checkbox
                                                                            checked={isPartSelected(
                                                                                part.id
                                                                            )}
                                                                            onCheckedChange={() =>
                                                                                handlePartToggle(
                                                                                    part
                                                                                )
                                                                            }
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell className="py-1.5">
                                                                        {part.tranId || "-"}
                                                                    </TableCell>
                                                                    <TableCell className="py-1.5">
                                                                        {
                                                                            part.code
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell className="py-1.5">
                                                                        {
                                                                            part.name
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell className="py-1.5">
                                                                        {
                                                                            part.defaultUsage
                                                                        }{" "}
                                                                        {
                                                                            part.unit
                                                                        }
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        )}
                                                    </>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                )}
                            </div>
                        </ScrollArea>
                    </div>
                </div>

                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={handleCancel}>
                        ยกเลิก
                    </Button>
                    <Button onClick={handleConfirm}>
                        ยืนยันการเลือก ({tempSelectedParts.length} รายการ)
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
