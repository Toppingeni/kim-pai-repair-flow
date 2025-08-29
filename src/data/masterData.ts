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
    organization: string;
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
    id: string; // รหัสใบร้องของงานซ่อม เช่น R24070001
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

// ใบแจ้งซ่อม (Process) - รหัสขึ้นต้นด้วย P
export interface RepairProcess {
    id: string; // รหัสใบแจ้งซ่อม เช่น P24070001
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
    status: "assigned" | "in_progress" | "waiting_parts" | "waiting_approval" | "completed" | "cancelled";
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
    {
        id: "s1",
        machineId: "m1",
        name: "หน่วยหลอมพลาสติก (Extruder)",
        status: "Active",
        componentsCount: 3,
    },
    {
        id: "s2",
        machineId: "m1",
        name: "หน่วยขึ้นรูป (Die Head)",
        status: "Active",
        componentsCount: 2,
    },
    {
        id: "s3",
        machineId: "m1",
        name: "หน่วยม้วนฟิล์ม (Winding Unit)",
        status: "Active",
        componentsCount: 2,
    },
    {
        id: "s4",
        machineId: "m2",
        name: "หน่วยตัด (Cutting Unit)",
        status: "Active",
        componentsCount: 2,
    },
    {
        id: "s5",
        machineId: "m2",
        name: "หน่วยควบคุม (Control System)",
        status: "Active",
        componentsCount: 1,
    },
    {
        id: "s6",
        machineId: "m3",
        name: "หน่วยพิมพ์ (Printing Unit)",
        status: "Inactive",
        componentsCount: 1,
    },
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
        organization: "เป่าฟิล์ม เวลโกรว์ ซอย 6",
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
        organization: "ฟิล์ม ลาดกระบัง",
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
        organization: "ฉีดฟิล์ม เวลโกรว์ ซอย 6",
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
        organization: "ฉีดฟิล์ม เวลโกรว์ ซอย 6",
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
        organization: "หลอด เวลโกรว์ ซอย 2 (BOI)",
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
        organization: "ฟิล์ม เวลโกรว์ ซอย 6",
        email: "surachai.h@company.com",
        createdAt: "1/12/2566",
        updatedAt: "10/2/2567",
    },
];

// ข้อมูลใบร้องของงานซ่อม (Request)
export const mockRepairRequests: RepairRequest[] = [
    {
        id: "R24070001",
        documentNumber: "REQ-2024-001",
        machineId: "m1",
        machine: "เครื่องอัดฟิล์ม Extruder Line 1",
        location: "อาคาร A ชั้น 1",
        section: "หน่วยหลอมพลาสติก (Extruder)",
        problem: "เครื่องหยุดทำงานกะทันหัน ไฟแสดงสถานะขาว",
        reporter: "นายสมศักดิ์ ผู้ปฏิบัติการ",
        reportDate: "15/7/2567",
        reportTime: "08:30",
        priority: "level1",
        priorityLabel: "ระดับ 1 หยุดทันที",
        contactNumber: "081-123-4567",
        additionalDetails: "เครื่องหยุดทำงานขณะกำลังผลิต ส่งผลกระทบต่อแผนการผลิต",
        status: "pending",
        createdAt: "15/7/2567 08:30",
        updatedAt: "15/7/2567 09:00",
        createdBy: "นายสมศักดิ์ ผู้ปฏิบัติการ",
        updatedBy: "วิศวกร ประจำแผนก",
    },
    {
        id: "R24070002",
        documentNumber: "REQ-2024-002",
        machineId: "m2",
        machine: "เครื่องตัดฟิล์ม Slitting Machine A",
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
        id: "R24070003",
        documentNumber: "REQ-2024-003",
        machineId: "m1",
        machine: "เครื่องอัดฟิล์ม Extruder Line 1",
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
        id: "R24070004",
        documentNumber: "REQ-2024-004",
        machineId: "m3",
        machine: "เครื่องพิมพ์ฟิล์ม Printing Press B",
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
        id: "R24070005",
        documentNumber: "REQ-2024-005",
        machineId: "m4",
        machine: "Conveyor",
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
        id: "R24070006",
        documentNumber: "REQ-2024-006",
        machineId: "m5",
        machine: "Mixer A",
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
        id: "R24070007",
        documentNumber: "REQ-2024-007",
        machineId: "m6",
        machine: "Cooling Tower",
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
        id: "R24070008",
        documentNumber: "REQ-2024-008",
        machineId: "m7",
        machine: "Conveyor Belt #3",
        location: "โรงงาน 1 ชั้น 2",
        section: "ฝ่ายผลิต A",
        problem: "สายพานขาด",
        reporter: "นายสมศักดิ์ ใจดี",
        reportDate: "08/07/2568",
        reportTime: "08:30",
        priority: "level1",
        priorityLabel: "ระดับ 1 เครื่องจักรหยุดทำงาน",
        contactNumber: "081-234-5678",
        additionalDetails: "สายพานลำเลียงขาดจากการใช้งานหนัก ต้องเปลี่ยนสายพานใหม่ทั้งเส้น",
        status: "pending",
        createdAt: "08/07/2568 08:30",
        updatedAt: "08/07/2568 14:30",
        createdBy: "นายสมศักดิ์ ใจดี",
        updatedBy: "นายสมชาย วิชาการ",
    },
];

