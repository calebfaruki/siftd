import AsyncStorage from "@react-native-async-storage/async-storage";

const COOKIE_KEY = "cookies";

const cookieManager = {
  set: async function set(cookie: string) {
    await AsyncStorage.setItem(COOKIE_KEY, cookie);
  },
  remove: async function remove() {
    await AsyncStorage.removeItem(COOKIE_KEY);
  },
  get: async function get() {
    return await AsyncStorage.getItem(COOKIE_KEY);
  },
};

export default cookieManager;
