import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useLocations } from "@/hooks/useLocations";
import { useDeviceStats } from "@/hooks/useDeviceStats";
import { StatCard } from "@/components/StatCard";
import { SecurityDonutChart } from "@/components/SecurityDonutChart";
import { AlertCard } from "@/components/AlertCard";
import { ErrorBanner } from "@/components/ErrorBanner";

export default function HomeScreen() {
  const { locations, isLoading, isRefreshing, error, refetch } = useLocations();
  const stats = useDeviceStats(locations);

  return (
    <SafeAreaView className="flex-1 bg-zinc-900">
      <ScrollView
        className="flex-1 px-5 pt-6"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refetch}
            tintColor="#34d399"
          />
        }
      >
        {/* ÜST BİLGİ (HEADER) */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-zinc-400 text-sm font-medium mb-1">
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

        {error && <ErrorBanner message={error} />}

        {isLoading ? (
          <View className="py-20 items-center">
            <ActivityIndicator size="large" color="#10b981" />
            <Text className="text-zinc-400 mt-4">
              Sistem verileri senkronize ediliyor...
            </Text>
          </View>
        ) : (
          <>
            {/* 4'LÜ İSTATİSTİK KARTLARI */}
            <View className="flex-row flex-wrap justify-between mb-6">
              <StatCard
                icon="shield-checkmark"
                iconColor="#34d399"
                value={stats.total}
                label="Toplam Cihaz"
              />
              <StatCard
                icon="checkmark-circle"
                iconColor="#3b82f6"
                value={stats.healthy}
                label="Güvende"
              />
              <StatCard
                icon="battery-half"
                iconColor="#fbbf24"
                value={stats.low}
                label="Düşük Pil"
              />
              <StatCard
                icon="warning"
                iconColor="#ef4444"
                value={stats.inactive}
                label="İnaktif"
              />
            </View>

            <SecurityDonutChart stats={stats} />

            <Text className="text-white font-bold text-base mb-3 mt-2 ml-1">
              Son Uyarılar
            </Text>
            <AlertCard lowBatteryCount={stats.low} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
