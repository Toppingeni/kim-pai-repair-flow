// Mock data สำหรับโรงงานผลิตฟิล์ม - Master Data

export type EntityStatus = "Active" | "Inactive";

export interface Machine {
    id: string;
    name: string;
    bchId?: string; // รหัสสาขา/โรงงาน เช่น K, B, W, 6, 2 ...
    status: EntityStatus;
    sectionsCount: number;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}

// สาขา/หน่วยงาน (Branch/Organization)
export interface Branch {
    id: string; // รหัสสาขา เช่น K, B, W, S, L, 6, 2, H, R, A
    name: string; // ชื่อสาขา
    status: EntityStatus;
}

// Master ข้อมูลสาขา ตามที่ผู้ใช้ระบุ
export const branchMaster: Branch[] = [
    { id: "K", name: "หลอด เวลโกรว์ ซอย 2 (BOI)", status: "Active" },
    { id: "B", name: "เป่าฟิล์ม เวลโกรว์ ซอย 6", status: "Active" },
    { id: "W", name: "Sticker เวลโกรว์ ซอย 6", status: "Active" },
    { id: "S", name: "Sticker ถ.จันทน์", status: "Active" },
    { id: "L", name: "ฟิล์ม ลาดกระบัง", status: "Active" },
    { id: "6", name: "ฟิล์ม เวลโกรว์ ซอย 6", status: "Active" },
    { id: "2", name: "หลอด เวลโกรว์ ซอย 2", status: "Active" },
    { id: "H", name: "บริษัท ไทย โอ.พี.พี. จำกัด (มหาชน)", status: "Active" },
    { id: "R", name: "หจก.เหรียญทองการพิมพ์", status: "Active" },
    { id: "A", name: "ฉีดฟิล์ม เวลโกรว์ ซอย 6", status: "Active" },
];

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
}

export interface PriorityLevel {
    id: string;
    label: string;
    tooltip: string;
    level: number;
    color?: string;
}

export interface Technician {
    id: string;
    name: string;
    employeeId: string;
    department: string;
    specialization: string[];
    level: "Junior" | "Senior" | "Expert";
    status: EntityStatus;
    contactNumber?: string;
    bchId: string; // รหัสสาขาอ้างอิง branchMaster.id
    organization: string; // ชื่อสถานที่จาก branchMaster
    email?: string;
    createdAt: string;
    updatedAt: string;
}

// ประเภทงานซ่อม
export interface WorkType {
    id: string;
    name: string;
    description?: string;
    status: EntityStatus;
    createdAt: string;
    updatedAt: string;
}

// สาเหตุของปัญหา
export interface ProblemCause {
    id: string;
    name: string;
    description?: string;
    status: EntityStatus;
    createdAt: string;
    updatedAt: string;
}

// ใบร้องของงานซ่อม (Request) - รหัสขึ้นต้นด้วย R
export interface RepairRequest {
    id: string;
    documentNumber: string;
    machineId: string;
    machine: string;
    location: string;
    section: string;
    problem: string;
    reporter: string;
    reportDate: string;
    reportTime: string;
    priority: string; // อ้างอิงจาก PriorityLevel.id
    priorityLabel: string;
    contactNumber?: string;
    additionalDetails?: string;
    images?: string[];
    status: "pending" | "rejected"; // สถานะของใบร้องของงาน: pending = ใหม่, rejected = ยกเลิก
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy?: string;
}

// ใบสั่งงานซ่อม (Process) - รหัสขึ้นต้นด้วย P
export interface RepairProcess {
    id: string;
    requestId: string; // อ้างอิงไปยัง RepairRequest.id (ความสัมพันธ์ 1-1)
    documentNumber: string;
    assignedTechnicians: string[]; // อ้างอิงไปยัง Technician.id
    estimatedStartDate?: string;
    estimatedEndDate?: string;
    actualStartDate?: string;
    actualEndDate?: string;
    repairMethod?: string;
    cause?: string;
    usedParts?: {
        partId: string;
        partName: string;
        partCode: string;
        quantity: number;
        unit: string;
    }[];
    status:
        | "assigned"
        | "in_progress"
        | "waiting_parts"
        | "waiting_approval"
        | "completed"
        | "cancelled";
    notes?: string;
    approvedBy?: string;
    approvedAt?: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy?: string;
}

// ข้อมูลเครื่องจักรในโรงงานผลิตฟิล์ม
export const mockMachines: Machine[] = [
    // { id: "BS01", name: "W6-เครื่องผ่า/กรอ SLITTER 1", bchId: "B", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "BB01", name: "W6-เครื่องเป่าฟิล์ม BLOW 1", bchId: "B", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "BM01", name: "W6-เครื่องผสมเม็ด MIX 1", bchId: "B", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LS95", name: "W6-เครื่องผ่า/กรอ SLITTER 5", bchId: "6", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LS96", name: "W6-เครื่องผ่า/กรอ SLITTER 6", bchId: "6", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LK55", name: "LK-เครื่องผ่า/กรอ SLITTER 5", bchId: "L", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LK11", name: "LK-เครื่องฉีดฟิล์ม", bchId: "L", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LK41", name: "LK-เครื่องกรอ 1", bchId: "L", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LK42", name: "LK-เครื่องกรอ 2", bchId: "L", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LK50", name: "LK-เครื่องผ่าใหญ่", bchId: "L", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LK52", name: "LK-เครื่องผ่า/กรอ SLITTER 2", bchId: "L", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LK53", name: "LK-เครื่องผ่า/กรอ SLITTER 3", bchId: "L", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LK54", name: "LK-เครื่องผ่า/กรอ SLITTER 4", bchId: "L", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LK56", name: "LK-เครื่องผ่า/กรอ SLITTER 6", bchId: "L", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LK58", name: "LK-เครื่องผ่า/กรอ SLITTER 8", bchId: "L", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LK90", name: "LK-เครื่องพับ 1", bchId: "L", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LK91", name: "LK-เครื่องพับ 2", bchId: "L", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LK10", name: "LK-เครื่องผสมเม็ด", bchId: "L", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    {
        id: "LS91",
        name: "W6-เครื่องผ่า/กรอ SLITTER 1",
        bchId: "6",
        status: "Active",
        sectionsCount: 0,
        createdAt: "1/1/2567",
        updatedAt: "1/1/2567",
        createdBy: "ระบบ",
        updatedBy: "ระบบ",
    },
    // { id: "LS92", name: "W6-เครื่องผ่า/กรอ SLITTER 2", bchId: "6", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LS93", name: "W6-เครื่องผ่า/กรอ SLITTER 3", bchId: "6", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    {
        id: "LM81",
        name: "W6-เครื่อง METALLIZER 1",
        bchId: "6",
        status: "Active",
        sectionsCount: 0,
        createdAt: "1/1/2567",
        updatedAt: "1/1/2567",
        createdBy: "ระบบ",
        updatedBy: "ระบบ",
    },
    // ตัวอย่างเพิ่ม: รถยนต์ และ เครื่องปรับอากาศ
    {
        id: "CAR01",
        name: "รถยนต์ (Car)",
        bchId: "6",
        status: "Active",
        sectionsCount: 0,
        createdAt: "1/1/2567",
        updatedAt: "1/1/2567",
        createdBy: "ระบบ",
        updatedBy: "ระบบ",
    },
    {
        id: "AC01",
        name: "เครื่องปรับอากาศ (Air Conditioner)",
        bchId: "6",
        status: "Active",
        sectionsCount: 0,
        createdAt: "1/1/2567",
        updatedAt: "1/1/2567",
        createdBy: "ระบบ",
        updatedBy: "ระบบ",
    },
    // { id: "LM82", name: "W6-เครื่อง METALLIZER 2", bchId: "6", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LS94", name: "W6-เครื่องผ่า/กรอ SLITTER 4", bchId: "6", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LS97", name: "W6-เครื่องผ่า/กรอ SLITTER 7", bchId: "6", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LS98", name: "W6-เครื่องผ่า/กรอ SLITTER 8", bchId: "6", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "SS01", name: "W6-เครื่องผ่า/กรอ SideSeal-01", bchId: "6", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "BB02", name: "W6-เครื่องเป่าฟิล์ม BLOW 2", bchId: "B", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "FD01", name: "W6-เครื่องผ่า/กรอ Folding", bchId: "6", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "BB12", name: "W6-เครื่องเป่าฟิล์ม BLOW 2.", bchId: "B", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    {
        id: "COL3",
        name: "เครื่องฉีดฟิล์ม Extrusion Line-COL",
        bchId: "A",
        status: "Active",
        sectionsCount: 0,
        createdAt: "1/1/2567",
        updatedAt: "1/1/2567",
        createdBy: "ระบบ",
        updatedBy: "ระบบ",
    },
    // { id: "LADT", name: "กลุ่มเครื่องผ่ากรอ CPP", bchId: "A", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LAD2", name: "เครื่องผ่ากรอ SV-1", bchId: "A", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LAST", name: "กลุ่มเครื่องกรอ", bchId: "A", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LAE2", name: "เครื่องฉีดฟิล์ม CPP Extrusion Line-BGE", bchId: "A", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LAD3", name: "เครื่องผ่ากรอ Kampf - 1", bchId: "A", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LAD4", name: "เครื่องผ่ากรอ Kampf - 2", bchId: "A", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LADE", name: "Kampf กลุ่มเครื่องผ่ากรอ Kampf 1-2", bchId: "A", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "MAN1", name: "แรงงานคน 1 คน", bchId: "A", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LAD6", name: "เครื่องผ่ากรอ SV-2", bchId: "A", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "LAD7", name: "เครื่องผ่ากรอ SV-3", bchId: "A", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "BB21", name: "W6-เครื่องเป่าฟิล์ม BLOW 1.", bchId: "B", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
    // { id: "BB00", name: "W6-เครื่องเป่าฟิล์ม BLOW 0", bchId: "B", status: "Active", sectionsCount: 0, createdAt: "1/1/2567", updatedAt: "1/1/2567", createdBy: "ระบบ", updatedBy: "ระบบ" },
];

