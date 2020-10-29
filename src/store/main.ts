import { observable, action } from 'mobx'

class store {
  
  // state
  @observable StatusBarHeight = 0
  @observable SystemConfig = {}
  @observable scrollHeight = 0
  @observable currentAddress = {}
  @observable currentRegion = ['北京市', '北京市', '北京市']
  @observable currentLocale = {
    locale_title: '定位中',
    location_lat: '',
    location_lng: 121.179
  }
  @observable isReview = true

  @observable isInstallWechat = false;
  @observable isInstallAlipay = false;

  constructor() {
  }

  // mutations
  @action handleStatusBarCallback(height: number) {
    this.StatusBarHeight = height
  }

}

export default new store;
