import request from './request.js';

// const BASEURL = 'http://localhost:5000';
// const BASEURL = 'http://121.41.45.147:80'; 
const BASEURL = 'http://121.41.45.147:5000'; 

//请求区域信息
export const reqAreaInfo = () => request(BASEURL + '/area/list');

//更新水量
export const reqWaterVal = (id, val) => request(BASEURL + '/area/updateWater', {id, val}, 'POST');

// 发送登录请求
export const reqLogin = (username, password) => request(BASEURL + '/user/login', {username, password}, 'POST');

//用id获取用户信息
export const reqUserInfo = (userId) => request(BASEURL + '/user/id', {userId}, 'POST');

//更新用户状态
export const reqUpdateUser = (user) => {
	console.log(user);
	request(BASEURL + '/user/update', user, 'POST');
}

//获取信息列表
export const reqMessageInfo = () => request(BASEURL + '/message/list');

//添加信息
export const reqAddMessage = (obj) => request(BASEURL + '/message/add', obj, 'POST');

//更新信息
export const reqUpdateMessage = (obj) => request(BASEURL + '/message/update', obj, 'POST');

//确认密码是否正确
export const reqConfirm = (id, password) => request(BASEURL + '/user/password', {id, password}, 'POST');

//修改密码
export const reqModifyPassword = (id, password) => request(BASEURL + '/user/modify', {id, password}, 'POST');

//获取设备列表
export const reqDeviceList = () => request(BASEURL + '/device/list');
