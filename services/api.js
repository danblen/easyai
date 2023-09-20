import request from './request.js';
import { HTTP_CONFIG_URL, HTTP_TRANSLATE_URL } from './app.js';
import {img2img1 } from './const.js';

// /images/
// /images/?tag=标签名称
// /images/?order_by=time
// /images/?order_by=views
// /images/?search=text

// post data必须为对象，否则发不出请求
export function get_points_by_check(data) {
  return request.post('/get_points_by_check', data);
}
export function wechat_login(data) {
  return request.post('/wechat_login', data);
}
export function get_user(data) {
  return request.post('/get_user', data);
}
export function image_list(params) {
  return request.get('/image_list/' ,params);
}
export function get_completed_tasks_on_user(user_id) {
  return request.post('/get_completed_tasks_on_user/' + user_id + '/');
}
export function get_pending_tasks_on_user(user_id) {
  return request.post('/get_pending_tasks_on_user/' + user_id + '/');
}
export function checkTaskStatus(user_id) {
  return request.get('/check_task_status/' + user_id + '/');
}
export function checkTaskStatusByTaskId(taskId) {
  return request.get('/check_task_status_on_taskid/' + taskId + '/');
}

// SD
export function getConfig(data) {
  return request.get('/config', data, {
    isMj: true,
  });
}
export function txt2img(data) {
  return request.post('/sdapi/v1/txt2img', data);
}
export function img2img(data) {
  return request.post('/sdapi/v1/img2img', img2img1);
}
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
// export function getSdLoRA(data) {
//   return request.get(
//     '/file=extensions/a1111-sd-webui-tagcomplete/tags/temp/lora.txt',
//     data,
//   );
// }
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
