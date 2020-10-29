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


interface ButtonProps<T = string> {
  onClick?: () => void;
  children?: string;
}

export const Button = ({
  onClick,
  children
}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onClick} style={[M['flexbox-horizontal']]}>
      <View style={[styles.button, M['center-all']]}>
        <Text style={[styles.text]}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: px(80),
    paddingHorizontal: px(44),
    backgroundColor: '#f9d309',
    borderRadius: px(8)
  },
  text: {
    fontSize: px(40),
    fontWeight: '600',
    color: '#42261a'
  }
})
