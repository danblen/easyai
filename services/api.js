import request from './request.js';
import { HTTP_CONFIG_URL, HTTP_TRANSLATE_URL } from './app.js';

/// MJ
/**
 * 公共配置
 */
export function txt2img(data) {
  return request.post('/sdapi/v1/txt2img', data);
}
export function test(data) {
  uni.request({
    url: 'http://192.168.1.5:7592/api/login', // 上传图片的服务器 URL
    method: 'POST',
    data: data,
    header: {
      'content-type': 'multipart/form-data', // 使用表单数据格式
    },
    success: function (uploadRes) {
      // 上传成功，处理服务器响应
      // console.log(uploadRes.data);
    },
    fail: function (error) {
      // 上传失败，处理错误
      console.error(error);
    },
  });
  // return request.post('/test', data);
}
export function faceSwap(data) {
  return request.post('/faceSwap', data);
}
export function get_completed_tasks_on_user(user_id) {
  return request.post('/get_completed_tasks_on_user/'+user_id+'/');
}
export function get_pending_tasks_on_user(user_id) {
  return request.post('/get_pending_tasks_on_user/'+user_id+'/');
}
export function uploadImage(data) {
  return request.post('/upload_image/', data);
}
export function checkTaskStatus(user_id) {
  return request.get('/check_task_status/' + user_id + '/');
}
export function checkTaskStatusByTaskId(taskId) {
  return request.get('/check_task_status_on_taskid/' + taskId + '/');
}
export function getConfig(data) {
  return request.get('/config', data, {
    isMj: true,
  });
}

/**
 * 翻译
 */
export function getTranslate(data) {
  return request.get('/translate', data, {
    isMj: true,
    noAlert: true,
  });
}
/**
 * MJ生成图片
 */
export function postMjAdd(data) {
  return request.post('/mj_add', data, {
    isMj: true,
  });
}
/**
 * MJ生成图片【通用】
 */
export function postMjAddAll(data) {
  return request.post('/mj_add_all', data, {
    isMj: true,
  });
}
/**
 * MJ图片解析
 */
export function postMjDescribe(data) {
  return request.post('/mj_describe', data, {
    isMj: true,
  });
}
/**
 * MJ任务查询
 */
export function getMjFetch(data) {
  return request.get('/mj_fetch', data, {
    isMj: true,
    noAlert: true,
  });
}
/**
 * MJ图片处理
 */
export function postMjChange(data) {
  return request.post('/mj_change', data, {
    isMj: true,
  });
}

/// SD
/**
 * 全局信息
 */
export function getCmdFlags(data) {
  return request.get('/sdapi/v1/cmd-flags', data);
}

/**
 * 获取模型
 */
export function getSdModels(data) {
  return request.get('/sdapi/v1/sd-models', data);
}
/**
 * 获取模板
 */
export function getSdLoRA(data) {
  return request.get(
    '/file=extensions/a1111-sd-webui-tagcomplete/tags/temp/lora.txt',
    data,
  );
}
/**
 * 获取采样方法
 */
export function getSdSamplers(data) {
  return request.get('/sdapi/v1/samplers', data);
}
/**
 * 文生图
 */
export function postTxt2img(data) {
  return request.post('/sdapi/v1/txt2img', data);
}
/**
 * 图生文
 */
export function postPreprocess(data) {
  return request.post('/sdapi/v1/preprocess', data);
}
/**
 * 解析文本结果
 */
export function getAnalysRes(fileDir, name) {
  return request.get(`/file=${fileDir}/${name}.txt`);
}
