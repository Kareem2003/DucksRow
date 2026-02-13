import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import en from './en.json';
import ar from './ar.json';
import { I18nManager } from 'react-native';

const i18n = new I18n({
    en,
    ar
});

// Set initial locale based on system or fallback
i18n.locale = getLocales()[0]?.languageCode || 'en';
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

export default i18n;

export const isRTL = i18n.locale.startsWith('ar');
