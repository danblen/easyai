import { HTTP_URL_SD, HTTP_URL_BACK, HEADER, TOKENNAME } from './app';
import utils from './utils';
import store from '../store';
// import { urlToHttpOptions } from 'url';

function toLogin() {
  store.commit('LOGOUT');
  uni.showToast({
    title: '请登录',
    icon: 'none',
    duration: 1000,
  });
}

/**
 * 发送请求
 */
function baseRequest(
  url,
  method,
  data,
  { noAuth = true, noVerify = false, noAlert = false },
) {
  let Url = '',
    header = HEADER;

  // 请求地址处理
  Url = HTTP_URL_SD + url;
  Url = HTTP_URL_BACK + url;
  if (!noAuth) {
    //登录过期自动登录
    if (!store.state.app.token) {
      toLogin();
      return Promise.reject({
        msg: '未登录',
      });
    }
  }

  if (store.state.app.token) {
    header[TOKENNAME] = store.state.app.token;
  }
  if (store.state.app.uid) {
    if (data) {
      data.user_id = store.state.app.uid;
    } else {
      data = {
        user_id: store.state.app.uid,
      };
    }
  }

  return new Promise((reslove, reject) => {
    uni.request({
      url: Url,
      method: method || 'GET',
      timeout: 600000,
			header: header,
			// header: {
			// 	'content-type': 'multipart/form-data', // 使用表单数据格式
      // 'enctype': 'multipart/form-data', // 使用表单数据格式
			// },
      data: data || {},
      success: (res) => {
        let statusCode = res.statusCode;
        if (statusCode == 200) {
          reslove(res.data);
        } else {
          // let showErr = '请求失败' + statusCode;
          // if (!noAlert) {
          //   utils.showToast(showErr);
          // }
          reject();
        }
      },
      fail: (message) => {
        // let showErr = '请求失败';
        // if (!noAlert) {
        //   utils.showToast(showErr);
        // }
        reject();
      },
    });
  });
}

const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach(
  (method) => {
    request[method] = (api, data, opt) =>
      baseRequest(api, method, data, opt || {});
  },
);

export default request;
