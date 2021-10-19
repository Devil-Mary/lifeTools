// import {get_label} from './list.js'

// export default {
// 	get_label
// }

// 批量导出文件
 const requireApi = require.context(
	'.',
	false,
	/.js$/
 )
 
 console.log(requireApi.keys());
 
 let module = {}
 
 requireApi.keys().forEach((key,index)=>{
	 if(key=="./index.js") return
	 Object.assign(module,requireApi(key))
 })
 
 
 export default module