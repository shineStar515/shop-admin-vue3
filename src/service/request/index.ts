import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import type { IResultData } from '@/service/request/types'
import { toast } from '@/utils/toast'
import { getToken } from '@/utils/authToken'

class myRequest {
	instance: AxiosInstance;
	constructor(config: AxiosRequestConfig) {
		this.instance = axios.create(config);
		//请求拦截器
		this.instance.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				// 获取token
				const token = getToken();
				if (token && config.headers && config.url != '/login') {
					config!.headers['token'] = token;
				}
				return config;
			},
			error => {
				toast('error', '请求失败,请稍后重试!!!')
				return Promise.reject(error);
			}
		);
		//响应拦截器
		this.instance.interceptors.response.use(
			res => {
				return res.data;
			},
			error => {
				toast('error', '请求失败,请稍后重试!!!')
				return Promise.reject(error);
			}
		);
	}
	get<T>(config: AxiosRequestConfig): Promise<IResultData<T>> {
		return this.instance.request({ ...config, method: 'GET' });
	}
	post<T>(config: AxiosRequestConfig): Promise<IResultData<T>> {
		return this.instance.request({ ...config, method: 'POST' });
	}
	delete<T>(config: AxiosRequestConfig): Promise<IResultData<T>> {
		return this.instance.request({ ...config, method: 'DELETE' });
	}
	patch<T>(config: AxiosRequestConfig): Promise<IResultData<T>> {
		return this.instance.request({ ...config, method: 'PATCH' });
	}
}
export default myRequest;
