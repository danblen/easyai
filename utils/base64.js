export function base64ToBlob(urlData) {
  var arr = urlData.split(',');
  var mime = arr[0].match(/:(.*?);/)[1] || 'image/jpeg';
  // 去掉url的头，并转化为byte
  var bytes = window.atob(arr[1]);
  // 处理异常,将ascii码小于0的转换为大于0
  var ab = new ArrayBuffer(bytes.length);
  // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
  var ia = new Uint8Array(ab);
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }

  return new Blob([ab], {
    type: mime,
  });
}
function imageToBase64(file, callback) {
  if (!file) {
    // 如果没有文件，调用回调函数并传递 null
    callback(null);
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    const base64String = event.target.result;
    callback(base64String);
  };

  reader.readAsDataURL(file);
}
function convertImageToBinary(inputElement, callback) {
  const file = inputElement.files[0];

  if (!file) {
    // 如果没有选择文件，调用回调函数并传递 null
    callback(null);
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    const binaryData = event.target.result;
    callback(binaryData);
  };

  reader.readAsBinaryString(file);
}
