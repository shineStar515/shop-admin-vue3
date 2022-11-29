import { defineStore } from 'pinia';
import { setToken } from '@/utils/authToken';
import piniaPersistConfig from '@/stores/config';
import type { IGlobalStore } from '@/stores/types';
import type { IUser } from '@/service/api/login/types';

const useGlobalStore = defineStore('global', {
	state: (): IGlobalStore => ({
		shopAdminToken: '', //用户token
		userInfo: { menus: [] }, //用户信息
		menus: [],
		ruleNames: [],
		menuWidth: '250px', //菜单宽度
		visibleHeight: 0 //可视区高度
	}),
	actions: {
		//setToken
		setUserToken(token: string) {
			this.shopAdminToken = token;
			setToken(token);
		},
		//setUserInfo
		setUserInfo(userInfo: IUser.UserResult) {
			this.userInfo = userInfo;
		},
		//setUserMenus
		setUserMenus(userMenus: IUser.Menu[]) {
			this.menus = userMenus;
		},
		//setRuleNames
		setUserRuleNames(userRuleNames: string[]) {
			this.ruleNames = userRuleNames;
		},

		//修改菜单宽度
		changeMenuWidthAction() {
			this.menuWidth = this.menuWidth === '250px' ? '64px' : '250px';
		},
		//获取可视区高度
		getVisibleHeight() {
			this.visibleHeight = document.documentElement.clientHeight - 150;
		}
	},
	persist: piniaPersistConfig('global', ['shopAdminToken', 'ruleNames'])
});
export default useGlobalStore;
