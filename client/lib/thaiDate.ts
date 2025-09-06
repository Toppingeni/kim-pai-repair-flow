// Utilities for handling Thai Buddhist Era dates in HTML datetime-local inputs

// Convert CE datetime input value (YYYY-MM-DDTHH:mm) to BE by adding 543 years
export function toBEDatetimeInput(ce: string | undefined | null): string {
  if (!ce) return "";
  // Expect format YYYY-MM-DDTHH:mm
  const s = ce.slice(0, 16);
  const [date, time] = s.split("T");
  if (!date) return s;
  const [y, m, d] = date.split("-");
  const year = parseInt(y, 10);
  if (!isFinite(year)) return s;
  const beYear = (year + 543).toString().padStart(4, "0");
  return `${beYear}-${m}-${d}${time ? `T${time}` : ""}`;
}

// Convert BE datetime input value (YYYY-MM-DDTHH:mm with BE year) to CE by subtracting 543 years
export function toCEDatetimeInput(be: string | undefined | null): string {
  if (!be) return "";
  const s = be.slice(0, 16);
  const [date, time] = s.split("T");
  if (!date) return s;
  const [y, m, d] = date.split("-");
  const year = parseInt(y, 10);
  if (!isFinite(year)) return s;
  // Heuristic: treat year >= 2400 as BE and convert, else pass through
  const ceYear = (year >= 2400 ? year - 543 : year).toString().padStart(4, "0");
  return `${ceYear}-${m}-${d}${time ? `T${time}` : ""}`;
}

export function nowBEDatetimeInput(): string {
  const nowCE = new Date().toISOString().slice(0, 16);
  return toBEDatetimeInput(nowCE);
}

