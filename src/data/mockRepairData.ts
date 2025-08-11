export const mockOriginalRequest = {
  id: "M-001",
  machine: "เครื่องอัดฟิล์ม Extruder Line 1",
  machineId: "m1", // เพิ่ม machineId ที่ตรงกับ masterData
  problem: "เสียงดังผิดปกติ จากมอเตอร์หลัก เมื่อเครื่องทำงานนานกว่า 2 ชั่วโมง",
  reporter: "สมศรี (ฝ่ายผลิต)",
  reportDate: "07/07/2568 09:30",
  images: ["image1.jpg", "image2.jpg"],
};

export const engineers = [
  { id: "eng1", name: "นายสมชาย" },
  { id: "eng2", name: "นางสาวอร" },
  { id: "eng3", name: "นายวิชัย" },
];

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
      { name: "ซีลยาง", code: "SEAL-001", quantity: 1 }
    ],
    status: "ปิดงานแล้ว",
    notes: "ทดสอบการทำงานปกติแล้ว เสียงดังลดลง"
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
      { name: "น้ำมันเกียร์", code: "OIL-002", quantity: 2 }
    ],
    status: "ปิดงานแล้ว",
    notes: "เสียงดังหายไป แต่ต้องติดตาม 1 สัปดาห์"
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
      { name: "สายพาน V-Belt", code: "BELT-V50", quantity: 1 }
    ],
    status: "ปิดงานแล้ว",
    notes: "เปลี่ยนแนวทางการซ่อม มุ่งเน้นที่ระบบขับเคลื่อน"
  }
];