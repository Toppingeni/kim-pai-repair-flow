import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface RepairItem {
  id: string;
  machine: string;
  problem: string;
  date: string;
  status: "new" | "progress" | "waiting" | "completed" | "pending";
  engineer?: string;
}

export function useRepairActions() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const acceptJob = async (repairId: string, engineerName: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "รับงานสำเร็จ",
        description: `รับงานซ่อม ${repairId} เรียบร้อยแล้ว`,
      });
      
      // Update repair status to 'progress'
      return { success: true, newStatus: "progress" };
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถรับงานได้ โปรดลองใหม่อีกครั้ง",
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const completeRepair = async (repairId: string, repairData: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "บันทึกการซ่อมสำเร็จ",
        description: `บันทึกการซ่อม ${repairId} เรียบร้อยแล้ว`,
      });
      
      // Update repair status based on result
      const newStatus = repairData.result === "success" ? "waiting" : 
                       repairData.result === "failed" ? "new" :
                       repairData.result === "pending" ? "pending" : "progress";
      
      return { success: true, newStatus };
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด", 
        description: "ไม่สามารถบันทึกการซ่อมได้ โปรดลองใหม่อีกครั้ง",
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const confirmCompletion = async (repairId: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "ยืนยันการปิดงานสำเร็จ",
        description: `ยืนยันการปิดงาน ${repairId} เรียบร้อยแล้ว`,
      });
      
      return { success: true, newStatus: "completed" };
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถยืนยันการปิดงานได้ โปรดลองใหม่อีกครั้ง", 
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const closeJob = async (repairId: string, reason?: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "ปิดงานสำเร็จ",
        description: `ปิดงาน ${repairId} เรียบร้อยแล้ว`,
      });
      
      return { success: true, newStatus: "completed" };
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถปิดงานได้ โปรดลองใหม่อีกครั้ง",
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const retryRepair = async (repairId: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "สร้างใบแจ้งซ่อมใหม่สำเร็จ",
        description: `สร้างใบแจ้งซ่อมใหม่สำหรับ ${repairId} เรียบร้อยแล้ว`,
      });
      
      return { success: true, newStatus: "new" };
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถสร้างใบแจ้งซ่อมใหม่ได้ โปรดลองใหม่อีกครั้ง",
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    acceptJob,
    completeRepair,
    confirmCompletion,
    closeJob,
    retryRepair,
  };
}