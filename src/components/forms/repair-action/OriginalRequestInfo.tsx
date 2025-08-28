import { RepairRequestInfo } from "@/components/shared/RepairRequestInfo";

interface OriginalRequest {
  id: string;
  machine: string;
  problem: string;
  reporter: string;
  reportDate: string;
  images: string[];
  // เพิ่มฟิลด์เพื่อรองรับข้อมูลเพิ่มเติม
  documentNumber?: string;
  location?: string;
  section?: string;
  contactNumber?: string;
  priority?: string;
  description?: string;
  reportedDate?: string;
  reportedTime?: string;
}

interface OriginalRequestInfoProps {
  request: OriginalRequest;
}

export function OriginalRequestInfo({ request }: OriginalRequestInfoProps) {
  // แปลงข้อมูลให้เข้ากับ RepairRequestInfo component
  const repairRequestData = {
    id: request.id,
    documentNumber: request.documentNumber || request.id,
    location: request.location,
    machine: request.machine,
    section: request.section,
    reportedDate: request.reportedDate || request.reportDate?.split(' ')[0],
    reportedTime: request.reportedTime || request.reportDate?.split(' ')[1],
    reporter: request.reporter,
    contactNumber: request.contactNumber,
    priority: request.priority,
    problem: request.problem,
    description: request.description,
    images: request.images,
    date: request.reportDate, // fallback
  };

  return (
    <RepairRequestInfo 
      request={repairRequestData}
      title="ข้อมูลใบแจ้งซ่อม"
      defaultExpanded={false}
    />
  );
}