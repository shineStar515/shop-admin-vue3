import { doneFullLoading, showFullLoading } from '@/utils/showFullLoading'
import useGlobalStore from '@/stores/global'
import router from '@/router/index'
import type { IUser } from '@/service/api/login/types'
//全局前置守卫
router.beforeEach(async (to, from, next) => {
	//1.开启loading
	showFullLoading()
	//2.获取token userInfo
	const globalStore = useGlobalStore()
	const token = globalStore.shopAdminToken
	const userInfo: IUser.UserResult = globalStore.userInfo
	//3.修改网页标题
	let title = to.meta.title ? to.meta.title : '后台管理'
	document.title = title as string
	//4.路由判断
	if (to.path === '/login' && token) return next({ path: from.path, replace: true })
	if (to.path === '/login' && !token) return next()
	if (to.path !== '/login' && !userInfo?.menus?.length && token) {
		await globalStore.userInfoRequestAction()
		return next({ path: from.path, replace: true })
	}
	if (to.path !== '/login' && !userInfo.menus.length && !token) {
		return next({ path: '/login', replace: true })
	}
	if (to.path !== '/login' && userInfo.menus.length && token) {
		return next()
	}
	next()
})
//全局后置守卫
router.afterEach(() => {
	//关闭loading
	doneFullLoading()
})
