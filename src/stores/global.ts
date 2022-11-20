import { defineStore } from 'pinia'
import router from '@/router'
import { getLoginInfo, getUserInfo, logoutInfo, updatePassword } from '@/service/api/login'
import { getToken, setToken } from '@/utils/authToken'
import type { ILogin } from '@/service/api/login/types'
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
		},
		//修改密码
		async updatePasswordRequestAction(updateData: ILogin.UpdatePasswordInfo) {
			await updatePassword(updateData)
		}
	},
	persist: { key: 'global' }
});
export default useGlobalStore;
