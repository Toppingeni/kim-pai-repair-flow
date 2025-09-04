// ไฟล์รวม Mock Data สำหรับระบบซ่อมบำรุง
// รวบรวมข้อมูลจากทุกหน้าและทำให้ข้อมูลสัมพันธ์กัน

// Interface สำหรับข้อมูลอะไหล่ที่ใช้
export interface UsedPart {
    name: string;
    code: string;
    quantity: number;
    unit?: string;
    status: string;
}

// Interface สำหรับรายละเอียดการซ่อม
export interface RepairDetails {
    startDate: string;
    startTime?: string;
    endDate: string | null;
    endTime?: string;
    description: string;
    cause: string;
    result: string | null;
    usedParts: UsedPart[];
}

// Interface สำหรับข้อมูลการซ่อมแบบสมบูรณ์
export interface CompleteRepairData {
    id: string;
    machine: string;
    machineCode?: string;
    location: string;
    section?: string;
    problem: string;
    requestDate: string;
    requestTime?: string;
    reporter: string;
    contactNumber?: string;
    workType?: string;
    status: "new" | "pending" | "progress" | "waiting" | "completed" | "cancelled";
    engineer?: string;
    urgency?: string;
    priority?: string;
    images?: string[];
    notes?: string;
    repairDetails?: RepairDetails;
}

// Interface สำหรับข้อมูลการซ่อมแบบย่อ (สำหรับตาราง)
export interface SimpleRepairData {
    id: string;
    machine: string;
    problem: string;
    date: string;
    status: "new" | "pending" | "progress" | "waiting" | "completed" | "cancelled";
    engineer?: string;
    reporter?: string;
}