// ข้อมูลส่วนประกอบของเครื่องจักร
export const mockSections: Section[] = [
    {
        id: "s1",
        machineId: "COL3",
        name: "หน่วยหลอมพลาสติก (Extruder)",
        status: "Active",
        componentsCount: 3,
    },
    {
        id: "s2",
        machineId: "COL3",
        name: "หน่วยขึ้นรูป (Die Head)",
        status: "Active",
        componentsCount: 2,
    },
    {
        id: "s3",
        machineId: "COL3",
        name: "หน่วยม้วนฟิล์ม (Winding Unit)",
        status: "Active",
        componentsCount: 2,
    },
    {
        id: "s4",
        machineId: "LS91",
        name: "หน่วยตัด (Cutting Unit)",
        status: "Active",
        componentsCount: 2,
    },
    {
        id: "s5",
        machineId: "LS91",
        name: "หน่วยควบคุม (Control System)",
        status: "Active",
        componentsCount: 1,
    },
    {
        id: "s6",
        machineId: "LM81",
        name: "หน่วยพิมพ์ (Printing Unit)",
        status: "Inactive",
        componentsCount: 1,
    },
    // รถยนต์ (Car)
    { id: "s1001", machineId: "CAR01", name: "เครื่องยนต์", status: "Active", componentsCount: 3 },
    { id: "s1002", machineId: "CAR01", name: "ระบบไฟฟ้า", status: "Active", componentsCount: 3 },
    { id: "s1003", machineId: "CAR01", name: "ระบบเบรก", status: "Active", componentsCount: 3 },
    // เครื่องปรับอากาศ (Air Conditioner)
    { id: "s1101", machineId: "AC01", name: "ชุดคอมเพรสเซอร์", status: "Active", componentsCount: 2 },
    { id: "s1102", machineId: "AC01", name: "ชุดระเหย (Evaporator)", status: "Active", componentsCount: 3 },
    { id: "s1103", machineId: "AC01", name: "ระบบควบคุมไฟฟ้า", status: "Active", componentsCount: 2 },
];

// ข้อมูลชิ้นส่วนของเครื่องจักร
export const mockComponents: ComponentItem[] = [
    {
        id: "c1",
        sectionId: "s1",
        name: "มอเตอร์ขับเคลื่อน",
        status: "Active",
        sparePartsCount: 3,
    },
    {
        id: "c2",
        sectionId: "s1",
        name: "เซ็นเซอร์วัดอุณหภูมิ",
        status: "Active",
        sparePartsCount: 2,
    },
    {
        id: "c3",
        sectionId: "s1",
        name: "ระบบทำความร้อน",
        status: "Active",
        sparePartsCount: 2,
    },
    {
        id: "c4",
        sectionId: "s2",
        name: "หัวฉีดพลาสติก",
        status: "Active",
        sparePartsCount: 2,
    },
    {
        id: "c5",
        sectionId: "s2",
        name: "แผ่นกรองพลาสติก",
        status: "Active",
        sparePartsCount: 1,
    },
    {
        id: "c6",
        sectionId: "s3",
        name: "ลูกกลิ้งม้วนฟิล์ม",
        status: "Active",
        sparePartsCount: 2,
    },
    {
        id: "c7",
        sectionId: "s3",
        name: "มอเตอร์ควบคุมความเร็ว",
        status: "Active",
        sparePartsCount: 1,
    },
    {
        id: "c8",
        sectionId: "s4",
        name: "ใบมีดตัดฟิล์ม",
        status: "Active",
        sparePartsCount: 3,
    },
    {
        id: "c9",
        sectionId: "s4",
        name: "ระบบวัดความยาว",
        status: "Active",
        sparePartsCount: 1,
    },
    {
        id: "c10",
        sectionId: "s5",
        name: "หน้าจอควบคุม HMI",
        status: "Active",
        sparePartsCount: 1,
    },
    {
        id: "c11",
        sectionId: "s6",
        name: "หัวพิมพ์สี",
        status: "Inactive",
        sparePartsCount: 2,
    },
    // รถยนต์ (Car) components
    { id: "c1001", sectionId: "s1001", name: "มอเตอร์สตาร์ท", status: "Active", sparePartsCount: 3 },
    { id: "c1002", sectionId: "s1001", name: "ปั๊มน้ำ", status: "Active", sparePartsCount: 2 },
    { id: "c1003", sectionId: "s1001", name: "ไส้กรองอากาศ", status: "Active", sparePartsCount: 1 },
    { id: "c1004", sectionId: "s1002", name: "แบตเตอรี่", status: "Active", sparePartsCount: 2 },
    { id: "c1005", sectionId: "s1002", name: "ไดชาร์จ", status: "Active", sparePartsCount: 2 },
    { id: "c1006", sectionId: "s1002", name: "ฟิวส์", status: "Active", sparePartsCount: 2 },
    { id: "c1007", sectionId: "s1003", name: "ผ้าเบรก", status: "Active", sparePartsCount: 1 },
    { id: "c1008", sectionId: "s1003", name: "จานเบรก", status: "Active", sparePartsCount: 1 },
    { id: "c1009", sectionId: "s1003", name: "แม่ปั๊มเบรก", status: "Active", sparePartsCount: 2 },
    // เครื่องปรับอากาศ (Air Conditioner) components
    { id: "c1101", sectionId: "s1101", name: "คอมเพรสเซอร์", status: "Active", sparePartsCount: 2 },
    { id: "c1102", sectionId: "s1101", name: "คาปาซิเตอร์สตาร์ท", status: "Active", sparePartsCount: 1 },
    { id: "c1103", sectionId: "s1102", name: "มอเตอร์พัดลม", status: "Active", sparePartsCount: 2 },
    { id: "c1104", sectionId: "s1102", name: "ใบพัดลม", status: "Active", sparePartsCount: 1 },
    { id: "c1105", sectionId: "s1102", name: "แผงระเหย/ตัวกรอง", status: "Active", sparePartsCount: 2 },
    { id: "c1106", sectionId: "s1103", name: "เซ็นเซอร์อุณหภูมิ", status: "Active", sparePartsCount: 1 },
    { id: "c1107", sectionId: "s1103", name: "แผงควบคุม (PCB)", status: "Active", sparePartsCount: 1 },
];

