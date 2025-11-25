import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import zh from './locales/zh.json';
import id from './locales/id.json';

// Supported languages
const supportedLanguages = ['en', 'zh', 'id'];

// Function to normalize language code
const normalizeLanguage = (lang: string): string => {
  // Convert to lowercase
  lang = lang.toLowerCase();
  
  // Handle Chinese variants
  if (lang.startsWith('zh')) {
    return 'zh';
  }
  
  // Handle Indonesian variants
  if (lang.startsWith('id')) {
    return 'id';
  }
  
  // Handle English variants
  if (lang.startsWith('en')) {
    return 'en';
  }
  
  // Default to English if not supported
  return 'en';
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
      id: { translation: id },
    },
    fallbackLng: 'en',
    supportedLngs: supportedLanguages,
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // Check navigator first, then localStorage, then htmlTag
      order: ['navigator', 'localStorage', 'htmlTag'],
      caches: ['localStorage'],
      // Convert detected language to our supported format
      convertDetectedLanguage: (lng: string) => {
        return normalizeLanguage(lng);
      },
      // Look for language in these places
      lookupLocalStorage: 'i18nextLng',
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
    },
  });

export default i18n;

