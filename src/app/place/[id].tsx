import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Linking, Modal, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../../store/useThemeStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { usePlanStore } from '../../store/usePlanStore';
import { MOCK_PLACES, MOCK_REVIEWS } from '../../data/mock';
import { RatingStars } from '../../components/ui/RatingStars';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

const { width } = Dimensions.get('window');

export default function PlaceDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { colors, mode } = useThemeStore();
    const { t, isRTL } = useLanguageStore();
    const { plans, addPlaceToPlan } = usePlanStore();
    const insets = useSafeAreaInsets();

    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [isAddToPlanModalVisible, setIsAddToPlanModalVisible] = useState(false);

    const place = MOCK_PLACES.find(p => p.id === id);

    const flexDirection = isRTL ? 'row-reverse' : 'row';
    const textAlign = isRTL ? 'right' : 'left';
    const alignSelf = isRTL ? 'flex-end' : 'flex-start';

    if (!place) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
                <Text style={{ color: colors.text, textAlign: 'center', marginTop: 20 }}>Place not found</Text>
            </View>
        );
    }

    const handleCall = () => {
        Linking.openURL(`tel:${place.phone}`);
    };

    const handleWebsite = () => {
        if (place.website !== 'N/A') {
            Linking.openURL(`https://${place.website}`);
        }
    };

    const handleAddToPlan = (planId: string) => {
        addPlaceToPlan(planId, place);
        setIsAddToPlanModalVisible(false);
        // Optional: Show simplified toast/alert
        alert(`Added to plan!`);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        {place.images.map((img, index) => (
                            <Image key={index} source={{ uri: img }} style={styles.image} resizeMode="cover" />
                        ))}
                    </ScrollView>

                    <TouchableOpacity
                        style={[
                            styles.backButton,
                            {
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                top: insets.top + 20,
                                [isRTL ? 'right' : 'left']: 20
                            }
                        ]}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#fff" style={{ transform: [{ scaleX: isRTL ? -1 : 1 }] }} />
                    </TouchableOpacity>

                    <View style={[styles.pagination, { [isRTL ? 'left' : 'right']: 20 }]}>
                        <Text style={styles.paginationText}>1/{place.images.length}</Text>
                    </View>
                </View>

                <View style={styles.content}>
                    <View style={[styles.header, { flexDirection }]}>
                        <View style={{ flex: 1, alignItems: alignSelf }}>
                            <Text style={[styles.title, { color: colors.text, textAlign }]}>{place.name}</Text>
                            <View style={[styles.locationContainer, { flexDirection }]}>
                                <Ionicons name="location" size={16} color={colors.primary} />
                                <Text style={[styles.location, { color: colors.textSecondary }]}>{place.location}</Text>
                            </View>
                        </View>
                        <View style={[styles.priceTag, { backgroundColor: colors.card, borderColor: colors.border }]}>
                            <Text style={[styles.priceText, { color: colors.text }]}>{place.price}</Text>
                        </View>
                    </View>

                    <View style={[styles.ratingSection, { flexDirection }]}>
                        <RatingStars rating={place.rating} size={20} />
                        <Text style={[styles.ratingText, { color: colors.text }]}>{place.rating}</Text>
                        <Text style={[styles.reviewCount, { color: colors.textSecondary }]}>({place.reviewsCount} {t('reviews')})</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={[styles.quickActions, { flexDirection }]}>
                        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.card, flexDirection }]} onPress={handleCall}>
                            <Ionicons name="call" size={20} color={colors.primary} />
                            <Text style={[styles.actionText, { color: colors.text }]}>{t('call')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.card, flexDirection }]} onPress={handleWebsite}>
                            <Ionicons name="globe" size={20} color={colors.primary} />
                            <Text style={[styles.actionText, { color: colors.text }]}>{t('website')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.card, flexDirection }]}>
                            <Ionicons name="share-social" size={20} color={colors.primary} />
                            <Text style={[styles.actionText, { color: colors.text }]}>{t('share_action')}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.text, textAlign, alignSelf }]}>{t('about')}</Text>
                        <Text
                            style={[styles.description, { color: colors.textSecondary, textAlign }]}
                            numberOfLines={isDescriptionExpanded ? undefined : 3}
                        >
                            {place.description}
                        </Text>
                        <TouchableOpacity onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)} style={{ alignSelf }}>
                            <Text style={[styles.readMore, { color: colors.primary }]}>
                                {isDescriptionExpanded ? t('read_less') : t('read_more')}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.text, textAlign, alignSelf }]}>{t('amenities')}</Text>
                        <View style={[styles.featuresGrid, { flexDirection }]}>
                            {place.features.map((feature, index) => (
                                <View key={index} style={[styles.featureItem, { backgroundColor: colors.card, borderColor: colors.border, flexDirection }]}>
                                    <Ionicons name="checkmark-circle" size={16} color={colors.secondary} />
                                    <Text style={[styles.featureText, { color: colors.textSecondary }]}>{feature}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.text, textAlign, alignSelf }]}>{t('information')}</Text>

                        <View style={[styles.infoRow, { borderColor: colors.border, flexDirection }]}>
                            <Ionicons name="time-outline" size={20} color={colors.textSecondary} />
                            <View style={[styles.infoContent, { alignItems: alignSelf }]}>
                                <Text style={[styles.infoLabel, { color: colors.textSecondary, textAlign }]}>{t('opening_hours')}</Text>
                                <Text style={[styles.infoValue, { color: colors.text, textAlign }]}>{place.openingHours}</Text>
                            </View>
                        </View>

                        <View style={[styles.infoRow, { borderColor: colors.border, flexDirection }]}>
                            <Ionicons name="map-outline" size={20} color={colors.textSecondary} />
                            <View style={[styles.infoContent, { alignItems: alignSelf }]}>
                                <Text style={[styles.infoLabel, { color: colors.textSecondary, textAlign }]}>{t('address')}</Text>
                                <Text style={[styles.infoValue, { color: colors.text, textAlign }]}>{place.address}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.text, textAlign, alignSelf }]}>{t('location_title')}</Text>
                        <View style={styles.mapPlaceholder}>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2674&auto=format&fit=crop' }}
                                style={styles.mapImage}
                            />
                            <View style={[styles.mapOverlay, { [isRTL ? 'left' : 'right']: 16, right: isRTL ? undefined : 16 }]}>
                                <PrimaryButton
                                    label={t('get_directions')}
                                    style={{ height: 40 }}
                                    variant="primary"
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.text, textAlign, alignSelf }]}>{t('reviews')}</Text>
                        {MOCK_REVIEWS.map((review) => (
                            <View key={review.id} style={[styles.reviewCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                                <View style={[styles.reviewHeader, { flexDirection }]}>
                                    <Image source={{ uri: review.userAvatar }} style={styles.reviewAvatar} />
                                    <View style={{ flex: 1, alignItems: alignSelf }}>
                                        <Text style={[styles.reviewName, { color: colors.text, textAlign }]}>{review.userName}</Text>
                                        <Text style={[styles.reviewDate, { color: colors.textSecondary, textAlign }]}>{review.date}</Text>
                                    </View>
                                    <RatingStars rating={review.rating} size={14} />
                                </View>
                                <Text style={[styles.reviewText, { color: colors.text, textAlign }]}>{review.text}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={{ height: 80 }} />
                </View>
            </ScrollView>

            <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border, paddingBottom: 20 + insets.bottom, flexDirection }]}>
                <View style={[styles.priceFooter, { alignItems: alignSelf }]}>
                    <Text style={[styles.perPerson, { color: colors.textSecondary, textAlign }]}>{t('price_range')}</Text>
                    <Text style={[styles.priceLarge, { color: colors.text, textAlign }]}>{place.price}</Text>
                </View>
                <PrimaryButton
                    label={t('add_to_plan')}
                    onPress={() => setIsAddToPlanModalVisible(true)}
                    style={{ flex: 1 }}
                />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isAddToPlanModalVisible}
                onRequestClose={() => setIsAddToPlanModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setIsAddToPlanModalVisible(false)}
                >
                    <TouchableOpacity activeOpacity={1} onPress={() => { }} style={{ width: '100%' }}>
                        <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
                            <View style={[styles.modalHeader, { flexDirection }]}>
                                <Text style={[styles.modalTitle, { color: colors.text, textAlign }]}>{t('add_to_plan')}</Text>
                                <TouchableOpacity onPress={() => setIsAddToPlanModalVisible(false)}>
                                    <Ionicons name="close" size={24} color={colors.textSecondary} />
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.modalSubtitle, { color: colors.textSecondary, textAlign }]}>
                                {t('select_plan_title')}
                            </Text>

                            <FlatList
                                data={plans}
                                keyExtractor={(item) => item.id}
                                style={{ maxHeight: 300 }}
                                renderItem={({ item }) => {
                                    const isAlreadyAdded = item.places.some(p => p.id === place.id);
                                    return (
                                        <TouchableOpacity
                                            style={[
                                                styles.planItem,
                                                { borderColor: colors.border, flexDirection },
                                                isAlreadyAdded && { opacity: 0.5, backgroundColor: colors.background }
                                            ]}
                                            disabled={isAlreadyAdded}
                                            onPress={() => handleAddToPlan(item.id)}
                                        >
                                            <Image source={{ uri: item.image }} style={[styles.planItemImage, { [isRTL ? 'marginLeft' : 'marginRight']: 12, marginRight: isRTL ? 0 : 12 }]} />
                                            <View style={[styles.planItemInfo, { alignItems: alignSelf }]}>
                                                <Text style={[styles.planItemTitle, { color: colors.text, textAlign }]}>{item.name}</Text>
                                                <Text style={[styles.planItemCount, { color: colors.textSecondary, textAlign }]}>
                                                    {item.placesCount} {t('places_count')} {isAlreadyAdded ? `(${t('added')})` : ''}
                                                </Text>
                                            </View>
                                            <Ionicons
                                                name={isAlreadyAdded ? "checkmark-circle" : "add-circle"}
                                                size={24}
                                                color={isAlreadyAdded ? colors.secondary : colors.primary}
                                            />
                                        </TouchableOpacity>
                                    );
                                }}
                                ListEmptyComponent={
                                    <Text style={{ textAlign: 'center', padding: 20, color: colors.textSecondary }}>
                                        {t('no_plans')}
                                    </Text>
                                }
                            />
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    imageContainer: {
        height: 300,
        position: 'relative',
    },
    image: {
        width: width,
        height: 300,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    pagination: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    paginationText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
    },
    content: {
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    location: {
        fontSize: 16,
    },
    priceTag: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
    },
    priceText: {
        fontWeight: 'bold',
    },
    ratingSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    ratingText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    reviewCount: {
        fontSize: 16,
    },
    divider: {
        height: 1,
        backgroundColor: '#333', // Will be overridden by theme if needed, but not critical
        marginBottom: 20,
        opacity: 0.1,
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        gap: 12,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        gap: 6,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    actionText: {
        fontWeight: '600',
        fontSize: 14,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
    },
    readMore: {
        marginTop: 8,
        fontWeight: '600',
    },
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    featureItem: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    featureText: {
        fontSize: 14,
        fontWeight: '500',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 12,
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '500',
    },
    mapPlaceholder: {
        height: 180,
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
    },
    mapImage: {
        width: '100%',
        height: '100%',
    },
    mapOverlay: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    reviewCard: {
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 12,
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 12,
    },
    reviewAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    reviewName: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    reviewDate: {
        fontSize: 12,
    },
    reviewText: {
        fontSize: 14,
        lineHeight: 20,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        paddingBottom: 30,
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    priceFooter: {
        minWidth: 80,
    },
    perPerson: {
        fontSize: 12,
    },
    priceLarge: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
        gap: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalSubtitle: {
        marginBottom: 10,
    },
    planItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 10,
    },
    planItemImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 12,
    },
    planItemInfo: {
        flex: 1,
    },
    planItemTitle: {
        fontWeight: '600',
        fontSize: 16,
    },
    planItemCount: {
        fontSize: 12,
    },
});
