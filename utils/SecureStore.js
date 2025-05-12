import * as SecureStore from 'expo-secure-store';

export async function saveKey(keyName, value) {
  await SecureStore.setItemAsync(keyName, value);
}

export async function getKey(keyName) {
  return await SecureStore.getItemAsync(keyName);
}

export async function deleteKey(keyName) {
  await SecureStore.deleteItemAsync(keyName);
}
