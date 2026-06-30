import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#18181b" },
        headerTintColor: "#34d399",
        headerTitleStyle: { fontWeight: "bold" },
        tabBarStyle: {
          backgroundColor: "#18181b",
          borderTopColor: "#27272a",
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#34d399",
        tabBarInactiveTintColor: "#a1a1aa",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Ana Sayfa",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Harita",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
