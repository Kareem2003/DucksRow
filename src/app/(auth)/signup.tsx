import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../../store/useThemeStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { LanguageToggle } from '../../components/ui/LanguageToggle';
import { authService } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export default function SignupScreen() {
    const router = useRouter();
    const { colors } = useThemeStore();
    const { t } = useLanguageStore();
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignup = async () => {
        if (!username || !email || !password) {
            showToast(t('signup_error_empty'), 'error');
            return;
        }

        setIsLoading(true);
        try {
            await authService.register({ username, email, password });
            showToast(t('signup_success'), 'success');
            router.replace('/(tabs)/home');
        } catch (error: any) {
            showToast(error.message || t('signup_error_generic'), 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.header}>
                        <View style={styles.topBar}>
                            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                                <Ionicons name="arrow-back" size={24} color={colors.text} />
                            </TouchableOpacity>
                            <LanguageToggle showLabel={true} />
                        </View>
                        <Text style={[styles.title, { color: colors.text }]}>{t('signup_title')}</Text>
                        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                            {t('signup_subtitle')}
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={[styles.label, { color: colors.text }]}>{t('fullname_label')}</Text>
                            <TextInput
                                style={[styles.input, {
                                    backgroundColor: colors.card,
                                    color: colors.text,
                                    borderColor: colors.border
                                }]}
                                placeholder={t('fullname_placeholder')}
                                placeholderTextColor={colors.textSecondary}
                                value={username}
                                onChangeText={setUsername}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={[styles.label, { color: colors.text }]}>{t('email_label')}</Text>
                            <TextInput
                                style={[styles.input, {
                                    backgroundColor: colors.card,
                                    color: colors.text,
                                    borderColor: colors.border
                                }]}
                                placeholder={t('email_placeholder')}
                                placeholderTextColor={colors.textSecondary}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={[styles.label, { color: colors.text }]}>{t('password_label')}</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={[styles.input, styles.passwordInput, {
                                        backgroundColor: colors.card,
                                        color: colors.text,
                                        borderColor: colors.border
                                    }]}
                                    placeholder={t('password_placeholder')}
                                    placeholderTextColor={colors.textSecondary}
                                    secureTextEntry={!showPassword}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity
                                    style={styles.eyeIcon}
                                    onPress={() => setShowPassword(!showPassword)}
                                >
                                    <Ionicons
                                        name={showPassword ? 'eye-off' : 'eye'}
                                        size={24}
                                        color={colors.textSecondary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <PrimaryButton
                            label={t('signup_button')}
                            onPress={handleSignup}
                            loading={isLoading}
                            style={{ marginTop: 24 }}
                        />
                    </View>

                    <View style={styles.footer}>
                        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                            {t('has_account')}
                        </Text>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={[styles.linkText, { color: colors.primary }]}>{t('login_link')}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
        padding: 24,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    header: {
        marginBottom: 32,
        gap: 10,
    },
    backButton: {
        position: 'absolute',
        left: 0,
        zIndex: 10,
    },
    title: {
        fontSize: 27,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
    },
    form: {
        flex: 1,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        height: 52,
        borderRadius: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        fontSize: 16,
    },
    passwordContainer: {
        position: 'relative',
    },
    passwordInput: {
        paddingRight: 50,
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
        top: 14,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 20,
    },
    footerText: {
        fontSize: 15,
    },
    linkText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
});
