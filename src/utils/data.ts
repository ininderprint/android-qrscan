interface Obj {
  [propName: string]: string | number | boolean
}

export const objectToQuery = function(obj: Obj) {
  let str = ''
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      str += (str === '' ? '?' : '&')
      str += k + '='
      str += obj[k]
    }
  }
  return str
}
