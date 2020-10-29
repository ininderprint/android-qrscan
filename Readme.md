# 扫码器sdk调试项目

## 背景与问题描述

1. 本项目应用为自助机，需要通过usb调用扫码器实现扫码功能。
2. 扫码功能通过react-native的原生模块的方式封装在 ./local_node_modules/react-native-qrscan 项目中，并在主项目中引入使用。
3. 当前版本在已root的3288开发板中正常运行，但是在3399的开发板上执行连接扫码器操作时报错。
4. 扫码器厂商提供有2个版本的sdk，都是以jni的方式使用.so文件。
5. 厂商的demo打包的apk在rk3399上面可以正常运行。暂时怀疑是主项目gradle的配置，无法做到兼容rk3399的cpu，另外就是厂商后来给的sdk并没有正确的使用。

### 报错信息

当前版本在3399的开发板上运行app，点击连接扫码器后报错
```
Native library（com/sun/jna/android-aarch64/libjnidispatch.so） not fount in resource path(.)
```

### 其他信息

厂商提供的sdk v2版本在项目根目录的docs文件夹下，其中包含有说明文件和demo android 项目，需要注意的是厂商说需要使用Android Studio使用他们的sdk，而我们的项目暂时只是使用gradle编译。

厂商提供的v2版本，我已经尝试过引入到项目中，但是报错

```
No implementation found for int com.qrscan.VbarSo.vbar_channel_open()
```

 我向厂商提出要求提供armv8a/aarch64版本的so文件，厂商说： 我们只有一个so文件，其他版本的还没有，但是APK能用，说明so文件可以通用，只是可能你们项目里有什么设置，导致无法成功调用so

## 开发环境

1、电脑需要安装 android sdk，最好直接安装Android Studio。
2、电脑需要安装 nodejs

## 安装依赖

```sh
# 进入项目根目录
cd app
# 返回项目根目录并安装node依赖
cd app
yarn 或者 npm i
```

## 运行开发环境

```sh
# 进入项目根目录 并启动develop server
npm start

# 打开android虚拟机，或者usb链接手机，手机需要开启adb并使用adb devices查看是否有设备
adb devices

# 编译debug包并安装到模拟器或真机
npm run android
```

## 测试方法

进入界面后，点击连接扫码器,提示“打开成功”则是正常，否则弹出红框报错。
