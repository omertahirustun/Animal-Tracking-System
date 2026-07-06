import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomeScreen() {
  const router = useRouter();
  const [locations, setLocations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const calculateBatteryPercentage = (mvValue: any) => {
    const mv = parseInt(mvValue, 10);
    if (isNaN(mv)) return 0;
    const MAX_MV = 3000;
    const MIN_MV = 2400;
    if (mv >= MAX_MV) return 100;
    if (mv <= MIN_MV) return 0;
    return Math.round(((mv - MIN_MV) / (MAX_MV - MIN_MV)) * 100);
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.243:3000/api/son-konumlar",
        );
        if (Array.isArray(response.data)) {
          setLocations(response.data);
        }
      } catch (error) {
        console.log("Veri çekilemedi.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
    const interval = setInterval(fetchLocations, 5000);
    return () => clearInterval(interval);
  }, []);

  const totalDevices = locations.length;
  const healthyDevices = locations.filter(
    (loc) => calculateBatteryPercentage(loc.battery_mv) >= 50,
  ).length;
  const lowBatteryDevices = locations.filter((loc) => {
    const percent = calculateBatteryPercentage(loc.battery_mv);
    return percent > 0 && percent < 50;
  }).length;
  const inactiveDevices = totalDevices - (healthyDevices + lowBatteryDevices);

  const safePercentage =
    totalDevices > 0
      ? ((healthyDevices / totalDevices) * 100).toFixed(1)
      : "0.0";

  return (
    <SafeAreaView className="flex-1 bg-zinc-900">
      <ScrollView
        className="flex-1 px-5 pt-2"
        showsVerticalScrollIndicator={false}
      >
        {/* ÜST BİLGİ (HEADER) */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-zinc-400 text-sm font-medium mb-1 pt-3">
              Hoş Geldin,
            </Text>
            <Text className="text-white text-2xl font-bold tracking-wide">
              Admin
            </Text>
            <Text className="text-emerald-500 text-xs font-bold mt-1 uppercase tracking-widest">
              Şua Tarım Merkezi
            </Text>
          </View>
          <TouchableOpacity className="w-11 h-11 bg-zinc-800 rounded-full items-center justify-center border border-zinc-700 relative">
            <Ionicons name="notifications-outline" size={22} color="white" />
            <View className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-zinc-800" />
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <View className="py-20 items-center">
            <ActivityIndicator size="large" color="#10b981" />
            <Text className="text-zinc-400 mt-4">
              Sistem verileri senkronize ediliyor...
            </Text>
          </View>
        ) : (
          <>
            <View className="flex-row flex-wrap justify-between mb-6">
              <View className="w-[48%] bg-zinc-800 rounded-2xl p-4 mb-4 border border-zinc-700">
                <Ionicons
                  name="shield-checkmark"
                  size={24}
                  color="#34d399"
                  className="mb-2"
                />
                <Text className="text-white text-2xl font-bold mt-2">
                  {totalDevices}
                </Text>
                <Text className="text-zinc-400 text-xs font-medium mt-1">
                  Toplam Cihaz
                </Text>
              </View>

              <View className="w-[48%] bg-zinc-800 rounded-2xl p-4 mb-4 border border-zinc-700">
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color="#3b82f6"
                  className="mb-2"
                />
                <Text className="text-white text-2xl font-bold mt-2">
                  {healthyDevices}
                </Text>
                <Text className="text-zinc-400 text-xs font-medium mt-1">
                  Güvende
                </Text>
              </View>

              <View className="w-[48%] bg-zinc-800 rounded-2xl p-4 border border-zinc-700">
                <Ionicons
                  name="battery-half"
                  size={24}
                  color="#fbbf24"
                  className="mb-2"
                />
                <Text className="text-white text-2xl font-bold mt-2">
                  {lowBatteryDevices}
                </Text>
                <Text className="text-zinc-400 text-xs font-medium mt-1">
                  Düşük Pil
                </Text>
              </View>

              <View className="w-[48%] bg-zinc-800 rounded-2xl p-4 border border-zinc-700">
                <Ionicons
                  name="warning"
                  size={24}
                  color="#ef4444"
                  className="mb-2"
                />
                <Text className="text-white text-2xl font-bold mt-2">
                  {inactiveDevices}
                </Text>
                <Text className="text-zinc-400 text-xs font-medium mt-1">
                  İnaktif
                </Text>
              </View>
            </View>

            <View className="bg-zinc-800 rounded-3xl p-5 mb-6 border border-zinc-700">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-white font-bold text-base">
                  Sürü Güvenlik Durumu
                </Text>
                <TouchableOpacity>
                  <Text className="text-emerald-400 text-xs font-bold">
                    Tümünü Gör
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row items-center justify-between px-2">
                <View className="relative items-center justify-center">
                  <View
                    className="w-28 h-28 rounded-full border-[10px] items-center justify-center shadow-lg"
                    style={{
                      borderColor: healthyDevices > 0 ? "#10b981" : "#ef4444",
                      backgroundColor: "#27272a",
                      shadowColor: "#10b981",
                      elevation: 8,
                    }}
                  >
                    <Text className="text-white text-xl font-bold">
                      % {safePercentage}
                    </Text>
                    <Text className="text-emerald-400 text-[10px] font-bold mt-0.5">
                      Güvende
                    </Text>
                  </View>
                </View>

                <View className="flex-1 ml-6">
                  <View className="flex-row items-center mb-3">
                    <View className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-3" />
                    <Text className="text-white font-bold w-6">
                      {healthyDevices}
                    </Text>
                    <Text className="text-zinc-400 text-xs">Güvende</Text>
                  </View>
                  <View className="flex-row items-center mb-3">
                    <View className="w-2.5 h-2.5 rounded-full bg-amber-400 mr-3" />
                    <Text className="text-white font-bold w-6">
                      {lowBatteryDevices}
                    </Text>
                    <Text className="text-zinc-400 text-xs">Düşük Pil</Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="w-2.5 h-2.5 rounded-full bg-red-500 mr-3" />
                    <Text className="text-white font-bold w-6">
                      {inactiveDevices}
                    </Text>
                    <Text className="text-zinc-400 text-xs">İnaktif</Text>
                  </View>
                </View>
              </View>
            </View>

            <Text className="text-white font-bold text-base mb-3 mt-2 ml-1">
              Son Uyarılar
            </Text>
            {lowBatteryDevices > 0 ? (
              <View className="bg-zinc-800 rounded-2xl p-4 flex-row items-center border border-zinc-700 mb-8">
                <View className="w-10 h-10 rounded-xl bg-amber-500/20 items-center justify-center mr-4">
                  <Ionicons name="battery-dead" size={20} color="#fbbf24" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold text-sm">
                    Düşük Pil Uyarısı
                  </Text>
                  <Text className="text-zinc-400 text-xs mt-0.5">
                    {lowBatteryDevices} cihaz kritik seviyede
                  </Text>
                </View>
                <Text className="text-zinc-500 text-xs">Şimdi</Text>
              </View>
            ) : (
              <View className="bg-zinc-800 rounded-2xl p-4 flex-row items-center justify-center border border-zinc-700 mb-8 opacity-70">
                <Ionicons
                  name="checkmark-done-circle"
                  size={20}
                  color="#10b981"
                  className="mr-2"
                />
                <Text className="text-zinc-400 text-sm">
                  Tüm cihazlar normal durumda.
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
