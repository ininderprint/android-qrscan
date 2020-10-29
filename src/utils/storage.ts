import AsyncStorage from '@react-native-community/async-storage';

/**
 * 全局传递数据
 */
const preloadData: any = {};
export const $preload = (name: string, data?: object) => {
  if (typeof data === 'undefined') {
    return preloadData[name];
  } else {
    preloadData[name] = data;
  }
}

export const setItem = function(key: string, value: string) {
  if (typeof value !== 'string') value = String(value)
  return AsyncStorage.setItem(key, value)
}
export const getItem = function(key: string) {
  return new Promise<string>(async (resolve) => {
    let result: string = await AsyncStorage.getItem(key) || ''
    resolve(result)
  })
}
export const removeItem = function(key: string) {
  return AsyncStorage.removeItem(key)
}

export const $storage = {
  setItem,
  getItem,
  removeItem
}
