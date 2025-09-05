import * as SecureStore from "expo-secure-store";

export const saveSecureData = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (e) {
    console.error("Error saving secure data", e);
  }
};

export const loadSecureData = async (key: string) => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (e) {
    console.error("Error loading secure data", e);
    return null;
  }
};

export const removeSecureData = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (e) {
    console.error("Error removing secure data", e);
  }
};
