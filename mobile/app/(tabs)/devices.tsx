import { View, Text, FlatList } from "react-native";
import { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLocations } from "@/hooks/useLocations";
import { SearchBar } from "@/components/SearchBar";
import { DeviceListItem } from "@/components/DeviceListItem";
import { EmptyState } from "@/components/EmptyState";
import { ErrorBanner } from "@/components/ErrorBanner";

export default function DevicesScreen() {
  const { locations, isRefreshing, error, refetch } = useLocations(10000);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDevices = useMemo(
    () =>
      locations.filter((device) =>
        device.device_id.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [locations, searchQuery],
  );

  return (
    <SafeAreaView className="flex-1 bg-zinc-900 px-4 pt-6">
      <View className="mb-6 ml-1">
        <Text className="text-emerald-400 text-3xl font-extrabold">
          Sürü Listesi
        </Text>
        <Text className="text-zinc-400 text-sm mt-1">
          Toplam {locations.length} aktif cihaz
        </Text>
      </View>

      {error && <ErrorBanner message={error} />}

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Küpe numarası ara..."
      />

      <FlatList
        data={filteredDevices}
        keyExtractor={(item) => item.device_id}
        showsVerticalScrollIndicator={false}
        refreshing={isRefreshing}
        onRefresh={refetch}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <EmptyState
            icon="hardware-chip-outline"
            message="Cihaz bulunamadı."
          />
        }
        renderItem={({ item }) => <DeviceListItem device={item} />}
      />
    </SafeAreaView>
  );
}
