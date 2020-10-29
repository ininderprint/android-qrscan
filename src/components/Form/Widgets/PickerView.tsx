import React, { Component, useState } from 'react';
import {observable, action, runInAction} from 'mobx';
import {observer} from 'mobx-react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { $toast, px } from '@/utils';
import { M } from '@/components/mengti-ui/react-native';


interface PickerViewProps<T = string | number> {
  value: T;
  placeholder?: string;
  style?: ViewStyle;
  onClick?: () => void;
}

export const PickerView = ({
  value,
  placeholder,
  style,
  onClick
}: PickerViewProps) => {
  return (
    <View style={[M['flexbox-horizontal']]}>
      <TouchableOpacity onPress={onClick} style={[styles.picker_view, M['flexbox-horizontal'], M['vertical-middle'], M['p-l-10']]}>
        <View style={[M['p-r-15'], style]}>
          <Text style={[M['f-s-15'], M['f-c-999']]}>{value || placeholder}</Text>
        </View>
        <View style={[M['p-r-5']]}>
          <Image style={styles.picker_view_down} source={require('@/assets/images/xiala.png')} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  picker_view: {
    height: px(58),
    backgroundColor: '#f6f6f6',
    borderRadius: px(40),
    borderWidth: px(1),
    borderColor: '#c7ccdc',
  },
  picker_view_down: {
    width: px(14),
    height: px(10),
  }
})
