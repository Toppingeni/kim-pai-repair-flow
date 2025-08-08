
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

type EntityStatus = "Active" | "Inactive";

interface Machine {
  id: string;
  name: string;
  status: EntityStatus;
  sectionsCount: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

interface Section {
  id: string;
  machineId: string;
  name: string;
  status: EntityStatus;
  componentsCount: number;
}

interface ComponentItem {
  id: string;
  sectionId: string;
  name: string;
  status: EntityStatus;
  sparePartsCount: number;
}

interface SparePart {
  id: string;
  componentId: string;
  name: string;
  status: EntityStatus;
  qty: number;
  used: number;
}

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

  // mock data (sample like the preview)
  const machines: Machine[] = [
    {
      id: "m1",
      name: "Apple Watch Series 9",
      status: "Active",
      sectionsCount: 2,
      createdAt: "19/1/2567",
      updatedAt: "16/1/2567",
      createdBy: "ภาคิน ชาติกิจ",
      updatedBy: "ชิงฟง คาร์บ่อน สกำรำ",
    },
    {
      id: "m2",
      name: "Dell XPS 13",
      status: "Inactive",
      sectionsCount: 0,
      createdAt: "9/1/2567",
      updatedAt: "24/1/2567",
      createdBy: "ชิงฟง เคารพ ขอล",
      updatedBy: "ศิรี่หร์ อสิสา หขั",
    },
  ];

  const sections: Section[] = [
    { id: "s1", machineId: "m1", name: "กล่อง", status: "Active", componentsCount: 2 },
    { id: "s2", machineId: "m1", name: "แบตเตอรี่", status: "Active", componentsCount: 0 },
  ];

  const components: ComponentItem[] = [
    { id: "c1", sectionId: "s1", name: "กระวิกรอย", status: "Active", sparePartsCount: 1 },
    { id: "c2", sectionId: "s1", name: "จอภาพ Super Retina XDR", status: "Active", sparePartsCount: 1 },
  ];

  const spareParts: SparePart[] = [
    { id: "p1", componentId: "c1", name: "สกรู 2mm", status: "Active", qty: 50, used: 12 },
    { id: "p2", componentId: "c2", name: "กระจกป้องกัน", status: "Active", qty: 8, used: 2 },
  ];

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
              <Button size="sm"><Plus className="h-4 w-4 mr-1" />เพิ่ม</Button>
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
                      <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
                        <div>สร้าง: {m.createdAt}</div>
                        <div>แก้ไข: {m.updatedAt}</div>
                        <div>โดย: {m.createdBy}</div>
                        <div>โดย: {m.updatedBy}</div>
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
              <Button size="sm"><Plus className="h-4 w-4 mr-1" />เพิ่ม</Button>
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
              <Button size="sm"><Plus className="h-4 w-4 mr-1" />เพิ่ม</Button>
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
              <Button size="sm"><Plus className="h-4 w-4 mr-1" />เพิ่ม</Button>
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
    </div>
  );
}
