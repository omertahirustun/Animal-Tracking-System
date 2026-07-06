import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";

export interface DeviceLocation {
  device_id: string;
  battery_mv: number | string;
  latitude: number;
  longitude: number;
  updated_at?: string;
  [key: string]: unknown;
}

interface UseLocationsResult {
  locations: DeviceLocation[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useLocations(pollIntervalMs = 5000): UseLocationsResult {
  const [locations, setLocations] = useState<DeviceLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLocations = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);

    try {
      const response = await axios.get<DeviceLocation[]>(
        API_ENDPOINTS.sonKonumlar,
        { timeout: 8000 },
      );

      if (Array.isArray(response.data)) {
        setLocations(response.data);
        setError(null);
      }
    } catch (err) {
      setError("Veri çekilemedi. Sunucu bağlantınızı kontrol edin.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchLocations();
    const interval = setInterval(() => fetchLocations(false), pollIntervalMs);
    return () => clearInterval(interval);
  }, [fetchLocations, pollIntervalMs]);

  const refetch = useCallback(() => fetchLocations(true), [fetchLocations]);

  return { locations, isLoading, isRefreshing, error, refetch };
}
