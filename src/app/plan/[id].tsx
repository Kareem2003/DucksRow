import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, Share, Dimensions, StatusBar, Modal, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeStore } from '../../store/useThemeStore';
import { usePlanStore } from '../../store/usePlanStore';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { PlaceCard } from '../../components/ui/PlaceCard';
import { useLanguageStore } from '../../store/useLanguageStore';

const { width } = Dimensions.get('window');

export default function PlanDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { colors, mode } = useThemeStore();
    const { plans, removePlaceFromPlan, removePlan, optimizePlan } = usePlanStore();
    const insets = useSafeAreaInsets();
    const [isOptimizing, setIsOptimizing] = useState(false);
    const { t } = useLanguageStore();
    

    const plan = plans.find(p => p.id === id);

    const handleAIArrange = () => {
        if (!plan || plan.places.length < 2) {
            Alert.alert("Not enough places", "Add more places to let AI optimize your route!");
            return;
        }

        setIsOptimizing(true);

        // Simulate AI thinking time
        setTimeout(() => {
            optimizePlan(plan.id);
            setIsOptimizing(false);
            Alert.alert("Plan Optimized!", "Your itinerary has been rearranged for the best flow.");
        }, 2000);
    };

    if (!plan) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={{ color: colors.text, textAlign: 'center', marginTop: 20 }}>Plan not found</Text>
            </View>
        );
    }

    const handleSharePlan = async () => {
        try {
            const placesList = plan.places.map(p => `- ${p.name} (${p.location})`).join('\n');
            const message = `Check out my travel plan: ${plan.name}\nDate: ${plan.date}\n\nItinerary:\n${placesList}\n\nTotal Budget: ~$${plan.totalBudget}`;

            await Share.share({
                message,
            });
        } catch (error) {
            alert('Error sharing plan');
        }
    };

    const handleDeletePlan = () => {
        Alert.alert(
            "Delete Plan",
            "Are you sure you want to delete this plan?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        removePlan(plan.id);
                        router.back();
                    }
                }
            ]
        );
    };

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <View style={styles.heroContainer}>
                <Image source={{ uri: plan.image }} style={styles.heroImage} resizeMode="cover" />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.heroGradient}
                />
                <View style={styles.heroContent}>
                    <Text style={styles.planDate}>{plan.date}</Text>
                    <Text style={styles.planTitle}>{plan.name}</Text>
                </View>
            </View>

            <View style={styles.statsContainer}>
                <View style={[styles.statsCard, { backgroundColor: colors.card, shadowColor: "#000" }]}>
                    <View style={styles.statItem}>
                        <View style={[styles.statIcon, { backgroundColor: colors.primary + '20' }]}>
                            <Ionicons name="map" size={20} color={colors.primary} />
                        </View>
                        <View>
                            <Text style={[styles.statValue, { color: colors.text }]}>{plan.placesCount}</Text>
                            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Places</Text>
                        </View>
                    </View>
                    <View style={[styles.divider, { backgroundColor: colors.border }]} />
                    <View style={styles.statItem}>
                        <View style={[styles.statIcon, { backgroundColor: colors.secondary + '20' }]}>
                            <Ionicons name="wallet" size={20} color={colors.secondary} />
                        </View>
                        <View>
                            <Text style={[styles.statValue, { color: colors.text }]}>${plan.totalBudget}</Text>
                            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Budget</Text>
                        </View>
                    </View>
                </View>
            </View>

            <Text style={[styles.sectionTitle, { color: colors.text, marginHorizontal: 20, marginTop: 10 }]}>Itinerary</Text>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle="light-content" />

            <FlatList
                data={plan.places}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={renderHeader}
                contentContainerStyle={styles.listContent}
                renderItem={({ item, index }) => (
                    <View style={styles.timelineItem}>
                        {/* Timeline Line */}
                        <View style={styles.timelineLeft}>
                            <View style={[styles.timelineDot, { backgroundColor: colors.primary }]} />
                            {index !== plan.places.length - 1 && (
                                <View style={[styles.timelineLine, { backgroundColor: colors.border }]} />
                            )}
                        </View>

                        <View style={styles.placeWrapper}>
                            <PlaceCard
                                place={item}
                                onPress={() => router.push(`/place/${item.id}`)}
                                width="100%"
                            />
                            <TouchableOpacity
                                style={[styles.removeButton, { backgroundColor: colors.card }]}
                                onPress={() => removePlaceFromPlan(plan.id, item.id)}
                            >
                                <Ionicons name="trash-outline" size={20} color={colors.danger} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                            {t('empty_itinerary')}
                        </Text>
                        <Text style={[styles.emptySubText, { color: colors.textSecondary }]}>
                            {t('start_adding')}
                        </Text>
                        <PrimaryButton
                            label={t('explore_places')}
                            style={{ marginTop: 24, width: 200 }}
                            onPress={() => router.push('/(tabs)/discover')}
                        />
                    </View>
                }
            />

            {/* Top Navigation Bar */}
            <View style={[styles.navBar, { paddingTop: insets.top }]}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={[styles.navButton, { backgroundColor: 'rgba(0,0,0,0.4)' }]}
                >
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>

                <View style={styles.navActions}>
                    <TouchableOpacity
                        onPress={handleAIArrange}
                        style={[styles.navButton, { backgroundColor: 'rgba(0,0,0,0.4)', marginRight: 8 }]}
                    >
                        <Ionicons name="sparkles" size={22} color="#FFD700" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleSharePlan}
                        style={[styles.navButton, { backgroundColor: 'rgba(0,0,0,0.4)' }]}
                    >
                        <Ionicons name="share-outline" size={22} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleDeletePlan}
                        style={[styles.navButton, { backgroundColor: 'rgba(0,0,0,0.4)', marginLeft: 8 }]}
                    >
                        <Ionicons name="trash-outline" size={22} color="#FF6B6B" />
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                transparent={true}
                visible={isOptimizing}
                animationType="fade"
            >
                <View style={styles.loadingOverlay}>
                    <View style={[styles.loadingCard, { backgroundColor: colors.card }]}>
                        <ActivityIndicator size="large" color={colors.primary} />
                        <Text style={[styles.loadingText, { color: colors.text }]}>{t('ai_optimizing')}</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 40,
    },
    heroContainer: {
        height: 300,
        width: '100%',
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 160,
    },
    heroContent: {
        position: 'absolute',
        bottom: 40, // Space for stats card overlap
        left: 20,
        right: 20,
    },
    planDate: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    planTitle: {
        color: '#FFF',
        fontSize: 32,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    // Stats Card
    statsContainer: {
        paddingHorizontal: 20,
        marginTop: -30, // Overlap the image
        marginBottom: 20,
    },
    statsCard: {
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    statItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    statIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 12,
    },
    divider: {
        width: 1,
        height: 40,
        marginHorizontal: 15,
    },
    // Timeline
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    timelineItem: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 0,
    },
    timelineLeft: {
        alignItems: 'center',
        marginRight: 16,
        width: 20,
    },
    timelineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginTop: 20, // Align with card top
    },
    timelineLine: {
        width: 2,
        flex: 1,
        marginTop: 4,
    },
    placeWrapper: {
        flex: 1,
        marginBottom: 20,
    },
    removeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    // Header Nav
    navBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 10,
    },
    navButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        // backdropFilter removed as it is not supported in RN
    },
    headerContainer: {
        marginBottom: 20,
    },
    navActions: {
        flexDirection: 'row',
    },
    backButton: {
        padding: 20,
    },
    emptyState: {
        alignItems: 'center',
        paddingTop: 40,
        paddingHorizontal: 40,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },
    emptySubText: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
    },
    loadingOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingCard: {
        padding: 24,
        borderRadius: 16,
        alignItems: 'center',
        gap: 16,
    },
    loadingText: {
        fontSize: 16,
        fontWeight: '600',
    }
});
