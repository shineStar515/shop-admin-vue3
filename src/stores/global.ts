import { defineStore } from 'pinia';
import { getLoginInfo, getUserInfo } from '@/service/api/login';
import type { IUser } from '@/service/api/login/types';
import { getToken, setToken } from '@/utils/authToken';
const useGlobalStore = defineStore('global', {
	state: () => ({
		shopAdminToken: '',
		userInfo: {}
	}),
	actions: {
		//登录信息
		async loginRequestAction(loginInfo: IUser.LoginInfo) {
			const { data } = await getLoginInfo(loginInfo);
			setToken(data.token);
			await this.userInfoRequestAction();
		},
		//用户信息
		async userInfoRequestAction() {
			this.shopAdminToken = getToken();
			const { data: userInfo } = await getUserInfo();
			console.log(userInfo);
		}
	}
});
export default useGlobalStore;
