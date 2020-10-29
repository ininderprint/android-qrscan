declare module '*.scss' {
  const content: {[className: string]: any};
  export = content;
}

declare module "teaset" {
  export const Overlay: any;
  export const PullPicker: any;
  export const Wheel: any;
}

declare module "react-native-qrcode" {
  export const fuck: any;
}

declare module "react-native-wechat" {
  export function registerApp(appId: string): Promise<boolean>;
  export function registerAppWithDescription(
    appId: string,
    desc: string
  ): Promise<boolean>;
  export function isWXAppInstalled(): Promise<boolean>;
  export function isWXAppSupportApi(): Promise<boolean>;
  export function getApiVersion(): Promise<string>;
  export function openWXApp(): Promise<boolean>;
  export interface LaunchMiniParams {
    /** 拉起的小程序的username */
    userName: string;
    /** 拉起小程序的类型 0 正式版 1 开发板 2 体验版 */
    miniProgramType: 0 | 1 | 2;
    /** 拉起小程序页面的可带参路径，不填默认拉起小程序首页 */
    path?: string;
  }
  export function launchMini(params: LaunchMiniParams): Promise<boolean>;
  export interface AuthResponse {
    errCode?: number;
    errStr?: string;
    openId?: string;
    code?: string;
    url?: string;
    lang?: string;
    country?: string;
  }
  export function sendAuthRequest(
    scope: string | string[],
    state?: string
  ): Promise<AuthResponse>;
  export interface ShareMetadata {
    type:
      | "news"
      | "text"
      | "imageUrl"
      | "imageFile"
      | "imageResource"
      | "video"
      | "audio"
      | "file";
    thumbImage?: string;
    description?: string;
    webpageUrl?: string;
    imageUrl?: string;
    videoUrl?: string;
    musicUrl?: string;
    filePath?: string;
    fileExtension?: string;
  }
  export function shareToTimeline(
    message: ShareMetadata
  ): Promise<{ errCode?: number; errStr?: string }>;
  export function shareToSession(
    message: ShareMetadata
  ): Promise<{ errCode?: number; errStr?: string }>;
  export interface PaymentLoad {
    partnerId: string;
    prepayId: string;
    nonceStr: string;
    timeStamp: string;
    package: string;
    sign: string;
  }
  export function pay(
    payload: PaymentLoad
  ): Promise<{ errCode?: number; errStr?: string }>;
}