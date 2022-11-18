import { createRouter, createWebHistory } from 'vue-router';
import { staticRoutes } from '@/router/module/staticRoutes';
import { getToken } from '@/utils/authToken';
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [...staticRoutes]
});
//全局前置守卫
router.beforeEach(() => {
	const token = getToken();
	console.log(token);
});
export default router;
