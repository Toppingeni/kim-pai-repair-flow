import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { Search, Package, ShoppingCart, FileText } from "lucide-react";
import { Part } from "./PartsManagementEnhanced";

interface POItem {
    id: string;
    name: string;
    code: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    supplier: string;
    status: string;
}

interface PurchaseOrder {
    poNumber: string;
    supplier: string;
    date: string;
    status: string;
    items: POItem[];
}

interface POSelectionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedParts: Part[];
    onPartsSelected: (parts: Part[]) => void;
}

// Mock PO data
const mockPOs: PurchaseOrder[] = [
    {
        poNumber: "PO-2024-001",
        supplier: "ABC Parts Co.,Ltd.",
        date: "2024-01-15",
        status: "รอรับของ",
        items: [
            {
                id: "po1-1",
                name: "มอเตอร์ไฟฟ้า 3 เฟส",
                code: "MOT-3P-001",
                quantity: 2,
                unitPrice: 15000,
                totalPrice: 30000,
                supplier: "ABC Parts Co.,Ltd.",
                status: "รอรับของ",
            },
            {
                id: "po1-2",
                name: "เซ็นเซอร์อุณหภูมิ",
                code: "TEMP-001",
                quantity: 5,
                unitPrice: 2500,
                totalPrice: 12500,
                supplier: "ABC Parts Co.,Ltd.",
                status: "รอรับของ",
            },
            {
                id: "po1-3",
                name: "โซ่ขับ #40",
                code: "CHAIN-40",
                quantity: 3,
                unitPrice: 1200,
                totalPrice: 3600,
                supplier: "ABC Parts Co.,Ltd.",
                status: "รอรับของ",
            },
        ],
    },
    {
        poNumber: "PO-2024-002",
        supplier: "XYZ Industrial",
        date: "2024-01-20",
        status: "รอรับของ",
        items: [
            {
                id: "po2-1",
                name: "แบริ่ง SKF 6205",
                code: "BRG-6205",
                quantity: 10,
                unitPrice: 450,
                totalPrice: 4500,
                supplier: "XYZ Industrial",
                status: "รอรับของ",
            },
            {
                id: "po2-2",
                name: "สายไฟ NYY 2x2.5",
                code: "WIRE-NYY-2x2.5",
                quantity: 100,
                unitPrice: 25,
                totalPrice: 2500,
                supplier: "XYZ Industrial",
                status: "รอรับของ",
            },
            {
                id: "po2-3",
                name: "สายไฮดรอลิก 1/2 นิ้ว",
                code: "HYD-HOSE-0.5",
                quantity: 20,
                unitPrice: 180,
                totalPrice: 3600,
                supplier: "XYZ Industrial",
                status: "รอรับของ",
            },
        ],
    },
    {
        poNumber: "PO-2024-003",
        supplier: "DEF Engineering",
        date: "2024-01-25",
        status: "รอรับของ",
        items: [
            {
                id: "po3-1",
                name: "ปั๊มน้ำมันไฮดรอลิก",
                code: "HYD-PUMP-001",
                quantity: 1,
                unitPrice: 45000,
                totalPrice: 45000,
                supplier: "DEF Engineering",
                status: "รอรับของ",
            },
            {
                id: "po3-2",
                name: "ซีลยาง O-Ring ขนาด 20mm",
                code: "ORING-20",
                quantity: 50,
                unitPrice: 15,
                totalPrice: 750,
                supplier: "DEF Engineering",
                status: "รอรับของ",
            },
            {
                id: "po3-3",
                name: "น้ำมันไฮดรอลิก ISO VG46",
                code: "HYD-OIL-VG46",
                quantity: 4,
                unitPrice: 850,
                totalPrice: 3400,
                supplier: "DEF Engineering",
                status: "รอรับของ",
            },
        ],
    },
    {
        poNumber: "PO-2024-004",
        supplier: "GHI Automation",
        date: "2024-02-01",
        status: "รอรับของ",
        items: [
            {
                id: "po4-1",
                name: "PLC Mitsubishi FX3U-32MR",
                code: "PLC-FX3U-32MR",
                quantity: 1,
                unitPrice: 8500,
                totalPrice: 8500,
                supplier: "GHI Automation",
                status: "รอรับของ",
            },
            {
                id: "po4-2",
                name: "เซ็นเซอร์ความดัน",
                code: "PRESS-SENSOR-001",
                quantity: 2,
                unitPrice: 3200,
                totalPrice: 6400,
                supplier: "GHI Automation",
                status: "รอรับของ",
            },
            {
                id: "po4-3",
                name: "รีเลย์ 24VDC",
                code: "RELAY-24VDC",
                quantity: 10,
                unitPrice: 120,
                totalPrice: 1200,
                supplier: "GHI Automation",
                status: "รอรับของ",
            },
        ],
    },
    {
        poNumber: "PO-2024-005",
        supplier: "JKL Mechanical",
        date: "2024-02-05",
        status: "รับของแล้ว",
        items: [
            {
                id: "po5-1",
                name: "เฟือง 20 ฟัน โมดูล 2",
                code: "GEAR-20T-M2",
                quantity: 4,
                unitPrice: 650,
                totalPrice: 2600,
                supplier: "JKL Mechanical",
                status: "รับของแล้ว",
            },
            {
                id: "po5-2",
                name: "สกรูหัวแหลม M8x25",
                code: "SCREW-M8x25",
                quantity: 100,
                unitPrice: 5,
                totalPrice: 500,
                supplier: "JKL Mechanical",
                status: "รับของแล้ว",
            },
            {
                id: "po5-3",
                name: "น๊อตหกเหลี่ยม M10x30",
                code: "BOLT-M10x30",
                quantity: 50,
                unitPrice: 8,
                totalPrice: 400,
                supplier: "JKL Mechanical",
                status: "รับของแล้ว",
            },
        ],
    },
];