// ข้อมูล Mock สำหรับการซ่อมแบบสมบูรณ์
export const mockCompleteRepairs: CompleteRepairData[] = [
    {
        id: "RO-A-24070001",
        machine: "เครื่องอัดฟิล์ม Extruder Line 1",
        machineCode: "EXT-001",
        location: "อาคาร A ชั้น 1",
        section: "หน่วยหลอมพลาสติก (Extruder)",
        problem:
            "เซ็นเซอร์วัดอุณหภูมิแสดงค่าผิดปกติ ทำให้ระบบหยุดทำงานอัตโนมัติ",
        requestDate: "15/7/2567",
        requestTime: "09:00",
        reporter: "นายสมชาย ใจดี",
        contactNumber: "081-234-5678",
        workType: "maintenance",
        status: "completed",
        engineer: "นายสมชาย",
        urgency: "high",
        priority: "ระดับ 1 เครื่องจักรหยุดทำงาน",
        images: ["/api/placeholder/300/200", "/api/placeholder/300/200"],
        notes: "เซ็นเซอร์วัดอุณหภูมิแสดงค่าผิดปกติ ทำให้ระบบหยุดทำงานอัตโนมัติ",
        repairDetails: {
            startDate: "15/7/2567",
            startTime: "09:00",
            endDate: "15/7/2567",
            endTime: "16:00",
            description: "ตรวจสอบระบบไฟฟ้าและเปลี่ยนอุปกรณ์ที่ชำรุด",
            cause: "เซ็นเซอร์วัดอุณหภูมิเสียหาย",
            result: "success",
            usedParts: [
                {
                    name: "เซ็นเซอร์ PT100",
                    code: "SEN-PT100-004",
                    quantity: 1,
                    unit: "ตัว",
                    status: "ใช้แล้ว",
                },
                {
                    name: "สายสัญญาณ",
                    code: "CAB-SIG-005",
                    quantity: 3,
                    unit: "เมตร",
                    status: "ใช้แล้ว",
                },
            ],
        },
    },
    {
        id: "RO-6-24070002",
        machine: "เครื่องตัดฟิล์ม Slitting Machine A",
        machineCode: "SLIT-001",
        location: "อาคาร B ชั้น 2",
        section: "หน่วยตัด (Cutting Unit)",
        problem: "ใบมีดตัดไม่คม ตัดฟิล์มไม่เรียบ ควรเปลี่ยนใหม่",
        requestDate: "16/7/2567",
        requestTime: "14:15",
        reporter: "นายสมศักดิ์ ใจดี",
        contactNumber: "082-345-6789",
        workType: "maintenance",
        status: "pending",
        engineer: "นายวิชัย",
        urgency: "normal",
        priority: "ระดับ 2 วิ่งอยู่แต่เสี่ยงต่อคุณภาพ",
        images: ["/api/placeholder/300/200"],
        notes: "ใบมีดตัดไม่คม ตัดฟิล์มไม่เรียบ ควรเปลี่ยนใหม่",
        repairDetails: {
            startDate: "19/7/2567",
            startTime: "08:00",
            endDate: "19/7/2567",
            endTime: "12:00",
            description: "เปลี่ยนใบมีดตัดฟิล์มใหม่",
            cause: "ใบมีดสึกหรอจากการใช้งาน",
            result: null,
            usedParts: [],
        },
    },
    {
        id: "RO-A-24070003",
        machine: "เครื่องอัดฟิล์ม Extruder Line 1",
        machineCode: "EXT-001",
        location: "อาคาร A ชั้น 1",
        section: "หน่วยม้วนฟิล์ม (Winding Unit)",
        problem: "ลูกกลิ้งสั่นมากขึ้นเรื่อยๆ อาจเป็นปัญหาแบริ่ง",
        requestDate: "17/7/2567",
        requestTime: "10:45",
        reporter: "นางสาวสมใจ ดีใจ",
        contactNumber: "083-456-7890",
        workType: "maintenance",
        status: "new",
        urgency: "normal",
        priority: "ระดับ 3 วิ่งอยู่แต่ output drop ยังไม่กระทบคุณภาพ",
        images: ["/api/placeholder/300/200", "/api/placeholder/300/200"],
        notes: "ลูกกลิ้งสั่นมากขึ้นเรื่อยๆ อาจเป็นปัญหาแบริ่ง",
        repairDetails: {
            startDate: "17/7/2567",
            startTime: "11:00",
            endDate: null,
            endTime: null,
            description: "เปลี่ยนแบริ่งลูกกลิ้งและปรับตั้งระบบ",
            cause: "แบริ่งลูกกลิ้งเสื่อมสภาพ",
            result: null,
            usedParts: [
                {
                    name: "แบริ่งลูกกลิ้ง",
                    code: "BRG-ROL-012",
                    quantity: 2,
                    unit: "ตัว",
                    status: "กำลังติดตั้ง",
                },
            ],
        },
    },
    {
        id: "RO-6-24070004",
        machine: "Compressor",
        machineCode: "COMP-001",
        location: "อาคาร 1, ห้องเครื่องจักร",
        section: "ฝ่ายสาธารณูปโภค",
        problem: "อุณหภูมิสูงผิดปกติ",
        requestDate: "08/07/2568",
        requestTime: "10:00",
        reporter: "สมศักดิ์ (ฝ่ายซ่อมบำรุง)",
        contactNumber: "083-456-7890",
        workType: "maintenance",
        status: "new",
        urgency: "normal",
        priority: "ปานกลาง",
        images: [],
        notes: "ตรวจพบจากการตรวจสอบประจำ",
    },
    {
        id: "RO-6-24070005",
        machine: "Conveyor",
        machineCode: "CONV-002",
        location: "อาคาร 2, Line 2",
        section: "ฝ่ายขนส่ง",
        problem: "มอเตอร์ไม่หมุน ขาดการหล่อลื่น",
        requestDate: "08/07/2568",
        requestTime: "11:30",
        reporter: "สมหญิง (ฝ่ายผลิต)",
        contactNumber: "084-567-8901",
        workType: "maintenance",
        status: "pending",
        engineer: "นางสาวอร",
        urgency: "normal",
        priority: "ปานกลาง",
        images: [],
        notes: "รอจัดลำดับความสำคัญ",
    },
    {
        id: "RO-A-24070006",
        machine: "Mixer A",
        machineCode: "MIX-001",
        location: "อาคาร 1, Line 3",
        section: "ฝ่ายผสม",
        problem: "ใบมีดสึกหรอ",
        requestDate: "06/07/2568",
        requestTime: "13:15",
        reporter: "สมปอง (ฝ่ายผลิต)",
        contactNumber: "085-678-9012",
        workType: "maintenance",
        status: "progress",
        engineer: "นายวิชัย",
        urgency: "normal",
        priority: "ปานกลาง",
        images: ["mixer-blade.jpg"],
        notes: "กำลังดำเนินการซ่อม",
        repairDetails: {
            startDate: "06/07/2568",
            startTime: "14:00",
            endDate: null,
            endTime: null,
            description: "เปลี่ยนใบมีดผสมและตรวจสอบระบบขับเคลื่อน",
            cause: "ใบมีดสึกหรอจากการใช้งานต่อเนื่อง",
            result: null,
            usedParts: [
                {
                    name: "ใบมีดผสม",
                    code: "BLADE-001",
                    quantity: 2,
                    unit: "ชิ้น",
                    status: "กำลังติดตั้ง",
                },
            ],
        },
    },
    {
        id: "RO-6-24070007",
        machine: "Cooling Tower",
        machineCode: "COOL-001",
        location: "อาคาร 1, หลังคา",
        section: "ฝ่ายสาธารณูปโภค",
        problem: "ปั๊มน้ำไม่ทำงาน",
        requestDate: "04/07/2568",
        requestTime: "07:30",
        reporter: "สมคิด (ฝ่ายซ่อมบำรุง)",
        contactNumber: "086-789-0123",
        workType: "emergency",
        status: "completed",
        engineer: "นายสมชาย",
        urgency: "high",
        priority: "สูง",
        images: ["cooling-tower.jpg"],
        notes: "ซ่อมเสร็จแล้ว ระบบทำงานปกติ",
        repairDetails: {
            startDate: "04/07/2568",
            startTime: "08:00",
            endDate: "04/07/2568",
            endTime: "15:30",
            description: "เปลี่ยนปั๊มน้ำและตรวจสอบระบบไฟฟ้า",
            cause: "ปั๊มน้ำเสียหายจากการใช้งานมานาน",
            result: "success",
            usedParts: [
                {
                    name: "ปั๊มน้ำ",
                    code: "PUMP-001",
                    quantity: 1,
                    unit: "ตัว",
                    status: "ใช้แล้ว",
                },
                {
                    name: "สายไฟ",
                    code: "WIRE-001",
                    quantity: 5,
                    unit: "เมตร",
                    status: "ใช้แล้ว",
                },
            ],
        },
    },
    {
        id: "RO-A-24070008",
        machine: "Conveyor Belt #3",
        machineCode: "CONV-003",
        location: "โรงงาน 1 ชั้น 2",
        section: "ฝ่ายผลิต A",
        problem: "สายพานขาด",
        requestDate: "08/07/2568",
        requestTime: "08:30",
        reporter: "นายสมศักดิ์ ใจดี",
        contactNumber: "081-234-5678",
        workType: "emergency",
        status: "waiting",
        engineer: "นายสมชาย",
        urgency: "high",
        priority: "สูง",
        images: ["/api/placeholder/300/200", "/api/placeholder/300/200"],
        notes: "สายพานลำเลียงขาดจากการใช้งานหนัก ต้องเปลี่ยนสายพานใหม่ทั้งเส้น",
        repairDetails: {
            startDate: "08/07/2568",
            startTime: "09:15",
            endDate: "08/07/2568",
            endTime: "14:30",
            description: "เปลี่ยนสายพานลำเลียงและปรับตำแหน่งระบบขับเคลื่อน",
            cause: "สายพานขาดจากการใช้งานหนักและขาดการบำรุงรักษา",
            result: "success",
            usedParts: [
                {
                    name: "สายพานลำเลียง 10m",
                    code: "CB-001",
                    quantity: 1,
                    unit: "เส้น",
                    status: "ใช้แล้ว",
                },
                {
                    name: "น็อตยึดสายพาน",
                    code: "BT-002",
                    quantity: 8,
                    unit: "ตัว",
                    status: "ใช้แล้ว",
                },
            ],
        },
    },
];

