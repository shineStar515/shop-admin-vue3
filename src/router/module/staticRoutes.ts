export const staticRoutes = [
	{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/Login/index.vue')
	},
	{
		path: '/home',
		name: 'home',
		component: () => import('@/views/home/index.vue')
	}
];
export const errorRoutes = [
	{
		path: '/404',
		component: () => import('@/components/ErrorMessage/404.vue')
	},
	{
		path: '/403',
		component: () => import('@/components/ErrorMessage/403.vue')
	},
	{
		path: '/500',
		component: () => import('@/components/ErrorMessage/500.vue')
	}
];
