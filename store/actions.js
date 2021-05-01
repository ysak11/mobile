import {
	UPDATE_AREA_INFO,
	UPDATE_MESSAGE_INFO
} from './mutation-type.js'

import {reqAreaInfo, reqMessageInfo} from '@/api';

export default {
	//异步获取区域列表信息
	async getAreaInfo({commit}) {
		let result = await reqAreaInfo();
		result = result.data;
		if(result.status === 0) {
			const list = result.data;
			commit(UPDATE_AREA_INFO, list);
		}
	},
	
	//异步获取信息列表
	async getMessageInfo({commit}) {
		let result = await reqMessageInfo();
		result = result.data;
		if(result.status === 0) {
			const list = result.data;
			commit(UPDATE_MESSAGE_INFO, list);
		}
	}
}