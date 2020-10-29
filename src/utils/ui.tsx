import React from 'react';
import { px as RnPx, $toast as _toast, $confirm as _confirm, $alert as _alert } from '@/components/mengti-ui/react-native';
import { Toast } from 'teaset';

export const px = RnPx;

export const $prewView = function(url: string, urls: string[]) {
  console.log('[$prewView] ', url, urls);
  // Taro.previewImage({
  //   current: url, // 当前显示图片的http链接
  //   urls: urls || [url] // 需要预览的图片http链接列表
  // })
};

export const $toast = (message: string) => {
  Toast.message(message);
};

export const $confirm = _confirm;

export const $message = {
  success: _toast,
  error: _toast,
  info: _toast,
};

export const $alert = _alert;

export const initPx = (styleObj: any) => {
  if (styleObj.isInited) return styleObj;
  for (const className in styleObj) {
    if (styleObj.hasOwnProperty(className)) {
      // console.log('[className] ', className)
      const classStyleItem = styleObj[className];
      for (const k in classStyleItem) {
        // console.log('[k] ', k)
        if (classStyleItem.hasOwnProperty(k)) {
          let value: number = classStyleItem[k];
          // console.log('[value] ', value)
          if (typeof value === 'number') {
            classStyleItem[k] = px(value);
          }
        }
      }
    }
  }
  // console.log('[styleObj] ', styleObj)
  styleObj.isInited = true;
  return styleObj;
};