import { mockOriginalRequest, mockUserRepairs } from "@/data/mockRepairData";
import { getRepairRequestById } from "@/data/masterData";

// ข้อมูล Mock สำหรับตารางแบบย่อ (Dashboard, AllRepairs)
export const mockSimpleRepairs: SimpleRepairData[] = mockCompleteRepairs.map(
    (repair) => ({
        id: repair.id,
        machine: repair.machine,
        problem: repair.problem,
        date: repair.requestDate,
        status: repair.status,
        engineer: repair.engineer,
        reporter: repair.reporter?.split(" (")[0] || repair.reporter, // ตัดส่วน (ฝ่าย) ออก
    })
);

// ฟังก์ชันช่วยในการดึงข้อมูล
export const getRepairById = (id: string): CompleteRepairData | undefined => {
    // ตรงตัวก่อน
    let found = mockCompleteRepairs.find((repair) => repair.id === id);
    if (found) return found;
    // รองรับกรณีรหัสรูปแบบ R... (เช่น R24070001) ให้แมปไปยัง P... ด้วยเลขชุดเดียวกัน
    if (id?.startsWith("R") && !id.startsWith("RR-")) {
        const converted = `P${id.slice(1)}`;
        found = mockCompleteRepairs.find((repair) => repair.id === converted);
        if (found) return found;
    }
    // รองรับกรณีรหัสรูปแบบ RR-... (เช่น RR-A-68090001)
    if (id?.startsWith("RR-")) {
        const req = getRepairRequestById(id);
        // ถ้ามีข้อมูลใบร้องใน master ใช้มันเป็นหลัก
        if (req) {
            const simple = mockUserRepairs.find((r) => r.id === id);
            const engineerName = simple
                ? Array.isArray(simple.engineer)
                    ? simple.engineer.join(", ")
                    : (simple.engineer as string | undefined)
                : undefined;
            return {
                id: req.id,
                machine: req.machine,
                location: req.location,
                section: req.section,
                problem: req.problem,
                requestDate: req.reportDate,
                requestTime: req.reportTime,
                reporter: req.reporter,
                contactNumber: req.contactNumber,
                workType: "maintenance",
                status:
                    req.status === "waiting"
                        ? "waiting"
                        : req.status === "new"
                        ? "new"
                        : "cancelled",
                engineer: engineerName,
                urgency: undefined,
                priority: req.priorityLabel,
                images: req.images,
                notes: req.additionalDetails,
                repairDetails: {
                    startDate: req.reportDate,
                    startTime: req.reportTime,
                    endDate: null,
                    endTime: undefined,
                    description: "",
                    cause: "",
                    result: null,
                    usedParts: [],
                },
            };
        }
        // ถ้าไม่พบใน master ให้ลองข้อมูลแบบย่อของฉัน
        const simple = mockUserRepairs.find((r) => r.id === id);
        if (simple) {
            const engineerName = Array.isArray(simple.engineer)
                ? simple.engineer.join(", ")
                : simple.engineer || undefined;
            return {
                id: simple.id,
                machine: simple.machine,
                location: mockOriginalRequest.location,
                section: mockOriginalRequest.section,
                problem: simple.problem,
                requestDate: simple.date,
                requestTime: mockOriginalRequest.reportedTime,
                reporter: mockOriginalRequest.reporter,
                contactNumber: mockOriginalRequest.contactNumber,
                workType: "maintenance",
                status: simple.status as CompleteRepairData["status"],
                engineer: engineerName,
                urgency: undefined,
                priority: mockOriginalRequest.priorityLabel,
                images: mockOriginalRequest.images,
                notes: mockOriginalRequest.additionalDetails,
                repairDetails: {
                    startDate: simple.date,
                    startTime: undefined,
                    endDate: null,
                    endTime: undefined,
                    description: "",
                    cause: "",
                    result: null,
                    usedParts: [],
                },
            };
        }
        // ถ้าไม่พบ ให้ fallback กลับไปที่ mockOriginalRequest (กรณีเป็น RR-A-68090001)
        if (mockOriginalRequest.documentNumber === id) {
            return {
                id: mockOriginalRequest.documentNumber,
                machine: mockOriginalRequest.machine,
                location: mockOriginalRequest.location,
                section: mockOriginalRequest.section,
                problem: mockOriginalRequest.problem,
                requestDate: mockOriginalRequest.reportedDate,
                requestTime: mockOriginalRequest.reportedTime,
                reporter: mockOriginalRequest.reporter,
                contactNumber: mockOriginalRequest.contactNumber,
                workType: "maintenance",
                status: "waiting",
                engineer: undefined,
                urgency: undefined,
                priority: mockOriginalRequest.priorityLabel,
                images: mockOriginalRequest.images,
                notes: mockOriginalRequest.additionalDetails,
                repairDetails: {
                    startDate: mockOriginalRequest.reportedDate,
                    startTime: mockOriginalRequest.reportedTime,
                    endDate: null,
                    endTime: undefined,
                    description: "",
                    cause: "",
                    result: null,
                    usedParts: [],
                },
            };
        }
    }
    return undefined;
};