// ข้อมูลใบแจ้งซ่อม (Process)
export const mockRepairProcesses: RepairProcess[] = [
    {
        id: "P24070001",
        requestId: "R24070001",
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
        id: "P24070003",
        requestId: "R24070003",
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
        id: "P24070002",
        requestId: "R24070002",
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
        id: "P24070004",
        requestId: "R24070004",
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
        id: "P24070005",
        requestId: "R24070002",
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
        id: "P24070006",
        requestId: "R24070003",
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
        id: "P24070007",
        requestId: "R24070004",
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
        id: "P24070008",
        requestId: "R24070001",
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
    return mockRepairRequests.find(request => request.id === id);
};

export const getRepairRequestsByStatus = (status: RepairRequest['status']): RepairRequest[] => {
    return mockRepairRequests.filter(request => request.status === status);
};

// ฟังก์ชันช่วยสำหรับ RepairProcess
export const getAllRepairProcesses = (): RepairProcess[] => {
    return mockRepairProcesses;
};

export const getRepairProcessById = (id: string): RepairProcess | undefined => {
    return mockRepairProcesses.find(process => process.id === id);
};

export const getRepairProcessByRequestId = (requestId: string): RepairProcess | undefined => {
    return mockRepairProcesses.find(process => process.requestId === requestId);
};

export const getRepairProcessesByStatus = (status: RepairProcess['status']): RepairProcess[] => {
    return mockRepairProcesses.filter(process => process.status === status);
};

// ฟังก์ชันช่วยสำหรับความสัมพันธ์ระหว่าง Request และ Process
export const getRepairRequestWithProcess = (requestId: string): { request: RepairRequest | undefined, process: RepairProcess | undefined } => {
    const request = getRepairRequestById(requestId);
    const process = getRepairProcessByRequestId(requestId);
    return { request, process };
};

// ฟังก์ชันสำหรับประเภทงานซ่อม
export const getAllWorkTypes = (): WorkType[] => {
    return mockWorkTypes.filter(wt => wt.status === "Active");
};

export const getWorkTypeById = (id: string): WorkType | undefined => {
    return mockWorkTypes.find(wt => wt.id === id);
};

// ฟังก์ชันสำหรับสาเหตุของปัญหา
export const getAllProblemCauses = (): ProblemCause[] => {
    return mockProblemCauses.filter(pc => pc.status === "Active");
};

export const getProblemCauseById = (id: string): ProblemCause | undefined => {
    return mockProblemCauses.find(pc => pc.id === id);
};
