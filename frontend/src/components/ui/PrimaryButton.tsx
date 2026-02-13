import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { useThemeStore } from '../../store/useThemeStore';

interface PrimaryButtonProps extends TouchableOpacityProps {
    label: string;
    loading?: boolean;
    variant?: 'primary' | 'outline' | 'ghost';
    textColor?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    label,
    loading,
    variant = 'primary',
    style,
    disabled,
    textColor,
    ...props
}) => {
    const { colors } = useThemeStore();

    const getBackgroundColor = () => {
        if (disabled) return colors.border;
        if (variant === 'primary') return colors.primary;
        return 'transparent';
    };

    const getTextColor = () => {
        if (disabled) return colors.textSecondary;
        if (textColor) return textColor;
        if (variant === 'primary') return '#FFFFFF';
        return colors.primary;
    };

    const getBorderWidth = () => {
        return variant === 'outline' ? 1 : 0;
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    backgroundColor: getBackgroundColor(),
                    borderColor: colors.primary,
                    borderWidth: getBorderWidth(),
                },
                style
            ]}
            disabled={disabled || loading}
            activeOpacity={0.8}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <Text style={[styles.text, { color: getTextColor() }]}>
                    {label}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 50,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
});
