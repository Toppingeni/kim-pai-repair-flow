export const mockOriginalRequest = {
    id: "R24070001", // ใช้รูปแบบเดียวกับหน้าสร้างใบแจ้งซ่อมใหม่ (R{YY}{MM}{NNNN})
    documentNumber: "R24070001",
    machine: "เครื่องอัดฟิล์ม Extruder Line 1",
    machineId: "m1", // เพิ่ม machineId ที่ตรงกับ masterData
    location: "โรงงาน A - ชั้น 2", // เพิ่มสถานที่ตั้งให้ตรงกับ NewRepairForm
    section: "หน่วยหลอมพลาสติก (Extruder)", // เพิ่มส่วนประกอบ
    problem: "มอเตอร์ทำงานผิดปกติ เสียงดังผิดปกติ และมีการสั่นสะเทือน",
    reporter: "ช่างเทคนิค สมชาย",
    reportDate: "15/07/2567",
    reportTime: "14:30",
    reportedDate: "15/07/2567", // เพิ่มรูปแบบวันที่มาตรฐาน
    reportedTime: "14:30", // เพิ่มรูปแบบเวลามาตรฐาน
    priority: "level2", // ใช้ id จาก masterData
    priorityLabel: "ระดับ 2 วิ่งอยู่แต่เสี่ยงต่อคุณภาพ",
    contactNumber: "081-234-5678", // เพิ่มเบอร์ติดต่อ
    additionalDetails:
        "พบปัญหาเมื่อเริ่มเดินเครื่องในช่วงเช้า อาจต้องหยุดเครื่องเพื่อตรวจสอบ", // เพิ่มหมายเหตุ
    images: ["/src/data/imgs/1.jpeg"],
};

export const engineers = [
    { id: "eng1", name: "นายสมชาย" },
    { id: "eng2", name: "นางสาวอร" },
    { id: "eng3", name: "นายวิชัย" },
];

// ข้อมูล mock สำหรับการอนุมัติใบสั่งงานซ่อม
export const mockWorkOrderApproval = {
    id: "WO24070001",
    repairRequestId: "R24070001",
    workType: "wt1", // อ้างอิงจาก masterData WorkType
    workTypeLabel: "BM (Break Down Maintenance)",
    plannedStartDate: "16/07/2567",
    plannedStartTime: "08:00",
    plannedEndDate: "16/07/2567",
    plannedEndTime: "16:00",
    plannedDurationHours: 8,
    plannedDurationMinutes: 0,
    approvedBy: "ผู้จัดการฝ่ายวิศวกรรม",
    approvedDate: "15/07/2567",
    approvedTime: "16:00",
    estimatedCost: 15000,
    priority: "level2",
    assignedEngineers: ["eng1", "eng2"],
    requiredParts: [
        { partId: "BRG-001", quantity: 2, estimatedCost: 5000 },
        { partId: "SEAL-001", quantity: 1, estimatedCost: 1500 }
    ],
    notes: "ต้องหยุดเครื่องจักรในช่วงเวลาดังกล่าว และเตรียมอะไหล่ล่วงหน้า"
};

export const mockRepairHistory = [
    {
        revision: 1,
        date: "03/07/2568 08:30 - 12:00",
        engineer: "นายสมชาย",
        method: "เปลี่ยนแบริ่งมอเตอร์หลัก และปรับแรงดันลมเข้าระบบ",
        cause: "แบริ่งมอเตอร์สึกหรอเนื่องจากใช้งานมานาน",
        result: "success",
        parts: [
            { name: "แบริ่ง SKF 6308", code: "BRG-001", quantity: 2 },
            { name: "ซีลยาง", code: "SEAL-001", quantity: 1 },
        ],
        status: "ปิดงานแล้ว",
        notes: "ทดสอบการทำงานปกติแล้ว เสียงดังลดลง",
    },
    {
        revision: 2,
        date: "20/07/2568 13:00 - 15:30",
        engineer: "นางสาวอร",
        method: "เปลี่ยนคัปปลิ้งและปรับตำแหน่งเพลา เนื่องจากเสียงดังกลับมาใหม่",
        cause: "คัปปลิ้งเก่าไม่แน่น ทำให้เกิดการสั่นสะเทือน",
        result: "success",
        parts: [
            { name: "คัปปลิ้ง รุ่น C-150", code: "CUP-150", quantity: 1 },
            { name: "น้ำมันเกียร์", code: "OIL-002", quantity: 2 },
        ],
        status: "ปิดงานแล้ว",
        notes: "เสียงดังหายไป แต่ต้องติดตาม 1 สัปดาห์",
    },
    {
        revision: 3,
        date: "02/08/2568 09:15 - 11:45",
        engineer: "นายวิชัย",
        method: "ปรับความตึงสายพานและเปลี่ยนพูลเล่ย์ เพราะเสียงดังกลับมาอีก",
        cause: "พูลเล่ย์เก่าไม่สมดุล สายพานหย่อน",
        result: "success",
        parts: [
            { name: "พูลเล่ย์ 8 นิ้ว", code: "PUL-008", quantity: 1 },
            { name: "สายพาน V-Belt", code: "BELT-V50", quantity: 1 },
        ],
        status: "ปิดงานแล้ว",
        notes: "เปลี่ยนแนวทางการซ่อม มุ่งเน้นที่ระบบขับเคลื่อน",
    },
];
