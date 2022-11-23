import { defineStore } from 'pinia';

const useTabsStore = defineStore('tabs', {
	state: () => ({
		tabsList: []
	}),
	actions: {
		addTabsRoute() {}
	}
});
export default useTabsStore;
