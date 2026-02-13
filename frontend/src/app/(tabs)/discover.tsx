import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '../../store/useThemeStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { MOCK_PLACES } from '../../data/mock';
import { PlaceCard } from '../../components/ui/PlaceCard';
import { FilterChip } from '../../components/ui/FilterChip';
import { Ionicons } from '@expo/vector-icons';

const CATEGORIES = ['All', 'Activity', 'Food', 'Nightlife', 'Culture'];

export default function DiscoverScreen() {
    const router = useRouter();
    const { colors } = useThemeStore();
    const { t, isRTL } = useLanguageStore();
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredPlaces = selectedCategory === 'All'
        ? MOCK_PLACES
        : MOCK_PLACES.filter(p => p.category === selectedCategory);

    const flexDirection = isRTL ? 'row-reverse' : 'row';

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
            <View style={[styles.header, { flexDirection }]}>
                <Text style={[styles.title, { color: colors.text }]}>{t('discover_title')}</Text>
                <View style={[styles.locationBadge, { backgroundColor: colors.card, borderColor: colors.border, flexDirection }]}>
                    <Ionicons name="location" size={16} color={colors.primary} />
                    <Text style={[styles.locationText, { color: colors.text }]}>Tokyo, Japan</Text>
                </View>
            </View>

            <View style={styles.filterContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={[styles.filterContent, { flexDirection: isRTL ? 'row-reverse' : 'row' }]} // Simple flip for content
                >
                    {CATEGORIES.map((cat) => (
                        <FilterChip
                            key={cat}
                            label={t(`categories_${cat.toLowerCase()}` as any)}
                            isSelected={selectedCategory === cat}
                            onPress={() => setSelectedCategory(cat)}
                        />
                    ))}
                </ScrollView>
            </View>

            <FlatList
                contentContainerStyle={styles.listContent}
                data={filteredPlaces}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.cardWrapper}>
                        <PlaceCard
                            place={item}
                            onPress={() => router.push(`/place/${item.id}`)}
                            width="100%"
                        />
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                            No places found.
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingBottom: 16,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    locationBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        gap: 6,
    },
    locationText: {
        fontWeight: '600',
        fontSize: 14,
    },
    filterContainer: {
        marginBottom: 16,
    },
    filterContent: {
        paddingHorizontal: 20,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        gap: 16,
    },
    cardWrapper: {
        marginBottom: 8,
    },
    emptyState: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
    },
});
