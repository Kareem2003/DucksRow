import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../../store/useThemeStore';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

export default function SignupScreen() {
    const router = useRouter();
    const { colors } = useThemeStore();
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = () => {
        setIsLoading(true);
        // Simulate fake network request
        setTimeout(() => {
            setIsLoading(false);
            router.replace('/(tabs)/home');
        }, 1000);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.text} />
                </TouchableOpacity>

                <View style={styles.header}>
                    <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                        Join us and start exploring the best places in town.
                    </Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={[styles.label, { color: colors.text }]}>Full Name</Text>
                        <TextInput
                            style={[styles.input, {
                                backgroundColor: colors.card,
                                color: colors.text,
                                borderColor: colors.border
                            }]}
                            placeholder="John Doe"
                            placeholderTextColor={colors.textSecondary}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={[styles.label, { color: colors.text }]}>Email</Text>
                        <TextInput
                            style={[styles.input, {
                                backgroundColor: colors.card,
                                color: colors.text,
                                borderColor: colors.border
                            }]}
                            placeholder="user@example.com"
                            placeholderTextColor={colors.textSecondary}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={[styles.label, { color: colors.text }]}>Password</Text>
                        <TextInput
                            style={[styles.input, {
                                backgroundColor: colors.card,
                                color: colors.text,
                                borderColor: colors.border
                            }]}
                            placeholder="••••••••"
                            placeholderTextColor={colors.textSecondary}
                            secureTextEntry
                        />
                    </View>

                    <PrimaryButton
                        label="Create Account"
                        onPress={handleSignup}
                        loading={isLoading}
                        style={{ marginTop: 24 }}
                    />
                </View>

                <View style={styles.footer}>
                    <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                        Already have an account?
                    </Text>
                    <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                        <Text style={[styles.linkText, { color: colors.primary }]}>Sign In</Text>
                    </TouchableOpacity>
                </View>
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
    header: {
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
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
