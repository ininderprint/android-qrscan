export const isDebug = false;

export const baseVersion = 101; // 基础库版本
export const codeVersion = 101;
export const appVersion = '1.0.1'; // app 展示版本

export const CdnDomain = '';

/**
 * 用于区别多厂商发布版本
 */
export const androidAppStoreName = '';

export const apiRoot = isDebug ? 'http:///' : 'http:';
export const imServer = isDebug ? 'ws://127.0.0.1:8360/' : 'wss:///';
export const WebappDomain = isDebug ? 'http://127.0.0.1:8360' : 'http://';
export const qiniuDomain = 'http:///';

import { observable, action } from 'mobx'

import { IPrinterMatching } from '@lodestream/ipp-printer/lib/interfaces/i-printer-device-info'

class ConfigStore {

  defaults: { [propName: string]: string } = {
    storeId: '-LVRkopxDpUawWaq52sN', //
    guestUserId: 'line:Ua2a1e052273eed6de66092e68d79590a', //
    // nameRegex: /Color Laser/, // Simulated Printer
    'printerMatcher.nameRegex': '',
    'printerMatcher.address': 'ipp://localhost:8632/printers/colorlaser',
    'firebase.sentryDSN': 'https://e95512cd9b3e4204b3a280a3d192a870@sentry.io/1354126',
    'firebase.apiKey': 'AIzaSyCjA-wSYVqhAtdqIvbL-Y2RFF37u3o2eXg',
    'firebase.authDomain': 'ininder-ec666.firebaseapp.com',
    'firebase.databaseURL': 'https://ininder-ec666-3dfaf.firebaseio.com/',
    'firebase.projectId': 'ininder-ec666',
    'firebase.storageBucket': 'ininder-ec666.appspot.com',
    'firebase.messagingSenderId': '247329795726',
  }
  
  data: { [propName: string]: string } = {}

  get(field: string) {
    return this.data[field] || this.defaults[field];
  }

}

export const configStore = new ConfigStore();


const nameRegex = configStore.get('printerMatcher.nameRegex')
let FS_ROOT = `/media/${process.env.USERNAME}`
export const CONFIG = {
  app: {
    locale: 'zh-TW',
    defaults: {
      // storeId: configStore.get('storeId'),
      paymentMethod: 'LINE_PAY',
      printerMatcher: {
        // nameRegex: /InInDer/, // Production
        nameRegex: nameRegex ? new RegExp(nameRegex) : undefined,
        address: configStore.get('printerMatcher.address'),
      } as IPrinterMatching,
      guestUserId: configStore.get('guestUserId'),
      userId: '', // For users to set
      serviceType: 'selfServiceDigitalPrint',
      loginTokenSecretKey: 'ininderprint',
      waitToStopSeconds: 60,
      waitToDismissInputQRScan: 10,
    },
    keyboard: {
      pageSize: 10,
    },
    qr: {
      extractOrderId: (qrCode: string) =>
        qrCode.replace('https://linebot.backend.ininderprint.tw/o/', ''),
    },
    maxLengthInvoiceDocName: 30,
    supportedFileFormats: {
      MS: [
        'doc',
        'docx',
        'epub',
        'eml',
        'htm',
        'html',
        'md',
        'odp',
        'ods',
        'odt',
        'pdf',
        'pps',
        'ppsx',
        'ppt',
        'pptx',
        'rtf',
        'xls',
        'xlsm',
        'xlsx',
      ],
      PDFKit: ['jpg', 'jpeg', 'png', 'gif'],
    },
  },
  firebase: configStore.get('firebase'),
  sentry: {
    dsn: configStore.get('sentryDSN'),
  },
  api: {
    baseURL: 'https://api.ininderprint.tw/admin/',
    payUrl: 'https://api.ininderprint.tw/api/pay/',
    authorization: 'Bearer test-token',
  },
  fileServer: {
    fsRoot: FS_ROOT,
    rootName: 'USB隨身碟',
    host: '127.0.0.1',
    port: Number(process.env.FILE_SERVER_PORT || 59001),
  },
}

// @ts-ignore
if (global) global.IID_CONFIG = CONFIG