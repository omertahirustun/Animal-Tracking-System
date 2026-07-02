import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

export default function MapScreen() {
  const [locations, setLocations] = useState<any[]>([]);
  const [isMapReady, setIsMapReady] = useState(false);

  const mapRef = useRef<MapView>(null);
  const isFirstZoom = useRef(true);

  const fetchLocations = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.243:3000/api/son-konumlar",
      );

      if (Array.isArray(response.data)) {
        setLocations(response.data);
      }
    } catch (error) {
      console.log("Veri çekilirken ufak bir bağlantı sorunu oldu, atlandı.");
    }
  };

  useEffect(() => {
    fetchLocations();
    const interval = setInterval(fetchLocations, 5000);
    return () => clearInterval(interval);
  }, []);

  const focusOnHerd = () => {
    if (locations.length > 0 && mapRef.current && isMapReady) {
      const validLocations = locations.filter(
        (loc) =>
          !isNaN(parseFloat(loc.latitude)) && !isNaN(parseFloat(loc.longitude)),
      );

      if (validLocations.length > 0) {
        const coordinates = validLocations.map((loc) => ({
          latitude: parseFloat(loc.latitude),
          longitude: parseFloat(loc.longitude),
        }));

        mapRef.current.fitToCoordinates(coordinates, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
      }
    }
  };

  useEffect(() => {
    if (locations.length > 0 && isFirstZoom.current && isMapReady) {
      focusOnHerd();
      isFirstZoom.current = false;
    }
  }, [locations, isMapReady]);

  return (
    <View className="flex-1 bg-zinc-900 px-4">
      <View className="mb-4 ml-1 flex-row justify-between items-center">
        <View>
          <Text className="text-emerald-400 text-3xl font-extrabold">
            Sürü Takibi
          </Text>
          <Text className="text-zinc-400 text-sm mt-1">
            Sistem Aktif • {locations.length} Cihaz Bağlı
          </Text>
        </View>
      </View>

      <View
        style={{ flex: 3 }}
        className="rounded-3xl overflow-hidden border-4 border-zinc-800 shadow-2xl bg-zinc-800"
      >
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFillObject}
          mapType="hybrid"
          showsUserLocation={true}
          showsCompass={true}
          onMapReady={() => setIsMapReady(true)}
          initialRegion={{
            latitude: 41.0082,
            longitude: 28.9784,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {locations.map((loc) => {
            const lat = parseFloat(loc.latitude);
            const lng = parseFloat(loc.longitude);
            if (isNaN(lat) || isNaN(lng)) return null;

            return (
              <Marker
                key={loc.device_id}
                coordinate={{ latitude: lat, longitude: lng }}
                anchor={{ x: 0.5, y: 0.5 }}
                title={`Küpe No: ${loc.device_id}`}
                description={`Pil: ${loc.battery_mv} mV`}
              >
                <View
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 9,
                    backgroundColor: "#34d399",
                    borderWidth: 3,
                    borderColor: "#18181b",
                  }}
                />
              </Marker>
            );
          })}
        </MapView>
      </View>

      {/* ALT KONTROL PANELİ */}
      <View style={{ flex: 1 }} className="justify-center">
        <View className="bg-zinc-800 p-4 rounded-2xl flex-row justify-between items-center border border-zinc-700">
          <View>
            <Text className="text-zinc-400 text-xs uppercase font-bold">
              Kritik Batarya
            </Text>
            <Text className="text-white text-lg font-bold">Uyarı Yok</Text>
          </View>
          <Ionicons name="battery-full" size={24} color="#34d399" />
        </View>

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
    </View>
  );
}
