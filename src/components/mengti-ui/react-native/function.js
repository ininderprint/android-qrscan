import {Platform} from 'react-native';

import {ActionSheet, Modal, Toast} from '@ant-design/react-native';

import $modal from './modal.native';

// import ImagePicker from 'react-native-image-picker';
import ImagePreviewModal from './components/imagePreviewModal';

// export const $modal = function({
//       shadow: true,
//     transition: 'material-in-out',
//     params: {
//       buynow,
//       goods,
//       onSelect: (sku, num = 1) => {
//         buy(num, sku)
//       }
//   },
//   component: require('@/components/skuSelect.vue'),
// }) {

// }

/**
 * options (array of strings) - 按钮标题列表 (required)
 * cancelButtonIndex (int) - 按钮列表中取消按钮的索引位置
 * destructiveButtonIndex (int) - 按钮列表中破坏性按钮（一般为删除）的索引位置
 * title (string) - 顶部标题
 * message (string/React.element) - 顶部标题下的简要消息
 */
export const $actionSheet = function({
  buttons = [],
  title = '提示',
  message,
  cancelButtonIndex,
  destructiveButtonIndex,
} = {}) {
  return new Promise((resolve, reject) => {
    ActionSheet.showActionSheetWithOptions(
      {
        title,
        message,
        options: buttons,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      index => {
        resolve(index);
      },
    );
  });
};

export const $alert = (message = '', title = '提示', buttonText = '知道了') => {
  return new Promise((resolve, reject) => {
    const alertInstance = Modal.alert(title, message, [
      // { text: '', onPress: () => console.log('cancel'), style: 'default' },
      {
        text: buttonText,
        onPress: () => resolve(),
      },
    ]);
    // setTimeout(() => {
    //   // 可以调用close方法以在外部close
    //   console.log('auto close');
    //   alertInstance.close();
    // }, 500000);
  });
};

export const $confirm = (
  message = '',
  title = '提示',
  {confirmText = '确定', cancelText = '取消'} = {},
) => {
  return new Promise((resolve, reject) => {
    Modal.alert(title, message, [
      {
        text: cancelText,
        onPress: () => reject(),
        style: 'default',
      },
      {
        text: confirmText,
        onPress: () => resolve(),
      },
    ]);
  });
};

export const $toast = (message = '', duration = 1.5) => {
  Toast.info(message, duration, null, false);
};

export const $selectImageFromCamera = function(options) {
  return new Promise((resolve, reject) => {
    let params = {
      mediaType: 'photo',
      ...options,
    };
    ImagePicker.launchCamera(params, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        reject(response);
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        reject(response);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        reject(response);
      } else {
        resolve(response);
      }
    });
  });
};

export const $selectImageFromLibrary = function(options) {
  return new Promise((resolve, reject) => {
    let params = {
      mediaType: 'photo',
      ...options,
    };
    ImagePicker.launchImageLibrary(params, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        reject(response);
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        reject(response);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        reject(response);
      } else {
        resolve(response);
      }
    });
  });
};

export const $selectImage = options => {
  console.log('[options] ', options);
  if (options.from === 'camera') return $selectImageFromCamera(options);
  if (options.from === 'library') return $selectImageFromLibrary(options);
  let params = {
    title: '请选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '相册',
    mediaType: 'photo',
    ...options,
  };
  return new Promise((resolve, reject) => {
    // console.log(params)
    ImagePicker.showImagePicker(params, response => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
        reject(response);
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        reject(response);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        reject(response);
      } else {
        resolve(response);
      }
    });
  });
};

export const $previewImage = params => {
  $modal({
    Component: ImagePreviewModal,
    params,
  });
};
