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
    status: 'new' | 'pending' | 'progress' | 'waiting' | 'completed';
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
    status: 'new' | 'pending' | 'progress' | 'waiting' | 'completed';
    engineer?: string;
    reporter?: string;
}

// ข้อมูล Mock สำหรับการซ่อมแบบสมบูรณ์
export const mockCompleteRepairs: CompleteRepairData[] = [
    {
        id: "R24070001",
        machine: "Extruder A",
        machineCode: "EXT-001",
        location: "อาคาร 1, Line 1",
        section: "ฝ่ายผลิต A",
        problem: "เสียงดังผิดปกติจากมอเตอร์หลัก เมื่อเครื่องทำงานที่ความเร็วสูง",
        requestDate: "07/07/2568",
        requestTime: "14:30",
        reporter: "สมศรี (ฝ่ายผลิต)",
        contactNumber: "081-234-5678",
        workType: "maintenance",
        status: "progress",
        engineer: "นายสมชาย",
        urgency: "normal",
        priority: "ปานกลาง",
        images: ["machine-sound.jpg", "motor-close.jpg"],
        notes: "เสียงดังมากขึ้นเรื่อยๆ ต้องการตรวจสอบด่วน",
        repairDetails: {
            startDate: "07/07/2568",
            startTime: "15:00",
            endDate: "08/07/2568",
            endTime: "16:30",
            description: "เปลี่ยนแบริ่งมอเตอร์หลักและตรวจสอบระบบขับเคลื่อน",
            cause: "แบริ่งมอเตอร์สึกหรอเนื่องจากใช้งานมานาน",
            result: "success",
            usedParts: [
                {
                    name: "แบริ่ง SKF 6308",
                    code: "BRG-001",
                    quantity: 2,
                    unit: "ตัว",
                    status: "ใช้แล้ว",
                },
                {
                    name: "น้ำมันเกียร์",
                    code: "OIL-001",
                    quantity: 1,
                    unit: "ลิตร",
                    status: "ใช้แล้ว",
                },
            ],
        },
    },
    {
        id: "R24070002",
        machine: "Packing M/C",
        machineCode: "PACK-001",
        location: "อาคาร 1, Line 2",
        section: "ฝ่ายบรรจุ",
        problem: "แพ็คไม่แน่น สินค้าหลุดออกจากบรรจุภัณฑ์",
        requestDate: "05/07/2568",
        requestTime: "09:15",
        reporter: "สมศรี (ฝ่ายผลิต)",
        contactNumber: "081-234-5678",
        workType: "emergency",
        status: "waiting",
        engineer: "นางสาวอร",
        urgency: "high",
        priority: "สูง",
        images: ["packing-loose.jpg"],
        notes: "ส่งผลกระทบต่อคุณภาพสินค้า",
        repairDetails: {
            startDate: "05/07/2568",
            startTime: "10:00",
            endDate: "06/07/2568",
            endTime: "16:30",
            description: "ปรับแรงดันระบบนิวเมติก และเปลี่ยนซีลยาง",
            cause: "ซีลยางชำรุด ทำให้แรงดันลด",
            result: "success",
            usedParts: [
                {
                    name: "ซีลยาง",
                    code: "SEAL-002",
                    quantity: 4,
                    unit: "ตัว",
                    status: "ใช้แล้ว",
                },
            ],
        },
    },
    {
        id: "R24070003",
        machine: "Conveyor Belt",
        machineCode: "CONV-001",
        location: "อาคาร 2, Line 1",
        section: "ฝ่ายขนส่ง",
        problem: "สายพานลื่น ทำให้ขนส่งสินค้าไม่ได้",
        requestDate: "01/07/2568",
        requestTime: "08:00",
        reporter: "สมชาย (ฝ่ายผลิต)",
        contactNumber: "082-345-6789",
        workType: "maintenance",
        status: "completed",
        engineer: "นายวิชัย",
        urgency: "high",
        priority: "สูง",
        images: ["conveyor-belt.jpg"],
        notes: "ส่งผลกระทบต่อการผลิต",
        repairDetails: {
            startDate: "01/07/2568",
            startTime: "09:00",
            endDate: "01/07/2568",
            endTime: "17:00",
            description: "ตรวจสอบสายพานและระบบขับเคลื่อน เปลี่ยนสายพานใหม่",
            cause: "สายพานยืดเนื่องจากใช้งานมานาน",
            result: "success",
            usedParts: [
                {
                    name: "สายพาน",
                    code: "BELT-001",
                    quantity: 1,
                    unit: "เส้น",
                    status: "ใช้แล้ว",
                },
            ],
        },
    },
    {
        id: "R24070004",
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
        id: "R24070005",
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
        id: "R24070006",
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
        id: "R24070007",
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
        id: "R24070008",
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

// ข้อมูล Mock สำหรับตารางแบบย่อ (Dashboard, AllRepairs)
export const mockSimpleRepairs: SimpleRepairData[] = mockCompleteRepairs.map(repair => ({
    id: repair.id,
    machine: repair.machine,
    problem: repair.problem,
    date: repair.requestDate,
    status: repair.status,
    engineer: repair.engineer,
    reporter: repair.reporter?.split(' (')[0] || repair.reporter, // ตัดส่วน (ฝ่าย) ออก
}));

// ฟังก์ชันช่วยในการดึงข้อมูล
export const getRepairById = (id: string): CompleteRepairData | undefined => {
    return mockCompleteRepairs.find(repair => repair.id === id);
};

export const getRepairsByStatus = (status: CompleteRepairData['status']): CompleteRepairData[] => {
    return mockCompleteRepairs.filter(repair => repair.status === status);
};

export const getRepairsByEngineer = (engineer: string): CompleteRepairData[] => {
    return mockCompleteRepairs.filter(repair => repair.engineer === engineer);
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
        machineCode: repair.machineCode || '',
        location: repair.location,
        problem: repair.problem,
        requestDate: `${repair.requestDate} ${repair.requestTime || ''}`.trim(),
        reporter: repair.reporter || '',
        workType: repair.workType || 'maintenance',
        status: repair.status,
        engineer: repair.engineer || '',
        urgency: repair.urgency || 'normal',
        images: repair.images || [],
        notes: repair.notes || '',
        repairDetails: repair.repairDetails || {
            startDate: '',
            endDate: null,
            description: '',
            cause: '',
            result: null,
            usedParts: [],
        },
    };
};