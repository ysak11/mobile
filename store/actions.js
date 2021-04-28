import {
	UPDATE_AREA_INFO
} from './mutation-type.js'

import {reqAreaInfo} from '@/api';

export default {
	//异步获取区域列表信息
	async getAreaInfo({commit}) {
		const result = await reqAreaInfo();
		if(result.status === 0) {
			const list = result.data;
			commit(UPDATE_AREA_INFO, list);
		}
	}
}