
import * as SecureStore from 'expo-secure-store'

const tokenCache = {
    async getToken(key: string) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },

    async deleteToken(key: string) {
        try {
            return SecureStore.deleteItemAsync(key);
          } catch (err) {
            return;
          }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };
  

export default tokenCache;