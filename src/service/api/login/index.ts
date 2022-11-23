import { myRequest } from '@/service';
import type { ILogin, IUser } from '@/service/api/login/types';

//登录信息
export function getLoginInfo(loginData: ILogin.LoginInfo) {
	return myRequest.post<ILogin.LoginResult>({
		url: '/login',
		data: loginData
	});
}

//修改密码
export function updatePassword(updateData: ILogin.UpdatePasswordInfo) {
	return myRequest.post({
		url: '/updatepassword',
		data: updateData
	});
}

//用户信息
export function getUserInfo() {
	return myRequest.post<IUser.UserResult>({
		url: '/getinfo'
	});
}

//退出登录
export function logoutInfo() {
	return myRequest.post({
		url: '/logout'
	});
}
