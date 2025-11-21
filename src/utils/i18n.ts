import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import { I18nManager } from "react-native";
import * as Updates from "expo-updates";
import { getData, storeData, STORAGE_KEYS } from "./storage";

// Import translation files
import en from "../locales/en.json";
import ar from "../locales/ar.json";

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

// Get saved language or default to device language or English
const getInitialLanguage = async (): Promise<string> => {
  try {
    const savedLanguage = await getData<string>(STORAGE_KEYS.LANGUAGE);
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      return savedLanguage;
    }

    // Check device language
    const locales = Localization.getLocales();
    const deviceLanguage = locales[0]?.languageCode;
    if (deviceLanguage === "ar") {
      return "ar";
    }

    // Default to English
    return "en";
  } catch (error) {
    console.error("Error getting initial language:", error);
    return "en";
  }
};

// Initialize i18n synchronously first with default language
i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  compatibilityJSON: "v4",
  interpolation: {
    escapeValue: false,
  },
});

// Update language after async check
const initI18n = async () => {
  try {
    const language = await getInitialLanguage();
    if (language !== i18n.language) {
      await i18n.changeLanguage(language);
      setRTL(language === "ar");
    } else {
      // Set RTL for current language (don't reload on initial load)
      setRTL(i18n.language === "ar");
    }
  } catch (error) {
    console.error("Error initializing i18n:", error);
  }
};

// Set RTL layout based on language
const setRTL = (isRTL: boolean) => {
  try {
    if (I18nManager.isRTL !== isRTL && I18nManager.forceRTL) {
      I18nManager.forceRTL(isRTL);
    }
  } catch (error) {
    console.error("Error setting RTL:", error);
  }
};

// Change language function
export const changeLanguage = async (language: "en" | "ar") => {
  try {
    await storeData(STORAGE_KEYS.LANGUAGE, language);
    await i18n.changeLanguage(language);
    setRTL(language === "ar");
    await Updates.reloadAsync();
  } catch (error) {
    console.error("Error changing language:", error);
  }
};

// Initialize language preference asynchronously
initI18n();

export default i18n;
