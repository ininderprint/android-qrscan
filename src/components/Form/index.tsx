import React, { Component, useState } from 'react';
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

interface FormProps {
  children: React.ReactNode;
}

export const Form = ({
  children
}: FormProps) => {

  return (
    <View style={[styles.form]}>
      {children}
    </View>
  );
}

interface FormItemProps {
  label: string;
  children?: React.ReactNode;
}

export const FormItem = ({
  label,
  children
}: FormItemProps) => {
  return (
    <View style={[styles.form_item, M['flexbox-horizontal'], M['vertical-middle']]}>
      <View style={[styles.form_label, M['vertical-middle']]}>
        <Text style={[M['f-s-13'], M['f-c-333']]}>{label}:</Text>
      </View>
      <View style={[styles.form_widget, M['flex-item'], M['vertical-middle']]}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
  },
  form_item: {
    marginTop: px(30)
  },
  form_label: {
    minWidth: px(150),
    height: px(60)
  },
  form_widget: {
    minHeight: px(60)
  }
})
