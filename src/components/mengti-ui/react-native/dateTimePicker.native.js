import React from 'react';
import { Platform, DatePickerAndroid, TimePickerAndroid } from 'react-native';
import DateTimePickerModal from './components/dateTimePickerModal';
import topView from 'rn-topview';
import moment from 'dayjs';

export default function a({
  value = new Date(),
  mode = 'date',
  minDate = new Date('1970-01-01'),
  maxDate = new Date('2030-12-30'),
  onChange
}) {

  if (typeof value === 'string' && mode !== 'time') {
    value = value ? new Date(value) : new Date()
  }

  // 判断时间
  if (mode === 'time') {
    let v = value.split(':')
    if (v.length !== 2) {
      value = new Date()
    } else {
      value = new Date('2019-01-01 ' + value)
    }
  }

  const onClose = (visible) => {
    if (!visible) {
      topView.remove();
    }
  };

  if (Platform.OS === 'ios') {
    topView.set(
      <DateTimePickerModal
        value={ value }
        mode={ mode }
        minDate={ minDate }
        maxDate={ maxDate }
        onChange={ onChange }
        onClose={ onClose }
      />
    );
  } else {
    if (mode === 'date') {
      DatePickerAndroid.open({
        // 要设置默认值为今天的话，使用`new Date()`即可。
        // 下面显示的会是2020年5月25日。月份是从0开始算的。
        minDate,
        maxDate,
        date: value
      }).then(({ action, year, month, day }) => {
        if (action !== DatePickerAndroid.dismissedAction) {
          let val = `${year}-${month + 1}-${day}`
          let _D = moment(val).format('YYYY-MM-DD')
          onChange(_D, new Date(val), {
            year, month: month + 1, day
          })
        }
      }).catch(e => {})
    } else if (mode === 'time') {
      TimePickerAndroid.open({
        hour: value.split(':')[0] * 1,
        minute: value.split(':')[1] * 1,
        is24Hour: true
      }).then(({action, hour, minute}) => {
        if (action !== TimePickerAndroid.dismissedAction) {
          let val = `${ hour < 10 ? '0' + hour : hour }:${ minute < 10 ? '0' + minute : minute }`
          onChange(val)
        }
      })
    } else if (mode === 'datetime') {
      DatePickerAndroid.open({
        // 要设置默认值为今天的话，使用`new Date()`即可。
        // 下面显示的会是2020年5月25日。月份是从0开始算的。
        minDate,
        maxDate,
        date: value
      }).then(({ action, year, month, day }) => {
        if (action !== DatePickerAndroid.dismissedAction) {
          TimePickerAndroid.open({
            hour: value.getHours(),
            minute: value.getMinutes(),
            is24Hour: true
          }).then(({action, hour, minute}) => {
            if (action !== TimePickerAndroid.dismissedAction) {
              let val = `${year}-${month + 1}-${day} ${ hour < 10 ? '0' + hour : hour }:${ minute < 10 ? '0' + minute : minute }`
              let _D = moment(val).format('YYYY-MM-DD HH:mm')
              onChange(_D, new Date(val))
            }
          })
        }
      }).catch(e => {})
    }
  }
}