import { defineStore } from 'pinia'

import { getLoginInfo, getUserInfo, logoutInfo } from '@/service/api/login'
import type { IUser } from '@/service/api/login/types'
import { getToken, setToken } from '@/utils/authToken'
import router from '@/router'

const useGlobalStore = defineStore('global', {
	state: () => ({
		shopAdminToken: '',
		userInfo: {
			menus: []
		}
	}),
	actions: {
		//登录信息
		async loginRequestAction(loginInfo: IUser.LoginInfo) {
			const { data } = await getLoginInfo(loginInfo)
			setToken(data.token)
			this.shopAdminToken = getToken()
			await this.userInfoRequestAction()
			await router.push('/home')
		},
		//用户信息
		async userInfoRequestAction() {
			const { data: userInfo } = await getUserInfo()
			console.log(userInfo)
			this.userInfo = userInfo as any
		},
		//退出登录
		async logoutRequestAction() {
			await logoutInfo()
		}
	},
	persist: { key: 'global' }
});
export default useGlobalStore;
