//动态路由
import type { IUser } from '@/service/api/login/types';
import router from '@/router';

//数组扁平化
export function getFlatArr(menus: IUser.Menu[]) {
	return menus.reduce((pre: IUser.Menu[], current) => {
		let flatArr = [...pre, current];
		if (current.child) {
			flatArr = [...flatArr, ...getFlatArr(current.child)];
		}
		return flatArr;
	}, []);
}

//添加动态路由
// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob('@/views/**/*.vue');

export function addAsyncRoutes(initMenus: IUser.Menu[]) {
	const menus = [...initMenus];
	const flatArrRoutes = getFlatArr(menus);
	const asyncRoutes: IUser.Menu[] = [];
	flatArrRoutes.forEach((route: any) => {
		if (route.frontpath) {
			if (route.child) delete route.child;
			asyncRoutes.push(route);
		}
	});
	delete flatArrRoutes[0];
	asyncRoutes.forEach((route: any) => {
		route.component = modules['/src/views' + route.frontpath + '.vue'];
		if (route.component) {
			route.path = route.frontpath;
			router.addRoute('admin', route);
		}
	});
}
