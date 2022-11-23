<template>
	<div class="form">
		<h1>欢迎回来</h1>
		<h4 class="form-text">-----账号密码登录-----</h4>
		<div class="form-content">
			<el-form :model="loginForm" ref="loginFormRef" :rules="loginFormRules" size="large" style="width: 60%">
				<el-form-item prop="username">
					<el-input v-model="loginForm.username" :prefix-icon="User" placeholder="请输入用户名" />
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="loginForm.password" :prefix-icon="Lock" placeholder="请输入密码" show-password />
				</el-form-item>
				<el-form-item>
					<el-button class="form-btn" type="primary" round :loading="loading" @click="handleLoginClick(loginFormRef)"
						>登录</el-button
					>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification } from 'element-plus'
import { Lock, User } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue'
import useGlobalStore from '@/stores/global'
import { toast } from '@/utils/toast'
import { useRouter } from 'vue-router'
import { addAsyncRoutes } from '@/router/module/asyncRoutes'
import { getLoginInfo, getUserInfo } from '@/service/api/login'

const loginForm = reactive({
	username: 'admin',
	password: 'admin'
})
const loginFormRef = ref<FormInstance>()
const loginFormRules = reactive<FormRules>({
	username: [
		{ required: true, message: '请输入用户名', trigger: 'blur' },
		{ min: 3, max: 5, message: '长度必须为3到5位', trigger: 'blur' }
	],
	password: [
		{
			required: true,
			message: '请输入密码',
			trigger: 'blur'
		}
	]
});
const globalStore = useGlobalStore()
const router = useRouter()
const loading = ref(false)
function handleLoginClick(formEl: FormInstance) {
	if (!formEl) return
	formEl.validate(async valid => {
		if (!valid) return
		try {
			loading.value = true
			//1.登录
			const username = loginForm.username
			const password = loginForm.password
			const { data: loginInfo } = await getLoginInfo({ username, password })
			globalStore.setUserToken(loginInfo.token)
			//2.用户信息
			const { data: userInfo } = await getUserInfo()
			globalStore.setUserInfo(userInfo)
			globalStore.setUserMenus(userInfo.menus)
			globalStore.setUserRuleNames(userInfo.ruleNames)
			//3.添加动态路由
			addAsyncRoutes(globalStore.menus)
			//4.跳转到首页
			await router.push('/admin')
			ElNotification({
				title: 'Success',
				message: '登录成功',
				type: 'success'
			})
		} catch {
			toast('error', '账号或密码错误')
		} finally {
			loading.value = false
		}
	});
}
onMounted(() => {
	// 监听enter事件（调用登录）
	document.onkeydown = (e: any) => {
		e = window.event || e;
		if (e.code === 'Enter' || e.code === 'enter' || e.code === 'NumpadEnter') {
			if (loading.value) return;
			handleLoginClick(loginFormRef.value as FormInstance);
		}
	};
});
</script>
<style scoped lang="scss">
.form {
	text-align: center;
	.form-text {
		color: #c0bebe;
	}
	.form-content {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 460px;
		.form-btn {
			width: 100%;
		}
	}
}
</style>
