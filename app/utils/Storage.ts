import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLocalItem = async ([key, value]: [string, any]) => {
  try {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(`error occurred in setLocalItem: ${e}`);
  }
};

export const getLocalItem: any = async (key: string, isObject: boolean = false) => {
  try {
    if (isObject) {
      const s = await AsyncStorage.getItem(key);
      return s !== null ? JSON.parse(s) : null;
    } else {
      return await AsyncStorage.getItem(key);
    }
  } catch (e) {
    console.error(`error occurred in getLocalItem: ${e}`);
  }
};

export const AsyncStorageKeys = {
  HISTORY: 'history',
};
