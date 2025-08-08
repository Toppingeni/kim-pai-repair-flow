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
  status: EntityStatus;
  qty: number;
  used: number;
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
  { id: "p1", componentId: "c1", name: "แบริ่ง มอเตอร์", status: "Active", qty: 10, used: 2 },
  { id: "p2", componentId: "c1", name: "คาร์บอนแปรง", status: "Active", qty: 20, used: 5 },
  { id: "p3", componentId: "c1", name: "สายไฟมอเตอร์", status: "Active", qty: 15, used: 3 },
  // เซ็นเซอร์วัดอุณหภูมิ
  { id: "p4", componentId: "c2", name: "เซ็นเซอร์ PT100", status: "Active", qty: 8, used: 1 },
  { id: "p5", componentId: "c2", name: "สายสัญญาณ", status: "Active", qty: 25, used: 4 },
  // ระบบทำความร้อน
  { id: "p6", componentId: "c3", name: "ฮีตเตอร์ 220V", status: "Active", qty: 6, used: 1 },
  { id: "p7", componentId: "c3", name: "เทอร์โมสตัท", status: "Active", qty: 12, used: 2 },
  // หัวฉีดพลาสติก
  { id: "p8", componentId: "c4", name: "หัวฉีด Nozzle", status: "Active", qty: 5, used: 0 },
  { id: "p9", componentId: "c4", name: "ยางซีล O-Ring", status: "Active", qty: 50, used: 8 },
  // แผ่นกรองพลาสติก
  { id: "p10", componentId: "c5", name: "ตะแกรงกรอง 100 mesh", status: "Active", qty: 30, used: 5 },
  // ลูกกลิ้งม้วนฟิล์ม
  { id: "p11", componentId: "c6", name: "ยางหุ้มลูกกลิ้ง", status: "Active", qty: 8, used: 1 },
  { id: "p12", componentId: "c6", name: "แบริ่งลูกกลิ้ง", status: "Active", qty: 16, used: 3 },
  // มอเตอร์ควบคุมความเร็ว
  { id: "p13", componentId: "c7", name: "เอ็นโค้เดอร์", status: "Active", qty: 4, used: 0 },
  // ใบมีดตัดฟิล์ม
  { id: "p14", componentId: "c8", name: "ใบมีดคาร์ไบด์", status: "Active", qty: 12, used: 4 },
  { id: "p15", componentId: "c8", name: "สกรูยึดใบมีด", status: "Active", qty: 40, used: 8 },
  { id: "p16", componentId: "c8", name: "แผ่นรองใบมีด", status: "Active", qty: 15, used: 2 },
  // ระบบวัดความยาว
  { id: "p17", componentId: "c9", name: "เซ็นเซอร์วัดระยะ", status: "Active", qty: 6, used: 1 },
  // หน้าจอควบคุม HMI
  { id: "p18", componentId: "c10", name: "ฟิล์มป้องกันหน้าจอ", status: "Active", qty: 10, used: 2 },
  // หัวพิมพ์สี
  { id: "p19", componentId: "c11", name: "หัวพิมพ์ Cyan", status: "Inactive", qty: 3, used: 0 },
  { id: "p20", componentId: "c11", name: "หัวพิมพ์ Magenta", status: "Inactive", qty: 3, used: 0 },
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
  return spareParts.filter(sparePart => sparePart.componentId === componentId).length;
};