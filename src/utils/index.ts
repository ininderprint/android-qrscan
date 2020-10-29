import React, { Component } from 'React'

// 网络请求
export * from './api'
// 静态资源
export * from './file'
// 时间处理
export * from './time'
// 事件收发
export * from './event'
// UI
export * from './ui'
// 数据转换
export * from './data'
// 数据存储
export * from './storage'
// APP 应用相关API
export * from './app';
/**
 * 电话短信
 */
export * from './tel';

/**
 * 绑定依赖实现Mixin
 */
import { $service } from './api'
import { $toast, $confirm, $alert } from './ui'
import { $qiniu } from './file'
import { $event } from './event'

export const injectUtil = function(target: any) {
  target.prototype.$service = $service
  target.prototype.$toast = $toast
  target.prototype.$confirm = $confirm
  target.prototype.$alert = $alert
  target.prototype.$qiniu = $qiniu
  target.prototype.$event = $event
}
