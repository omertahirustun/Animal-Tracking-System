import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface StatCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  value: number;
  label: string;
}

export function StatCard({ icon, iconColor, value, label }: StatCardProps) {
  return (
    <View className="w-[48%] bg-zinc-800 rounded-2xl p-4 mb-4 border border-zinc-700">
      <Ionicons name={icon} size={24} color={iconColor} />
      <Text className="text-white text-2xl font-bold mt-2">{value}</Text>
      <Text className="text-zinc-400 text-xs font-medium mt-1">{label}</Text>
    </View>
  );
}
