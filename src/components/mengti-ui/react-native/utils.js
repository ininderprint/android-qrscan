export const queryObjectToString = function(obj) {
  let ret = ''
  let index = 0
  for (let it in obj) {
    ret += (index === 0 ? '' : '&') + encodeURIComponent(it) + '=' + encodeURIComponent(obj[it])
    index++
  }
  return ret
}