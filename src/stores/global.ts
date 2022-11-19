import { defineStore } from 'pinia'

import { getLoginInfo, getUserInfo, logoutInfo } from '@/service/api/login'
import type { ILogin } from '@/service/api/login/types'
import { getToken, setToken } from '@/utils/authToken'
import router from '@/router'
import type { IGlobalStore } from '@/stores/types'

const useGlobalStore = defineStore('global', {
	state: (): IGlobalStore => ({
		shopAdminToken: '',
		userInfo: { menus: [] }
	}),
	actions: {
		//登录信息
		async loginRequestAction(loginInfo: ILogin.LoginInfo) {
			const { data } = await getLoginInfo(loginInfo)
			setToken(data.token)
			this.shopAdminToken = getToken()
			await this.userInfoRequestAction()
			await router.push('/layout')
		},
		//用户信息
		async userInfoRequestAction() {
			const { data: userInfo } = await getUserInfo()
			this.userInfo = userInfo
		},
		//退出登录
		async logoutRequestAction() {
			await logoutInfo()
		}
	},
	persist: { key: 'global' }
});
export default useGlobalStore;
