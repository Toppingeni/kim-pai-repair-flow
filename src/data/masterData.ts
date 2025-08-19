// Mock data สำหรับโรงงานผลิตฟิล์ม - Master Data

export type EntityStatus = "Active" | "Inactive";

export interface Machine {
  id: string;
  name: string;
  status: EntityStatus;
  sectionsCount: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface Section {
  id: string;
  machineId: string;
  name: string;
  status: EntityStatus;
  componentsCount: number;
}

export interface ComponentItem {
  id: string;
  sectionId: string;
  name: string;
  status: EntityStatus;
  sparePartsCount: number;
}

export interface SparePart {
  id: string;
  componentId: string;
  name: string;
  code: string;
  category: string;
  status: EntityStatus;
  qty: number;
  used: number;
  unit: string;
  defaultUsage: number; // จำนวนใช้งานมาตรฐาน
  stock: number;
  subParts?: SubSparePart[]; // อะไหล่ย่อย
}

export interface SubSparePart {
  id: string;
  sparePartId: string; // อ้างอิงไปยังอะไหล่หลัก
  name: string;
  code: string;
  category: string;
  status: EntityStatus;
  qty: number;
  used: number;
  unit: string;
  description?: string;
}

// ข้อมูลเครื่องจักรในโรงงานผลิตฟิล์ม
export const mockMachines: Machine[] = [
  {
    id: "m1",
    name: "เครื่องอัดฟิล์ม Extruder Line 1",
    status: "Active",
    sectionsCount: 3,
    createdAt: "19/1/2567",
    updatedAt: "16/1/2567",
    createdBy: "วิศวกร สมชาย",
    updatedBy: "หัวหน้าแผนก สุรชัย",
  },
  {
    id: "m2",
    name: "เครื่องตัดฟิล์ม Slitting Machine A",
    status: "Active",
    sectionsCount: 2,
    createdAt: "9/1/2567",
    updatedAt: "24/1/2567",
    createdBy: "ช่างเทคนิค วิชัย",
    updatedBy: "วิศวกร สมหญิง",
  },
  {
    id: "m3",
    name: "เครื่องพิมพ์ฟิล์ม Printing Press B",
    status: "Inactive",
    sectionsCount: 1,
    createdAt: "5/1/2567",
    updatedAt: "20/1/2567",
    createdBy: "วิศวกร อนุชา",
    updatedBy: "หัวหน้าแผนก สุรชัย",
  },
];

// ข้อมูลส่วนประกอบของเครื่องจักร
export const mockSections: Section[] = [
  { id: "s1", machineId: "m1", name: "หน่วยหลอมพลาสติก (Extruder)", status: "Active", componentsCount: 3 },
  { id: "s2", machineId: "m1", name: "หน่วยขึ้นรูป (Die Head)", status: "Active", componentsCount: 2 },
  { id: "s3", machineId: "m1", name: "หน่วยม้วนฟิล์ม (Winding Unit)", status: "Active", componentsCount: 2 },
  { id: "s4", machineId: "m2", name: "หน่วยตัด (Cutting Unit)", status: "Active", componentsCount: 2 },
  { id: "s5", machineId: "m2", name: "หน่วยควบคุม (Control System)", status: "Active", componentsCount: 1 },
  { id: "s6", machineId: "m3", name: "หน่วยพิมพ์ (Printing Unit)", status: "Inactive", componentsCount: 1 },
];

// ข้อมูลชิ้นส่วนของเครื่องจักร
export const mockComponents: ComponentItem[] = [
  { id: "c1", sectionId: "s1", name: "มอเตอร์ขับเคลื่อน", status: "Active", sparePartsCount: 3 },
  { id: "c2", sectionId: "s1", name: "เซ็นเซอร์วัดอุณหภูมิ", status: "Active", sparePartsCount: 2 },
  { id: "c3", sectionId: "s1", name: "ระบบทำความร้อน", status: "Active", sparePartsCount: 2 },
  { id: "c4", sectionId: "s2", name: "หัวฉีดพลาสติก", status: "Active", sparePartsCount: 2 },
  { id: "c5", sectionId: "s2", name: "แผ่นกรองพลาสติก", status: "Active", sparePartsCount: 1 },
  { id: "c6", sectionId: "s3", name: "ลูกกลิ้งม้วนฟิล์ม", status: "Active", sparePartsCount: 2 },
  { id: "c7", sectionId: "s3", name: "มอเตอร์ควบคุมความเร็ว", status: "Active", sparePartsCount: 1 },
  { id: "c8", sectionId: "s4", name: "ใบมีดตัดฟิล์ม", status: "Active", sparePartsCount: 3 },
  { id: "c9", sectionId: "s4", name: "ระบบวัดความยาว", status: "Active", sparePartsCount: 1 },
  { id: "c10", sectionId: "s5", name: "หน้าจอควบคุม HMI", status: "Active", sparePartsCount: 1 },
  { id: "c11", sectionId: "s6", name: "หัวพิมพ์สี", status: "Inactive", sparePartsCount: 2 },
];

// ข้อมูลอะไหล่
export const mockSpareParts: SparePart[] = [
  // มอเตอร์ขับเคลื่อน
  { id: "p1", componentId: "c1", name: "แบริ่ง มอเตอร์", code: "BRG-MOT-001", category: "แบริ่ง", status: "Active", qty: 10, used: 2, unit: "ตัว", defaultUsage: 2, stock: 8 },
  { id: "p2", componentId: "c1", name: "คาร์บอนแปรง", code: "CBN-BRS-002", category: "คาร์บอน", status: "Active", qty: 20, used: 5, unit: "ตัว", defaultUsage: 4, stock: 15 },
  { id: "p3", componentId: "c1", name: "สายไฟมอเตอร์", code: "CAB-MOT-003", category: "สายไฟ", status: "Active", qty: 15, used: 3, unit: "เมตร", defaultUsage: 2, stock: 12 },
  // เซ็นเซอร์วัดอุณหภูมิ
  { id: "p4", componentId: "c2", name: "เซ็นเซอร์ PT100", code: "SEN-PT100-004", category: "เซ็นเซอร์", status: "Active", qty: 8, used: 1, unit: "ตัว", defaultUsage: 1, stock: 7 },
  { id: "p5", componentId: "c2", name: "สายสัญญาณ", code: "CAB-SIG-005", category: "สายไฟ", status: "Active", qty: 25, used: 4, unit: "เมตร", defaultUsage: 3, stock: 21 },
  // ระบบทำความร้อน
  { id: "p6", componentId: "c3", name: "ฮีตเตอร์ 220V", code: "HTR-220V-006", category: "ฮีตเตอร์", status: "Active", qty: 6, used: 1, unit: "ตัว", defaultUsage: 1, stock: 5 },
  { id: "p7", componentId: "c3", name: "เทอร์โมสตัท", code: "THS-007", category: "เทอร์โมสตัท", status: "Active", qty: 12, used: 2, unit: "ตัว", defaultUsage: 1, stock: 10 },
  // หัวฉีดพลาสติก
  { id: "p8", componentId: "c4", name: "หัวฉีด Nozzle", code: "NOZ-008", category: "หัวฉีด", status: "Active", qty: 5, used: 0, unit: "ตัว", defaultUsage: 1, stock: 5 },
  { id: "p9", componentId: "c4", name: "ยางซีล O-Ring", code: "ORG-009", category: "ซีล", status: "Active", qty: 50, used: 8, unit: "ตัว", defaultUsage: 6, stock: 42 },
  // แผ่นกรองพลาสติก
  { id: "p10", componentId: "c5", name: "ตะแกรงกรอง 100 mesh", code: "FLT-100M-010", category: "ตะแกรง", status: "Active", qty: 30, used: 5, unit: "แผ่น", defaultUsage: 3, stock: 25 },
  // ลูกกลิ้งม้วนฟิล์ม
  { id: "p11", componentId: "c6", name: "ยางหุ้มลูกกลิ้ง", code: "RBR-ROL-011", category: "ยาง", status: "Active", qty: 8, used: 1, unit: "ตัว", defaultUsage: 1, stock: 7 },
  { id: "p12", componentId: "c6", name: "แบริ่งลูกกลิ้ง", code: "BRG-ROL-012", category: "แบริ่ง", status: "Active", qty: 16, used: 3, unit: "ตัว", defaultUsage: 2, stock: 13 },
  // มอเตอร์ควบคุมความเร็ว
  { id: "p13", componentId: "c7", name: "เอ็นโค้เดอร์", code: "ENC-013", category: "เอ็นโค้เดอร์", status: "Active", qty: 4, used: 0, unit: "ตัว", defaultUsage: 1, stock: 4 },
  // ใบมีดตัดฟิล์ม
  { id: "p14", componentId: "c8", name: "ใบมีดคาร์ไบด์", code: "BLD-CRB-014", category: "ใบมีด", status: "Active", qty: 12, used: 4, unit: "ตัว", defaultUsage: 2, stock: 8 },
  { id: "p15", componentId: "c8", name: "สกรูยึดใบมีด", code: "SCR-BLD-015", category: "สกรู", status: "Active", qty: 40, used: 8, unit: "ตัว", defaultUsage: 4, stock: 32 },
  { id: "p16", componentId: "c8", name: "แผ่นรองใบมีด", code: "PLT-BLD-016", category: "แผ่นรอง", status: "Active", qty: 15, used: 2, unit: "ตัว", defaultUsage: 1, stock: 13 },
  // ระบบวัดความยาว
  { id: "p17", componentId: "c9", name: "เซ็นเซอร์วัดระยะ", code: "SEN-DIS-017", category: "เซ็นเซอร์", status: "Active", qty: 6, used: 1, unit: "ตัว", defaultUsage: 1, stock: 5 },
  // หน้าจอควบคุม HMI
  { id: "p18", componentId: "c10", name: "ฟิล์มป้องกันหน้าจอ", code: "FLM-HMI-018", category: "ฟิล์ม", status: "Active", qty: 10, used: 2, unit: "แผ่น", defaultUsage: 1, stock: 8 },
  // หัวพิมพ์สี
  { id: "p19", componentId: "c11", name: "หัวพิมพ์ Cyan", code: "PRH-CYN-019", category: "หัวพิมพ์", status: "Inactive", qty: 3, used: 0, unit: "ตัว", defaultUsage: 1, stock: 3 },
  { id: "p20", componentId: "c11", name: "หัวพิมพ์ Magenta", code: "PRH-MAG-020", category: "หัวพิมพ์", status: "Inactive", qty: 3, used: 0, unit: "ตัว", defaultUsage: 1, stock: 3 },
];

// ข้อมูล Sub อะไหล่
export const mockSubSpareParts: SubSparePart[] = [
  // Sub parts สำหรับแบริ่ง มอเตอร์ (p1)
  { id: "sp1", sparePartId: "p1", name: "ลูกปืน", code: "BALL-001", category: "ลูกปืน", status: "Active", qty: 20, used: 4, unit: "ตัว", description: "ลูกปืนสำหรับแบริ่งมอเตอร์" },
  { id: "sp2", sparePartId: "p1", name: "ยางซีลแบริ่ง", code: "SEAL-002", category: "ซีล", status: "Active", qty: 15, used: 2, unit: "ตัว", description: "ยางซีลป้องกันฝุ่นและน้ำมัน" },
  { id: "sp3", sparePartId: "p1", name: "กรีสหล่อลื่น", code: "GREASE-003", category: "หล่อลื่น", status: "Active", qty: 5, used: 1, unit: "หลอด", description: "กรีสสำหรับหล่อลื่นแบริ่ง" },
  
  // Sub parts สำหรับยางซีล O-Ring (p9)
  { id: "sp4", sparePartId: "p9", name: "ยาง NBR", code: "NBR-004", category: "ยาง", status: "Active", qty: 100, used: 15, unit: "ตัว", description: "ยาง NBR สำหรับทำ O-Ring" },
  { id: "sp5", sparePartId: "p9", name: "สารเคลือบผิว", code: "COAT-005", category: "สารเคลือบ", status: "Active", qty: 10, used: 2, unit: "ขวด", description: "สารเคลือบผิวป้องกันการสึกหรอ" },
  
  // Sub parts สำหรับใบมีดคาร์ไบด์ (p14)
  { id: "sp6", sparePartId: "p14", name: "คาร์ไบด์ทังสเตน", code: "WC-006", category: "คาร์ไบด์", status: "Active", qty: 8, used: 2, unit: "แผ่น", description: "วัสดุคาร์ไบด์ทังสเตนสำหรับใบมีด" },
  { id: "sp7", sparePartId: "p14", name: "สกรูยึด", code: "SCREW-007", category: "สกรู", status: "Active", qty: 50, used: 8, unit: "ตัว", description: "สกรูยึดใบมีดกับฐาน" },
];

// ฟังก์ชันช่วยในการจัดการข้อมูล
export const getMachineById = (id: string): Machine | undefined => {
  return mockMachines.find(machine => machine.id === id);
};

export const getSectionsByMachineId = (machineId: string): Section[] => {
  return mockSections.filter(section => section.machineId === machineId);
};

export const getComponentsBySectionId = (sectionId: string): ComponentItem[] => {
  return mockComponents.filter(component => component.sectionId === sectionId);
};

export const getSparePartsByComponentId = (componentId: string): SparePart[] => {
  return mockSpareParts.filter(sparePart => sparePart.componentId === componentId);
};

// ฟังก์ชันสำหรับอัปเดตจำนวน count
export const updateSectionCount = (machineId: string, sections: Section[]): number => {
  return sections.filter(section => section.machineId === machineId).length;
};

export const updateComponentCount = (sectionId: string, components: ComponentItem[]): number => {
  return components.filter(component => component.sectionId === sectionId).length;
};

export const updateSparePartCount = (componentId: string, spareParts: SparePart[]): number => {
  return spareParts.filter(part => part.componentId === componentId).length;
};

// ฟังก์ชันสำหรับจัดการ Sub อะไหล่
export const getSubSparePartsBySparePartId = (sparePartId: string): SubSparePart[] => {
  return mockSubSpareParts.filter(subPart => subPart.sparePartId === sparePartId);
};

export const getAllSubSpareParts = (): SubSparePart[] => {
  return mockSubSpareParts;
};

export const searchSubSpareParts = (query: string): SubSparePart[] => {
  const lowerQuery = query.toLowerCase();
  return mockSubSpareParts.filter(subPart => 
    subPart.name.toLowerCase().includes(lowerQuery) ||
    subPart.code.toLowerCase().includes(lowerQuery) ||
    subPart.category.toLowerCase().includes(lowerQuery)
  );
};