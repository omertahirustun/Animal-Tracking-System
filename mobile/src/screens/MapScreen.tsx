import { View } from "react-native";
import MapView from "react-native-maps";

export default function MapScreen() {
  return (
    <View className="flex-1 bg-zinc-900 items-center justify-center">
      <MapView
        className="w-full h-full"
        initialRegion={{
          latitude: 41.0082, // İstanbul için örnek koordinat
          longitude: 28.9784,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}
