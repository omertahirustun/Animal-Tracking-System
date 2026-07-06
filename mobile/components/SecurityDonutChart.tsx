import { View, Text, TouchableOpacity } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import type { DeviceStats } from "@/hooks/useDeviceStats";

interface SecurityDonutChartProps {
  stats: DeviceStats;
  onSeeAllPress?: () => void;
}

const COLORS = {
  healthy: "#10b981",
  low: "#fbbf24",
  inactive: "#ef4444",
  empty: "#3f3f46",
};

export function SecurityDonutChart({
  stats,
  onSeeAllPress,
}: SecurityDonutChartProps) {
  const pieData =
    stats.total > 0
      ? [
          { value: stats.healthy, color: COLORS.healthy },
          { value: stats.low, color: COLORS.low },
          { value: stats.inactive, color: COLORS.inactive },
        ]
      : [{ value: 1, color: COLORS.empty }];

  return (
    <View className="bg-zinc-800 rounded-3xl p-5 mb-6 border border-zinc-700">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-white font-bold text-base">
          Sürü Güvenlik Durumu
        </Text>
        <TouchableOpacity onPress={onSeeAllPress}>
          <Text className="text-emerald-400 text-xs font-bold">Tümünü Gör</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center justify-between px-2">
        <View className="items-center justify-center">
          <PieChart
            donut
            isAnimated={true}
            animationDuration={1200}
            radius={65}
            innerRadius={53}
            data={pieData}
            backgroundColor="transparent"
            strokeWidth={4}
            strokeColor="#27272a"
            centerLabelComponent={() => {
              return (
                <View className="items-center justify-center">
                  <Text className="text-white text-2xl font-black tracking-tighter">
                    % {stats.safePercentage}
                  </Text>
                  <Text className="text-emerald-400 text-[10px] font-bold mt-1 uppercase tracking-widest">
                    Güvende
                  </Text>
                </View>
              );
            }}
          />
        </View>

        <View className="flex-1 ml-6">
          <LegendRow
            color="bg-emerald-500"
            value={stats.healthy}
            label="Güvende"
          />
          <LegendRow color="bg-amber-400" value={stats.low} label="Düşük Pil" />
          <LegendRow
            color="bg-red-500"
            value={stats.inactive}
            label="İnaktif"
            isLast
          />
        </View>
      </View>
    </View>
  );
}

interface LegendRowProps {
  color: string;
  value: number;
  label: string;
  isLast?: boolean;
}

function LegendRow({ color, value, label, isLast }: LegendRowProps) {
  return (
    <View className={`flex-row items-center ${isLast ? "" : "mb-3"}`}>
      <View className={`w-2.5 h-2.5 rounded-full ${color} mr-3`} />
      <Text className="text-white font-bold w-6">{value}</Text>
      <Text className="text-zinc-400 text-xs">{label}</Text>
    </View>
  );
}
