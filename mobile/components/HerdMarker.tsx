import { View } from "react-native";
import { Marker } from "react-native-maps";
import type { DeviceLocation } from "@/hooks/useLocations";

interface HerdMarkerProps {
  device: DeviceLocation;
}

export function HerdMarker({ device }: HerdMarkerProps) {
  const latitude = parseFloat(String(device.latitude));
  const longitude = parseFloat(String(device.longitude));

  if (isNaN(latitude) || isNaN(longitude)) return null;

  return (
    <Marker
      coordinate={{ latitude, longitude }}
      anchor={{ x: 0.5, y: 0.5 }}
      title={`Küpe No: ${device.device_id}`}
      description={`Pil: ${device.battery_mv} mV`}
    >
      <View
        style={{
          width: 18,
          height: 18,
          borderRadius: 9,
          backgroundColor: "#34d399",
          borderWidth: 3,
          borderColor: "#18181b",
        }}
      />
    </Marker>
  );
}
