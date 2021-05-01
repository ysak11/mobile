export default function request(url, data={}, method='GET') {
	return new Promise((resolve,reject)=>{
		uni.request({
			url,
			method,
			data,
			success: (res)=>{
				resolve(res)
			},
			fail: (err)=>{
				reject(err)
			}
		})
	})
}