export const getRepairsByStatus = (
    status: CompleteRepairData["status"]
): CompleteRepairData[] => {
    return mockCompleteRepairs.filter((repair) => repair.status === status);
};

export const getRepairsByEngineer = (
    engineer: string
): CompleteRepairData[] => {
    return mockCompleteRepairs.filter((repair) => repair.engineer === engineer);
};

export const getAllRepairs = (): CompleteRepairData[] => {
    return mockCompleteRepairs;
};

export const getSimpleRepairs = (): SimpleRepairData[] => {
    return mockSimpleRepairs;
};

// ฟังก์ชันสำหรับแปลงข้อมูลให้เข้ากับ RepairDetail format เดิม
export const convertToRepairDetailFormat = (repair: CompleteRepairData) => {
    return {
        id: repair.id,
        machine: repair.machine,
        machineCode: repair.machineCode || "",
        location: repair.location,
        problem: repair.problem,
        requestDate: `${repair.requestDate} ${repair.requestTime || ""}`.trim(),
        reporter: repair.reporter || "",
        workType: repair.workType || "maintenance",
        status: repair.status,
        engineer: repair.engineer || "",
        urgency: repair.urgency || "normal",
        images: repair.images || [],
        notes: repair.notes || "",
        repairDetails: repair.repairDetails || {
            startDate: "",
            endDate: null,
            description: "",
            cause: "",
            result: null,
            usedParts: [],
        },
    };
};
