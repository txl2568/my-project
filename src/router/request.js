
import axios from 'axios'


// 创建一个axios实例
const http = axios.create({
    // withCredentials:true
  // headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  // },
  // timeout: 3000
});

// 添加请求拦截器
http.interceptors.request.use(config => {
    let token = localStorage.getItem("token") 
    // let token = "123456789";
    // console.log('token====',token);
  
    
    if (token) {
      config.headers['Authorization'] = token;
  
    }
  return config},err => {
    return Promise.reject(err);
})

// 添加相应拦截器
http.interceptors.response.use(response => {
  const res = response.data;
  // 如果返回的状态码不是200 就主动报错
  // if(res.code != 200){
  //   return Promise.reject(res.msg || 'error');
  // }
  return response;
},error => {
  // 返回接口的错误信息
  return Promise.reject(error);
})

export default http