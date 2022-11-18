import { myRequest } from '@/service';
import type { IUser } from '@/service/api/login/types';
//登录信息
export function getLoginInfo(loginData: IUser.LoginInfo) {
	return myRequest.post<IUser.LoginResult>({
		url: '/login',
		data: loginData
	});
}
//用户信息
export function getUserInfo() {
	return myRequest.post({
		url: '/getinfo'
	});
}
