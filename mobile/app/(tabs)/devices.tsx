import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

export default function DevicesScreen() {
  const [devices, setDevices] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchDevices = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.243:3000/api/son-konumlar",
      );
      if (Array.isArray(response.data)) {
        setDevices(response.data);
      }
    } catch (error) {
      console.log("Veri çekilemedi.");
    }
  };

  useEffect(() => {
    fetchDevices();
    const interval = setInterval(fetchDevices, 10000);
    return () => clearInterval(interval);
  }, []);
  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchDevices();
    setIsRefreshing(false);
  };

  const filteredDevices = devices.filter((device) =>
    device.device_id.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  // Yüzdelik dilimi hesaplayan yeni fonksiyon
  const calculateBatteryPercentage = (mvValue: any) => {
    const mv = parseInt(mvValue, 10);
    if (isNaN(mv)) return null;

    const MAX_MV = 3000; // 100%
    const MIN_MV = 2400; // 0% (ESP32'nin genelde kapandığı voltaj, burayı testlerine göre güncelleyebilirsin)

    if (mv >= MAX_MV) return 100;
    if (mv <= MIN_MV) return 0;

    // Yüzdeyi hesapla ve küsuratları yuvarla
    return Math.round(((mv - MIN_MV) / (MAX_MV - MIN_MV)) * 100);
  };

  // Yüzdeye göre ikon ve renk belirleme
  const getBatteryInfo = (mvValue: any) => {
    const percent = calculateBatteryPercentage(mvValue);

    if (percent === null)
      return { icon: "battery-dead", color: "#52525b", display: "Veri Yok" };
    if (percent >= 60)
      return { icon: "battery-full", color: "#34d399", display: `%${percent}` }; // Zümrüt
    if (percent >= 25)
      return { icon: "battery-half", color: "#fbbf24", display: `%${percent}` }; // Sarı
    return { icon: "battery-dead", color: "#ef4444", display: `%${percent}` }; // Kırmızı
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-900 px-4 pt-6">
      <View className="mb-6 ml-1">
        <Text className="text-emerald-400 text-3xl font-extrabold">
          Sürü Listesi
        </Text>
        <Text className="text-zinc-400 text-sm mt-1">
          Toplam {devices.length} aktif cihaz
        </Text>
      </View>

      <View className="flex-row items-center bg-zinc-800 rounded-2xl px-4 py-3 mb-6 border border-zinc-700">
        <Ionicons name="search" size={20} color="#a1a1aa" />
        <TextInput
          className="flex-1 ml-3 text-white text-base"
          placeholder="Küpe numarası ara..."
          placeholderTextColor="#a1a1aa"
          value={searchQuery}
          onChangeText={setSearchQuery}
          selectionColor="#34d399"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#a1a1aa" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredDevices}
        keyExtractor={(item) => item.device_id}
        showsVerticalScrollIndicator={false}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View className="items-center justify-center mt-10">
            <Ionicons name="hardware-chip-outline" size={48} color="#52525b" />
            <Text className="text-zinc-500 mt-4 text-center">
              Cihaz bulunamadı.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const battery = getBatteryInfo(item.battery_mv);

          return (
            <TouchableOpacity className="bg-zinc-800 rounded-2xl p-4 mb-3 flex-row items-center border border-zinc-700 active:bg-zinc-700">
              <View className="w-12 h-12 rounded-full bg-zinc-900 items-center justify-center border border-zinc-700">
                <Ionicons name="radio" size={20} color="#34d399" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-white text-lg font-bold tracking-wider">
                  Küpe No: {item.device_id}
                </Text>
                <Text className="text-zinc-400 text-xs mt-1">
                  Enlem: {parseFloat(item.latitude).toFixed(4)} | Boylam:{" "}
                  {parseFloat(item.longitude).toFixed(4)}
                </Text>
              </View>

              {/* Sağ Kısım: Batarya */}
              <View className="items-center justify-center w-20">
                {/* @ts-ignore */}
                <Ionicons name={battery.icon} size={24} color={battery.color} />
                <Text
                  style={{ color: battery.color }}
                  className="text-sm font-bold mt-1 text-center"
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                >
                  {battery.display}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}
