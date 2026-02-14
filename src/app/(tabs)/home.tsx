import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '../../store/useThemeStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useAuthStore } from '../../store/useAuthStore';
import { MOCK_PLACES } from '../../data/mock';
import { PlaceCard } from '../../components/ui/PlaceCard';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

export default function HomeScreen() {
    const router = useRouter();
    const { colors, mode } = useThemeStore();
    const { t, language, setLanguage, isRTL } = useLanguageStore();
    const { user } = useAuthStore();

    const featuredPlaces = MOCK_PLACES.slice(0, 3);
    const recommendedPlaces = MOCK_PLACES.slice(2, 5);

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };

    const textAlign = isRTL ? 'right' : 'left';
    const flexDirection = isRTL ? 'row-reverse' : 'row';
    const alignItems = isRTL ? 'flex-end' : 'flex-start';

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={[styles.header, { flexDirection }]}>
                    <View style={{ alignItems }}>
                        <Text style={[styles.greeting, { color: colors.textSecondary }]}>{t('welcome')}</Text>
                        <Text style={[styles.username, { color: colors.text }]}>{user?.username || t('explorer')} 👋</Text>
                    </View>
                    <TouchableOpacity onPress={toggleLanguage} style={[styles.langButton, { borderColor: colors.border }]}>
                        <Text style={[styles.langText, { color: colors.primary }]}>
                            {language === 'en' ? 'AR' : 'EN'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.sectionHeader, { flexDirection }]}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('featured_places')}</Text>
                    <PrimaryButton
                        label={t('view_all')}
                        variant="ghost"
                        onPress={() => router.push('/(tabs)/discover')}
                        style={{ height: 32, paddingHorizontal: 0 }}
                    />
                </View>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={featuredPlaces}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <PlaceCard
                            place={item}
                            onPress={() => router.push(`/place/${item.id}`)}
                            style={{ marginRight: 16 }}
                        />
                    )}
                    contentContainerStyle={styles.horizontalList}
                    inverted={isRTL} // Instant flip for horizontal list!
                />

                <View style={styles.bannerContainer}>
                    <View style={[styles.banner, { backgroundColor: colors.accent, flexDirection }]}>
                        <View style={[styles.bannerContent, { alignItems }]}>
                            <Text style={[styles.bannerTitle, { textAlign }]}>Explore the Unknown</Text>
                            <Text style={[styles.bannerText, { textAlign }]}>Get up to 20% off on new experiences this week.</Text>
                            <PrimaryButton
                                label="Explore Now"
                                style={{
                                    backgroundColor: mode === 'dark' ? '#000000' : '#FFFFFF',
                                    marginTop: 12,
                                    height: 40
                                }}
                                textColor={mode === 'dark' ? '#FFFFFF' : '#000000'}
                                onPress={() => router.push('/(tabs)/discover')}
                            />
                        </View>
                        <Text style={[styles.bannerEmoji, { marginLeft: isRTL ? 0 : 10, marginRight: isRTL ? 10 : 0 }]}>🚀</Text>
                    </View>
                </View>

                <View style={[styles.sectionHeader, { flexDirection }]}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('recommended')}</Text>
                </View>

                <View style={styles.verticalList}>
                    {recommendedPlaces.map((place) => (
                        <PlaceCard
                            key={place.id}
                            place={place}
                            onPress={() => router.push(`/place/${place.id}`)}
                            width="100%"
                        />
                    ))}
                </View>

                <View style={{ height: 20 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 24,
        marginTop: 10,
    },
    greeting: {
        fontSize: 16,
        marginBottom: 4,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#fff',
    },
    langButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
    },
    langText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    horizontalList: {
        paddingHorizontal: 20,
        paddingBottom: 24,
    },
    verticalList: {
        paddingHorizontal: 20,
        gap: 16,
    },
    bannerContainer: {
        paddingHorizontal: 20,
        marginBottom: 32,
    },
    banner: {
        borderRadius: 20,
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
    },
    bannerContent: {
        flex: 1,
    },
    bannerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    bannerText: {
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 4,
        fontSize: 14,
    },
    bannerEmoji: {
        fontSize: 64,
        marginLeft: 10,
        opacity: 0.8,
    },
});
