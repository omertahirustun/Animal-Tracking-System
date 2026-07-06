import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { useLocations } from "@/hooks/useLocations";
import { useFocusOnHerd } from "@/hooks/useFocusOnHerd";
import { calculateBatteryPercentage, getBatteryStatus } from "@/utils/battery";
import { HerdMarker } from "@/components/HerdMarker";
import { CriticalBatteryCard } from "@/components/CriticalBatteryCard";
import { ErrorBanner } from "@/components/ErrorBanner";

export default function MapScreen() {
  const { locations, error } = useLocations(5000);
  const [isMapReady, setIsMapReady] = useState(false);
  const { mapRef, focusOnHerd } = useFocusOnHerd(locations, isMapReady);

  const hasCriticalBattery = locations.some(
    (loc) =>
      getBatteryStatus(calculateBatteryPercentage(loc.battery_mv)) === "low",
  );

  return (
    <SafeAreaView className="flex-1 bg-zinc-900 px-4">
      <View className="mb-4 ml-1 flex-row justify-between items-center pt-6">
        <View>
          <Text className="text-emerald-400 text-3xl font-extrabold">
            Sürü Takibi
          </Text>
          <Text className="text-zinc-400 text-sm mt-1">
            Sistem Aktif • {locations.length} Cihaz Bağlı
          </Text>
        </View>
      </View>

      {error && <ErrorBanner message={error} />}

      <View
        style={{ flex: 3 }}
        className="rounded-3xl overflow-hidden border-4 border-zinc-800 shadow-2xl bg-zinc-800"
      >
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFillObject}
          mapType="hybrid"
          showsUserLocation
          showsCompass
          onMapReady={() => setIsMapReady(true)}
          initialRegion={{
            latitude: 41.0082,
            longitude: 28.9784,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {locations.map((loc) => (
            <HerdMarker key={loc.device_id} device={loc} />
          ))}
        </MapView>
      </View>

      <View style={{ flex: 1 }} className="justify-center">
        <CriticalBatteryCard hasCriticalBattery={hasCriticalBattery} />

        <View className="flex-row justify-between gap-4 mt-2">
          <TouchableOpacity
            className="flex-1 bg-emerald-500 py-4 rounded-2xl items-center justify-center flex-row gap-2 active:bg-emerald-600"
            onPress={focusOnHerd}
          >
            <Ionicons name="locate" size={20} color="white" />
            <Text className="text-white font-bold text-base">Sürüyü Bul</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
