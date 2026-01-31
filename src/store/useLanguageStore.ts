import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import { translations, Language } from '../i18n/translations';

interface LanguageState {
    language: Language;
    isRTL: boolean;
    setLanguage: (lang: Language) => void;
    t: (key: keyof typeof translations.en) => string;
}

export const useLanguageStore = create<LanguageState>()(
    persist(
        (set, get) => ({
            language: 'en',
            isRTL: false,
            setLanguage: (lang) => {
                const isRTL = lang === 'ar';
                set({ language: lang, isRTL });

                // Native RTL support
                I18nManager.allowRTL(true);
                I18nManager.forceRTL(isRTL);
            },
            t: (key) => {
                const lang = get().language;
                return translations[lang][key] || key;
            }
        }),
        {
            name: 'language-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
