import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../../store/useThemeStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
    const { colors } = useThemeStore();
    const { t } = useLanguageStore();
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.card,
                    borderTopColor: colors.border,
                    height: (Platform.OS === 'ios' ? 60 : 60) + insets.bottom,
                    paddingBottom: insets.bottom + 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarLabelStyle: {
                    fontWeight: '600',
                    fontSize: 10,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: t('tab_home'),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="discover"
                options={{
                    title: t('tab_discover'),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="compass" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="my_plans"
                options={{
                    title: t('tab_my_plans'),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: t('tab_profile'),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
