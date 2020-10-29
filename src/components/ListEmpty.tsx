import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { M, fpx, px } from '@/components/mengti-ui/react-native';

interface ListEmptyProps {
  text: string;
}
export default function(props: ListEmptyProps) {
  return (
    <View style={[s.main, M['center-all']]}>
      <View>
        {/* <Image style={{ width: px(250), height: px(150) }} source={require('@/cross/screens/components/images/no.png')} /> */}
        <View>
          <Text style={[M['text-align-center'], M['f-c-999'], M['m-t-10']]}>{props.text}</Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  main: {
    height: px(750),
  },
});
