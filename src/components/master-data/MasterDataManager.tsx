
import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  Plus, 
  Link2 
} from "lucide-react";
import { AddMachineModal } from "./AddMachineModal";
import { AddSectionModal } from "./AddSectionModal";
import { AddComponentModal } from "./AddComponentModal";
import { AddSparePartModal } from "./AddSparePartModal";
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
  updateSparePartCount
} from "@/data/masterData";

export function MasterDataManager() {
  // selections
  const [selectedMachineId, setSelectedMachineId] = useState<string | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

  // per-column search
  const [searchMachines, setSearchMachines] = useState("");
  const [searchSections, setSearchSections] = useState("");
  const [searchComponents, setSearchComponents] = useState("");
  const [searchParts, setSearchParts] = useState("");

  // modal states
  const [showAddMachine, setShowAddMachine] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [showAddComponent, setShowAddComponent] = useState(false);
  const [showAddSparePart, setShowAddSparePart] = useState(false);

  // ใช้ข้อมูลจาก library กลาง - ในการใช้งานจริงควรใช้ state management
  const [machines, setMachines] = useState<Machine[]>(mockMachines);
  const [sections, setSections] = useState<Section[]>(mockSections);
  const [components, setComponents] = useState<ComponentItem[]>(mockComponents);
  const [spareParts, setSpareParts] = useState<SparePart[]>(mockSpareParts);

  // derived lists
  const filteredMachines = useMemo(
    () => machines.filter((m) => m.name.toLowerCase().includes(searchMachines.toLowerCase())),
    [machines, searchMachines]
  );

  const filteredSections = useMemo(
    () =>
      sections
        .filter((s) => !selectedMachineId || s.machineId === selectedMachineId)
        .filter((s) => s.name.toLowerCase().includes(searchSections.toLowerCase())),
    [sections, selectedMachineId, searchSections]
  );

  const filteredComponents = useMemo(
    () =>
      components
        .filter((c) => !selectedSectionId || c.sectionId === selectedSectionId)
        .filter((c) => c.name.toLowerCase().includes(searchComponents.toLowerCase())),
    [components, selectedSectionId, searchComponents]
  );

  const filteredParts = useMemo(
    () =>
      spareParts
        .filter((p) => !selectedComponentId || p.componentId === selectedComponentId)
        .filter((p) => p.name.toLowerCase().includes(searchParts.toLowerCase())),
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

  const canLink = !!(selectedMachineId && selectedSectionId && selectedComponentId);

  // Helper functions to get names for modals
  const getSelectedMachineName = () => machines.find(m => m.id === selectedMachineId)?.name;
  const getSelectedSectionName = () => sections.find(s => s.id === selectedSectionId)?.name;
  const getSelectedComponentName = () => components.find(c => c.id === selectedComponentId)?.name;

  // Add handlers
  const handleAddMachine = (machineData: { name: string; status: "Active" | "Inactive"; description?: string }) => {
    const newMachine: Machine = {
      id: `m${Date.now()}`, // ในการใช้งานจริงควรใช้ UUID
      name: machineData.name,
      status: machineData.status,
      sectionsCount: 0,
      createdAt: new Date().toLocaleDateString('th-TH'),
      updatedAt: new Date().toLocaleDateString('th-TH'),
      createdBy: "ผู้ใช้ปัจจุบัน", // ควรดึงจาก context หรือ auth
      updatedBy: "ผู้ใช้ปัจจุบัน",
    };
    setMachines(prev => [...prev, newMachine]);
  };

  const handleAddSection = (sectionData: { machineId: string; name: string; status: "Active" | "Inactive"; description?: string }) => {
    const newSection: Section = {
      id: `s${Date.now()}`,
      machineId: sectionData.machineId,
      name: sectionData.name,
      status: sectionData.status,
      componentsCount: 0,
    };
    setSections(prev => [...prev, newSection]);
    
    // Update machine's sections count
    setMachines(prev => prev.map(m => 
      m.id === sectionData.machineId 
        ? { ...m, sectionsCount: m.sectionsCount + 1, updatedAt: new Date().toLocaleDateString('th-TH') }
        : m
    ));
  };

  const handleAddComponent = (componentData: { sectionId: string; name: string; status: "Active" | "Inactive"; description?: string }) => {
    const newComponent: ComponentItem = {
      id: `c${Date.now()}`,
      sectionId: componentData.sectionId,
      name: componentData.name,
      status: componentData.status,
      sparePartsCount: 0,
    };
    setComponents(prev => [...prev, newComponent]);
    
    // Update section's components count
    setSections(prev => prev.map(s => 
      s.id === componentData.sectionId 
        ? { ...s, componentsCount: s.componentsCount + 1 }
        : s
    ));
  };

  const handleAddSparePart = (sparePartData: { componentId: string; name: string; status: "Active" | "Inactive"; qty: number; minQty?: number; unit?: string; description?: string }) => {
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
    setSpareParts(prev => [...prev, newSparePart]);
    
    // Update component's spare parts count
    setComponents(prev => prev.map(c => 
      c.id === sparePartData.componentId 
        ? { ...c, sparePartsCount: c.sparePartsCount + 1 }
        : c
    ));
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
              <CardTitle className="text-lg">เครื่องจักร</CardTitle>
              <Button size="sm" onClick={() => setShowAddMachine(true)}>
                <Plus className="h-4 w-4 mr-1" /> เพิ่ม
              </Button>
            </div>
            <CardDescription>เลือกเครื่องจักรที่ต้องการจัดการ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="ค้นหาเครื่องจักร..."
                value={searchMachines}
                onChange={(e) => setSearchMachines(e.target.value)}
                className="pl-9"
              />
            </div>
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {filteredMachines.map((m) => {
                  const isSelected = selectedMachineId === m.id;
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
                        <div className="font-medium">{m.name}</div>
                        <Badge variant={m.status === "Active" ? "default" : "secondary"}>
                          {m.status === "Active" ? "ใช้งาน" : "ไม่ใช้งาน"}
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
              <CardTitle className="text-lg">ส่วนประกอบ</CardTitle>
              <Button 
                size="sm" 
                onClick={() => setShowAddSection(true)}
                disabled={!selectedMachineId}
              >
                <Plus className="h-4 w-4 mr-1" /> เพิ่ม
              </Button>
            </div>
            <CardDescription>เลือกส่วนประกอบของเครื่องจักร</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="ค้นหาส่วนประกอบ..."
                value={searchSections}
                onChange={(e) => setSearchSections(e.target.value)}
                className="pl-9"
                disabled={!selectedMachineId}
              />
            </div>
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {!selectedMachineId ? (
                  <div className="text-center text-muted-foreground py-8">เลือกเครื่องจักรก่อน</div>
                ) : filteredSections.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">ไม่พบข้อมูล Section</div>
                ) : (
                  filteredSections.map((s) => {
                    const isSelected = selectedSectionId === s.id;
                    return (
                      <div
                        key={s.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary"
                            : "hover:bg-muted border-border"
                        }`}
                        onClick={() => selectSection(s.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{s.name}</div>
                          <Badge variant={s.status === "Active" ? "default" : "secondary"}>
                            {s.status === "Active" ? "ใช้งาน" : "ไม่ใช้งาน"}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Components: {s.componentsCount}
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
              <CardTitle className="text-lg">ชิ้นส่วน</CardTitle>
              <Button 
                size="sm" 
                onClick={() => setShowAddComponent(true)}
                disabled={!selectedSectionId}
              >
                <Plus className="h-4 w-4 mr-1" /> เพิ่ม
              </Button>
            </div>
            <CardDescription>เลือกชิ้นส่วนที่ต้องการจัดการ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="ค้นหาชิ้นส่วน..."
                value={searchComponents}
                onChange={(e) => setSearchComponents(e.target.value)}
                className="pl-9"
                disabled={!selectedSectionId}
              />
            </div>
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {!selectedSectionId ? (
                  <div className="text-center text-muted-foreground py-8">เลือก Section ก่อน</div>
                ) : filteredComponents.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">ไม่พบข้อมูล Component</div>
                ) : (
                  filteredComponents.map((c) => {
                    const isSelected = selectedComponentId === c.id;
                    return (
                      <div
                        key={c.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary"
                            : "hover:bg-muted border-border"
                        }`}
                        onClick={() => selectComponent(c.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{c.name}</div>
                          <Badge variant={c.status === "Active" ? "default" : "secondary"}>
                            {c.status === "Active" ? "ใช้งาน" : "ไม่ใช้งาน"}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Spare Parts: {c.sparePartsCount}
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
              <CardTitle className="text-lg">อะไหล่</CardTitle>
              <Button 
                size="sm" 
                onClick={() => setShowAddSparePart(true)}
                disabled={!selectedComponentId}
              >
                <Plus className="h-4 w-4 mr-1" /> เพิ่ม
              </Button>
            </div>
            <CardDescription>จัดการอะไหล่ของชิ้นส่วน</CardDescription>
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
                  <div className="text-center text-muted-foreground py-8">เลือก Component ก่อน</div>
                ) : filteredParts.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">ไม่พบข้อมูลอะไหล่</div>
                ) : (
                  filteredParts.map((p) => (
                    <div
                      key={p.id}
                      className="p-3 rounded-lg border hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{p.name}</div>
                        <Badge variant={p.status === "Active" ? "default" : "secondary"}>
                          {p.status === "Active" ? "ใช้งาน" : "ไม่ใช้งาน"}
                        </Badge>
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
    </div>
  );
}
