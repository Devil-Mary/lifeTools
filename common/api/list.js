import $http from "../http.js"

export const get_list = (data)=>{
	console.log(data)
	return $http({url:'get_list',data:data})	
}
export const get_imglist = (data)=>{
	console.log(data)
	return $http({url:'get_imglist',data:data})	
}
export const get_morningimg = (data)=>{
	console.log(data)
	return $http({url:'get_morningimg',data:data})	
}
export const get_fuli = (data)=>{
	console.log(data)
	return $http({url:'get_fuli',data:data})	
}