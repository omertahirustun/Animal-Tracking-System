import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Ara...",
}: SearchBarProps) {
  return (
    <View className="flex-row items-center bg-zinc-800 rounded-2xl px-4 py-3 mb-6 border border-zinc-700">
      <Ionicons name="search" size={20} color="#a1a1aa" />
      <TextInput
        className="flex-1 ml-3 text-white text-base"
        placeholder={placeholder}
        placeholderTextColor="#a1a1aa"
        value={value}
        onChangeText={onChangeText}
        selectionColor="#34d399"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText("")}>
          <Ionicons name="close-circle" size={20} color="#a1a1aa" />
        </TouchableOpacity>
      )}
    </View>
  );
}