export function POSelectionDialog({
    open,
    onOpenChange,
    selectedParts,
    onPartsSelected,
}: POSelectionDialogProps) {
    const [searchPO, setSearchPO] = useState("");
    const [searchResults, setSearchResults] = useState<PurchaseOrder[]>([]);
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const [searching, setSearching] = useState(false);

    const handleSearch = () => {
        if (!searchPO.trim()) return;

        setSearching(true);
        // Simulate API call delay
        setTimeout(() => {
            const results = mockPOs.filter((po) =>
                po.poNumber.toLowerCase().includes(searchPO.toLowerCase())
            );
            setSearchResults(results);
            setSearching(false);
        }, 500);
    };

    const handleItemSelect = (itemId: string, checked: boolean) => {
        const newSelected = new Set(selectedItems);
        if (checked) {
            newSelected.add(itemId);
        } else {
            newSelected.delete(itemId);
        }
        setSelectedItems(newSelected);
    };

    const handleSelectAll = (poNumber: string, checked: boolean) => {
        const newSelected = new Set(selectedItems);
        const po = searchResults.find((p) => p.poNumber === poNumber);

        if (po) {
            po.items.forEach((item) => {
                if (checked) {
                    newSelected.add(item.id);
                } else {
                    newSelected.delete(item.id);
                }
            });
        }

        setSelectedItems(newSelected);
    };

    const handleAccept = () => {
        const selectedPOItems: Part[] = [];

        searchResults.forEach((po) => {
            po.items.forEach((item) => {
                if (selectedItems.has(item.id)) {
                    selectedPOItems.push({
                        id: item.id,
                        name: item.name,
                        code: item.code,
                        quantity: item.quantity,
                        type: "purchase",
                        status: item.status,
                        unitPrice: item.unitPrice,
                        totalPrice: item.totalPrice,
                        supplier: item.supplier,
                        notes: `จาก PO: ${po.poNumber}`,
                        poNumber: po.poNumber, // Add PO number for grouping
                    } as Part & { poNumber: string });
                }
            });
        });

        // Merge with existing parts (avoid duplicates)
        const existingIds = new Set(selectedParts.map((p) => p.id));
        const newParts = selectedPOItems.filter(
            (part) => !existingIds.has(part.id)
        );
        const allParts = [...selectedParts, ...newParts];

        onPartsSelected(allParts);

        // Reset dialog state
        setSelectedItems(new Set());
        setSearchResults([]);
        setSearchPO("");
        onOpenChange(false);
    };

    const isItemSelected = (itemId: string) => selectedItems.has(itemId);

    const isPOFullySelected = (poNumber: string) => {
        const po = searchResults.find((p) => p.poNumber === poNumber);
        if (!po) return false;
        return po.items.every((item) => selectedItems.has(item.id));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[95vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        เลือกจาก Purchase Order (PO)
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
                    {/* Search Section */}
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <Label
                                htmlFor="po-search"
                                className="text-sm font-medium"
                            >
                                ค้นหาเลขที่ PO
                            </Label>
                            <div className="flex gap-2 mt-1">
                                <Input
                                    id="po-search"
                                    placeholder="ป้อนเลขที่ PO เช่น PO-2024-001"
                                    value={searchPO}
                                    onChange={(e) =>
                                        setSearchPO(e.target.value)
                                    }
                                    onKeyPress={(e) =>
                                        e.key === "Enter" && handleSearch()
                                    }
                                />
                                <Button
                                    onClick={handleSearch}
                                    disabled={!searchPO.trim() || searching}
                                    className="shrink-0"
                                >
                                    <Search className="h-4 w-4 mr-2" />
                                    {searching ? "กำลังค้นหา..." : "ค้นหา"}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Search Results */}
                    <div className="flex-1 overflow-y-auto">
                        {searchResults.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                {searchPO ? (
                                    <p>ไม่พบ PO ที่ค้นหา</p>
                                ) : (
                                    <p>กรุณาป้อนเลขที่ PO และกดค้นหา</p>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {searchResults.map((po) => (
                                    <div
                                        key={po.poNumber}
                                        className="border rounded-lg p-4"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <Checkbox
                                                    checked={isPOFullySelected(
                                                        po.poNumber
                                                    )}
                                                    onCheckedChange={(
                                                        checked
                                                    ) =>
                                                        handleSelectAll(
                                                            po.poNumber,
                                                            checked as boolean
                                                        )
                                                    }
                                                />
                                                <div>
                                                    <h3 className="font-medium">
                                                        {po.poNumber}
                                                    </h3>
                                                    {/* <p className="text-sm text-muted-foreground">
                            ผู้จำหน่าย: {po.supplier} | วันที่: {po.date}
                          </p> */}
                                                </div>
                                            </div>
                                            {/* <Badge variant="outline">
                                                {po.status}
                                            </Badge> */}
                                        </div>

                                        <div className="space-y-2">
                                            {po.items.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center gap-3 p-2 bg-muted/50 rounded"
                                                >
                                                    <Checkbox
                                                        checked={isItemSelected(
                                                            item.id
                                                        )}
                                                        onCheckedChange={(
                                                            checked
                                                        ) =>
                                                            handleItemSelect(
                                                                item.id,
                                                                checked as boolean
                                                            )
                                                        }
                                                    />
                                                    <Package className="h-4 w-4 text-muted-foreground shrink-0" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-sm">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            รหัส: {item.code}
                                                        </p>
                                                    </div>
                                                    <div className="text-right text-sm shrink-0">
                                                        <p>
                                                            จำนวน:{" "}
                                                            {item.quantity}
                                                        </p>
                                                        <p className="text-muted-foreground">
                                                            ฿
                                                            {item.totalPrice.toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center pt-2 border-t">
                        <div className="text-sm text-muted-foreground">
                            เลือกแล้ว: {selectedItems.size} รายการ
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSelectedItems(new Set());
                                    setSearchResults([]);
                                    setSearchPO("");
                                    onOpenChange(false);
                                }}
                            >
                                ยกเลิก
                            </Button>
                            <Button
                                onClick={handleAccept}
                                disabled={selectedItems.size === 0}
                            >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                เพิ่มลงรายการ ({selectedItems.size})
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
