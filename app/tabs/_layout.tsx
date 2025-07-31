import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        tabBarIcon: ({ size }) => {
          const map: Record<string, keyof typeof Ionicons.glyphMap> = {
            index: 'home',
            history: 'time',
            stats: 'stats-chart',
          };
          const name = map[route.name] ?? 'ellipse';
          return <Ionicons name={name} size={size} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="history" options={{ title: 'History' }} />
      <Tabs.Screen name="stats" options={{ title: 'Stats' }} />
    </Tabs>
  );
}
