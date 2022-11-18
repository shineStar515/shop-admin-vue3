// * 请求响应参数(不包含data)
export interface Result {
	msg: string;
}

// * 请求响应参数(包含data)
export interface IResultData<T = any> extends Result {
	data: T;
}
