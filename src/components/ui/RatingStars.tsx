import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../../store/useThemeStore';

interface RatingStarsProps {
    rating: number; // 0 to 5
    size?: number;
    color?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ rating, size = 16, color }) => {
    const { colors } = useThemeStore();
    const starColor = color || colors.warning;

    return (
        <View style={styles.container}>
            {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                    key={star}
                    name={star <= rating ? 'star' : (star - 0.5 <= rating ? 'star-half' : 'star-outline')}
                    size={size}
                    color={starColor}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
});