// ข้อมูลอะไหล่
export const mockSpareParts: SparePart[] = [
    // มอเตอร์ขับเคลื่อน
    {
        id: "p1",
        componentId: "c1",
        name: "แบริ่ง มอเตอร์",
        code: "BRG-MOT-001",
        category: "แบริ่ง",
        status: "Active",
        qty: 10,
        used: 2,
        unit: "ตัว",
        defaultUsage: 2,
        stock: 8,
    },
    {
        id: "p2",
        componentId: "c1",
        name: "คาร์บอนแปรง",
        code: "CBN-BRS-002",
        category: "คาร์บอน",
        status: "Active",
        qty: 20,
        used: 5,
        unit: "ตัว",
        defaultUsage: 4,
        stock: 15,
    },
    {
        id: "p3",
        componentId: "c1",
        name: "สายไฟมอเตอร์",
        code: "CAB-MOT-003",
        category: "สายไฟ",
        status: "Active",
        qty: 15,
        used: 3,
        unit: "เมตร",
        defaultUsage: 2,
        stock: 12,
    },
    // เซ็นเซอร์วัดอุณหภูมิ
    {
        id: "p4",
        componentId: "c2",
        name: "เซ็นเซอร์ PT100",
        code: "SEN-PT100-004",
        category: "เซ็นเซอร์",
        status: "Active",
        qty: 8,
        used: 1,
        unit: "ตัว",
        defaultUsage: 1,
        stock: 7,
    },
    {
        id: "p5",
        componentId: "c2",
        name: "สายสัญญาณ",
        code: "CAB-SIG-005",
        category: "สายไฟ",
        status: "Active",
        qty: 25,
        used: 4,
        unit: "เมตร",
        defaultUsage: 3,
        stock: 21,
    },
    // ระบบทำความร้อน
    {
        id: "p6",
        componentId: "c3",
        name: "ฮีตเตอร์ 220V",
        code: "HTR-220V-006",
        category: "ฮีตเตอร์",
        status: "Active",
        qty: 6,
        used: 1,
        unit: "ตัว",
        defaultUsage: 1,
        stock: 5,
    },
    {
        id: "p7",
        componentId: "c3",
        name: "เทอร์โมสตัท",
        code: "THS-007",
        category: "เทอร์โมสตัท",
        status: "Active",
        qty: 12,
        used: 2,
        unit: "ตัว",
        defaultUsage: 1,
        stock: 10,
    },
    // หัวฉีดพลาสติก
    {
        id: "p8",
        componentId: "c4",
        name: "หัวฉีด Nozzle",
        code: "NOZ-008",
        category: "หัวฉีด",
        status: "Active",
        qty: 5,
        used: 0,
        unit: "ตัว",
        defaultUsage: 1,
        stock: 5,
    },
    {
        id: "p9",
        componentId: "c4",
        name: "ยางซีล O-Ring",
        code: "ORG-009",
        category: "ซีล",
        status: "Active",
        qty: 50,
        used: 8,
        unit: "ตัว",
        defaultUsage: 6,
        stock: 42,
    },
    // แผ่นกรองพลาสติก
    {
        id: "p10",
        componentId: "c5",
        name: "ตะแกรงกรอง 100 mesh",
        code: "FLT-100M-010",
        category: "ตะแกรง",
        status: "Active",
        qty: 30,
        used: 5,
        unit: "แผ่น",
        defaultUsage: 3,
        stock: 25,
    },
    // ลูกกลิ้งม้วนฟิล์ม
    {
        id: "p11",
        componentId: "c6",
        name: "ยางหุ้มลูกกลิ้ง",
        code: "RBR-ROL-011",
        category: "ยาง",
        status: "Active",
        qty: 8,
        used: 1,
        unit: "ตัว",
        defaultUsage: 1,
        stock: 7,
    },
    {
        id: "p12",
        componentId: "c6",
        name: "แบริ่งลูกกลิ้ง",
        code: "BRG-ROL-012",
        category: "แบริ่ง",
        status: "Active",
        qty: 16,
        used: 3,
        unit: "ตัว",
        defaultUsage: 2,
        stock: 13,
    },
    // มอเตอร์ควบคุมความเร็ว
    {
        id: "p13",
        componentId: "c7",
        name: "เอ็นโค้เดอร์",
        code: "ENC-013",
        category: "เอ็นโค้เดอร์",
        status: "Active",
        qty: 4,
        used: 0,
        unit: "ตัว",
        defaultUsage: 1,
        stock: 4,
    },
    // ใบมีดตัดฟิล์ม
    {
        id: "p14",
        componentId: "c8",
        name: "ใบมีดคาร์ไบด์",
        code: "BLD-CRB-014",
        category: "ใบมีด",
        status: "Active",
        qty: 12,
        used: 4,
        unit: "ตัว",
        defaultUsage: 2,
        stock: 8,
    },
    {
        id: "p15",
        componentId: "c8",
        name: "สกรูยึดใบมีด",
        code: "SCR-BLD-015",
        category: "สกรู",
        status: "Active",
        qty: 40,
        used: 8,
        unit: "ตัว",
        defaultUsage: 4,
        stock: 32,
    },
    {
        id: "p16",
        componentId: "c8",
        name: "แผ่นรองใบมีด",
        code: "PLT-BLD-016",
        category: "แผ่นรอง",
        status: "Active",
        qty: 15,
        used: 2,
        unit: "ตัว",
        defaultUsage: 1,
        stock: 13,
    },
    // ระบบวัดความยาว
    {
        id: "p17",
        componentId: "c9",
        name: "เซ็นเซอร์วัดระยะ",
        code: "SEN-DIS-017",
        category: "เซ็นเซอร์",
        status: "Active",
        qty: 6,
        used: 1,
        unit: "ตัว",
        defaultUsage: 1,
        stock: 5,
    },
    // หน้าจอควบคุม HMI
    {
        id: "p18",
        componentId: "c10",
        name: "ฟิล์มป้องกันหน้าจอ",
        code: "FLM-HMI-018",
        category: "ฟิล์ม",
        status: "Active",
        qty: 10,
        used: 2,
        unit: "แผ่น",
        defaultUsage: 1,
        stock: 8,
    },
    // หัวพิมพ์สี
    {
        id: "p19",
        componentId: "c11",
        name: "หัวพิมพ์ Cyan",
        code: "PRH-CYN-019",
        category: "หัวพิมพ์",
        status: "Inactive",
        qty: 3,
        used: 0,
        unit: "ตัว",
        defaultUsage: 1,
        stock: 3,
    },
    {
        id: "p20",
        componentId: "c11",
        name: "หัวพิมพ์ Magenta",
        code: "PRH-MAG-020",
        category: "หัวพิมพ์",
        status: "Inactive",
        qty: 3,
        used: 0,
        unit: "ตัว",
        defaultUsage: 1,
        stock: 3,
    },
    // เพิ่มตัวอย่างการใช้คาร์บอนแปรงในหลายเครื่องจักร
    {
        id: "p21",
        componentId: "c8", // อยู่ที่เครื่อง m2 (ส่วน s4)
        name: "คาร์บอนแปรง",
        code: "CBN-BRS-021",
        category: "คาร์บอน",
        status: "Active",
        qty: 20,
        used: 3,
        unit: "ตัว",
        defaultUsage: 2,
        stock: 20,
    },
    {
        id: "p22",
        componentId: "c11", // อยู่ที่เครื่อง m3 (ส่วน s6)
        name: "คาร์บอนแปรง",
        code: "CBN-BRS-022",
        category: "คาร์บอน",
        status: "Active",
        qty: 20,
        used: 1,
        unit: "ตัว",
        defaultUsage: 2,
        stock: 20,
    },
    // รถยนต์ (Car) spare parts
    { id: "p1001", componentId: "c1001", name: "แปรงถ่านมอเตอร์สตาร์ท", code: "CAR-STR-BRUSH-001", category: "คาร์บอน", status: "Active", qty: 12, used: 2, unit: "ชิ้น", defaultUsage: 2, stock: 10 },
    { id: "p1002", componentId: "c1001", name: "โซลินอยด์สตาร์ท", code: "CAR-STR-SOL-002", category: "โซลินอยด์", status: "Active", qty: 6, used: 1, unit: "ชิ้น", defaultUsage: 1, stock: 5 },
    { id: "p1003", componentId: "c1001", name: "แบริ่งมอเตอร์สตาร์ท", code: "CAR-STR-BRG-003", category: "แบริ่ง", status: "Active", qty: 10, used: 1, unit: "ตัว", defaultUsage: 2, stock: 9 },
    { id: "p1004", componentId: "c1002", name: "ปั๊มน้ำรถยนต์", code: "CAR-WP-ASM-001", category: "ปั๊ม", status: "Active", qty: 4, used: 0, unit: "ตัว", defaultUsage: 1, stock: 4 },
    { id: "p1005", componentId: "c1002", name: "ปะเก็นปั๊มน้ำ", code: "CAR-WP-GSK-002", category: "ปะเก็น", status: "Active", qty: 15, used: 2, unit: "แผ่น", defaultUsage: 1, stock: 13 },
    { id: "p1006", componentId: "c1003", name: "ไส้กรองอากาศ", code: "CAR-AIR-FLT-001", category: "กรอง", status: "Active", qty: 20, used: 5, unit: "ชิ้น", defaultUsage: 1, stock: 15 },
    { id: "p1007", componentId: "c1004", name: "แบตเตอรี่ 12V 60Ah", code: "CAR-BAT-060-12V", category: "แบตเตอรี่", status: "Active", qty: 8, used: 1, unit: "ลูก", defaultUsage: 1, stock: 7 },
    { id: "p1008", componentId: "c1004", name: "คีมจับขั้วแบตเตอรี่", code: "CAR-BAT-CLAMP-001", category: "ขั้วแบตฯ", status: "Active", qty: 12, used: 2, unit: "ชิ้น", defaultUsage: 2, stock: 10 },
    { id: "p1009", componentId: "c1005", name: "สายพานหน้าเครื่อง (Alternator)", code: "CAR-ALT-BELT-001", category: "สายพาน", status: "Active", qty: 10, used: 2, unit: "เส้น", defaultUsage: 1, stock: 8 },
    { id: "p1010", componentId: "c1005", name: "เรกูเลเตอร์ไดชาร์จ", code: "CAR-ALT-REG-002", category: "อิเล็กทรอนิกส์", status: "Active", qty: 6, used: 1, unit: "ชิ้น", defaultUsage: 1, stock: 5 },
    { id: "p1011", componentId: "c1006", name: "ฟิวส์ 10A", code: "CAR-FUSE-010A", category: "ฟิวส์", status: "Active", qty: 50, used: 5, unit: "ตัว", defaultUsage: 1, stock: 45 },
    { id: "p1012", componentId: "c1006", name: "ฟิวส์ 20A", code: "CAR-FUSE-020A", category: "ฟิวส์", status: "Active", qty: 40, used: 4, unit: "ตัว", defaultUsage: 1, stock: 36 },
    { id: "p1013", componentId: "c1007", name: "ผ้าเบรกชุดหน้า", code: "CAR-BRK-PAD-FR", category: "เบรก", status: "Active", qty: 10, used: 2, unit: "ชุด", defaultUsage: 1, stock: 8 },
    { id: "p1014", componentId: "c1008", name: "จานเบรกหน้า", code: "CAR-BRK-DSC-FR", category: "เบรก", status: "Active", qty: 6, used: 1, unit: "ชิ้น", defaultUsage: 2, stock: 5 },
    { id: "p1015", componentId: "c1009", name: "ลูกยางแม่ปั๊มเบรก", code: "CAR-MC-SEAL-001", category: "ซีล", status: "Active", qty: 20, used: 3, unit: "ชุด", defaultUsage: 1, stock: 17 },
    { id: "p1016", componentId: "c1009", name: "น้ำมันเบรก DOT4", code: "CAR-BRK-FLD-D4", category: "น้ำมัน", status: "Active", qty: 12, used: 2, unit: "ลิตร", defaultUsage: 1, stock: 10 },
    // เครื่องปรับอากาศ (Air Conditioner) spare parts
    { id: "p1101", componentId: "c1101", name: "คอมเพรสเซอร์ R32", code: "AC-COMP-R32", category: "คอมเพรสเซอร์", status: "Active", qty: 3, used: 0, unit: "ตัว", defaultUsage: 1, stock: 3 },
    { id: "p1102", componentId: "c1101", name: "น้ำมันคอมเพรสเซอร์", code: "AC-COMP-OIL", category: "น้ำมัน", status: "Active", qty: 10, used: 1, unit: "ลิตร", defaultUsage: 1, stock: 9 },
    { id: "p1103", componentId: "c1102", name: "คาปาซิเตอร์สตาร์ท 40µF", code: "AC-CAP-040UF", category: "คาปาซิเตอร์", status: "Active", qty: 8, used: 1, unit: "ตัว", defaultUsage: 1, stock: 7 },
    { id: "p1104", componentId: "c1103", name: "มอเตอร์พัดลม", code: "AC-FAN-MOTOR", category: "มอเตอร์", status: "Active", qty: 5, used: 1, unit: "ตัว", defaultUsage: 1, stock: 4 },
    { id: "p1105", componentId: "c1103", name: "ลูกปืนมอเตอร์พัดลม", code: "AC-FAN-BRG", category: "แบริ่ง", status: "Active", qty: 12, used: 2, unit: "ตัว", defaultUsage: 2, stock: 10 },
    { id: "p1106", componentId: "c1104", name: "ใบพัดลม", code: "AC-FAN-BLADE", category: "พัดลม", status: "Active", qty: 6, used: 1, unit: "ชิ้น", defaultUsage: 1, stock: 5 },
    { id: "p1107", componentId: "c1105", name: "แผงระเหย/ตัวกรองอากาศ", code: "AC-EVAP-FILTER", category: "กรอง", status: "Active", qty: 10, used: 2, unit: "ชิ้น", defaultUsage: 1, stock: 8 },
    { id: "p1108", componentId: "c1105", name: "น้ำยาทำความสะอาดคอยล์", code: "AC-COIL-CLEAN", category: "เคมีภัณฑ์", status: "Active", qty: 8, used: 1, unit: "ขวด", defaultUsage: 1, stock: 7 },
    { id: "p1109", componentId: "c1106", name: "เซ็นเซอร์อุณหภูมิ NTC", code: "AC-NTC-SEN", category: "เซ็นเซอร์", status: "Active", qty: 12, used: 2, unit: "ตัว", defaultUsage: 1, stock: 10 },
    { id: "p1110", componentId: "c1107", name: "แผงควบคุม (PCB)", code: "AC-CTRL-PCB", category: "อิเล็กทรอนิกส์", status: "Active", qty: 4, used: 0, unit: "ชุด", defaultUsage: 1, stock: 4 },
];

