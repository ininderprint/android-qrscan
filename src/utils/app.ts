import { $service } from './api';
import { Platform, Linking } from 'react-native';

import { baseVersion, codeVersion, androidAppStoreName } from '@/config';
import { $storage } from './storage';
import { $alert, $confirm, $toast } from '@/components/mengti-ui/react-native';
import mainStore from '@/store/main';

export const checkIsReview = () => {
  // if (Platform.OS === 'android') {
  //   mainStore.isReview = false
  // } else {
  $service('app', 'checkIsReview', {
    os: Platform.OS,
    baseVersion,
    codeVersion,
    androidAppStoreName,
  })
    .then(({ is_review }) => {
      // $toast(is_review)
      // mainStore.isReview = false;
      if (is_review === 0) {
        mainStore.isReview = false;
      }
    })
    .catch((e) => {});
  // }
};

export const checkUpdate = (isZhudong: boolean, is_auth = 0) => {
  $service('app', 'checkUpdate', {
    os: Platform.OS,
    baseVersion,
    codeVersion,
  })
    .then(async (res) => {
      console.log(111, res);
      let { level, url, message, nextVersion } = res;
      // 判断是否用户暂不更新
      let is_cancel = await $storage.getItem('version_is_cancel_' + nextVersion);
      //
      if (level > 0) {
        try {
          if (level === 2) {
            $alert(message, '新版本更新', '立即更新')
              .then((res) => {
                Linking.openURL(url);
              })
              .catch((e) => {});
          }
          if ((level === 1 && is_cancel !== 'true') || (level === 1 && isZhudong)) {
            $confirm(message, '新版本更新', {
              confirmText: '立即更新',
              cancelText: '暂不更新',
            })
              .then((res) => {
                Linking.openURL(url);
              })
              .catch((e) => {
                // 记录已经暂不升级的版本，不再提示
                $storage.setItem('version_is_cancel_' + nextVersion, 'true');
              });
          }
        } catch (e) {}
      } else {
        if (isZhudong) {
          $toast('已经是最新版本');
        }
      }
    })
    .catch((e) => {
      console.log('checkUpdateService error:', e);
    });
};
