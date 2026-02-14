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

export default function LoginScreen() {
    const router = useRouter();
    const { colors } = useThemeStore();
    const { t } = useLanguageStore();
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            showToast(t('login_error_empty'), 'error');
            return;
        }

        setIsLoading(true);
        try {
            await authService.login({ email, password });
            showToast(t('login_success'), 'success');
            router.replace('/(tabs)/home');
        } catch (error: any) {
            showToast(error.message || t('login_error_generic'), 'error');
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
                    {/* <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={colors.text} />
                    </TouchableOpacity> */}

                    <View style={styles.topBar}>
                        <LanguageToggle showLabel={true} />
                    </View>

                    <View style={styles.header}>
                        <Text style={[styles.title, { color: colors.text }]}>{t('login_title')}</Text>
                        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                            {t('login_subtitle')}
                        </Text>
                    </View>

                    <View style={styles.form}>
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

                        <TouchableOpacity style={styles.forgotPassword}>
                            <Text style={[styles.forgotText, { color: colors.primary }]}>{t('forgot_password')}</Text>
                        </TouchableOpacity>

                        <PrimaryButton
                            label={t('login_button')}
                            onPress={handleLogin}
                            loading={isLoading}
                            style={{ marginTop: 24 }}
                        />
                    </View>

                    <View style={styles.footer}>
                        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                            {t('no_account')}
                        </Text>
                        <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                            <Text style={[styles.linkText, { color: colors.primary }]}>{t('signup_link')}</Text>
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
    backButton: {
        marginBottom: 20,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    header: {
        marginBottom: 32,
        gap: 10,
    },
    title: {
        fontSize: 27,
        fontWeight: 'bold',
        marginBottom: 8,
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
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    forgotText: {
        fontSize: 14,
        fontWeight: '600',
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
