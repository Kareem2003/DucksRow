import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemeStore } from '../../store/useThemeStore';

interface FilterChipProps {
    label: string;
    isSelected: boolean;
    onPress: () => void;
}

export const FilterChip: React.FC<FilterChipProps> = ({ label, isSelected, onPress }) => {
    const { colors } = useThemeStore();

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.chip,
                {
                    backgroundColor: isSelected ? colors.primary : colors.card,
                    borderColor: isSelected ? colors.primary : colors.border,
                }
            ]}
        >
            <Text style={{
                color: isSelected ? '#FFFFFF' : colors.textSecondary,
                fontWeight: isSelected ? '600' : '400',
                fontSize: 14
            }}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
