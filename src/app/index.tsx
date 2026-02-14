import { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeStore } from '../store/useThemeStore';
import { useAuthStore } from '../store/useAuthStore';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen() {
    const router = useRouter();
    const { colors } = useThemeStore();
    const { isAuthenticated, token, hasLoggedInOnce } = useAuthStore();

    useEffect(() => {
        const checkAuth = async () => {
            // Add a small delay for splash screen visibility or DB init
            await new Promise(resolve => setTimeout(resolve, 2000));

            if (isAuthenticated && token) {
                router.replace('/(tabs)/home');
            } else {
                router.replace('/(auth)/login');
            }
        };

        checkAuth();
    }, [isAuthenticated, token]);

    const handleGetStarted = () => {
        router.replace('/(auth)/login');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/gold-ducks.png')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                    <Text style={[styles.title, { color: colors.text }]}>Ducks Row</Text>
                    <Text style={[styles.tagline, { color: colors.textSecondary }]}>
                        Discover. Plan. Experience.
                    </Text>
                    <Image
                        source={require('../../assets/marryMe.gif')}
                        style={styles.loadingGif}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.footer}>
                    {!hasLoggedInOnce ? (
                        <PrimaryButton
                            label="Get Started"
                            onPress={handleGetStarted}
                            style={{ width: '100%' }}
                        />
                    ) : (
                        <View style={{ alignItems: 'center', paddingVertical: 20 }}>
                            {/* Optional: Add a spinner or simpler loading text if desired, 
                                but the GIF above serves as a good loading indicator already. */}
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 30,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    logoImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    loadingGif: {
        width: 100,
        height: 100,
        marginTop: 20,
    },
    title: {
        fontSize: 42,
        fontWeight: '900',
        letterSpacing: -1,
    },
    tagline: {
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 26,
    },
    footer: {
        gap: 16,
        paddingBottom: 20,
    },
});
