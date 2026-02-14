import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '../../store/useThemeStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { Ionicons } from '@expo/vector-icons';
import { authService } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { useAuthStore } from '../../store/useAuthStore';
import { CustomAlert } from '../../components/ui/CustomAlert';
import { LanguageToggle } from '../../components/ui/LanguageToggle';

export default function ProfileScreen() {
    const router = useRouter();
    const { colors, mode, toggleTheme } = useThemeStore();
    const { t } = useLanguageStore();
    const { showToast } = useToast();
    const { user } = useAuthStore();
    const [logoutAlertVisible, setLogoutAlertVisible] = useState(false);

    const handleLogoutPress = () => {
        setLogoutAlertVisible(true);
    };

    const confirmLogout = async () => {
        setLogoutAlertVisible(false);
        try {
            await authService.logout();
            showToast(t('logout_success'), 'success');
            router.replace('/(auth)/login');
        } catch (error) {
            showToast(t('logout_error'), 'error');
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>{t('profile_title')}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.profileHeader}>
                    <Image
                        source={{ uri: user?.avatar_url || 'https://randomuser.me/api/portraits/men/32.jpg' }}
                        style={styles.avatar}
                    />
                    <Text style={[styles.name, { color: colors.text }]}>{user?.username || t('guest_user')}</Text>
                    <Text style={[styles.email, { color: colors.textSecondary }]}>{user?.email || t('no_email')}</Text>
                </View>

                <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <View style={[styles.iconContainer, { backgroundColor: colors.background }]}>
                                <Ionicons name={mode === 'dark' ? 'moon' : 'sunny'} size={20} color={colors.primary} />
                            </View>
                            <Text style={[styles.rowLabel, { color: colors.text }]}>{t('dark_mode')}</Text>
                        </View>
                        <Switch
                            value={mode === 'dark'}
                            onValueChange={toggleTheme}
                            trackColor={{ false: '#767577', true: colors.primary }}
                            thumbColor={'#f4f3f4'}
                        />
                    </View>
                </View>

                <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <View style={[styles.iconContainer, { backgroundColor: colors.background }]}>
                                <Ionicons name="language" size={20} color={colors.primary} />
                            </View>
                            <Text style={[styles.rowLabel, { color: colors.text }]}>{t('language')}</Text>
                        </View>
                        <LanguageToggle showLabel={true} />
                    </View>
                </View>

                <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <TouchableOpacity style={styles.row}>
                        <View style={styles.rowLeft}>
                            <View style={[styles.iconContainer, { backgroundColor: colors.background }]}>
                                <Ionicons name="star-outline" size={20} color={colors.primary} />
                            </View>
                            <Text style={[styles.rowLabel, { color: colors.text }]}>{t('my_reviews')}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>

                    <View style={[styles.divider, { backgroundColor: colors.border }]} />

                    <TouchableOpacity style={styles.row}>
                        <View style={styles.rowLeft}>
                            <View style={[styles.iconContainer, { backgroundColor: colors.background }]}>
                                <Ionicons name="settings-outline" size={20} color={colors.primary} />
                            </View>
                            <Text style={[styles.rowLabel, { color: colors.text }]}>{t('settings')}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[styles.logoutButton, { borderColor: colors.danger }]}
                    onPress={handleLogoutPress}
                >
                    <Text style={[styles.logoutText, { color: colors.danger }]}>{t('logout_button')}</Text>
                </TouchableOpacity>

                <Text style={[styles.version, { color: colors.textSecondary }]}>{t('version')} 1.0.0</Text>
            </ScrollView>

            <CustomAlert
                visible={logoutAlertVisible}
                title={t('logout_alert_title')}
                message={t('logout_alert_message')}
                icon={<Ionicons name="sad-outline" size={50} color={colors.text} />}
                onConfirm={confirmLogout}
                onCancel={() => setLogoutAlertVisible(false)}
                confirmText={t('logout_alert_confirm')}
                cancelText={t('logout_alert_cancel')}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        paddingTop: 10,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    email: {
        fontSize: 16,
    },
    section: {
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 1,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        marginLeft: 64,
    },
    logoutButton: {
        marginTop: 16,
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
    },
    version: {
        textAlign: 'center',
        marginTop: 32,
        fontSize: 12,
    },
});
