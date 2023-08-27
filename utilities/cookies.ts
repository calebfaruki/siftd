// storageService.js

import AsyncStorage from "@react-native-async-storage/async-storage";

const COOKIE_KEY = "siftdsecure";

export async function set(cookie: string) {
  await AsyncStorage.setItem(COOKIE_KEY, cookie);
}

export async function get() {
  return await AsyncStorage.getItem(COOKIE_KEY);
}
