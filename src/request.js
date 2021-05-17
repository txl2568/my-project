
// import { Base64 } from 'js-base64'

request.interceptors.request.use(config => {
  //从storage中，获取token值
//   const token = sessionStorage.getItem(ACCESS_TOKEN)
  // 设置接口请求头（让每个请求携带自定义 token 。要根据实际情况修改）
//   config.headers['Authorization'] = `Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`;
    config.headers['Authorization'] = `67fa29085c7042d99db1dcd8bd6851b9`;
    if (token) {
        config.headers['Access-Token'] = token
        config.headers['platform-Auth'] = 'bearer ' + token
    }
    return config
}, errorHandler)