import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  WebView,
  Platform
} from 'react-native';

import { queryObjectToString } from './utils'

let HEADER = '#eee';
let BGWASH = '#eee';
let DISABLED_WASH = '#eee';

let TEXT_INPUT_REF = 'urlInput';
let WEBVIEW_REF = 'webview';
let DEFAULT_URL = 'http://localhost:8888';

class MtWebview extends React.Component {

  state = {
    url: DEFAULT_URL,
    status: 'No Page Loaded',
    backButtonEnabled: false,
    forwardButtonEnabled: false,
    loading: true,
    scalesPageToFit: true,
  };

  render() {
    let source = this.props.source
    let uri = source.uri
    if (uri && this.props.query) {
      let query = this.props.query
      let queryString = ''
      if (typeof query === 'object' && Object.keys(query).length > 0) {
        queryString += uri.split('?').length >= 2 ? '&' : '?'
        queryString += queryObjectToString(query)
      }
      if (query.dev) console.log('[WEBVIEW] ', uri + queryString)
      source = {
        uri: uri + queryString
      }
    }
    
    return (
      <View style={[styles.container]}>
        <WebView
          ref={WEBVIEW_REF}
          style={styles.webView}
          onError={ () => {
            this.$toast('加载失败')
          } }
          renderError={ () => {
            this.$toast('renderError')
          } }
          originWhitelist={['*','http://','file://','https://']}
          source={ source }
          // useWebKit={ true }
          // source={ (Platform.OS == 'ios') ? require('../static/app/index.html') : { uri: 'file:///android_asset/static/app/index.html' } }
          // source={ require('./static/app/index.html') }
          automaticallyAdjustContentInsets={false}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          bounces={false}
          // onNavigationStateChange={this.onNavigationStateChange}
          // onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
          startInLoadingState={true}
          scalesPageToFit={this.state.scalesPageToFit}
          onMessage={this.onMessage}
          injectedJavaScript={this.initWebview()}
          onLoad={this.onLoad}
        />
      </View>
    );
  }

  initWebview() {
    /**
     *  Api 接口封装
     */
    let MengtiWebviewApi = `
      try {
        window.queue = {};
        window.queueNum = 0;
        window.getTaskKey = function(taskName) {
          window.queueNum++;
          return taskName + '_i_' + window.queueNum;
        };
        window.createTask = function(taskName, props, callbacks) {
          if (!taskName) {return;}
          var taskKey = window.getTaskKey(taskName);
          var message = {
            taskName: taskName,
            taskKey: taskKey,
            props: props || ''
          };
          window.queue[taskKey] = {
            message: message,
            callbacks: callbacks || {}
          };
          window.sendBridgeMsg(message);
        };
        window.sendBridgeMsg = function(message) {
          console.log('sendBridgeMsg');
          try {
            if (window.postMessage) {
              console.log(JSON.stringify(message));
              window.postMessage(JSON.stringify(message));
            }
          } catch(e) {
            console.log('sendBridgeMsg error:', e);
          }
        };
        window.onBridgeMsg = function(taskKey, callbacks) {
          console.log('onBridgeMsg: ', taskKey);
          var task = window.queue[taskKey];
          if (!task) {
            console.warn('task (' + taskKey + ') is not found');
            return false;
          };
          console.log(task, callbacks, typeof callbacks);
          if (typeof callbacks === 'string') {
            callbacks = JSON.parse('' + callbacks + '');
          };
          if (task.callbacks && callbacks && typeof callbacks === 'object') {
            for (var key in callbacks) {
              if (task.callbacks[key] && typeof task.callbacks[key] === 'function') { task.callbacks[key](callbacks[key]) }
            }
          }
          delete window.queue[taskKey];
        };
        window.api = {
          params: ${ this.props.params ? "JSON.parse(decodeURIComponent('" + encodeURIComponent(JSON.stringify(this.props.params)) + "'))" : 'null' },
          systemType: '${ Platform.OS }',
          actionSheet: function(options, callback) {
            window.createTask('actionSheet', options, {
              onSuccess: function(index) {
                if (callback) { callback(index) }
              }
            })
          },
          invoke: function(funcName, params, callbacks) {
            this.execCallback(funcName, params, callbacks);
          },
          execCallback: function(funcName, params, callbacks) {
            window.createTask('execCallback', {
              funcName: funcName,
              params: params
            }, {
              onSuccess: function(res) {
                if (callbacks && callbacks.onSuccess) {callbacks.onSuccess(res)}
              },
              onError: function(res) {
                if (callbacks && callbacks.onError) {callbacks.onError(res)}
              }
            })
          }
        };
      } catch(e) {
        alert('jssdk error');
      };
    `
    // 待封装api
    // 监听android返回键
    // api.$confirm
    // api.$upload
    // api.actionSheet
    // api.showLoading hideLoading
    // api.toast
    // api.datePicker
    // api.openMap
    // api.openNav
    // code push
    // 
    return MengtiWebviewApi
  };

