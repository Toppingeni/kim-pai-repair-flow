
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

  // handlers
  const selectMachine = (id: string) => {
    setSelectedMachineId(id);
    setSelectedSectionId(null);
    setSelectedComponentId(null);
  };
  const selectSection = (id: string) => {
    setSelectedSectionId(id);
    setSelectedComponentId(null);
  };
  const selectComponent = (id: string) => setSelectedComponentId(id);

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
      status: sparePartData.status,
      qty: sparePartData.qty,
      used: 0, // เริ่มต้นที่ 0
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Machines */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">🏭 Machines</CardTitle>
            </div>
            <CardDescription>จัดการเครื่องจักร</CardDescription>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={searchMachines} onChange={(e)=>setSearchMachines(e.target.value)} placeholder="ค้นหาเครื่องจักร..." className="pl-9" />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh] pr-2">
              <div className="space-y-2">
                {filteredMachines.map((m) => {
                  const selected = m.id === selectedMachineId;
                  return (
                    <button
                      key={m.id}
                      className={`w-full text-left rounded-md border p-3 transition-colors ${selected ? "border-primary bg-primary/10" : "border-transparent hover:bg-muted"}`}
                      onClick={() => selectMachine(m.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{m.name}</div>
                          <div className="text-xs text-muted-foreground">{m.sectionsCount} sections</div>
                        </div>
                        <Badge variant="secondary">{m.status}</Badge>
                      </div>
                    </button>
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
              <CardTitle className="text-base">⚙️ Sections</CardTitle>
              <Button 
                size="sm" 
                onClick={() => setShowAddSection(true)}
                disabled={!selectedMachineId}
              >
                <Plus className="h-4 w-4 mr-1" />เพิ่ม
              </Button>
            </div>
            <CardDescription>ส่วนประกอบของเครื่อง</CardDescription>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={searchSections} onChange={(e)=>setSearchSections(e.target.value)} placeholder="ค้นหาส่วน..." className="pl-9" />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh] pr-2">
              <div className="space-y-2">
                {filteredSections.length === 0 && (
                  <div className="text-sm text-muted-foreground">เลือกเครื่องจักรก่อน</div>
                )}
                {filteredSections.map((s) => {
                  const selected = s.id === selectedSectionId;
                  return (
                    <button
                      key={s.id}
                      className={`w-full text-left rounded-md border p-3 transition-colors ${selected ? "border-primary bg-primary/10" : "border-transparent hover:bg-muted"}`}
                      onClick={() => selectSection(s.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{s.name}</div>
                          <div className="text-xs text-muted-foreground">{s.componentsCount} components</div>
                        </div>
                        <Badge variant="secondary">{s.status}</Badge>
                      </div>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Components */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">🔧 Components</CardTitle>
              <Button 
                size="sm" 
                onClick={() => setShowAddComponent(true)}
                disabled={!selectedSectionId}
              >
                <Plus className="h-4 w-4 mr-1" />เพิ่ม
              </Button>
            </div>
            <CardDescription>ชิ้นส่วนย่อย</CardDescription>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={searchComponents} onChange={(e)=>setSearchComponents(e.target.value)} placeholder="ค้นหา component..." className="pl-9" />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh] pr-2">
              <div className="space-y-2">
                {filteredComponents.length === 0 && (
                  <div className="text-sm text-muted-foreground">เลือกส่วน (Section) ก่อน</div>
                )}
                {filteredComponents.map((c) => {
                  const selected = c.id === selectedComponentId;
                  return (
                    <button
                      key={c.id}
                      className={`w-full text-left rounded-md border p-3 transition-colors ${selected ? "border-primary bg-primary/10" : "border-transparent hover:bg-muted"}`}
                      onClick={() => selectComponent(c.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{c.name}</div>
                          <div className="text-xs text-muted-foreground">{c.sparePartsCount} spare parts</div>
                        </div>
                        <Badge variant="secondary">{c.status}</Badge>
                      </div>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Spare Parts */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">🔩 Spare Parts</CardTitle>
              <Button 
                size="sm" 
                onClick={() => setShowAddSparePart(true)}
                disabled={!selectedComponentId}
              >
                <Plus className="h-4 w-4 mr-1" />เพิ่ม
              </Button>
            </div>
            <CardDescription>อะไหล่</CardDescription>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={searchParts} onChange={(e)=>setSearchParts(e.target.value)} placeholder="ค้นหาอะไหล่..." className="pl-9" />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh] pr-2">
              <div className="space-y-2">
                {filteredParts.length === 0 && (
                  <div className="text-sm text-muted-foreground">เลือก Component ก่อน</div>
                )}
                {filteredParts.map((p) => (
                  <div key={p.id} className="rounded-md border p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-muted-foreground">คงเหลือ: {p.qty} • ใช้งาน: {p.used}</div>
                      </div>
                      <Badge variant="secondary">{p.status}</Badge>
                    </div>
                  </div>
                ))}
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
