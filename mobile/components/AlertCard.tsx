import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AlertCardProps {
  lowBatteryCount: number;
}

export function AlertCard({ lowBatteryCount }: AlertCardProps) {
  if (lowBatteryCount > 0) {
    return (
      <View className="bg-zinc-800 rounded-2xl p-4 flex-row items-center border border-zinc-700 mb-8">
        <View className="w-10 h-10 rounded-xl bg-amber-500/20 items-center justify-center mr-4">
          <Ionicons name="battery-dead" size={20} color="#fbbf24" />
        </View>
        <View className="flex-1">
          <Text className="text-white font-bold text-sm">
            Düşük Pil Uyarısı
          </Text>
          <Text className="text-zinc-400 text-xs mt-0.5">
            {lowBatteryCount} cihaz kritik seviyede
          </Text>
        </View>
        <Text className="text-zinc-500 text-xs">Şimdi</Text>
      </View>
    );
  }

  return (
    <View className="bg-zinc-800 rounded-2xl p-4 flex-row items-center justify-center border border-zinc-700 mb-8 opacity-70">
      <Ionicons
        name="checkmark-done-circle"
        size={20}
        color="#10b981"
        style={{ marginRight: 8 }}
      />
      <Text className="text-zinc-400 text-sm">
        Tüm cihazlar normal durumda.
      </Text>
    </View>
  );
}
