//默认路由-所有用户共享
export const staticRoutes = [
	{
		path: '/',
		redirect: '/admin'
	},
	{
		path: '/admin',
		name: 'admin',
		component: () => import('@/layouts/index.vue'),
		redirect: '/admin/index',
		children: [
			{
				path: 'index',
				component: () => import('@/views/home/index.vue')
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
