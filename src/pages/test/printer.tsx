import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, NativeEventEmitter, NativeModules } from 'react-native';
import { $toast, px } from '@/utils';

import { NavigationScreenProps } from 'react-navigation';
import { observer } from 'mobx-react';
import { IPrinter } from '@/type/printer';
import Qrscan from 'react-native-qrscan';
import { IDocument } from '@/type/document';
import { $alert } from '@/components/mengti-ui/react-native';

@observer
export default class PageView extends Component<NavigationScreenProps> {

  eventEmitter: any;
  componentDidMount() {
    // ...
    const eventEmitter = new NativeEventEmitter(NativeModules.Qrscan);
    this.eventEmitter = eventEmitter.addListener('DecodeQrcode', (event) => {
      //  console.log(event) // "someValue"
      alert(event.qrcode)
    })
    // ...
  }

  componentWillUnmount() {
    this.eventEmitter.remove(); // Removes the listener
  }

  startDecode = () => {
    Qrscan.startDecode().then(() => {
      
    }).catch((e) => {})
  }

  openLink = () => {
    Qrscan.open().then((res) => {
      console.log('[ers] ', res);
      $toast('已打开')
    }).catch((e) => {
      $toast('打开失败')
    });
  }

  closeLink = () => {
    Qrscan.close().then((res) => {
      console.log('[ers] ', res);
    }).catch((e) => {});
  }

  openLight = (isOpen: boolean) => {
    Qrscan.light(isOpen).then((res) => {
      console.log('[ers] ', res);
    }).catch((e) => {});
  }

  render() {
    return (
      <ScrollView>
        <View style={{ paddingHorizontal: 50, paddingTop: 20 }}>
          <View>
            <Text>printer</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity onPress={this.openLink}>
              <Text>连接扫码器</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity onPress={this.closeLink}>
              <Text>断开扫码器</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity onPress={this.openLight.bind(this, true)}>
              <Text>打开背光</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity onPress={this.openLight.bind(this, false)}>
              <Text>关闭背光</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity onPress={this.startDecode}>
              <Text>开始解码</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
