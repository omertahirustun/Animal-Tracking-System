import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Expo'nun hazır ikon kütüphanesi

import HomeScreen from "./src/screens/HomeScreen";
import MapScreen from "./src/screens/MapScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: "#18181b" }, // bg-zinc-900
          headerTintColor: "#34d399", // text-emerald-400
          headerTitleStyle: { fontWeight: "bold" },

          // Alt barın genel tasarımı
          tabBarStyle: {
            backgroundColor: "#18181b", // Koyu arkaplan
            borderTopColor: "#27272a", // İnce ayırıcı çizgi
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarActiveTintColor: "#34d399", // Seçili ikon rengi (Zümrüt Yeşili)
          tabBarInactiveTintColor: "#a1a1aa", // Seçili olmayan ikon rengi (Gri)

          // İkonların ayarlanması
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Map") {
              iconName = focused ? "map" : "map-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Ana Sayfa" }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{ title: "Harita" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
