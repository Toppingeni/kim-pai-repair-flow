import { useMemo, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import {
    mockSpareParts,
    type SparePart,
    mockComponents,
    mockSections,
    mockMachines,
} from "@/data/masterData";

interface SparePartPickerDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedIds?: string[];
    onConfirm: (selectedIds: string[]) => void;
    machineId?: string; // ถ้าระบุ จะ filter เฉพาะอะไหล่ของเครื่องจักรนี้
    excludeIds?: string[]; // ซ่อน id บางรายการ (เช่น ห้ามเลือกตัวเอง)
    title?: string;
    multiple?: boolean; // ถ้า false จะเลือกได้แค่รายการเดียว
}

export function SparePartPickerDialog({
    open,
    onOpenChange,
    selectedIds = [],
    onConfirm,
    machineId,
    excludeIds = [],
    title,
    multiple = true,
}: SparePartPickerDialogProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [tempSelectedIds, setTempSelectedIds] =
        useState<string[]>(selectedIds);

    const results = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        let list = mockSpareParts.map((p) => {
            const comp = mockComponents.find((c) => c.id === p.componentId);
            const sec = comp
                ? mockSections.find((s) => s.id === comp.sectionId)
                : undefined;
            const mac = sec
                ? mockMachines.find((m) => m.id === sec.machineId)
                : undefined;
            return {
                p,
                component: comp?.name || "-",
                section: sec?.name || "-",
                machine: mac?.name || "-",
                machineId: mac?.id,
            };
        });
        if (machineId) {
            list = list.filter((x) => x.machineId === machineId);
        }
        if (excludeIds.length > 0) {
            list = list.filter(({ p }) => !excludeIds.includes(p.id));
        }
        if (!q) return list;
        return list.filter(({ p }) =>
            [p.name, p.code, p.category].some((field) =>
                field.toLowerCase().includes(q)
            )
        );
    }, [searchQuery, machineId, excludeIds]);

    const handleToggle = (id: string) => {
        setTempSelectedIds((prev) => {
            const isSelected = prev.includes(id);
            if (multiple) {
                return isSelected
                    ? prev.filter((x) => x !== id)
                    : [...prev, id];
            } else {
                return isSelected ? [] : [id];
            }
        });
    };

    const handleConfirm = () => {
        onConfirm(tempSelectedIds);
        onOpenChange(false);
    };

    const handleCancel = () => {
        setTempSelectedIds(selectedIds);
        setSearchQuery("");
        onOpenChange(false);
    };

    const handleOpenChange = (o: boolean) => {
        if (o) {
            setTempSelectedIds(selectedIds);
            setSearchQuery("");
        }
        onOpenChange(o);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{title || "เลือกอะไหล่จากคลัง"}</DialogTitle>
                    <DialogDescription>
                        {multiple
                            ? "ค้นหาและเลือกได้หลายรายการ"
                            : "ค้นหาและเลือกได้เพียง 1 รายการ"}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="ค้นหาชื่อ/รหัส/หมวดหมู่ อะไหล่"
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        {multiple ? (
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary">
                                    เลือกแล้ว: {tempSelectedIds.length}
                                </Badge>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        setTempSelectedIds(
                                            results.map(({ p }) => p.id)
                                        )
                                    }
                                    disabled={results.length === 0}
                                >
                                    เลือกผลลัพธ์ทั้งหมด
                                </Button>
                            </div>
                        ) : (
                            <div />
                        )}
                        {multiple && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setTempSelectedIds([])}
                                disabled={tempSelectedIds.length === 0}
                            >
                                ล้างการเลือก
                            </Button>
                        )}
                    </div>

                    <div className="border rounded-md max-h-[420px] overflow-y-auto">
                        <Table>
                            <TableHeader className="sticky top-0 bg-background">
                                <TableRow>
                                    <TableHead className="w-[60px]">
                                        เลือก
                                    </TableHead>
                                    <TableHead className="w-[130px]">
                                        รหัส
                                    </TableHead>
                                    <TableHead className="w-[220px]">
                                        อะไหล่
                                    </TableHead>

                                    {/* <TableHead className="w-[120px]">หมวดหมู่</TableHead>
                  <TableHead className="w-[150px]">ชิ้นส่วน</TableHead>
                  <TableHead className="w-[150px]">ส่วนประกอบ</TableHead>
                  <TableHead className="w-[180px]">เครื่องจักร</TableHead> */}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {results.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="text-center text-muted-foreground py-8"
                                        >
                                            ไม่พบรายการ
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    results.map(
                                        ({
                                            p,
                                            component,
                                            section,
                                            machine,
                                        }) => (
                                            <TableRow
                                                key={p.id}
                                                className="cursor-pointer"
                                                onDoubleClick={() => {
                                                    // ในโหมด single เลือกแล้วยืนยันทันที
                                                    if (!multiple) {
                                                        setTempSelectedIds([p.id]);
                                                        onConfirm([p.id]);
                                                        onOpenChange(false);
                                                    }
                                                }}
                                                onClick={() => {
                                                    // คลิกที่แถวเพื่อ toggle; คลิกบน checkbox จะถูก stopPropagation
                                                    handleToggle(p.id);
                                                }}
                                            >
                                                <TableCell>
                                                    <Checkbox
                                                        onClick={(e) => e.stopPropagation()}
                                                        checked={tempSelectedIds.includes(
                                                            p.id
                                                        )}
                                                        onCheckedChange={() =>
                                                            handleToggle(p.id)
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell className="text-sm text-muted-foreground">
                                                    {p.code}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {p.name}
                                                </TableCell>

                                                {/* <TableCell className="text-sm">{p.category}</TableCell>
                      <TableCell className="text-sm">{component}</TableCell>
                      <TableCell className="text-sm">{section}</TableCell>
                      <TableCell className="text-sm">{machine}</TableCell> */}
                                            </TableRow>
                                        )
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={handleCancel}>
                        ยกเลิก
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={tempSelectedIds.length === 0}
                    >
                        เลือก ({tempSelectedIds.length})
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
