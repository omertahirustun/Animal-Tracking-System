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

const DEVICE_LIST_COLORS = {
  full: "#34d399",
  half: "#fbbf24",
  critical: "#ef4444",
  unknown: "#52525b",
} as const;

export interface BatteryDisplayInfo {
  icon: "battery-full" | "battery-half" | "battery-dead";
  color: string;
  display: string;
}

export function getDeviceBatteryInfo(
  mvValue: number | string | null | undefined,
): BatteryDisplayInfo {
  const mv = typeof mvValue === "string" ? parseInt(mvValue, 10) : mvValue;

  if (mv == null || isNaN(mv)) {
    return {
      icon: "battery-dead",
      color: DEVICE_LIST_COLORS.unknown,
      display: "Veri Yok",
    };
  }

  const percent = calculateBatteryPercentage(mv);

  if (percent >= 60) {
    return {
      icon: "battery-full",
      color: DEVICE_LIST_COLORS.full,
      display: `%${percent}`,
    };
  }
  if (percent >= 25) {
    return {
      icon: "battery-half",
      color: DEVICE_LIST_COLORS.half,
      display: `%${percent}`,
    };
  }
  return {
    icon: "battery-dead",
    color: DEVICE_LIST_COLORS.critical,
    display: `%${percent}`,
  };
}
