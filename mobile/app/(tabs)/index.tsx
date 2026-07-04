import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-zinc-900">
      <View className="flex-1 px-6 justify-center items-center">
        {/* Arka Plan Dekorasyonu (Hafif Şeffaf İkon) */}
        <View style={{ position: "absolute", top: "15%", opacity: 0.05 }}>
          <Ionicons name="radio" size={250} color="#34d399" />
        </View>

        {/* Merkez Logo Alanı */}
        <View className="w-32 h-32 rounded-full border-4 border-emerald-500 items-center justify-center bg-zinc-800 mb-8 shadow-2xl">
          <Ionicons name="location" size={56} color="#34d399" />
        </View>

        {/* Başlık ve Alt Başlık */}
        <Text className="text-emerald-400 text-4xl font-black tracking-widest text-center mb-2">
          ŞUA TARIM
        </Text>
        <Text className="text-zinc-400 text-base font-medium mb-12 text-center px-4">
          Akıllı Sürü Takip ve Yönetim Merkezi
        </Text>

        {/* Sistem Durumu Kartları */}
        <View className="flex-row w-full justify-between gap-4 mb-12">
          <View className="flex-1 bg-zinc-800 p-4 rounded-2xl border border-zinc-700 items-center flex-row">
            <Ionicons name="pulse" size={24} color="#34d399" />
            <View className="ml-3">
              <Text className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider">
                Sistem
              </Text>
              <Text className="text-white text-sm font-bold mt-0.5">
                Çevrimiçi
              </Text>
            </View>
          </View>

          <View className="flex-1 bg-zinc-800 p-4 rounded-2xl border border-zinc-700 items-center flex-row">
            <Ionicons name="hardware-chip" size={24} color="#34d399" />
            <View className="ml-3">
              <Text className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider">
                Ağ Tipi
              </Text>
              <Text className="text-white text-sm font-bold mt-0.5">
                LoRa Aktif
              </Text>
            </View>
          </View>
        </View>

        {/* Ana Giriş Butonu */}
        <TouchableOpacity
          className="bg-emerald-500 active:bg-emerald-600 px-6 py-5 rounded-2xl shadow-lg w-full flex-row justify-center items-center"
          onPress={() => router.push("/map")}
        >
          <Text className="text-white text-center font-bold text-lg mr-3 tracking-wide">
            Kontrol Paneline Geç
          </Text>
          <Ionicons name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
