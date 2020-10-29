import axios from 'axios'
axios.interceptors.request.use(function(config){
  let data = config.data
  let ret = ''
  let index = 0
  for (let it in data) {
    ret += (index === 0 ? '' : '&') + encodeURIComponent(it) + '=' + encodeURIComponent(data[it])
    index++
  }
  config.data = ret
  config.headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  return config
}, function(err){

})
export default axios;