// ข้อมูลระดับความสำคัญ
export const mockPriorityLevels: PriorityLevel[] = [
    {
        id: "level1",
        label: "ระดับ 1 หยุดทันที",
        tooltip:
            "เช่น Break down ฉุกเฉินที่ส่งผลด้านความปลอดภัย หรือความเสียหายของทรัพย์สิน",
        level: 1,
        color: "red",
    },
    {
        id: "level2",
        label: "ระดับ 2 วิ่งอยู่แต่เสี่ยงต่อคุณภาพ",
        tooltip: "เช่น เครื่องจักรยังสามารถใช้งานได้ แต่มีผลต่อด้าน คุณภาพ",
        level: 2,
        color: "orange",
    },
    {
        id: "level3",
        label: "ระดับ 3 วิ่งอยู่แต่ output drop ยังไม่กระทบคุณภาพ (ไม่ควรปล่อยทิ้งใว้)",
        tooltip:
            "เช่น เร่งด่วน แต่ยังสามารถรอได้ แต่ต้องลด Speed หรือ มีของเสียที่เกิดขึ้นในกระบวณการที่สามารถรับได้ (แต่ไม่ควรปล่อยทิ้งไว้)",
        level: 3,
        color: "yellow",
    },
    {
        id: "level4",
        label: "ระดับ 4 เครื่องจักรมีปัญหา แต่ไม่ส่งผลต่อการผลิต",
        tooltip:
            "เช่น มีโอกาสที่จะเสียหาย หรือเสียหาย แต่ยังไม่ส่งผลกระทบ สามารถกำหนดวันลงซ่อมได้ (โดยทีมช่างและ PD ต้องตกลงกัน)",
        level: 4,
        color: "green",
    },
];

