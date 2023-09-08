export const getUserInfo = (success, fail) => {
  uni.getUserInfo({
    success: (res) => {
      // 调用微信登录接口
      uni.login({
        success: (loginRes) => {
          if (loginRes.code) {
            // 登录成功，获取到用户的 code
            // 接下来可以将 code 发送到服务器，服务器通过 code 获取用户的 openid 和 session_key
            // 在这里可以编写发送请求的代码，向服务器发送 code
            // 一般情况下，服务器会返回一个用户标识，例如 openid

            // 获取到 openid 后，可以保存到本地缓存，用于识别用户
            uni.setStorageSync('userId', loginRes.code);
            uni.setStorageSync('userInfo', res.userInfo);
            uni.setStorageSync('isLogin', true);
            success();
          } else {
            // 登录失败
            console.log('登录失败', loginRes);
          }
        },
        fail: (loginError) => {
          // 登录失败
          console.log('登录失败', loginError);
        },
      });
    },
    fail: (error) => {
      // 用户拒绝了授权
      console.log('用户拒绝了授权', error);
      fail();
    },
  });
};
