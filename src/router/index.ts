import { createRouter, createWebHistory } from 'vue-router'
import { errorRoutes, staticRoutes } from '@/router/module/staticRoutes'
import { doneFullLoading, showFullLoading } from '@/utils/showFullLoading'
import useGlobalStore from '@/stores/global'
import { addAsyncRoutes } from '@/router/module/asyncRoutes'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [...staticRoutes, ...errorRoutes]
})

router.beforeEach(async (to, from, next) => {
	//1.开启loading
	showFullLoading()
	//3.修改网页标题
	let title = to.meta.title ? to.meta.title : '后台管理'
	document.title = title as string
	const globalStore = useGlobalStore()
	const menus = globalStore.menus
	addAsyncRoutes(menus)
	next()
})
//全局后置守卫
router.afterEach(() => {
	//关闭loading
	doneFullLoading()
})
export default router
