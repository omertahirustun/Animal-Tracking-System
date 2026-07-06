import { useCallback, useEffect, useRef } from "react";
import MapView from "react-native-maps";
import type { DeviceLocation } from "./useLocations";

export function useFocusOnHerd(
  locations: DeviceLocation[],
  isMapReady: boolean,
) {
  const mapRef = useRef<MapView>(null);
  const hasAutoFocused = useRef(false);

  const focusOnHerd = useCallback(() => {
    if (!mapRef.current || !isMapReady || locations.length === 0) return;

    const validCoordinates = locations
      .map((loc) => ({
        latitude: parseFloat(String(loc.latitude)),
        longitude: parseFloat(String(loc.longitude)),
      }))
      .filter((coord) => !isNaN(coord.latitude) && !isNaN(coord.longitude));

    if (validCoordinates.length === 0) return;

    mapRef.current.fitToCoordinates(validCoordinates, {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: true,
    });
  }, [locations, isMapReady]);

  useEffect(() => {
    if (locations.length > 0 && isMapReady && !hasAutoFocused.current) {
      focusOnHerd();
      hasAutoFocused.current = true;
    }
  }, [locations, isMapReady, focusOnHerd]);

  return { mapRef, focusOnHerd };
}
