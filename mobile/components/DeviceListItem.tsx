import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getDeviceBatteryInfo } from "@/utils/battery";
import type { DeviceLocation } from "@/hooks/useLocations";

interface DeviceListItemProps {
  device: DeviceLocation;
  onPress?: () => void;
}

function formatCoordinate(value: unknown): string {
  const parsed = parseFloat(String(value));
  return isNaN(parsed) ? "—" : parsed.toFixed(4);
}

export function DeviceListItem({ device, onPress }: DeviceListItemProps) {
  const battery = getDeviceBatteryInfo(device.battery_mv);

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-zinc-800 rounded-2xl p-4 mb-3 flex-row items-center border border-zinc-700 active:bg-zinc-700"
    >
      <View className="w-12 h-12 rounded-full bg-zinc-900 items-center justify-center border border-zinc-700">
        <Ionicons name="radio" size={20} color="#34d399" />
      </View>

      <View className="flex-1 ml-4">
        <Text className="text-white text-lg font-bold tracking-wider">
          Küpe No: {device.device_id}
        </Text>
        <Text className="text-zinc-400 text-xs mt-1">
          Enlem: {formatCoordinate(device.latitude)} | Boylam:{" "}
          {formatCoordinate(device.longitude)}
        </Text>
      </View>

      <View className="items-center justify-center w-20">
        <Ionicons name={battery.icon} size={24} color={battery.color} />
        <Text
          style={{ color: battery.color }}
          className="text-sm font-bold mt-1 text-center"
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {battery.display}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
