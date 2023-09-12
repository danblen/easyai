import { wechat_login } from '../../services/api';
export const wechatLogin = () =>
  new Promise((resolve, reject) => {
    uni.getUserInfo({
      success: (res) => {
        // 调用微信登录接口
        uni.login({
          success: async (loginRes) => {
            if (loginRes.code) {
              // 登录成功，获取到用户的 code
              uni.setStorageSync('userCode', loginRes.code);
              // uni.setStorageSync('userInfo', res.userInfo);
              // 接下来可以将 code 发送到服务器，服务器通过 code 获取用户的 openid 和 session_key
              // 在这里可以编写发送请求的代码，向服务器发送 code
              // 一般情况下，服务器会返回一个用户标识，例如 openid
              let wechatRes = await wechat_login({ code: loginRes.code });
              uni.setStorageSync('userInfo', wechatRes.user);

              // 获取到 openid 后，可以保存到本地缓存，用于识别用户
              // uni.setStorageSync('isLogin', true);

              resolve(wechatRes);
            } else {
              // 登录失败
              console.log('登录失败', loginRes);
            }
          },
          fail: (loginError) => {
            // 登录失败
            console.log('登录失败', loginError);
            // reject(loginError);
          },
        });
      },
      fail: (error) => {
        // 用户拒绝了授权
        // reject(error);
        console.log('用户拒绝了授权', error);
      },
    });
  });
