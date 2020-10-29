import {StyleSheet, Dimensions, PixelRatio} from 'react-native';
import MtWebviewComponent from './webview';
import {
  $alert as M_$alert,
  $actionSheet as M_$actionSheet,
  $confirm as M_$confirm,
  $toast as M_$toast,
  $selectImage as M_$selectImage,
  $previewImage as M_$previewImage,
} from './function';
import dateTimePicker from './dateTimePicker.native';
import modal from './modal.native';

export const $alert = M_$alert;
export const $actionSheet = M_$actionSheet;
export const $confirm = M_$confirm;
export const $toast = M_$toast;
export const $selectImage = M_$selectImage;
export const $previewImage = M_$previewImage;
export const $dateTimePicker = dateTimePicker;
export const $modal = modal;
export const MtWebview = MtWebviewComponent;

/**
 * 自适应屏幕适配
 */
export const screenW = Dimensions.get('window').width;
export const screenH = Dimensions.get('window').height;
export const isHorizontal = screenW > screenH;
const fontScale = PixelRatio.getFontScale();
export const pixelRatio = PixelRatio.get();
//像素密度
export const DEFAULT_DENSITY = 1;
//px转换成dp
//以iphone6为基准,如果以其他尺寸为基准的话,请修改下面的750和1334为对应尺寸即可.

let designSize = {
  width: 750,
};
let w2 = designSize.width / DEFAULT_DENSITY;
export const setDesignWidth = function(width) {
  pxCache = {};
  w2 = width / DEFAULT_DENSITY;
  M = initUI();
};
//px转换成dp
const h2 = 1334 / DEFAULT_DENSITY;

// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

/**
 * 设置字体的size（单位px）
 * @param size 传入设计稿上的px
 * @returns {Number} 返回实际sp
 */
export function fpx(size) {
  // let scaleWidth = screenW / w2;
  // let scaleHeight = screenH / h2;
  // let scale = Math.min(scaleWidth, scaleHeight);
  // size = Math.round((size * scale + 0.5));
  // return size * 1.5;
  // if (isHorizontal) return size / 1.3
  return size / 2;
}

/**
 * 屏幕适配,缩放size
 * @param size
 * @returns {Number}
 */
const px2dp = PixelRatio.roundToNearestPixel;
let pxCache = {};
export function px(size) {
  if (pxCache[size]) return pxCache[size];
  // if (isHorizontal) return size / 1.3;
  let scaleWidth = screenW / w2;
  let newSize = px2dp(size * scaleWidth);
  pxCache[size] = newSize;
  return newSize;
}

/**
 * style 快速布局库
 */
