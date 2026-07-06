import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CriticalBatteryCardProps {
  hasCriticalBattery: boolean;
}

export function CriticalBatteryCard({
  hasCriticalBattery,
}: CriticalBatteryCardProps) {
  return (
    <View className="bg-zinc-800 p-4 rounded-2xl flex-row justify-between items-center border border-zinc-700">
      <View>
        <Text className="text-zinc-400 text-xs uppercase font-bold">
          Kritik Batarya
        </Text>
        <Text className="text-white text-lg font-bold">
          {hasCriticalBattery ? "Uyarı Var" : "Uyarı Yok"}
        </Text>
      </View>
      <Ionicons
        name={hasCriticalBattery ? "battery-dead" : "battery-full"}
        size={24}
        color={hasCriticalBattery ? "#ef4444" : "#34d399"}
      />
    </View>
  );
}
