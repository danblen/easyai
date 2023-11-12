let http_api_sd = 'http://lyg.blockelite.cn:22164';
let URL_BACK = 'http://lyg.blockelite.cn:22164';
// let URL_BACK = 'http://192.168.1.5:7592'

module.exports = {
  URL_SD: http_api_sd,
  URL_BACK: URL_BACK,
  HEADER: {
    'content-type': 'application/json',
    //#ifdef H5
    'Form-type':
      navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
        ? 'wechat'
        : 'h5',
    //#endif
    //#ifdef MP
    'Form-type': 'routine',
    //#endif
    //#ifdef APP-PLUS
    'Form-type': 'app',
    //#endif
  },
  // 回话密钥名称 请勿修改此配置
  TOKENNAME: 'token',
  // MJ任务进度间隔
  TIMER_FETCH_INTERVAL: 10000,
  // 任务重试次数
  FETCH_REPEAT_COUNT: 30,
};