function initUI() {
  const UI = {
    // util
    'hide': {display: 'none'},
    'display-none': {display: 'none'},
    // line-height
    'line-height-1': {
      lineHeight: 1,
    },
    'line-height-15': {
      lineHeight: 1.5,
    },
    'line-height-20': {
      lineHeight: 2,
    },
    // height
    'M-height-p-100': {height: '100%'},
    'M-height-fill': {height: '100%'},
    'M-height-30': {height: px(60)},
    'M-height-40': {height: px(80)},
    'M-height-44': {height: px(88)},
    'M-height-50': {height: px(100)},
    'M-height-55': {height: px(110)},
    'M-height-60': {height: px(120)},
    // font-size
    'f-s-10': {fontSize: px(20)},
    'f-s-12': {fontSize: px(24)},
    'f-s-13': {fontSize: px(26)},
    'f-s-14': {fontSize: px(28)},
    'f-s-15': {fontSize: px(30)},
    'f-s-16': {fontSize: px(32)},
    'f-s-18': {fontSize: px(36)},
    'f-s-20': {fontSize: px(40)},
    'f-s-24': {fontSize: px(48)},
    'f-s-26': {fontSize: px(52)},
    'f-s-28': {fontSize: px(56)},
    'f-s-30': {fontSize: px(60)},
    // font-color
    'f-c-w': {color: '#ffffff'},
    'f-c-1': {color: '#2a8cff'},
    'f-c-2': {color: '#ff7f8a'},
    'f-c-3': {color: '#3c4146'},
    'f-c-4': {color: '#ffa977'},
    'f-c-5': {color: '#4db7ad'},
    'f-c-6': {color: '#337ab7'},
    'f-c-7': {color: '#d9534f'},
    'f-c-8': {color: '#f0ad4e'},
    'f-c-9': {color: '#5cb85c'},
    'f-c-333': {color: '#333'},
    'f-c-666': {color: '#666'},
    'f-c-999': {color: '#999'},
    'f-c-fff': {color: '#fff'},
    'f-c-red': {color: 'red'},
    'f-c-green': {color: 'green'},
    'f-w-b': {fontWeight: 'bold'},
    // back-color
    'b-c-w': {backgroundColor: 'white'},
    'b-c-e': {backgroundColor: '#eee'},
    'b-c-c': {backgroundColor: '#ccc'},
    'b-c-1': {backgroundColor: '#2aacff'},
    'b-c-2': {backgroundColor: '#ff7f8a'},
    'b-c-3': {backgroundColor: '#3c4146'},
    'b-c-4': {backgroundColor: '#ffa977'},
    'b-c-5': {backgroundColor: '#4db7ad'},
    'b-c-6': {backgroundColor: '#337ab7'},
    'b-c-7': {backgroundColor: '#d9534f'},
    'b-c-8': {backgroundColor: '#f0ad4e'},
    'b-c-9': {backgroundColor: '#5cb85c'},
    // padding
    'p-0': {padding: 0},
    'p-2': {padding: px(4)},
    'p-3': {padding: px(6)},
    'p-5': {padding: px(10)},
    'p-8': {padding: px(16)},
    'p-10': {padding: px(20)},
    'p-12': {padding: px(24)},
    'p-15': {padding: px(30)},
    'p-20': {padding: px(40)},
    'p-25': {padding: px(50)},
    'm-0': {margin: 0},
    'm-h-auto': {marginLeft: 'auto', marginRight: 'auto'},
    'm-2': {margin: px(4)},
    'm-3': {margin: px(6)},
    'm-5': {margin: px(10)},
    'm-8': {margin: px(16)},
    'm-10': {margin: px(20)},
    'm-12': {margin: px(24)},
    'm-15': {margin: px(30)},
    'm-20': {margin: px(40)},
    'm-25': {margin: px(50)},
    // vertical
    'p-v-b-0': {paddingTop: 0, paddingBottom: 0},
    'p-t-0': {paddingTop: 0},
    'p-b-0': {paddingBottom: 0},
    'p-v-b-2': {paddingTop: px(4), paddingBottom: px(4)},
    'p-t-2': {paddingTop: px(4)},
    'p-b-2': {paddingBottom: px(4)},
    'p-v-b-3': {paddingTop: px(6), paddingBottom: px(6)},
    'p-t-3': {paddingTop: px(6)},
    'p-b-3': {paddingBottom: px(6)},
    'p-v-b-5': {paddingTop: px(10), paddingBottom: px(10)},
    'p-t-5': {paddingTop: px(10)},
    'p-b-5': {paddingBottom: px(10)},
    'p-v-b-8': {paddingTop: px(16), paddingBottom: px(16)},
    'p-t-8': {paddingTop: px(16)},
    'p-b-8': {paddingBottom: px(16)},
    'p-v-b-10': {paddingTop: px(20), paddingBottom: px(20)},
    'p-t-10': {paddingTop: px(20)},
    'p-b-10': {paddingBottom: px(20)},
    'p-v-b-12': {paddingTop: px(24), paddingBottom: px(24)},
    'p-t-12': {paddingTop: px(24)},
    'p-b-12': {paddingBottom: px(24)},
    'p-v-b-15': {paddingTop: px(30), paddingBottom: px(30)},
    'p-t-15': {paddingTop: px(30)},
    'p-b-15': {paddingBottom: px(30)},
    'p-v-b-20': {paddingTop: px(40), paddingBottom: px(40)},
    'p-t-20': {paddingTop: px(40)},
    'p-b-20': {paddingBottom: px(40)},
    'p-v-b-25': {paddingTop: px(50), paddingBottom: px(50)},
    'p-t-25': {paddingTop: px(50)},
    'p-b-25': {paddingBottom: px(50)},
    'm-v-b-0': {marginTop: 0, marginBottom: 0},
    'm-t-0': {marginTop: 0},
    'm-b-0': {marginBottom: 0},
    'm-v-b-2': {marginTop: px(4), marginBottom: px(4)},
    'm-t-2': {marginTop: px(4)},
    'm-b-2': {marginBottom: px(4)},
    'm-v-b-3': {marginTop: px(6), marginBottom: px(6)},
    'm-t-3': {marginTop: px(6)},
    'm-b-3': {marginBottom: px(6)},
    'm-v-b-5': {marginTop: px(10), marginBottom: px(10)},
    'm-t-5': {marginTop: px(10)},
    'm-b-5': {marginBottom: px(10)},
    'm-v-b-8': {marginTop: px(16), marginBottom: px(16)},
    'm-t-8': {marginTop: px(16)},
    'm-b-8': {marginBottom: px(16)},
    'm-v-b-10': {marginTop: px(20), marginBottom: px(20)},
    'm-t-10': {marginTop: px(20)},
    'm-b-10': {marginBottom: px(20)},
    'm-v-b-12': {marginTop: px(24), marginBottom: px(24)},
    'm-t-12': {marginTop: px(24)},
    'm-b-12': {marginBottom: px(24)},
    'm-v-b-15': {marginTop: px(30), marginBottom: px(30)},
    'm-t-15': {marginTop: px(30)},
    'm-b-15': {marginBottom: px(30)},
    'm-v-b-20': {marginTop: px(40), marginBottom: px(40)},
    'm-t-20': {marginTop: px(40)},
    'm-b-20': {marginBottom: px(40)},
    'm-v-b-25': {marginTop: px(50), marginBottom: px(50)},
    'm-t-25': {marginTop: px(50)},
    'm-b-25': {marginBottom: px(50)},
    // horizontal
    'p-h-b-0': {paddingLeft: 0, paddingRight: 0},
    'p-l-0': {paddingLeft: 0},
    'p-r-0': {paddingRight: 0},
    'p-h-b-2': {paddingLeft: px(4), paddingRight: px(4)},
    'p-l-2': {paddingLeft: px(4)},
    'p-r-2': {paddingRight: px(4)},
    'p-h-b-3': {paddingLeft: px(6), paddingRight: px(6)},
    'p-l-3': {paddingLeft: px(6)},
    'p-r-3': {paddingRight: px(6)},
    'p-h-b-5': {paddingLeft: px(10), paddingRight: px(10)},
    'p-l-5': {paddingLeft: px(10)},
    'p-r-5': {paddingRight: px(10)},
    'p-h-b-8': {paddingLeft: px(16), paddingRight: px(16)},
    'p-l-8': {paddingLeft: px(16)},
    'p-r-8': {paddingRight: px(16)},
    'p-h-b-10': {paddingLeft: px(20), paddingRight: px(20)},
    'p-l-10': {paddingLeft: px(20)},
    'p-r-10': {paddingRight: px(20)},
    'p-h-b-12': {paddingLeft: px(24), paddingRight: px(24)},
    'p-l-12': {paddingLeft: px(24)},
    'p-r-12': {paddingRight: px(24)},
    'p-h-b-15': {paddingLeft: px(30), paddingRight: px(30)},
    'p-l-15': {paddingLeft: px(30)},
    'p-r-15': {paddingRight: px(30)},
    'p-h-b-20': {paddingLeft: px(40), paddingRight: px(40)},
    'p-l-20': {paddingLeft: px(40)},
    'p-r-20': {paddingRight: px(40)},
    'p-h-b-25': {paddingLeft: px(50), paddingRight: px(50)},
    'p-l-25': {paddingLeft: px(50)},
    'p-r-25': {paddingRight: px(50)},
    'm-h-b-0': {marginLeft: 0, marginRight: 0},
    'm-l-0': {marginLeft: 0},
    'm-r-0': {marginRight: 0},
    'm-h-b-3': {marginLeft: px(6), marginRight: px(6)},
    'm-l-3': {marginLeft: px(6)},
    'm-r-3': {marginRight: px(6)},
    'm-h-b-2': {marginLeft: px(4), marginRight: px(4)},
    'm-l-2': {marginLeft: px(4)},
    'm-r-2': {marginRight: px(4)},
    'm-h-b-5': {marginLeft: px(10), marginRight: px(10)},
    'm-l-5': {marginLeft: px(10)},
    'm-r-5': {marginRight: px(10)},
    'm-h-b-8': {marginLeft: px(16), marginRight: px(16)},
    'm-l-8': {marginLeft: px(16)},
    'm-r-8': {marginRight: px(16)},
    'm-h-b-10': {marginLeft: px(20), marginRight: px(20)},
    'm-l-10': {marginLeft: px(20)},
    'm-r-10': {marginRight: px(20)},
    'm-h-b-12': {marginLeft: px(24), marginRight: px(24)},
    'm-l-12': {marginLeft: px(24)},
    'm-r-12': {marginRight: px(24)},
    'm-h-b-15': {marginLeft: px(30), marginRight: px(30)},
    'm-l-15': {marginLeft: px(30)},
    'm-r-15': {marginRight: px(30)},
    'm-h-b-20': {marginLeft: px(40), marginRight: px(40)},
    'm-l-20': {marginLeft: px(40)},
    'm-r-20': {marginRight: px(40)},
    'm-h-b-25': {marginLeft: px(50), marginRight: px(50)},
    'm-l-25': {marginLeft: px(50)},
    'm-r-25': {marginRight: px(50)},
    // image
    'image-background': {
      // backgroundPosition: '50% 50%',
      // backgroundSize: 'cover',
      // backgroundRepeat: 'no-repeat'
    },
    'text-align-center': {textAlign: 'center'},
    'text-align-left': {textAlign: 'left'},
    'text-align-right': {textAlign: 'right'},
    // 排列
    'flexbox-vertical': {flexDirection: 'column'},
    'flexbox-horizontal': {flexDirection: 'row'},
    'flexbox-between': {justifyContent: 'space-between'},
    'flebox-around': {justifyContent: 'space-around'},
    'flex-flow-row-wrap': { flexDirection: 'row', flexWrap: 'wrap' },
    'flex-row-wrap': { flexDirection: 'row', flexWrap: 'wrap' },
    'flex-flow-row-nowrap': { flexDirection: 'row', flexWrap: 'nowrap' },
    'flex-row-nowrap': { flexDirection: 'row', flexWrap: 'nowrap' },
    'flex-item': {flex: 1},
    // 对齐
    'horizontal-left': {flexDirection: 'row', justifyContent: 'flex-start'},
    'horizontal-right': {flexDirection: 'row', justifyContent: 'flex-end'},
    'horizontal-center': {flexDirection: 'row', justifyContent: 'center'},
    'vertical-top': {flexDirection: 'row', alignItems: 'flex-start'},
    'vertical-bottom': {flexDirection: 'row', alignItems: 'flex-end'},
    'vertical-middle': {flexDirection: 'row', alignItems: 'center'},
    'center-all': {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    // 边框
    /** @deprecated 不再提供 bd-all 因为小程序端暂不支持 */
    // 'bd-all': {
    //   borderTopWidth: px(1),
    //   borderTopColor: '#eee',
    //   borderBottomWidth: px(1),
    //   borderBottomColor: '#eee',
    //   borderLeftWidth: px(1),
    //   borderLeftColor: '#eee',
    //   borderRightWidth: px(1),
    //   borderRightColor: '#eee',
    // },
    'bd-t': {borderTopWidth: px(1), borderTopColor: '#eee'},
    'bd-b': {borderBottomWidth: px(1), borderBottomColor: '#eee'},
    'bd-l': {borderLeftWidth: px(1), borderLeftColor: '#eee'},
    'bd-r': {borderRightWidth: px(1), borderRightColor: '#eee'},
    // 常用圆角
    'r-10': { borderRadius: px(20) },
    'r-15': { borderRadius: px(30) },
    // 溢出
    'overflow-hidden': { overflow: 'hidden' },
  };
  return StyleSheet.create(UI);
}
export let M = initUI();
