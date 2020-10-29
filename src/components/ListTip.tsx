import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, StyleSheetProperties } from 'react-native';
import { ActivityIndicator } from "@ant-design/react-native";
import { M, fpx, px } from '@/components/mengti-ui/react-native'

interface ListTipProps {
  loading: boolean;
  nodata: boolean;
  style: any
}
class listTip extends React.Component<ListTipProps> {

  render() {
    return (
      <View style={[ s.main, M["center-all"], { ...this.props.style } ]}>
        { (this.props.loading && !this.props.nodata) && (<ActivityIndicator text="正在加载..." />)}
        { this.props.nodata && (<Text style={[ M["f-s-14"] ]}> 没有更多了 </Text>)}
      </View>
    );
  }

}

const s = StyleSheet.create({
  main: {
    height: px(80)
  }
});
export default listTip