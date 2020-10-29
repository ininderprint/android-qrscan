/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React, { useContext, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, PermissionsAndroid, BackHandler, ToastAndroid, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

/**
 * 请求权限
 */
const requestPermissions = (cb: () => void) => {
  try {
    if (Platform.OS === 'ios') {
      cb && cb();
    } else {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]).then((granted: any) => {
        console.log('[granted] ', granted);
        cb && cb();
      });
    }
  } catch (err) {
    console.log('[requestPermissions error] ', err);
  }
};

/**
 * 退出APP
 */
let lastBackPressed: number;
const onBackButtonPressAndroid = () => {
  if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
    // 最近2秒内按过back键，可以退出应用。
    return false;
  }
  lastBackPressed = Date.now();
  ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
  return true;
};

/**
 * include Mobx Store
 */
const StoreContext = React.createContext({});
import rootStore from '@/store';

import { checkUpdate, $event, px } from '@/utils';

import TestPrinter from '@/pages/test/printer';

export default function() {

  useEffect(() => {
    SplashScreen.hide();

    /**
     * 先监听一次返回键
     */
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onBackButtonPressAndroid);
    }

    return () => {
      if (Platform.OS === 'android') {
        BackHandler.removeEventListener('hardwareBackPress', onBackButtonPressAndroid);
      }
    };
  }, []);
  return (
    <StoreContext.Provider value={rootStore}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="TestPrinter"
          headerMode='none'>
          <Stack.Screen name="TestPrinter" component={TestPrinter} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreContext.Provider>
  );
}