// Mock data สำหรับประเภทงานซ่อม
export const mockWorkTypes: WorkType[] = [
    {
        id: "wt1",
        name: "BM (Break Down Maintenance)",
        description: "การซ่อมแซมเมื่อเครื่องจักรเสียหายหรือหยุดทำงาน",
        status: "Active",
        createdAt: "1/1/2567",
        updatedAt: "1/1/2567",
    },
    {
        id: "wt2",
        name: "CBM (Condition-Based Maintenance)",
        description: "การซ่อมแซมตามสภาพการใช้งานจริงของเครื่องจักร",
        status: "Active",
        createdAt: "1/1/2567",
        updatedAt: "1/1/2567",
    },
];

// Mock data สำหรับสาเหตุของปัญหา
export const mockProblemCauses: ProblemCause[] = [
    {
        id: "pc1",
        name: "ใช้งานไม่ถูกวิธี",
        description: "การใช้งานเครื่องจักรไม่ถูกต้องตามคู่มือ",
        status: "Active",
        createdAt: "1/1/2567",
        updatedAt: "1/1/2567",
    },
    {
        id: "pc2",
        name: "อุปกรณ์เสื่อมสภาพก่อนกำหนด",
        description: "อุปกรณ์เสื่อมสภาพเร็วกว่าที่คาดไว้",
        status: "Active",
        createdAt: "1/1/2567",
        updatedAt: "1/1/2567",
    },
    {
        id: "pc3",
        name: "ติดตั้งไม่ถูกวิธี",
        description: "การติดตั้งอุปกรณ์ไม่ถูกต้องตามมาตรฐาน",
        status: "Active",
        createdAt: "1/1/2567",
        updatedAt: "1/1/2567",
    },
    {
        id: "pc4",
        name: "ขาดการหล่อลื่น",
        description: "ไม่มีการหล่อลื่นหรือหล่อลื่นไม่เพียงพอ",
        status: "Active",
        createdAt: "1/1/2567",
        updatedAt: "1/1/2567",
    },
    {
        id: "pc5",
        name: "Overload",
        description: "การใช้งานเกินกำลังที่กำหนด",
        status: "Active",
        createdAt: "1/1/2567",
        updatedAt: "1/1/2567",
    },
    {
        id: "pc6",
        name: "ขาดการบำรุงรักษาตามกำหนด",
        description: "ไม่มีการบำรุงรักษาตามแผนที่กำหนดไว้",
        status: "Active",
        createdAt: "1/1/2567",
        updatedAt: "1/1/2567",
    },
];

// ข้อมูลช่างเทคนิค
export const mockTechnicians: Technician[] = [
    {
        id: "tech1",
        name: "นายสมชาย วิชาการ",
        employeeId: "EMP001",
        department: "แผนกซ่อมบำรุง",
        specialization: ["ระบบไฟฟ้า", "มอเตอร์", "เซ็นเซอร์"],
        level: "Senior",
        status: "Active",
        contactNumber: "081-234-5678",
        bchId: "6",
        organization: branchMaster.find((b) => b.id === "6")?.name || "",
        email: "somchai.w@company.com",
        createdAt: "1/1/2567",
        updatedAt: "15/1/2567",
    },
    {
        id: "tech2",
        name: "นายวิชัย เทคนิค",
        employeeId: "EMP002",
        department: "แผนกซ่อมบำรุง",
        specialization: ["ระบบกล", "ลูกปืน", "เฟือง"],
        level: "Expert",
        status: "Active",
        contactNumber: "082-345-6789",
        bchId: "L",
        organization: branchMaster.find((b) => b.id === "L")?.name || "",
        email: "wichai.t@company.com",
        createdAt: "5/1/2567",
        updatedAt: "20/1/2567",
    },
    {
        id: "tech3",
        name: "นางสาวสุดา ช่างฝีมือ",
        employeeId: "EMP003",
        department: "แผนกซ่อมบำรุง",
        specialization: ["ระบบไฮดรอลิก", "นิวเมติก"],
        level: "Senior",
        status: "Active",
        contactNumber: "083-456-7890",
        bchId: "A",
        organization: branchMaster.find((b) => b.id === "A")?.name || "",
        email: "suda.c@company.com",
        createdAt: "10/1/2567",
        updatedAt: "25/1/2567",
    },
    {
        id: "tech4",
        name: "นายอนุชา ซ่อมแซม",
        employeeId: "EMP004",
        department: "แผนกซ่อมบำรุง",
        specialization: ["ระบบควบคุม", "PLC", "HMI"],
        level: "Expert",
        status: "Active",
        contactNumber: "084-567-8901",
        bchId: "A",
        organization: branchMaster.find((b) => b.id === "A")?.name || "",
        email: "anucha.s@company.com",
        createdAt: "15/1/2567",
        updatedAt: "30/1/2567",
    },
    {
        id: "tech5",
        name: "นายประยุทธ์ ช่วยงาน",
        employeeId: "EMP005",
        department: "แผนกซ่อมบำรุง",
        specialization: ["งานทั่วไป", "ทำความสะอาด"],
        level: "Junior",
        status: "Active",
        contactNumber: "085-678-9012",
        bchId: "2",
        organization: branchMaster.find((b) => b.id === "2")?.name || "",
        email: "prayuth.c@company.com",
        createdAt: "20/1/2567",
        updatedAt: "5/2/2567",
    },
    {
        id: "tech6",
        name: "นายสุรชัย หัวหน้า",
        employeeId: "EMP006",
        department: "แผนกซ่อมบำรุง",
        specialization: ["การจัดการ", "วางแผน", "ควบคุมงาน"],
        level: "Expert",
        status: "Active",
        contactNumber: "086-789-0123",
        bchId: "6",
        organization: branchMaster.find((b) => b.id === "6")?.name || "",
        email: "surachai.h@company.com",
        createdAt: "1/12/2566",
        updatedAt: "10/2/2567",
    },
];

