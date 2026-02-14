import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useThemeStore } from '../../store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';

interface LanguageToggleProps {
    showLabel?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ showLabel = true }) => {
    const { language, setLanguage } = useLanguageStore();
    const { colors } = useThemeStore();

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'ar' : 'en';
        setLanguage(newLang);
    };

    return (
        <TouchableOpacity
            onPress={toggleLanguage}
            style={[styles.container, { borderColor: colors.border, backgroundColor: colors.card }]}
        >
            <Ionicons name="language" size={20} color={colors.primary} />
            {showLabel && (
                <Text style={[styles.text, { color: colors.text }]}>
                    {language === 'en' ? 'English' : 'العربية'}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: 20,
        gap: 8,
        borderWidth: 1,
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
    },
});
