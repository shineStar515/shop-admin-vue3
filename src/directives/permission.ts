import useGlobalStore from '@/stores/global';
import type { App } from 'vue';

function hasPermission(value: string[], el: Element) {
	if (!Array.isArray(value)) {
		throw new Error(`需要配置权限，例如 v-permission="['getStatistics3,GET']"`);
	}
	const glubalStore = useGlobalStore();
	const hasAuth = value.findIndex(v => glubalStore.ruleNames.includes(v)) != -1;
	if (el && !hasAuth) {
		el.parentNode && el.parentNode.removeChild(el);
	}
	return hasAuth;
}

export default {
	install(app: App) {
		app.directive('permission', {
			mounted(el, binding) {
				hasPermission(binding.value, el);
			}
		});
	}
};
