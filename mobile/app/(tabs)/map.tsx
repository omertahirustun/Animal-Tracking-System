import { View, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function MapScreen() {
  return (
    <View className="flex-1 bg-zinc-900">
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        mapType="hybrid"
        showsUserLocation={true}
        showsCompass={true}
        initialRegion={{
          latitude: 41.0082,
          longitude: 28.9784,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}
