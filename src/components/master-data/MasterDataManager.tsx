import { useMemo, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Plus, Link2, Edit, Tag as TagIcon } from "lucide-react";
import { AddMachineModal } from "./AddMachineModal";
import { AddSectionModal } from "./AddSectionModal";
import { AddComponentModal } from "./AddComponentModal";
import { EditSectionModal } from "./EditSectionModal";
import { EditComponentModal } from "./EditComponentModal";
import { AddSparePartModal } from "./AddSparePartModal";
import { EditSparePartModal } from "./EditSparePartModal";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { SparePartPickerDialog } from "@/components/reports/SparePartPickerDialog";
import {
    type EntityStatus,
    type Machine,
    type Section,
    type ComponentItem,
    type SparePart,
    mockMachines,
    mockSections,
    mockComponents,
    mockSpareParts,
    updateSectionCount,
    updateComponentCount,
    updateSparePartCount,
} from "@/data/masterData";

export function MasterDataManager() {
    // selections
    const [selectedMachineId, setSelectedMachineId] = useState<string | null>(
        null
    );
    const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
        null
    );
    const [selectedComponentId, setSelectedComponentId] = useState<
        string | null
    >(null);

    // per-column search
    const [searchMachines, setSearchMachines] = useState("");
    const [searchSections, setSearchSections] = useState("");
    const [searchComponents, setSearchComponents] = useState("");
    const [searchParts, setSearchParts] = useState("");

    // modal states
    const [showAddMachine, setShowAddMachine] = useState(false);
    const [showAddSection, setShowAddSection] = useState(false);
    const [showAddComponent, setShowAddComponent] = useState(false);
    const [showEditSection, setShowEditSection] = useState(false);
    const [showEditComponent, setShowEditComponent] = useState(false);
    const [showAddSparePart, setShowAddSparePart] = useState(false);
    const [showEditSparePart, setShowEditSparePart] = useState(false);
    const [editingSparePart, setEditingSparePart] = useState<SparePart | null>(
        null
    );
    const [editingSection, setEditingSection] = useState<Section | null>(null);
    const [editingComponent, setEditingComponent] =
        useState<ComponentItem | null>(null);

    // ใช้ข้อมูลจาก library กลาง - ในการใช้งานจริงควรใช้ state management
    const [machines, setMachines] = useState<Machine[]>(mockMachines);
    const [sections, setSections] = useState<Section[]>(mockSections);
    const [components, setComponents] =
        useState<ComponentItem[]>(mockComponents);
    const [spareParts, setSpareParts] = useState<SparePart[]>(mockSpareParts);
    // Tagging state: map from parent part code -> child part codes
    const [partSubTags, setPartSubTags] = useState<Record<string, string[]>>({});
    const [showTagDialog, setShowTagDialog] = useState(false);
    const [taggingParentPart, setTaggingParentPart] = useState<SparePart | null>(
        null
    );

    // derived lists
    const filteredMachines = useMemo(
        () =>
            machines.filter((m) =>
                m.name.toLowerCase().includes(searchMachines.toLowerCase())
            ),
        [machines, searchMachines]
    );

    const filteredSections = useMemo(
        () =>
            sections
                .filter(
                    (s) =>
                        !selectedMachineId || s.machineId === selectedMachineId
                )
                .filter((s) =>
                    s.name.toLowerCase().includes(searchSections.toLowerCase())
                ),
        [sections, selectedMachineId, searchSections]
    );

    const filteredComponents = useMemo(
        () =>
            components
                .filter(
                    (c) =>
                        !selectedSectionId || c.sectionId === selectedSectionId
                )
                .filter((c) =>
                    c.name
                        .toLowerCase()
                        .includes(searchComponents.toLowerCase())
                ),
        [components, selectedSectionId, searchComponents]
    );

    const filteredParts = useMemo(
        () =>
            spareParts
                .filter(
                    (p) =>
                        !selectedComponentId ||
                        p.componentId === selectedComponentId
                )
                .filter((p) =>
                    p.name.toLowerCase().includes(searchParts.toLowerCase())
                ),
        [spareParts, selectedComponentId, searchParts]
    );

    // handlers with cascade clearing
    const selectMachine = (id: string) => {
        setSelectedMachineId(id);
        // เคลียร์ section, component, spare part เมื่อเลือก machine ใหม่
        setSelectedSectionId(null);
        setSelectedComponentId(null);
        // เคลียร์ search filters ด้วย
        setSearchSections("");
        setSearchComponents("");
        setSearchParts("");
    };

    const selectSection = (id: string) => {
        setSelectedSectionId(id);
        // เคลียร์ component และ spare part เมื่อเลือก section ใหม่
        setSelectedComponentId(null);
        // เคลียร์ search filters ด้วย
        setSearchComponents("");
        setSearchParts("");
    };

    const selectComponent = (id: string) => {
        setSelectedComponentId(id);
        // เคลียร์ search filter สำหรับ spare parts
        setSearchParts("");
    };

    const canLink = !!(
        selectedMachineId &&
        selectedSectionId &&
        selectedComponentId
    );

    // Lookup helpers
    const getPartById = (id: string) => spareParts.find((p) => p.id === id);
    const getPartsByCodesInMachine = (
        codes: string[],
        machineId?: string | null
    ) => {
        return spareParts.filter((p) => {
            if (!codes.includes(p.code)) return false;
            if (!machineId) return true;
            const comp = components.find((c) => c.id === p.componentId);
            if (!comp) return false;
            const sec = sections.find((s) => s.id === comp.sectionId);
            return sec?.machineId === machineId;
        });
    };
    const unique = <T,>(arr: T[]) => Array.from(new Set(arr));

    const handleOpenTagDialog = (parent: SparePart) => {
        setTaggingParentPart(parent);
        setShowTagDialog(true);
    };
    const getPreselectedIdsForTagDialog = () => {
        if (!taggingParentPart) return [] as string[];
        const codes = partSubTags[taggingParentPart.code] || [];
        return getPartsByCodesInMachine(codes, selectedMachineId).map(
            (p) => p.id
        );
    };
    const handleConfirmTagging = (selectedIds: string[]) => {
        if (!taggingParentPart) return;
        const parentCode = taggingParentPart.code;
        const selectedCodes = unique(
            selectedIds
                .map((id) => getPartById(id)?.code)
                .filter((x): x is string => !!x && x !== parentCode)
        );
        setPartSubTags((prev) => ({ ...prev, [parentCode]: selectedCodes }));
        setShowTagDialog(false);
        setTaggingParentPart(null);
    };

    const getSubPartsForTooltip = (part: SparePart) => {
        const codes = partSubTags[part.code] || [];
        if (codes.length === 0) return [] as { code: string; name?: string }[];
        const partsInMachine = getPartsByCodesInMachine(codes, selectedMachineId);
        return codes.map((code) => {
            const found = partsInMachine.find((p) => p.code === code);
            return { code, name: found?.name };
        });
    };

    const getParentPartsForTooltip = (part: SparePart) => {
        const parentCodes = Object.entries(partSubTags)
            .filter(([_, subs]) => subs.includes(part.code))
            .map(([parent]) => parent);
        if (parentCodes.length === 0)
            return [] as { code: string; name?: string }[];
        const partsInMachine = getPartsByCodesInMachine(
            parentCodes,
            selectedMachineId
        );
        return parentCodes.map((code) => {
            const found = partsInMachine.find((p) => p.code === code);
            return { code, name: found?.name };
        });
    };

    // Helper functions to get names for modals
    const getSelectedMachineName = () =>
        machines.find((m) => m.id === selectedMachineId)?.name;
    const getSelectedSectionName = () =>
        sections.find((s) => s.id === selectedSectionId)?.name;
    const getSelectedComponentName = () =>
        components.find((c) => c.id === selectedComponentId)?.name;

    // Add handlers
    const handleAddMachine = (machineData: {
        name: string;
        status: "Active" | "Inactive";
        description?: string;
    }) => {
        const newMachine: Machine = {
            id: `m${Date.now()}`, // ในการใช้งานจริงควรใช้ UUID
            name: machineData.name,
            status: machineData.status,
            sectionsCount: 0,
            createdAt: new Date().toLocaleDateString("th-TH"),
            updatedAt: new Date().toLocaleDateString("th-TH"),
            createdBy: "ผู้ใช้ปัจจุบัน", // ควรดึงจาก context หรือ auth
            updatedBy: "ผู้ใช้ปัจจุบัน",
        };
        setMachines((prev) => [...prev, newMachine]);
    };

    const handleAddSection = (sectionData: {
        machineId: string;
        name: string;
        status: "Active" | "Inactive";
        description?: string;
    }) => {
        const newSection: Section = {
            id: `s${Date.now()}`,
            machineId: sectionData.machineId,
            name: sectionData.name,
            status: sectionData.status,
            componentsCount: 0,
        };
        setSections((prev) => [...prev, newSection]);

        // Update machine's sections count
        setMachines((prev) =>
            prev.map((m) =>
                m.id === sectionData.machineId
                    ? {
                          ...m,
                          sectionsCount: m.sectionsCount + 1,
                          updatedAt: new Date().toLocaleDateString("th-TH"),
                      }
                    : m
            )
        );
    };

    const handleUpdateSection = (
        sectionId: string,
        updated: { name: string }
    ) => {
        setSections((prev) =>
            prev.map((s) =>
                s.id === sectionId ? { ...s, name: updated.name } : s
            )
        );
    };

    const handleAddComponent = (componentData: {
        sectionId: string;
        name: string;
        status: "Active" | "Inactive";
        description?: string;
    }) => {
        const newComponent: ComponentItem = {
            id: `c${Date.now()}`,
            sectionId: componentData.sectionId,
            name: componentData.name,
            status: componentData.status,
            sparePartsCount: 0,
        };
        setComponents((prev) => [...prev, newComponent]);

        // Update section's components count
        setSections((prev) =>
            prev.map((s) =>
                s.id === componentData.sectionId
                    ? { ...s, componentsCount: s.componentsCount + 1 }
                    : s
            )
        );
    };

    const handleUpdateComponent = (
        componentId: string,
        updated: { name: string }
    ) => {
        setComponents((prev) =>
            prev.map((c) =>
                c.id === componentId ? { ...c, name: updated.name } : c
            )
        );
    };

    const handleAddSparePart = (sparePartData: {
        componentId: string;
        name: string;
        status: "Active" | "Inactive";
        qty: number;
        minQty?: number;
        unit?: string;
        description?: string;
    }) => {
        const newSparePart: SparePart = {
            id: `p${Date.now()}`,
            componentId: sparePartData.componentId,
            name: sparePartData.name,
            code: `SP-${Date.now()}`, // สร้าง code อัตโนมัติ
            category: "อื่นๆ", // ค่าเริ่มต้น
            status: sparePartData.status,
            qty: sparePartData.qty,
            used: 0, // เริ่มต้นที่ 0
            unit: sparePartData.unit || "ตัว", // ค่าเริ่มต้น
            defaultUsage: 1, // ค่าเริ่มต้น
            stock: sparePartData.qty, // stock เท่ากับ qty เริ่มต้น
        };
        setSpareParts((prev) => [...prev, newSparePart]);

        // Update component's spare parts count
        setComponents((prev) =>
            prev.map((c) =>
                c.id === sparePartData.componentId
                    ? { ...c, sparePartsCount: c.sparePartsCount + 1 }
                    : c
            )
        );
    };

    const handleUpdateSparePart = (
        sparePartId: string,
        updatedData: {
            name: string;
            status: EntityStatus;
            qty: number;
            minQty?: number;
            unit?: string;
            description?: string;
        }
    ) => {
        setSpareParts((prev) =>
            prev.map((part) =>
                part.id === sparePartId
                    ? {
                          ...part,
                          name: updatedData.name,
                          status: updatedData.status,
                          qty: updatedData.qty,
                          unit: updatedData.unit || part.unit,
                          stock: updatedData.qty, // อัปเดต stock ตาม qty ใหม่
                      }
                    : part
            )
        );
    };

    return (
        <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3 justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="secondary">โครงสร้างข้อมูล</Badge>
                    <span>Machines → Sections → Components → Spare Parts</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" disabled={!canLink}>
                        <Link2 className="h-4 w-4 mr-2" /> เชื่อมโยง
                    </Button>
                </div>
            </div>

            {/* 4 Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Machines */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">
                                เครื่องจักร (Machines)
                            </CardTitle>
                            <Button
                                size="sm"
                                onClick={() => setShowAddMachine(true)}
                            >
                                <Plus className="h-4 w-4 mr-1" /> เพิ่ม
                            </Button>
                        </div>
                        <CardDescription>
                            เลือกเครื่องจักรที่ต้องการจัดการ
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="ค้นหาเครื่องจักร..."
                                value={searchMachines}
                                onChange={(e) =>
                                    setSearchMachines(e.target.value)
                                }
                                className="pl-9"
                            />
                        </div>
                        <ScrollArea className="h-[400px]">
                            <div className="space-y-2">
                                {filteredMachines.map((m) => {
                                    const isSelected =
                                        selectedMachineId === m.id;
                                    return (
                                        <div
                                            key={m.id}
                                            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                                                isSelected
                                                    ? "bg-primary text-primary-foreground border-primary"
                                                    : "hover:bg-muted border-border"
                                            }`}
                                            onClick={() => selectMachine(m.id)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="font-medium">
                                                    {m.name}
                                                </div>
                                                <Badge
                                                    variant={
                                                        m.status === "Active"
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                >
                                                    {m.status === "Active"
                                                        ? "ใช้งาน"
                                                        : "ไม่ใช้งาน"}
                                                </Badge>
                                            </div>
                                            <div className="text-sm text-muted-foreground mt-1">
                                                Sections: {m.sectionsCount}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Sections */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">
                                ส่วนประกอบ (Sections)
                            </CardTitle>
                            <Button
                                size="sm"
                                onClick={() => setShowAddSection(true)}
                                disabled={!selectedMachineId}
                            >
                                <Plus className="h-4 w-4 mr-1" /> เพิ่ม
                            </Button>
                        </div>
                        <CardDescription>
                            เลือกส่วนประกอบของเครื่องจักร
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="ค้นหาส่วนประกอบ..."
                                value={searchSections}
                                onChange={(e) =>
                                    setSearchSections(e.target.value)
                                }
                                className="pl-9"
                                disabled={!selectedMachineId}
                            />
                        </div>
                        <ScrollArea className="h-[400px]">
                            <div className="space-y-2">
                                {!selectedMachineId ? (
                                    <div className="text-center text-muted-foreground py-8">
                                        เลือกเครื่องจักรก่อน
                                    </div>
                                ) : filteredSections.length === 0 ? (
                                    <div className="text-center text-muted-foreground py-8">
                                        ไม่พบข้อมูล Section
                                    </div>
                                ) : (
                                    filteredSections.map((s) => {
                                        const isSelected =
                                            selectedSectionId === s.id;
                                        return (
                                            <div
                                                key={s.id}
                                                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                                                    isSelected
                                                        ? "bg-primary text-primary-foreground border-primary"
                                                        : "hover:bg-muted border-border"
                                                }`}
                                                onClick={() =>
                                                    selectSection(s.id)
                                                }
                                            >
                                                <div className="flex items-center justify-between gap-2">
                                                    <div className="font-medium truncate">
                                                        {s.name}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setEditingSection(
                                                                    s
                                                                );
                                                                setShowEditSection(
                                                                    true
                                                                );
                                                            }}
                                                            className="h-7 px-2"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Badge
                                                            variant={
                                                                s.status ===
                                                                "Active"
                                                                    ? "default"
                                                                    : "secondary"
                                                            }
                                                        >
                                                            {s.status ===
                                                            "Active"
                                                                ? "ใช้งาน"
                                                                : "ไม่ใช้งาน"}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <div className="text-sm text-muted-foreground mt-1">
                                                    Components:{" "}
                                                    {s.componentsCount}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Components */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">
                                ชิ้นส่วน (Components)
                            </CardTitle>
                            <Button
                                size="sm"
                                onClick={() => setShowAddComponent(true)}
                                disabled={!selectedSectionId}
                            >
                                <Plus className="h-4 w-4 mr-1" /> เพิ่ม
                            </Button>
                        </div>
                        <CardDescription>
                            เลือกชิ้นส่วนที่ต้องการจัดการ
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="ค้นหาชิ้นส่วน..."
                                value={searchComponents}
                                onChange={(e) =>
                                    setSearchComponents(e.target.value)
                                }
                                className="pl-9"
                                disabled={!selectedSectionId}
                            />
                        </div>
                        <ScrollArea className="h-[400px]">
                            <div className="space-y-2">
                                {!selectedSectionId ? (
                                    <div className="text-center text-muted-foreground py-8">
                                        เลือก Section ก่อน
                                    </div>
                                ) : filteredComponents.length === 0 ? (
                                    <div className="text-center text-muted-foreground py-8">
                                        ไม่พบข้อมูล Component
                                    </div>
                                ) : (
                                    filteredComponents.map((c) => {
                                        const isSelected =
                                            selectedComponentId === c.id;
                                        return (
                                            <div
                                                key={c.id}
                                                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                                                    isSelected
                                                        ? "bg-primary text-primary-foreground border-primary"
                                                        : "hover:bg-muted border-border"
                                                }`}
                                                onClick={() =>
                                                    selectComponent(c.id)
                                                }
                                            >
                                                <div className="flex items-center justify-between gap-2">
                                                    <div className="font-medium truncate">
                                                        {c.name}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setEditingComponent(
                                                                    c
                                                                );
                                                                setShowEditComponent(
                                                                    true
                                                                );
                                                            }}
                                                            className="h-7 px-2"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Badge
                                                            variant={
                                                                c.status ===
                                                                "Active"
                                                                    ? "default"
                                                                    : "secondary"
                                                            }
                                                        >
                                                            {c.status ===
                                                            "Active"
                                                                ? "ใช้งาน"
                                                                : "ไม่ใช้งาน"}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <div className="text-sm text-muted-foreground mt-1">
                                                    Spare Parts:{" "}
                                                    {c.sparePartsCount}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Spare Parts */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">
                                อะไหล่ (Spare Parts)
                            </CardTitle>
                            <Button
                                size="sm"
                                onClick={() => setShowAddSparePart(true)}
                                disabled={!selectedComponentId}
                            >
                                <Plus className="h-4 w-4 mr-1" /> เพิ่ม
                            </Button>
                        </div>
                        <CardDescription>
                            จัดการอะไหล่ของชิ้นส่วน
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="ค้นหาอะไหล่..."
                                value={searchParts}
                                onChange={(e) => setSearchParts(e.target.value)}
                                className="pl-9"
                                disabled={!selectedComponentId}
                            />
                        </div>
                        <ScrollArea className="h-[400px]">
                            <div className="space-y-2">
                                {!selectedComponentId ? (
                                    <div className="text-center text-muted-foreground py-8">
                                        เลือก Component ก่อน
                                    </div>
                                ) : filteredParts.length === 0 ? (
                                    <div className="text-center text-muted-foreground py-8">
                                        ไม่พบข้อมูลอะไหล่
                                    </div>
                                ) : (
                                    filteredParts.map((p) => (
                                        <div
                                            key={p.id}
                                            className="p-3 rounded-lg border hover:bg-muted transition-colors"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="font-medium">
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <span className="cursor-default">
                                                                    {p.name}
                                                                </span>
                                                            </TooltipTrigger>
                                                            <TooltipContent className="max-w-sm">
                                                                {(() => {
                                                                    const parents = getParentPartsForTooltip(p);
                                                                    const subs = getSubPartsForTooltip(p);
                                                                    return (
                                                                        <div className="text-sm space-y-2">
                                                                            <div>
                                                                                <div className="font-medium mb-1">เป็น Sub ของ:</div>
                                                                                {parents.length === 0 ? (
                                                                                    <div className="text-muted-foreground">- ไม่มี -</div>
                                                                                ) : (
                                                                                    <ul className="list-disc pl-4 space-y-1">
                                                                                        {parents.map((s) => (
                                                                                            <li key={s.code}>
                                                                                                {s.name || s.code}
                                                                                                {!s.name ? (
                                                                                                    <span className="text-muted-foreground"> (ไม่พบในเครื่องนี้)</span>
                                                                                                ) : null}
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                )}
                                                                            </div>
                                                                            <div>
                                                                                <div className="font-medium mb-1">Sub parts:</div>
                                                                                {subs.length === 0 ? (
                                                                                    <div className="text-muted-foreground">- ไม่มี -</div>
                                                                                ) : (
                                                                                    <ul className="list-disc pl-4 space-y-1">
                                                                                        {subs.map((s) => (
                                                                                            <li key={s.code}>
                                                                                                {s.name || s.code}
                                                                                                {!s.name ? (
                                                                                                    <span className="text-muted-foreground"> (ไม่พบในเครื่องนี้)</span>
                                                                                                ) : null}
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })()}
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="secondary"
                                                        onClick={() => handleOpenTagDialog(p)}
                                                        title="Tag sub parts"
                                                    >
                                                        <TagIcon className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => {
                                                            setEditingSparePart(p);
                                                            setShowEditSparePart(true);
                                                        }}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Badge
                                                        variant={
                                                            p.status === "Active"
                                                                ? "default"
                                                                : "secondary"
                                                        }
                                                    >
                                                        {p.status === "Active"
                                                            ? "ใช้งาน"
                                                            : "ไม่ใช้งาน"}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="text-sm text-muted-foreground mt-1">
                                                คงเหลือ: {p.qty} {p.unit} • ใช้งาน: {p.used} {p.unit}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            {/* Modals */}
            <AddMachineModal
                open={showAddMachine}
                onOpenChange={setShowAddMachine}
                onAdd={handleAddMachine}
            />

            <AddSectionModal
                open={showAddSection}
                onOpenChange={setShowAddSection}
                selectedMachineId={selectedMachineId}
                machineName={getSelectedMachineName()}
                onAdd={handleAddSection}
            />

            <AddComponentModal
                open={showAddComponent}
                onOpenChange={setShowAddComponent}
                selectedSectionId={selectedSectionId}
                sectionName={getSelectedSectionName()}
                machineName={getSelectedMachineName()}
                onAdd={handleAddComponent}
            />

            <AddSparePartModal
                open={showAddSparePart}
                onOpenChange={setShowAddSparePart}
                selectedComponentId={selectedComponentId}
                componentName={getSelectedComponentName()}
                sectionName={getSelectedSectionName()}
                machineName={getSelectedMachineName()}
                onAdd={handleAddSparePart}
            />

            <EditSparePartModal
                open={showEditSparePart}
                onOpenChange={setShowEditSparePart}
                sparePart={editingSparePart}
                componentName={getSelectedComponentName()}
                sectionName={getSelectedSectionName()}
                machineName={getSelectedMachineName()}
                onUpdate={handleUpdateSparePart}
            />

            <EditSectionModal
                open={showEditSection}
                onOpenChange={setShowEditSection}
                section={editingSection}
                machineName={getSelectedMachineName()}
                onUpdate={handleUpdateSection}
            />

            <EditComponentModal
                open={showEditComponent}
                onOpenChange={setShowEditComponent}
                component={editingComponent}
                sectionName={getSelectedSectionName()}
                machineName={getSelectedMachineName()}
                onUpdate={handleUpdateComponent}
            />

            {/* Tag sub parts dialog */}
            <SparePartPickerDialog
                open={showTagDialog}
                onOpenChange={(o) => {
                    setShowTagDialog(o);
                    if (!o) setTaggingParentPart(null);
                }}
                selectedIds={getPreselectedIdsForTagDialog()}
                onConfirm={handleConfirmTagging}
                machineId={selectedMachineId ?? undefined}
                excludeIds={taggingParentPart ? [taggingParentPart.id] : []}
                title={
                    taggingParentPart
                        ? `เลือก Sub parts สำหรับ: ${taggingParentPart.name}`
                        : "เลือกอะไหล่"
                }
            />
        </div>
    );
}
