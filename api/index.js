import request from './request.js';

const BASEURL = 'http://localhost:5000';

//请求区域信息
export const reqAreaInfo = () => request(BASEURL + '/area/list');

// 发送登录请求
export const reqLogin = (username, password) => request(BASEURL + '/user/login', {username, password}, 'POST');

