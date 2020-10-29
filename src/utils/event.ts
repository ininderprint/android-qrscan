let eventCallbacks: any = {}
let n = 0
export const $event = {
  pageData: {},
  eventCallbacks,
  $on: (eventName: string, callback: (value: any) => void): string => {
    if (!eventName || typeof eventName !== 'string') {
      console.warn('[Event Bus] eventName is master required')
      return '';
    }
    if (!callback || typeof callback !== 'function') {
      console.warn('[Event Bus] callback is master required')
      return '';
    }
    n = n + 1
    let eid: string =  eventName + '|' + n
    if (eventCallbacks[eventName]) {
      eventCallbacks[eventName].push({
        eid,
        callback
      })
    } else {
      eventCallbacks[eventName] = [{
        eid,
        callback
      }]
    }
    return eid
  },
  $off: (eid: string) => {
    let _arr = eid.split('|')
    if (_arr.length !== 2) return console.warn('[Event Bus] eid is not ok')
    let eventName = _arr[0]
    if (eventCallbacks[eventName]) {
      for (let i = 0; i < eventCallbacks[eventName].length; i++) {
        let cbItem = eventCallbacks[eventName][i]
        if (cbItem.eid === eid) eventCallbacks[eventName].splice(i, 1)
      }
    }
  },
  $emit: (eventName: string, value?: any) => {
    console.log('[EventBus emit] ', eventName, value, eventCallbacks[eventName])
    if (eventCallbacks[eventName] && eventCallbacks[eventName].length > 0) {
      eventCallbacks[eventName].forEach((cbItem: any) => {
        if (cbItem.callback && typeof cbItem.callback === 'function') cbItem.callback(value)
      });
    }
  }
}
