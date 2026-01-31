import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet, Dimensions, StyleProp, ViewStyle, DimensionValue } from 'react-native';
import { useThemeStore } from '../../store/useThemeStore';
import { Place } from '../../data/mock';
import { RatingStars } from './RatingStars';
import { Ionicons } from '@expo/vector-icons';

interface PlaceCardProps {
    place: Place;
    onPress: () => void;
    width?: DimensionValue;
    style?: StyleProp<ViewStyle>;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, onPress, width, style }) => {
    const { colors } = useThemeStore();

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.9}
            style={[
                styles.card,
                {
                    backgroundColor: colors.card,
                    width: (width || 280) as DimensionValue,
                    borderColor: colors.border,
                    borderWidth: 1,
                },
                style
            ]}
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: place.image }} style={styles.image} resizeMode="cover" />
                <View style={styles.priceTag}>
                    <Text style={styles.priceText}>{place.price}</Text>
                </View>
                <View style={styles.categoryTag}>
                    <Text style={styles.categoryText}>{place.category}</Text>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
                        {place.name}
                    </Text>
                    <RatingStars rating={place.rating} size={14} />
                </View>

                <View style={styles.locationContainer}>
                    <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
                    <Text style={[styles.location, { color: colors.textSecondary }]} numberOfLines={1}>
                        {place.location}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    imageContainer: {
        height: 160,
        width: '100%',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    priceTag: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    priceText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    categoryTag: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    categoryText: {
        color: '#000',
        fontWeight: '600',
        fontSize: 10,
        textTransform: 'uppercase',
    },
    content: {
        padding: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 8,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    location: {
        fontSize: 13,
    },
});
