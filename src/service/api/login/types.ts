/* 登录信息 */
export namespace ILogin {
	//登录请求
	export interface LoginInfo {
		username: string;
		password: string;
	}

	//登录响应
	export interface LoginResult {
		token: string;
	}

	//修改密码
	export interface UpdatePasswordInfo {
		oldpassword: string;
		password: string;
		repassword: string;
	}
}
/* 用户信息 */

export namespace IUser {
	export interface UserResult {
		id: number;
		username: string;
		avatar: string;
		super: number;
		role: Role;
		menus: Menu[];
		ruleNames: string[];
	}

	//用户角色
	export interface Role {
		id: number;
		name: string;
	}

	//用户菜单
	export interface Menu {
		id: number;
		rule_id: number;
		status: number;
		create_time: string;
		update_time: string;
		name: string;
		desc?: string;
		frontpath?: string;
		condition?: string;
		menu: number;
		order: number;
		icon: string;
		method: string;
		child: Child[];
	}

	export interface Child {
		id: number;
		rule_id: number;
		status: number;
		create_time: string;
		update_time: string;
		name: string;
		desc?: string;
		frontpath: string;
		condition?: string;
		menu: number;
		order: number;
		icon: string;
		method: string;
		child: Child2[];
	}

	export interface Child2 {
		id: number;
		rule_id: number;
		status: number;
		create_time: string;
		update_time: string;
		name: string;
		desc: any;
		frontpath: string;
		condition: string;
		menu: number;
		order: number;
		icon: string;
		method: string;
		child: any[];
	}
}
