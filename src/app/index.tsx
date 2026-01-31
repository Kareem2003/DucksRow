import { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeStore } from '../store/useThemeStore';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen() {
    const router = useRouter();
    const { colors } = useThemeStore();

    useEffect(() => {
        // Auto-navigate after 2 seconds for demo purposes, or user can click
        const timer = setTimeout(() => {
            // router.replace('/(auth)/login'); 
            // Commented out auto-nav to let user see splash in demo
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

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
                    <PrimaryButton
                        label="Get Started"
                        onPress={handleGetStarted}
                        style={{ width: '100%' }}
                    />
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
