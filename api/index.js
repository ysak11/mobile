import request from './request.js';

const BASEURL = 'http://localhost:5000';

//请求区域信息
export const reqAreaInfo = () => request(BASEURL + '/area/list');

// 发送登录请求
export const reqLogin = (username, password) => request(BASEURL + '/user/login', {username, password}, 'POST');

//用id获取用户信息
export const reqUserInfo = (userId) => request(BASEURL + '/user/id', {userId}, 'POST');

//获取信息列表
export const reqMessageInfo = () => request(BASEURL + '/message/list');

//确认密码是否正确
export const reqConfirm = (id, password) => request(BASEURL + '/user/password', {id, password}, 'POST');

//修改密码
export const reqModifyPassword = (id, password) => request(BASEURL + '/user/modify', {id, password}, 'POST');