  goBack = () => {
    this.refs[WEBVIEW_REF].goBack();
  };

  goForward = () => {
    this.refs[WEBVIEW_REF].goForward();
  };

  reload = () => {
    this.refs[WEBVIEW_REF].reload();
  };

  onLoad = () => {
    console.log('onLoad')
    if (this.props.onLoad) this.props.onLoad()
    this.refs[WEBVIEW_REF].injectJavaScript(`
      if (window.apiready) {
        window.apiready();
      }
    `)
  };

  taskCallback(taskKey, callbacks) {
    // console.log(taskKey, callbacks, `window.onBridgeMsg('${ taskKey }', \'${ JSON.stringify(callbacks) }\');`)
    this.refs[WEBVIEW_REF].injectJavaScript(`
      if (window.onBridgeMsg) {
        try {
          window.onBridgeMsg("${ taskKey }", '${ JSON.stringify(callbacks) }');
        } catch(e) {
          console.log('catch erroe');
          console.error(e);
        }
      };
    `)
  };

  emitEvent = (eventName, eventData = {}) => {
    this.refs[WEBVIEW_REF].injectJavaScript(`
      if (window.emitEvent) {
        try {
          window.emitEvent("${ eventName }", '${ JSON.stringify(eventData) }');
        } catch(e) {
          console.log('catch error');
          console.error(e);
        }
      };
    `)
  }

  onMessage = (event) => {
    console.log('receive bridge msg:', event.nativeEvent.data)
    if (!event.nativeEvent) return
    try {
      console.log(1, event.nativeEvent.data)
      let message = JSON.parse(event.nativeEvent.data)
      switch (message.taskName) {
        case 'execCallback':
          if (message.props.funcName && this.props.callbacks && typeof this.props.callbacks === 'object' && this.props.callbacks[message.props.funcName] && typeof this.props.callbacks[message.props.funcName] === 'function') {
            let res = this.props.callbacks[message.props.funcName](message.props.params || {})
            if (res && res.then && typeof res.then === 'function') {
              res.then((ret) => {
                console.log('resolve', ret)
                this.taskCallback(message.taskKey, {
                  onSuccess: ret || {}
                })
              }).catch(ret => {
                this.taskCallback(message.taskKey, {
                  onError: ret || {}
                })
              })
            }
          }
          break;
        case 'actionSheet':
          this.$actionSheet(message.props).then(index => {
            this.taskCallback(message.taskKey, {
              onSuccess: index
            })
          })
          break;
        default:
          break;
      }
    } catch (e) {
      // console.warn(e)
    }
  };

  onShouldStartLoadWithRequest = (event) => {
    // Implement any custom loading logic here, don't forget to return!
    return true;
  };

  onNavigationStateChange = (navState) => {
    // this.setState({
    //   backButtonEnabled: navState.canGoBack,
    //   forwardButtonEnabled: navState.canGoForward,
    //   url: navState.url,
    //   status: navState.title,
    //   loading: navState.loading,
    //   scalesPageToFit: true
    // });
  };

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEADER,
  },
  webView: {
    backgroundColor: BGWASH,
    height: 350,
  }
});

export default MtWebview