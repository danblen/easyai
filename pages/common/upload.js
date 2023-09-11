import { URL_SD, URL_BACK } from '@/services/app.js';
export const upload = async (url, filePath, name, formData) => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: URL_BACK + '/' + url,
      // files: [
      //   { uri: imagePaths[1], name: 'first_image' },
      //   { uri: imagePaths[0], name: 'second_image' },
      // ],
      filePath,
      name,
      // fileType: 'image',
      formData,
      header: {
        accept: 'application/json',
        contentype: 'multipart/form-data',
        // enctype:	'multipart/form-data',
      },
      success: function (res) {
        if (res.statusCode == 200) {
          // 解析响应体为对象
          let data = res.data ? JSON.parse(res.data) : {};
          // 将解析后的对象作为解决值
          resolve(data);
        } else {
          // reject(new Error('上传失败'));
        }
      },
      fail: function (res) {
        // reject(res)
        // uni.showToast({
        //   icon: 'none',
        //   title: '上传图片失败',
        // });
      },
    });
  });
};
