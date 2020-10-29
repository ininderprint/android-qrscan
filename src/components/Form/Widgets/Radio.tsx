import React, { Component, useState, useCallback } from 'react';
import {observable, action, runInAction} from 'mobx';
import {observer} from 'mobx-react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import { $toast, px } from '@/utils';
import { M } from '@/components/mengti-ui/react-native';


interface RadioProps<T = string> {
  label: string;
  value: T;
  currentValue: T;
  disabled?: boolean;
  children?: React.ReactNode;
  onChange?: (value: T) => void;
}

export const Radio = ({
  label,
  value,
  currentValue,
  disabled,
  children,
  onChange
}: RadioProps) => {
  const isActive = value === currentValue;

  const onClick = useCallback(() => {
    onChange && onChange(value);
  }, []);

  return (
    <TouchableOpacity onPress={onClick} style={[styles.checkbox_item, M['flexbox-horizontal'], M['vertical-middle'], M['m-r-20']]}>
      <View style={[]}>
        <Image style={styles.checkbox_icon} source={disabled ? require('@/assets/images/checkbox_active_disable.png') : (isActive ? require('@/assets/images/checkbox_active.png') : require('@/assets/images/checkbox.png'))} />
      </View>
      <View style={[M['p-l-5'], ]}>
        <Text style={[M['f-s-13'], (isActive && !disabled) ? M['f-c-333'] : M['f-c-666'], ]}>{label}</Text>
      </View>
      { !!children && <View style={[]}>
        {children}
      </View> }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  checkbox_item: {

  },
  checkbox_icon: {
    width: px(37),
    height: px(37),
  }
})
