import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useThemeStore } from '../store/useThemeStore';

export default function RootLayout() {
    const { colors, mode } = useThemeStore();

    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.background }}>
            <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
            <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="place/[id]" options={{ presentation: 'card', animation: 'slide_from_right' }} />
            </Stack>
        </GestureHandlerRootView>
    );
}
