import { $alert, $confirm, $actionSheet } from '../components/mengti-ui/react-native';
import { qiniuDomain } from '../config';
import { $service } from './api';

import { Toast, Portal } from '@ant-design/react-native';

import ImagePicker from 'react-native-image-crop-picker';

export const $qiniu = function(hash: string, index = 0, source: boolean = false) {
  if (typeof hash == 'string' && hash.slice(0, 4) == 'http') return hash;
  let zip = source ? '' : '?imageView2/0/w/847/h/640/format/jpg';
  if (hash.split(',').length > 1) {
    let hashs = hash.split(',');
    return hashs[index] ? qiniuDomain + hashs[index] + zip : '';
  } else {
    return hash ? qiniuDomain + hash + zip : '';
  }
};

/**
 * 图片上传
 */

// import ImagePicker from 'react-native-image-crop-picker';

export const $selectImage = ({
  width = 1000,
  height = 1000,
  multiple = false,
  cropping = false,
  mediaType = 'photo',
  cropperChooseText = '确定',
  cropperCancelText = '取消',
  ...options
}) => {
  console.log('[options] ', options);
  return new Promise((resolve, reject) => {
    let params = {
      width,
      height,
      multiple,
      cropping,
      mediaType,
      includeBase64: true,
      cropperChooseText,
      cropperCancelText,
      ...options,
    };
    $actionSheet({
      message: '请选择图片来源',
      destructiveButtonIndex: false,
      buttons: ['拍照', '选择本地图片', '取消'],
      cancelButtonIndex: 2,
    }).then((index: number) => {
      if (index === 0) {
        ImagePicker.openCamera(params)
          .then((image) => {
            resolve(image);
          })
          .catch((e) => {
            reject(e);
          });
      } else if (index === 1) {
        ImagePicker.openPicker(params)
          .then((image) => {
            resolve(image);
          })
          .catch((e) => {
            reject(e);
          });
      } else {
      }
    });
  });
};

export const $uploadImage = function(options: any) {
  let loadingToastKey: number | null = null;
  return new Promise((resolve, reject) => {
    $selectImage(options)
      .then(async (ret: any) => {
        // console.log(222, ret)
        if (ret && ret.data) {
          loadingToastKey = Toast.loading('上传中', 100);
          console.log('uploading start', ret);
          // let data = ret.data.split(';')
          const base64 = ret.data;
          let file = {
            name: Date.now(),
            type: ret.mime,
            size: ret.size,
            uid: Date.now() + ret.size,
            w: ret.width,
            h: ret.height,
          };
          // get up token
          let upToken = await $service('file', 'getUpToken', file);
          console.log('upToken:', upToken);
          var taking;
          var startDate = new Date().getTime();
          var xhr = new XMLHttpRequest();
          xhr.upload.addEventListener('progress', function(evt: any) {
            console.log('uploading progress');
            if (evt.lengthComputable) {
              var nowDate = new Date().getTime();
              taking = nowDate - startDate;
              var x = evt.loaded / 1024;
              var y = taking / 1000;
              var uploadSpeed = x / y;
              var formatSpeed;
              if (uploadSpeed > 1024) {
                formatSpeed = (uploadSpeed / 1024).toFixed(2) + 'Mb/s';
              } else {
                formatSpeed = uploadSpeed.toFixed(2) + 'Kb/s'; //速度
              }
              var percentComplete = Math.round((evt.loaded * 100) / evt.total); //进度
              console.log('进度:', percentComplete);
            }
          });
          xhr.onreadystatechange = () => {
            console.log('xhr.responseText:', xhr.responseText);
            try {
              if (xhr.readyState == 4) {
                console.log('[responseText] ', xhr.responseText);
                var jsondata = JSON.parse(xhr.responseText);
                console.log('[jsondata] ', jsondata);
                // 回调
                let params = {
                  uid: file.uid,
                  hash: jsondata.hash,
                };
                $service('file', 'callback', params)
                  .then((res) => {
                    if (loadingToastKey) Portal.remove(loadingToastKey);
                    resolve({
                      hash: jsondata.hash,
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            } catch (e) {
              console.log('upload fail:', e);
            }
          };
          var url = 'http://upload.qiniu.com/putb64/-1';
          xhr.open('POST', url, true);
          xhr.setRequestHeader('Content-Type', 'application/octet-stream');
          xhr.setRequestHeader('Authorization', 'UpToken ' + upToken);
          xhr.send(base64);
        }
      })
      .catch((e: any) => {
        console.log(222, e);
        reject(e);
      });
  });
};
