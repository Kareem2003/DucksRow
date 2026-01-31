import { DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { SPACING, RADIUS } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '../store/useThemeStore';
import i18n from '../i18n';

export function CustomDrawerContent(props: any) {
    const router = useRouter();
    const pathname = usePathname();
    const { colors, mode, toggleTheme, locale, setLocale } = useThemeStore();

    const menuItems = [
        { label: 'Dashboard', icon: 'home-outline', route: '/' },
    ];

    const toggleLanguage = () => {
        setLocale(locale === 'en' ? 'ar' : 'en');
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            {/* Header Profile Section */}
            <SafeAreaView edges={['top']} style={{ padding: SPACING.m, backgroundColor: colors.background }}>
                <View style={styles.profileRow}>
                    <View style={[styles.avatar, { backgroundColor: colors.card }]}>
                        <Ionicons name="person" size={32} color={colors.textSecondary} />
                    </View>
                    <View>
                        <Text style={[styles.profileName, { color: colors.text }]}>User Name</Text>
                        <Text style={[styles.profileSub, { color: colors.textSecondary }]}>App Template</Text>
                    </View>
                    <TouchableOpacity style={{ marginLeft: 'auto' }}>
                        <Ionicons name="notifications-outline" size={24} color={colors.textSecondary} />
                    </TouchableOpacity>
                </View>

                {/* Theme Toggle */}
                <View style={[styles.menuItem, { justifyContent: 'space-between', paddingVertical: 0, marginBottom: SPACING.s }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: SPACING.m }}>
                        <Ionicons name={mode === 'dark' ? 'moon-outline' : 'sunny-outline'} size={24} color={colors.text} />
                        <Text style={[styles.menuLabel, { color: colors.text }]}>{mode === 'dark' ? 'Dark Mode' : 'Light Mode'}</Text>
                    </View>
                    <Switch
                        value={mode === 'dark'}
                        onValueChange={toggleTheme}
                        trackColor={{ false: '#767577', true: colors.primary }}
                        thumbColor={'#f4f3f4'}
                    />
                </View>

                {/* Language Toggle */}
                <View style={[styles.menuItem, { justifyContent: 'space-between', paddingVertical: 0 }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: SPACING.m }}>
                        <Ionicons name="language-outline" size={24} color={colors.text} />
                        <Text style={[styles.menuLabel, { color: colors.text }]}>{i18n.t('language')}</Text>
                    </View>
                    <TouchableOpacity onPress={toggleLanguage} style={{ backgroundColor: colors.card, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 1, borderColor: colors.border }}>
                        <Text style={{ fontWeight: 'bold', color: colors.primary }}>{locale === 'en' ? 'English' : 'العربية'}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
                <View style={{ padding: SPACING.s }}>
                    <View style={[styles.divider, { backgroundColor: colors.border }]} />

                    {/* Main Menu */}
                    {menuItems.map((item, index) => {
                        const isActive = item.route === '/'
                            ? pathname === '/' || pathname === '/index'
                            : pathname.startsWith(item.route);
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[styles.menuItem, isActive && { backgroundColor: mode === 'dark' ? '#1E293B' : '#E0F2FE' }]}
                                onPress={() => router.push(item.route as any)}
                            >
                                <Ionicons
                                    name={item.icon as any}
                                    size={24}
                                    color={isActive ? '#3B82F6' : colors.text}
                                />
                                <Text style={[styles.menuLabel, { color: isActive ? '#3B82F6' : colors.text }]}>{item.label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </DrawerContentScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    profileRow: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.m, gap: SPACING.m },
    avatar: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
    profileName: { fontWeight: 'bold', fontSize: 18 },
    profileSub: { fontSize: 14 },
    menuItem: { flexDirection: 'row', alignItems: 'center', gap: SPACING.m, paddingVertical: SPACING.m, paddingHorizontal: SPACING.s, borderRadius: RADIUS.m },
    menuLabel: { fontSize: 16, fontWeight: '500' },
    divider: { height: 1, marginVertical: SPACING.s },
    badge: { backgroundColor: '#3B82F6', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 'auto' },
    badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' }
});
