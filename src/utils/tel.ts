import { Linking, Platform } from 'react-native';
import { $toast } from '@/components/mengti-ui/react-native';

export const $sendMsm = (phone: string[], body?: string) => {
  const url = `sms:${phone.join(';')}${Platform.OS === 'android' ? '?' : '&'}body=${body}`;
  Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      $toast('由于您的手机设置 无法帮您发送短信')
    } else {
      //安装了就打开
      return Linking.openURL(url)
    }
  }).catch(err => $toast('由于您的手机设置 无法帮您发送短信'));
}

export const $callTel = (phone: string) => {
  const url = `tel:${phone}`;
  Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      $toast('由于您的手机设置 无法帮您拨打电话')
    } else {
      //安装了就打开
      return Linking.openURL(url)
    }
  }).catch(err => $toast('由于您的手机设置 无法帮您拨打电话'));
}
