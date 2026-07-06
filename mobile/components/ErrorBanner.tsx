import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ErrorBannerProps {
  message: string;
}

export function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <View className="bg-red-500/10 border border-red-500/30 rounded-2xl p-3 flex-row items-center mb-4">
      <Ionicons name="alert-circle" size={18} color="#ef4444" />
      <Text className="text-red-400 text-xs ml-2 flex-1">{message}</Text>
    </View>
  );
}
