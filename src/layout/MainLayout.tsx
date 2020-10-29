import React, { Component } from 'react';
import {observable, action, runInAction} from 'mobx';
import {observer} from 'mobx-react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
  ScrollView,
  Platform,
  RefreshControl,
  Dimensions,
} from 'react-native';

import { $toast, px } from '@/utils';
import { M, setDesignWidth } from '@/components/mengti-ui/react-native';
setDesignWidth(1920);

import SplashScreen from 'react-native-splash-screen';
@observer
export default class PageView extends Component {
  componentWillMount() {
      SplashScreen.hide();
  }

  render() {
    const { children } = this.props;
    return (
      <View style={styles.main_layout}>
        <StatusBar hidden translucent animated />
        <View style={[styles.header_bar, M['flexbox-horizontal'], M['vertical-middle']]}>
          <View style={[M['p-l-20']]}>
            <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
          </View>
          <View style={[M['flex-item']]}>

          </View>
          <View>

          </View>
        </View>
        <View style={[M['flex-item']]}>
          {children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_layout: {
    width: '100%',
    flex: 1,
    backgroundColor: '#F9D309'
  },
  header_bar: {
    height: px(150),
    width: '100%'
  },
  logo: {
    width: px(140),
    height: px(68)
  }
});
