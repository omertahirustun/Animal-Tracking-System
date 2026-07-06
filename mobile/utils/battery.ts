export const BATTERY_MAX_MV = 3000;
export const BATTERY_MIN_MV = 2400;
export const HEALTHY_THRESHOLD_PERCENT = 50;

export type BatteryStatus = "healthy" | "low" | "inactive";

export function calculateBatteryPercentage(
  mvValue: number | string | null | undefined,
): number {
  const mv = typeof mvValue === "string" ? parseInt(mvValue, 10) : mvValue;

  if (mv == null || isNaN(mv)) return 0;
  if (mv >= BATTERY_MAX_MV) return 100;
  if (mv <= BATTERY_MIN_MV) return 0;

  return Math.round(
    ((mv - BATTERY_MIN_MV) / (BATTERY_MAX_MV - BATTERY_MIN_MV)) * 100,
  );
}

export function getBatteryStatus(percentage: number): BatteryStatus {
  if (percentage >= HEALTHY_THRESHOLD_PERCENT) return "healthy";
  if (percentage > 0) return "low";
  return "inactive";
}
