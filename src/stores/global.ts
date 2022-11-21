import { defineStore } from 'pinia'
import router from '@/router'
import { getLoginInfo, getUserInfo, logoutInfo, updatePassword } from '@/service/api/login'
import { getToken, setToken } from '@/utils/authToken'
import type { ILogin } from '@/service/api/login/types'
import type { IGlobalStore } from '@/stores/types'
import piniaPersistConfig from '@/stores/config'

const useGlobalStore = defineStore('global', {
	state: (): IGlobalStore => ({
		shopAdminToken: '', //用户token
		userInfo: { menus: [] }, //用户信息
		menuWidth: '250px', //菜单宽度
		menus: [],
		ruleNames: []
	}),
	actions: {
		//登录信息
		async loginRequestAction(loginInfo: ILogin.LoginInfo) {
			const { data } = await getLoginInfo(loginInfo)
			setToken(data.token)
			this.shopAdminToken = getToken()
			await this.userInfoRequestAction()
			await router.push('/')
		},
		//用户信息
		async userInfoRequestAction() {
			const { data: userInfo } = await getUserInfo()
			this.userInfo = userInfo
			this.menus = userInfo.menus
			this.ruleNames = userInfo.ruleNames
		},
		//退出登录
		async logoutRequestAction() {
			await logoutInfo()
		},
		//修改密码
		async updatePasswordRequestAction(updateData: ILogin.UpdatePasswordInfo) {
			await updatePassword(updateData)
		},
		//修改菜单宽度
		changeMenuWidthAction() {
			this.menuWidth = this.menuWidth === '250px' ? '64px' : '250px'
		}
	},
	persist: piniaPersistConfig('global', ['shopAdminToken', 'ruleNames'])
});
export default useGlobalStore;
