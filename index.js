/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { View } from 'react-native';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
  'Require cycle: src/store/modules/auth.ts -> src/store/modules/shop.ts -> src/utils/index.ts -> src/utils/api.ts -> src/store/modules/auth.ts',
  'Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.',
  'Warning: componentWillMount is deprecated and will be removed in the next major version. Use componentDidMount instead. As a temporary workaround, you can rename to UNSAFE_componentWillMount.',
  "Accessing view manager configs directly off UIManager via UIManager['getConstants'] is no longer supported. Use UIManager.getViewManagerConfig('getConstants') instead.",
  "Warning: Async Storage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-community/async-storage' instead of 'react-native'. See https://github.com/react-native-community/react-native-async-storage",
  "Warning: Slider has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-community/slider' instead of 'react-native'. See https://github.com/react-native-community/react-native-slider",
  'Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).',
  'Warning: componentWillReceiveProps is deprecated and will be removed in the next major version',
  'YellowBox has been replaced with LogBox',
  'ReactNativeFiberHostComponent',
  'componentWillMount has been rename'
]);

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    error: () => {},
    assert: () => {},
    time: () => {},
    timeEnd: () => {},
  };
}

// import { name as appName } from './app.json';
AppRegistry.registerComponent('app', () => App);
