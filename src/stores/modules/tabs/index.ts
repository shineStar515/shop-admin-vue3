import { defineStore } from 'pinia';
import type { ITabsStore } from '@/stores/modules/tabs/types';
import router from '@/router';
import piniaPersistConfig from '@/stores/config';

const routerTotals = router.getRoutes();
const useTabsStore = defineStore('tabs', {
	state: (): ITabsStore => ({
		tabsList: [],
		tabsMenuValue: ''
	}),
	actions: {
		//initTabsRoute
		initTabsRoute() {
			this.tabsList = [];
		},
		//addTabsRoute
		addTabsRoute(path: any) {
			const tabItem = routerTotals.find(route => route.path === path);
			if (this.tabsList.every(item => item.path !== tabItem!.path)) this.tabsList.push(tabItem);
			this.tabsMenuValue = path;
		},
		//removeTabsRoute
		removeTabsRoute(path: string) {
			if (path === '/admin/index') return;
			const tabsList = this.tabsList;
			let tabsMenuValue = this.tabsMenuValue;
			if (tabsMenuValue === path) {
				tabsList.forEach((tab, index) => {
					if (tab.path === tabsMenuValue) {
						const value = tabsList[index + 1] || tabsList[index - 1];
						router.push(value);
					}
				});
			}
			this.tabsList = tabsList.filter(tab => tab.path !== path);
		},
		//remove other tabs
		removeOtherTabs() {
			this.tabsList = this.tabsList.filter(tab => tab.path === this.tabsMenuValue || tab.path === '/admin/index');
		},
		//remove all tabs
		removeAllTabs() {
			this.tabsList = this.tabsList.filter(tab => tab.path === '/admin/index');
			router.push('/').catch(() => {});
		}
	},
	persist: piniaPersistConfig('tabs')
});
export default useTabsStore;
