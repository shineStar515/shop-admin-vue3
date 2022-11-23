import { createRouter, createWebHistory } from 'vue-router';
import { errorRoutes, staticRoutes } from '@/router/module/staticRoutes';
import { doneFullLoading, showFullLoading } from '@/utils/showFullLoading';
import useGlobalStore from '@/stores/global';
import { addAsyncRoutes } from '@/router/module/asyncRoutes';
import { getUserInfo } from '@/service/api/login';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [...staticRoutes, ...errorRoutes]
});

router.beforeEach(async (to, from, next) => {
	//1.开启loading
	showFullLoading();
	//2.修改网页标题
	let title = to.meta.title ? to.meta.title : '后台管理';
	document.title = title as string;
	//3.如果是访问登陆页，直接放行
	if (to.path === '/login') return next();
	//4.判断是否有token
	const globalStore = useGlobalStore();
	if (!globalStore.shopAdminToken) return next({ path: '/login', replace: true });
	//5.判断是否有用户菜单,如果没有则重新请求 添加动态路由
	if (!globalStore.menus.length) {
		const { data: userInfo } = await getUserInfo();
		globalStore.setUserInfo(userInfo);
		globalStore.setUserMenus(userInfo.menus);
		globalStore.setUserRuleNames(userInfo.ruleNames);
		await addAsyncRoutes(globalStore.menus);
		return next({ ...to, replace: true });
	}
	//6.正常访问界面
	next();
});
//全局后置守卫
router.afterEach(() => {
	//关闭loading
	doneFullLoading();
});
export default router;