// ข้อมูลใบร้องของงานซ่อม (Request)
export const mockRepairRequests: RepairRequest[] = [
    {
        id: "RR-A-67070001",
        documentNumber: "RR-A-67070001",
        machineId: "COL3",
        machine: "เครื่องฉีดฟิล์ม Extrusion Line-COL",
        location: "อาคาร A ชั้น 1",
        section: "หน่วยหลอมพลาสติก (Extruder)",
        problem: "เครื่องหยุดทำงานกะทันหัน ไฟแสดงสถานะขาว",
        reporter: "นายสมศักดิ์ ผู้ปฏิบัติการ",
        reportDate: "15/7/2567",
        reportTime: "08:30",
        priority: "level1",
        priorityLabel: "ระดับ 1 หยุดทันที",
        contactNumber: "081-123-4567",
        additionalDetails:
            "เครื่องหยุดทำงานขณะกำลังผลิต ส่งผลกระทบต่อแผนการผลิต",
        status: "pending",
        createdAt: "15/7/2567 08:30",
        updatedAt: "15/7/2567 09:00",
        createdBy: "นายสมศักดิ์ ผู้ปฏิบัติการ",
        updatedBy: "วิศวกร ประจำแผนก",
    },
    {
        id: "RR-6-67070002",
        documentNumber: "RR-6-67070002",
        machineId: "LS91",
        machine: "W6-เครื่องผ่า/กรอ SLITTER 1",
        location: "อาคาร B ชั้น 2",
        section: "หน่วยตัด (Cutting Unit)",
        problem: "ใบมีดตัดไม่คม ตัดฟิล์มไม่เรียบ",
        reporter: "นายวิชัย ช่างเทคนิค",
        reportDate: "16/7/2567",
        reportTime: "14:15",
        priority: "level2",
        priorityLabel: "ระดับ 2 วิ่งอยู่แต่เสี่ยงต่อคุณภาพ",
        contactNumber: "082-345-6789",
        additionalDetails: "ใบมีดใช้งานมานาน ควรเปลี่ยนใหม่",
        status: "pending",
        createdAt: "16/7/2567 14:15",
        updatedAt: "16/7/2567 14:15",
        createdBy: "นายวิชัย ช่างเทคนิค",
    },
    {
        id: "RR-A-67070003",
        documentNumber: "RR-A-67070003",
        machineId: "COL3",
        machine: "เครื่องฉีดฟิล์ม Extrusion Line-COL",
        location: "อาคาร A ชั้น 1",
        section: "หน่วยม้วนฟิล์ม (Winding Unit)",
        problem: "ลูกกลิ้งม้วนฟิล์มสั่นผิดปกติ",
        reporter: "นางสาวสุดา ช่างฝีมือ",
        reportDate: "17/7/2567",
        reportTime: "10:45",
        priority: "level3",
        priorityLabel: "ระดับ 3 วิ่งอยู่แต่ output drop ยังไม่กระทบคุณภาพ",
        contactNumber: "083-456-7890",
        additionalDetails: "ลูกกลิ้งสั่นมากขึ้นเรื่อยๆ อาจเป็นปัญหาแบริ่ง",
        status: "pending",
        createdAt: "17/7/2567 10:45",
        updatedAt: "17/7/2567 11:00",
        createdBy: "นางสาวสุดา ช่างฝีมือ",
        updatedBy: "วิศวกร ประจำแผนก",
    },
    {
        id: "RR-6-67070004",
        documentNumber: "RR-6-67070004",
        machineId: "LM81",
        machine: "W6-เครื่อง METALLIZER 1",
        location: "อาคาร C ชั้น 1",
        section: "หน่วยพิมพ์ (Printing Unit)",
        problem: "หัวพิมพ์สีไม่ออกสี",
        reporter: "นายอนุชา ซ่อมแซม",
        reportDate: "18/7/2567",
        reportTime: "16:20",
        priority: "level4",
        priorityLabel: "ระดับ 4 เครื่องจักรมีปัญหา แต่ไม่ส่งผลต่อการผลิต",
        contactNumber: "084-567-8901",
        additionalDetails: "หัวพิมพ์อาจอุดตัน ต้องทำความสะอาด",
        status: "rejected",
        createdAt: "18/7/2567 16:20",
        updatedAt: "18/7/2567 17:00",
        createdBy: "นายอนุชา ซ่อมแซม",
        updatedBy: "หัวหน้าแผนก สุรชัย",
    },
    {
        id: "RR-6-68070005",
        documentNumber: "RR-6-68070005",
        machineId: "FD01",
        machine: "W6-เครื่องผ่า/กรอ Folding",
        location: "อาคาร 2, Line 2",
        section: "ฝ่ายขนส่ง",
        problem: "มอเตอร์ไม่หมุน ขาดการหล่อลื่น",
        reporter: "สมหญิง (ฝ่ายผลิต)",
        reportDate: "08/07/2568",
        reportTime: "11:30",
        priority: "level2",
        priorityLabel: "ระดับ 2 วิ่งอยู่แต่เสี่ยงต่อคุณภาพ",
        contactNumber: "084-567-8901",
        additionalDetails: "รอจัดลำดับความสำคัญ",
        status: "pending",
        createdAt: "08/07/2568 11:30",
        updatedAt: "08/07/2568 12:00",
        createdBy: "สมหญิง (ฝ่ายผลิต)",
        updatedBy: "วิศวกร ประจำแผนก",
    },
    {
        id: "RR-B-68070006",
        documentNumber: "RR-B-68070006",
        machineId: "BM01",
        machine: "W6-เครื่องผสมเม็ด MIX 1",
        location: "อาคาร 1, Line 3",
        section: "ฝ่ายผสม",
        problem: "ใบมีดสึกหรอ",
        reporter: "สมปอง (ฝ่ายผลิต)",
        reportDate: "06/07/2568",
        reportTime: "13:15",
        priority: "level2",
        priorityLabel: "ระดับ 2 วิ่งอยู่แต่เสี่ยงต่อคุณภาพ",
        contactNumber: "085-678-9012",
        additionalDetails: "กำลังดำเนินการซ่อม",
        status: "pending",
        createdAt: "06/07/2568 13:15",
        updatedAt: "06/07/2568 14:00",
        createdBy: "สมปอง (ฝ่ายผลิต)",
        updatedBy: "วิศวกร ประจำแผนก",
    },
    {
        id: "RR-6-68070007",
        documentNumber: "RR-6-68070007",
        machineId: "LM82",
        machine: "W6-เครื่อง METALLIZER 2",
        location: "อาคาร 1, หลังคา",
        section: "ฝ่ายสาธารณูปโภค",
        problem: "ปั๊มน้ำไม่ทำงาน",
        reporter: "สมคิด (ฝ่ายซ่อมบำรุง)",
        reportDate: "04/07/2568",
        reportTime: "07:30",
        priority: "level1",
        priorityLabel: "ระดับ 1 เครื่องจักรหยุดทำงาน",
        contactNumber: "086-789-0123",
        additionalDetails: "ซ่อมเสร็จแล้ว ระบบทำงานปกติ",
        status: "pending",
        createdAt: "04/07/2568 07:30",
        updatedAt: "04/07/2568 15:30",
        createdBy: "สมคิด (ฝ่ายซ่อมบำรุง)",
        updatedBy: "นายสมชาย วิชาการ",
    },
    {
        id: "RR-6-68070008",
        documentNumber: "RR-6-68070008",
        machineId: "SS01",
        machine: "W6-เครื่องผ่า/กรอ SideSeal-01",
        location: "โรงงาน 1 ชั้น 2",
        section: "ฝ่ายผลิต A",
        problem: "สายพานขาด",
        reporter: "นายสมศักดิ์ ใจดี",
        reportDate: "08/07/2568",
        reportTime: "08:30",
        priority: "level1",
        priorityLabel: "ระดับ 1 เครื่องจักรหยุดทำงาน",
        contactNumber: "081-234-5678",
        additionalDetails:
            "สายพานลำเลียงขาดจากการใช้งานหนัก ต้องเปลี่ยนสายพานใหม่ทั้งเส้น",
        status: "pending",
        createdAt: "08/07/2568 08:30",
        updatedAt: "08/07/2568 14:30",
        createdBy: "นายสมศักดิ์ ใจดี",
        updatedBy: "นายสมชาย วิชาการ",
    },
    // ใบร้องของานซ่อม - รถยนต์ (Car)
    {
        id: "RR-6-68080010",
        documentNumber: "RR-6-68080010",
        machineId: "CAR01",
        machine: "รถยนต์ (Car)",
        location: "ลานจอดรถ หน้าอาคาร",
        section: "ระบบไฟฟ้า",
        problem: "สตาร์ทไม่ติด แบตเตอรี่เสื่อมแรงดันตก",
        reporter: "คุณเอก ฝ่ายขนส่ง",
        reportDate: "09/07/2568",
        reportTime: "09:15",
        priority: "level2",
        priorityLabel: "ระดับ 2 วิ่งอยู่แต่เสี่ยงต่อคุณภาพ",
        contactNumber: "081-111-2222",
        additionalDetails:
            "ตรวจพบไฟหน้าและระบบไฟดับเป็นบางครั้ง ควรตรวจแบตเตอรี่และไดชาร์จ",
        status: "pending",
        createdAt: "09/07/2568 09:15",
        updatedAt: "09/07/2568 09:20",
        createdBy: "คุณเอก ฝ่ายขนส่ง",
        updatedBy: "วิศวกร ประจำแผนก",
    },
    // ใบร้องของานซ่อม - เครื่องปรับอากาศ (Air Conditioner)
    {
        id: "RR-6-68080011",
        documentNumber: "RR-6-68080011",
        machineId: "AC01",
        machine: "เครื่องปรับอากาศ (Air Conditioner)",
        location: "อาคารสำนักงาน ชั้น 2",
        section: "ชุดคอมเพรสเซอร์",
        problem: "คอมเพรสเซอร์มีเสียงดังและไม่ทำความเย็น",
        reporter: "คุณนิด ฝ่ายธุรการ",
        reportDate: "09/07/2568",
        reportTime: "13:45",
        priority: "level3",
        priorityLabel:
            "ระดับ 3 วิ่งอยู่แต่ output drop ยังไม่กระทบคุณภาพ (ไม่ควรปล่อยทิ้งใว้)",
        contactNumber: "082-222-3333",
        additionalDetails:
            "เครื่องทำงานต่อเนื่องแต่ลมไม่เย็น อุณหภูมิห้องสูง ควรตรวจสารทำความเย็นและคอมเพรสเซอร์",
        status: "pending",
        createdAt: "09/07/2568 13:45",
        updatedAt: "09/07/2568 13:50",
        createdBy: "คุณนิด ฝ่ายธุรการ",
        updatedBy: "วิศวกร ประจำแผนก",
    },
];

