import AsyncStorage from "@react-native-async-storage/async-storage";

// Storage keys constants
export const STORAGE_KEYS = {
  USER: "USER",
  BIOMETRIC_ENABLED: "BIOMETRIC_ENABLED",
} as const;

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

/**
 * Store data in AsyncStorage
 */
export const storeData = async (key: StorageKey, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error storing ${key}:`, error);
    throw error;
  }
};

/**
 * Get data from AsyncStorage
 */
export const getData = async <T = any>(key: StorageKey): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
  } catch (error) {
    console.error(`Error getting ${key}:`, error);
    return null;
  }
};

/**
 * Remove data from AsyncStorage
 */
export const removeData = async (key: StorageKey): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key}:`, error);
    throw error;
  }
};

/**
 * Clear all data from AsyncStorage
 */
export const clearAll = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing storage:", error);
    throw error;
  }
};
