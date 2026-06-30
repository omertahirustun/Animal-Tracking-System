import { View, Text, TouchableOpacity } from "react-native";

export default function HomeScreen({ navigation }: any) {
  return (
    <View className="flex-1 items-center justify-center bg-zinc-900 px-4">
      <Text className="text-emerald-400 text-4xl font-extrabold mb-2">
        Şua Tarım
      </Text>
      <Text className="text-zinc-400 text-lg mb-10 text-center">
        Canlı Hayvan Takip Sistemi
      </Text>

      <TouchableOpacity
        className="bg-emerald-500 active:bg-emerald-600 px-8 py-4 rounded-2xl shadow-lg w-full"
        onPress={() => navigation.navigate("Map")}
      >
        <Text className="text-white text-center font-bold text-xl">
          Sisteme Giriş ve Harita
        </Text>
      </TouchableOpacity>
    </View>
  );
}