// ข้อมูลใบสั่งงานซ่อม (Process)
export const mockRepairProcesses: RepairProcess[] = [
    {
        id: "RO-A-24070001",
        requestId: "RR-A-67070001",
        documentNumber: "PROC-2024-001",
        assignedTechnicians: ["tech1", "tech4"],
        estimatedStartDate: "15/7/2567",
        estimatedEndDate: "16/7/2567",
        actualStartDate: "15/7/2567",
        actualEndDate: "15/7/2567",
        repairMethod: "ตรวจสอบระบบไฟฟ้าและเปลี่ยนอุปกรณ์ที่ชำรุด",
        cause: "เซ็นเซอร์วัดอุณหภูมิเสียหาย",
        usedParts: [
            {
                partId: "p4",
                partName: "เซ็นเซอร์ PT100",
                partCode: "SEN-PT100-004",
                quantity: 1,
                unit: "ตัว",
            },
            {
                partId: "p5",
                partName: "สายสัญญาณ",
                partCode: "CAB-SIG-005",
                quantity: 3,
                unit: "เมตร",
            },
        ],
        status: "completed",
        notes: "ซ่อมเสร็จเรียบร้อย ทดสอบการทำงานแล้ว",
        approvedBy: "นายสุรชัย หัวหน้า",
        approvedAt: "15/7/2567 16:00",
        createdAt: "15/7/2567 09:00",
        updatedAt: "15/7/2567 16:00",
        createdBy: "วิศวกร ประจำแผนก",
        updatedBy: "นายสมชาย วิชาการ",
    },
    {
        id: "RO-A-24070003",
        requestId: "RR-A-67070003",
        documentNumber: "PROC-2024-003",
        assignedTechnicians: ["tech2", "tech3"],
        estimatedStartDate: "17/7/2567",
        estimatedEndDate: "18/7/2567",
        actualStartDate: "17/7/2567",
        repairMethod: "เปลี่ยนแบริ่งลูกกลิ้งและปรับตั้งระบบ",
        cause: "แบริ่งลูกกลิ้งเสื่อมสภาพ",
        usedParts: [
            {
                partId: "p12",
                partName: "แบริ่งลูกกลิ้ง",
                partCode: "BRG-ROL-012",
                quantity: 2,
                unit: "ตัว",
            },
        ],
        status: "in_progress",
        notes: "กำลังดำเนินการเปลี่ยนแบริ่ง",
        createdAt: "17/7/2567 11:00",
        updatedAt: "17/7/2567 14:30",
        createdBy: "วิศวกร ประจำแผนก",
        updatedBy: "นายวิชัย เทคนิค",
    },
    {
        id: "RO-6-24070002",
        requestId: "RR-6-67070002",
        documentNumber: "PROC-2024-002",
        assignedTechnicians: ["tech2"],
        estimatedStartDate: "19/7/2567",
        estimatedEndDate: "19/7/2567",
        repairMethod: "เปลี่ยนใบมีดตัดฟิล์มใหม่",
        cause: "ใบมีดสึกหรอจากการใช้งาน",
        status: "assigned",
        notes: "รอการอนุมัติใช้อะไหล่",
        createdAt: "16/7/2567 15:00",
        updatedAt: "17/7/2567 09:00",
        createdBy: "วิศวกร ประจำแผนก",
        updatedBy: "หัวหน้าแผนก สุรชัย",
    },
    {
        id: "RO-6-24070004",
        requestId: "RR-6-67070004",
        documentNumber: "PROC-2024-004",
        assignedTechnicians: ["tech3", "tech4"],
        estimatedStartDate: "08/07/2568",
        estimatedEndDate: "08/07/2568",
        repairMethod: "ตรวจสอบระบบทำความเย็นและเปลี่ยนอุปกรณ์",
        cause: "อุณหภูมิสูงผิดปกติ",
        status: "assigned",
        notes: "ตรวจพบจากการตรวจสอบประจำ",
        createdAt: "08/07/2568 10:00",
        updatedAt: "08/07/2568 10:30",
        createdBy: "วิศวกร ประจำแผนก",
        updatedBy: "หัวหน้าแผนก สุรชัย",
    },
    {
        id: "RO-6-24070005",
        requestId: "RR-6-67070002",
        documentNumber: "PROC-2024-005",
        assignedTechnicians: ["tech2"],
        estimatedStartDate: "08/07/2568",
        estimatedEndDate: "08/07/2568",
        repairMethod: "ตรวจสอบและหล่อลื่นมอเตอร์",
        cause: "มอเตอร์ไม่หมุน ขาดการหล่อลื่น",
        status: "assigned",
        notes: "รอจัดลำดับความสำคัญ",
        createdAt: "08/07/2568 11:30",
        updatedAt: "08/07/2568 12:00",
        createdBy: "วิศวกร ประจำแผนก",
        updatedBy: "หัวหน้าแผนก สุรชัย",
    },
    {
        id: "RO-A-24070006",
        requestId: "RR-A-67070003",
        documentNumber: "PROC-2024-006",
        assignedTechnicians: ["tech2"],
        estimatedStartDate: "06/07/2568",
        estimatedEndDate: "06/07/2568",
        actualStartDate: "06/07/2568",
        repairMethod: "เปลี่ยนใบมีดผสมและตรวจสอบระบบขับเคลื่อน",
        cause: "ใบมีดสึกหรอจากการใช้งานต่อเนื่อง",
        usedParts: [
            {
                partId: "p15",
                partName: "ใบมีดผสม",
                partCode: "BLADE-001",
                quantity: 2,
                unit: "ชิ้น",
            },
        ],
        status: "in_progress",
        notes: "กำลังดำเนินการซ่อม",
        createdAt: "06/07/2568 13:15",
        updatedAt: "06/07/2568 14:00",
        createdBy: "วิศวกร ประจำแผนก",
        updatedBy: "นายวิชัย เทคนิค",
    },
    {
        id: "RO-6-24070007",
        requestId: "RR-6-67070004",
        documentNumber: "PROC-2024-007",
        assignedTechnicians: ["tech1", "tech2"],
        estimatedStartDate: "04/07/2568",
        estimatedEndDate: "04/07/2568",
        actualStartDate: "04/07/2568",
        actualEndDate: "04/07/2568",
        repairMethod: "เปลี่ยนปั๊มน้ำและตรวจสอบระบบไฟฟ้า",
        cause: "ปั๊มน้ำเสียหายจากการใช้งานมานาน",
        usedParts: [
            {
                partId: "p16",
                partName: "ปั๊มน้ำ",
                partCode: "PUMP-001",
                quantity: 1,
                unit: "ตัว",
            },
            {
                partId: "p17",
                partName: "สายไฟ",
                partCode: "WIRE-001",
                quantity: 5,
                unit: "เมตร",
            },
        ],
        status: "completed",
        notes: "ซ่อมเสร็จแล้ว ระบบทำงานปกติ",
        approvedBy: "นายสุรชัย หัวหน้า",
        approvedAt: "04/07/2568 15:30",
        createdAt: "04/07/2568 07:30",
        updatedAt: "04/07/2568 15:30",
        createdBy: "วิศวกร ประจำแผนก",
        updatedBy: "นายสมชาย วิชาการ",
    },
    {
        id: "RO-A-24070008",
        requestId: "RR-A-67070001",
        documentNumber: "PROC-2024-008",
        assignedTechnicians: ["tech1"],
        estimatedStartDate: "08/07/2568",
        estimatedEndDate: "08/07/2568",
        actualStartDate: "08/07/2568",
        actualEndDate: "08/07/2568",
        repairMethod: "เปลี่ยนสายพานลำเลียงและปรับตำแหน่งระบบขับเคลื่อน",
        cause: "สายพานขาดจากการใช้งานหนักและขาดการบำรุงรักษา",
        usedParts: [
            {
                partId: "p18",
                partName: "สายพานลำเลียง 10m",
                partCode: "CB-001",
                quantity: 1,
                unit: "เส้น",
            },
            {
                partId: "p19",
                partName: "น็อตยึดสายพาน",
                partCode: "BT-002",
                quantity: 8,
                unit: "ตัว",
            },
        ],
        status: "waiting_approval",
        notes: "สายพานลำเลียงขาดจากการใช้งานหนัก ต้องเปลี่ยนสายพานใหม่ทั้งเส้น",
        createdAt: "08/07/2568 08:30",
        updatedAt: "08/07/2568 14:30",
        createdBy: "วิศวกร ประจำแผนก",
        updatedBy: "นายสมชาย วิชาการ",
    },
];

