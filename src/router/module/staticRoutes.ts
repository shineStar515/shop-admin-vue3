export const staticRoutes = [
	{
		path: '/',
		redirect: '/layout'
	},
	{
		path: '/layout',
		name: 'layout',
		redirect: '/layout/home',
		component: () => import('@/layouts/index.vue'),
		children: [
			{
				path: 'home',
				name: 'home',
				component: () => import('@/views/home/index.vue'),
				meta: {
					title: '后台首页'
				}
			}
		]
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/Login/index.vue'),
		meta: {
			title: '登录页'
		}
	}
];
export const errorRoutes = [
	{
		path: '/:pathMatch(.*)*',
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
