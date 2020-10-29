import React, { Component } from 'react';
import { StyleSheet, Text, Platform, Dimensions, View, Image, Button, StyleSheetProperties } from 'react-native';
import { ActivityIndicator } from "@ant-design/react-native";
import { M, fpx, px, $toast } from '@/components/mengti-ui/react-native'
import {WebView} from 'react-native-webview';
import { runInAction, observable } from 'mobx';
import { observer } from 'mobx-react';
const deviceWidth = Dimensions.get('window').width;

interface IProps {
  type?: 'node' | 'text'
  text: string;
}

const injectedJavaScript = `
(function () {
  var height = null;
  function changeHeight() {
    if (document.body.scrollHeight != height) {
      height = document.body.scrollHeight;
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'setHeight',
          data: height,
        }));
      } else {
        if (window.postMessage) {
          window.postMessage(JSON.stringify({
            type: 'setHeight',
            data: height,
          }));
        }
      }
    }
  }
  setInterval(changeHeight, 100);
}());
`;
@observer
class RichText extends React.Component<IProps> {

  @observable webviewHeight = 500;

  onMessageActions: any = {
    setHeight: (height: number) => {
      if (height > 0) {
        runInAction(() => {
          this.webviewHeight = height;
        });
      }
    },
  };

  render() {
    const content = this.props.text;
    if (!content) return null;
    return (
      <WebView
        style={{width: deviceWidth, height: this.webviewHeight }}
        originWhitelist={['*']}
        mixedContentMode='always'
        scalesPageToFit={true}
        scrollEnabled={false}
        javaScriptEnabled
        injectedJavaScript={injectedJavaScript}
        bounces={false}
        source={{html: `<!DOCTYPE html><html><head><title>ok</title><meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,minimal-ui"><style>body,html{max-width: 100%;width: 100%;overflow-x: hidden;}img {width: 100%;max-width: 100%;vertical-align:top;}*{box-sizing: border-box;padding:0;margin:0;}</style></head><body><div style="padding: 0 10px;max-width: 100%;">${content}</div></body></html>`}}
        onMessage={(event) => {
          try {
            const eventData = Platform.OS === 'ios' ?
              decodeURIComponent(decodeURIComponent(event.nativeEvent.data))
              : event.nativeEvent.data;
            const action = JSON.parse(eventData);
            const { type, data } = action;
            if (Object.prototype.hasOwnProperty.call(this.onMessageActions, type)) {
              this.onMessageActions[type](data);
            }
          } catch (error) {}
        }}
        // onNavigationStateChange={(title: any)=>{
        //   if(title.title != undefined && title.title !== 'ok') {
        //     runInAction(() => {
        //       const height = (parseInt(title.title)+50)
        //       $toast(height + '')
        //       if (!isNaN(height)) {
        //         this.webviewHeight = height;
        //       }
        //     })
        //   }
        // }}
      />
    );
  }

}

export default RichText;
