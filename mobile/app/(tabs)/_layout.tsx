import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);

export default function TabLayout() {
  return (
    <MaterialTopTabs
      initialRouteName="index"
      tabBarPosition="bottom"
      screenOptions={{
        swipeEnabled: true,
        animationEnabled: true,
        tabBarStyle: {
          backgroundColor: "#18181b",
          borderTopColor: "#27272a",
          borderTopWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: "#34d399",
        tabBarInactiveTintColor: "#a1a1aa",
        tabBarIndicatorStyle: {
          backgroundColor: "#34d399",
          height: 3,
        },
        tabBarShowIcon: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          textTransform: "none",
          marginTop: 2,
        },
      }}
    >
      <MaterialTopTabs.Screen
        name="map"
        options={{
          title: "Harita",
          tabBarIcon: ({ color }: { color: string }) => (
            <Ionicons name="map" size={22} color={color} />
          ),
        }}
      />

      <MaterialTopTabs.Screen
        name="index"
        options={{
          title: "Ana Sayfa",
          tabBarIcon: ({ color }: { color: string }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />

      <MaterialTopTabs.Screen
        name="devices"
        options={{
          title: "Cihazlar",
          tabBarIcon: ({ color }: { color: string }) => (
            <Ionicons name="hardware-chip" size={22} color={color} />
          ),
        }}
      />
    </MaterialTopTabs>
  );
}
