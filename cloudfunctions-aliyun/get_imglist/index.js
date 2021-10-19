'use strict';
// 获取数据库的引用
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	
	let faceimg =await db.collection('faceimg').get();
	
	//返回数据给客户端
	return {
		code:200,
		msg:"数据请求成功",
		data:faceimg.data
	}
};