import { mockCompleteRepairs } from "@/data/allRepairsMockData";

// Utilities
const parseThaiDate = (dateStr?: string | null, timeStr?: string | null): Date | null => {
  if (!dateStr) return null;
  try {
    const [d, m, by] = dateStr.split("/").map((v) => parseInt(v, 10));
    if (!d || !m || !by) return null;
    const y = by - 543; // ไทย พ.ศ. -> ค.ศ.
    let hh = 0;
    let mm = 0;
    if (timeStr && /\d{1,2}:\d{2}/.test(timeStr)) {
      const [h, min] = timeStr.split(":").map((v) => parseInt(v, 10));
      hh = h || 0;
      mm = min || 0;
    }
    return new Date(y, m - 1, d, hh, mm, 0, 0);
  } catch {
    return null;
  }
};

const hoursDiff = (start: Date | null, end: Date | null): number | null => {
  if (!start || !end) return null;
  const ms = end.getTime() - start.getTime();
  if (isNaN(ms) || ms < 0) return null;
  return ms / (1000 * 60 * 60);
};

export interface ReportsMachineBreakdownRow {
  machine: string;
  repairs: number;
  downtimeHours: number; // total
  cost: number; // estimated from parts count
}

export interface ReportsRepairRow {
  id: string;
  machine: string;
  problem: string;
  reportDate: string;
  status: "new" | "pending" | "progress" | "waiting" | "completed";
  reporter: string;
  engineer: string;
  startDate: string;
  endDate: string;
  durationHours: number | null; // numeric hours
  workMethod: string;
  rootCause: string;
  prevention: string;
  cost: string; // textual, leave '-' if N/A
}

// Aggregate repairs by machine
export const getReportsMachineBreakdown = (): ReportsMachineBreakdownRow[] => {
  const map = new Map<string, ReportsMachineBreakdownRow>();
  for (const r of mockCompleteRepairs) {
    const key = r.machine;
    const start = parseThaiDate(r.repairDetails?.startDate, r.repairDetails?.startTime);
    const end = parseThaiDate(r.repairDetails?.endDate || undefined, r.repairDetails?.endTime || undefined);
    const hrs = hoursDiff(start, end) || 0;
    const estCost = (r.repairDetails?.usedParts?.reduce((sum, p) => sum + (p.quantity || 0), 0) || 0) * 1500; // ประมาณจากจำนวนอะไหล่
    const prev = map.get(key) || { machine: key, repairs: 0, downtimeHours: 0, cost: 0 };
    prev.repairs += 1;
    prev.downtimeHours += hrs;
    prev.cost += estCost;
    map.set(key, prev);
  }
  // sort by repairs desc
  return Array.from(map.values()).sort((a, b) => b.repairs - a.repairs);
};

// Flatten repairs to report table rows
export const getReportsAllRepairsRows = (): ReportsRepairRow[] => {
  return mockCompleteRepairs.map((r) => {
    const start = parseThaiDate(r.repairDetails?.startDate, r.repairDetails?.startTime);
    const end = parseThaiDate(r.repairDetails?.endDate || undefined, r.repairDetails?.endTime || undefined);
    const hrs = hoursDiff(start, end);
    const duration = hrs !== null ? Number(hrs.toFixed(1)) : null;
    const workMethod = r.repairDetails?.description || "-";
    const rootCause = r.repairDetails?.cause || "-";
    const prevention = r.notes || "-";
    return {
      id: r.id,
      machine: r.machine,
      problem: r.problem,
      reportDate: r.requestDate,
      status: r.status,
      reporter: r.reporter,
      engineer: r.engineer || "-",
      startDate: r.repairDetails?.startDate && r.repairDetails?.startTime ? `${r.repairDetails.startDate} ${r.repairDetails.startTime}` : "-",
      endDate: r.repairDetails?.endDate && r.repairDetails?.endTime ? `${r.repairDetails.endDate} ${r.repairDetails.endTime}` : "-",
      durationHours: duration,
      workMethod,
      rootCause,
      prevention,
      cost: "-",
    };
  });
};

