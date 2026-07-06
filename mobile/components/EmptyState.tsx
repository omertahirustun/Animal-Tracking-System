import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  message: string;
}

export function EmptyState({ icon, message }: EmptyStateProps) {
  return (
    <View className="items-center justify-center mt-10">
      <Ionicons name={icon} size={48} color="#52525b" />
      <Text className="text-zinc-500 mt-4 text-center">{message}</Text>
    </View>
  );
}
