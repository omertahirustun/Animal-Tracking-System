import { useMemo } from "react";
import type { DeviceLocation } from "./useLocations";
import { calculateBatteryPercentage, getBatteryStatus } from "@/utils/battery";

export interface DeviceStats {
  total: number;
  healthy: number;
  low: number;
  inactive: number;
  safePercentage: string;
}

export function useDeviceStats(locations: DeviceLocation[]): DeviceStats {
  return useMemo(() => {
    const total = locations.length;
    let healthy = 0;
    let low = 0;

    for (const loc of locations) {
      const percentage = calculateBatteryPercentage(loc.battery_mv);
      const status = getBatteryStatus(percentage);
      if (status === "healthy") healthy++;
      else if (status === "low") low++;
    }

    const inactive = total - healthy - low;
    const safePercentage =
      total > 0 ? ((healthy / total) * 100).toFixed(1) : "0.0";

    return { total, healthy, low, inactive, safePercentage };
  }, [locations]);
}
