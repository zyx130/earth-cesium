import axios from "axios"
import { Loading, Message } from 'element-ui';
export default function service(data) {
  this.service = axios.create({
    // timeout: 10000 // 请求超时时间
  });
  this.mask = "";
  this.switchs = false;
  this.timer = '';
  let that = this;
  //添加请求拦截
  this.service.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    if (config.headers.isLoading && !that.switchs) {
      that.axiosLoading(config.headers.target ? config.headers.target : 'body', config.headers.test ? config.headers.target : "正在拼命加载……");
    }
    return config;
  }, error => {
    that.antiShake();
    // 对请求错误做些什么
    return Promise.reject(error);
  });


  // 添加响应拦截器
  this.service.interceptors.response.use((response) => {
    // 对响应数据做点什么
    that.antiShake();
    return response;
  }, function(error) {
    // 对响应错误做点什么
    that.antiShake()
    Message.error('服务器异常，请重新尝试')
    return Promise.reject(error);
  });
  //
  return this.service(data)
}
service.prototype.axiosLoading = function(target, text) {
  this.switchs = true;
  this.mask = Loading.service({
    target, //需要遮罩的区域 dom
    lock: true,
    text,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
};
service.prototype.removeAxiosLoading = function() {
  this.switchs && this.mask.close();
  this.switchs = false
};
service.prototype.antiShake = function() {
  if (this.imer != '') {
    window.clearTimeout(this.timer);
  }
  this.timer = window.setTimeout(() => {
    this.removeAxiosLoading();
    this.timer = ''
  }, 300);
}