// ฟังก์ชันช่วยในการจัดการข้อมูล
export const getMachineById = (id: string): Machine | undefined => {
    return mockMachines.find((machine) => machine.id === id);
};

export const getSectionsByMachineId = (machineId: string): Section[] => {
    return mockSections.filter((section) => section.machineId === machineId);
};

export const getComponentsBySectionId = (
    sectionId: string
): ComponentItem[] => {
    return mockComponents.filter(
        (component) => component.sectionId === sectionId
    );
};

export const getSparePartsByComponentId = (
    componentId: string
): SparePart[] => {
    return mockSpareParts.filter(
        (sparePart) => sparePart.componentId === componentId
    );
};

// ฟังก์ชันสำหรับ Branch Master
export const getBranchById = (id: string): Branch | undefined => {
    return branchMaster.find((b) => b.id === id);
};

export const getAllBranches = (): Branch[] => {
    return branchMaster.filter((b) => b.status === "Active");
};

// ฟังก์ชันสำหรับอัปเดตจำนวน count
export const updateSectionCount = (
    machineId: string,
    sections: Section[]
): number => {
    return sections.filter((section) => section.machineId === machineId).length;
};

export const updateComponentCount = (
    sectionId: string,
    components: ComponentItem[]
): number => {
    return components.filter((component) => component.sectionId === sectionId)
        .length;
};

export const updateSparePartCount = (
    componentId: string,
    spareParts: SparePart[]
): number => {
    return spareParts.filter((part) => part.componentId === componentId).length;
};

// ฟังก์ชันสำหรับจัดการระดับความสำคัญ
export const getPriorityLevelById = (id: string): PriorityLevel | undefined => {
    return mockPriorityLevels.find((priority) => priority.id === id);
};

export const getAllPriorityLevels = (): PriorityLevel[] => {
    return mockPriorityLevels;
};

export const getPriorityLevelByLabel = (
    label: string
): PriorityLevel | undefined => {
    return mockPriorityLevels.find((priority) => priority.label === label);
};

export const getPriorityLevelsByLevel = (level: number): PriorityLevel[] => {
    return mockPriorityLevels.filter((priority) => priority.level >= level);
};

// ฟังก์ชันช่วยสำหรับจัดการข้อมูลช่างเทคนิค
export const getTechnicianById = (id: string): Technician | undefined => {
    return mockTechnicians.find((technician) => technician.id === id);
};

export const getAllTechnicians = (): Technician[] => {
    return mockTechnicians.filter(
        (technician) => technician.status === "Active"
    );
};

// คืนช่างทั้งหมดโดยจัดให้สาขาที่ระบุอยู่บนสุด
export const getAllTechniciansPreferred = (bchId?: string): Technician[] => {
    const all = getAllTechnicians();
    if (!bchId) return all;
    return [
        ...all.filter((t) => t.bchId === bchId),
        ...all.filter((t) => t.bchId !== bchId),
    ];
};

export const getTechniciansByLevel = (
    level: "Junior" | "Senior" | "Expert"
): Technician[] => {
    return mockTechnicians.filter(
        (technician) =>
            technician.level === level && technician.status === "Active"
    );
};

export const getTechniciansBySpecialization = (
    specialization: string
): Technician[] => {
    return mockTechnicians.filter(
        (technician) =>
            technician.specialization.includes(specialization) &&
            technician.status === "Active"
    );
};

export const searchTechnicians = (query: string): Technician[] => {
    const lowerQuery = query.toLowerCase();
    return mockTechnicians.filter(
        (technician) =>
            (technician.name.toLowerCase().includes(lowerQuery) ||
                technician.employeeId.toLowerCase().includes(lowerQuery) ||
                technician.specialization.some((spec) =>
                    spec.toLowerCase().includes(lowerQuery)
                )) &&
            technician.status === "Active"
    );
};

export const getTechniciansByIds = (ids: string[]): Technician[] => {
    return mockTechnicians.filter((technician) => ids.includes(technician.id));
};

// ฟังก์ชันช่วยสำหรับ RepairRequest
export const getAllRepairRequests = (): RepairRequest[] => {
    return mockRepairRequests;
};

export const getRepairRequestById = (id: string): RepairRequest | undefined => {
    return mockRepairRequests.find((request) => request.id === id);
};

export const getRepairRequestsByStatus = (
    status: RepairRequest["status"]
): RepairRequest[] => {
    return mockRepairRequests.filter((request) => request.status === status);
};

// ฟังก์ชันช่วยสำหรับ RepairProcess
export const getAllRepairProcesses = (): RepairProcess[] => {
    return mockRepairProcesses;
};

export const getRepairProcessById = (id: string): RepairProcess | undefined => {
    return mockRepairProcesses.find((process) => process.id === id);
};

export const getRepairProcessByRequestId = (
    requestId: string
): RepairProcess | undefined => {
    return mockRepairProcesses.find(
        (process) => process.requestId === requestId
    );
};

export const getRepairProcessesByStatus = (
    status: RepairProcess["status"]
): RepairProcess[] => {
    return mockRepairProcesses.filter((process) => process.status === status);
};

// ฟังก์ชันช่วยสำหรับความสัมพันธ์ระหว่าง Request และ Process
export const getRepairRequestWithProcess = (
    requestId: string
): {
    request: RepairRequest | undefined;
    process: RepairProcess | undefined;
} => {
    const request = getRepairRequestById(requestId);
    const process = getRepairProcessByRequestId(requestId);
    return { request, process };
};

// ฟังก์ชันสำหรับประเภทงานซ่อม
export const getAllWorkTypes = (): WorkType[] => {
    return mockWorkTypes.filter((wt) => wt.status === "Active");
};

export const getWorkTypeById = (id: string): WorkType | undefined => {
    return mockWorkTypes.find((wt) => wt.id === id);
};

// ฟังก์ชันสำหรับสาเหตุของปัญหา
export const getAllProblemCauses = (): ProblemCause[] => {
    return mockProblemCauses.filter((pc) => pc.status === "Active");
};

export const getProblemCauseById = (id: string): ProblemCause | undefined => {
    return mockProblemCauses.find((pc) => pc.id === id);
};
