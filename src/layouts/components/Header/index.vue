<template>
	<div class='header'>
		<div class='header-left'>
			<span>
				<el-icon color='#fff' class='icon' :size='25'><IceCream /></el-icon
				></span>
			<h2 class='header-title'>星星会发光</h2>
			<span style='margin-left: 20px'>
				<el-icon class='icon icon-btn' color='#fff' :size='25' @click='handleFoldClick'>
					<Fold v-if="globalStore.menuWidth === '250px'" />
					<Expand v-else />
				</el-icon>
				<el-tooltip class='box-item' effect='dark' content='刷新' placement='bottom'>
					<el-icon class='icon icon-btn' color='#fff' :size='25' @click='handleRefresh'>
						<RefreshRight />
					</el-icon>
				</el-tooltip>
			</span>
		</div>
		<div class='header-right'>
			<el-tooltip class='box-item' effect='dark' content='全屏' placement='bottom'>
				<el-icon class='icon icon-btn' color='#fff' :size='25' @click='toggle()'>
					<FullScreen v-if='!isFullscreen' />
					<Aim v-else />
				</el-icon>
			</el-tooltip>
			<el-dropdown @command='handleCommand'>
				<span class='el-dropdown-link'>
					<span><el-avatar :size='30' :src='userInfo.avatar' /></span>
					<p style='color: #fff; font-size: 16px; cursor: pointer'>{{ userInfo.username }}</p>
					<el-icon class='el-icon--right' color='#fff' :size='25'>
						<arrow-down />
					</el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item command='resetPassword'>修改密码</el-dropdown-item>
						<el-dropdown-item command='logout'>退出登陆</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
		<FormDrawer ref='formDrawerRef' title='修改' @submit='handleResetPWDClick(resetFormRef)'>
			<template #content>
				<el-form
					ref='resetFormRef'
					:model='resetPWDForm'
					:rules='resetPWDFormRules'
					label-position='right'
					size='large'
					label-width='100px'
				>
					<el-form-item required label='旧密码 :' prop='oldPassword'>
						<el-input v-model='resetPWDForm.oldPassword' placeholder='请输入旧密码' />
					</el-form-item>
					<el-form-item required label='新密码 :' prop='newPassword'>
						<el-input v-model='resetPWDForm.newPassword' placeholder='请输入新密码' />
					</el-form-item>
					<el-form-item required label='确认密码 :' prop='confirmPassword'>
						<el-input v-model='resetPWDForm.confirmPassword' placeholder='请确认新密码' />
					</el-form-item>
				</el-form>
			</template>
		</FormDrawer>
	</div>
</template>
<script lang='ts' setup>
import FormDrawer from '@/components/FormDrawer/index.vue'
import { useFullscreen } from '@vueuse/core'
import { ElMessageBox } from 'element-plus'
import { toast } from '@/utils/toast'
import { removeToken } from '@/utils/authToken'
import type { IUser } from '@/service/api/login/types'
import useGlobalStore from '@/stores/global'
import { useRePassword } from '@/hooks/useRePassword'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
//globalStore
const globalStore = useGlobalStore()
const userInfo: IUser.UserResult = globalStore.userInfo

/* 菜单展开收缩 */
function handleFoldClick() {
	globalStore.changeMenuWidthAction()
}

/* 下拉框事件派发 */
function handleCommand(command: string) {
	switch (command) {
		case 'resetPassword':
			//打开对话框
			openRePassword()
			break
		case 'logout':
			handleLogoutClick()
			break
		default:
			break
	}
}

//FormDrawer Hooks
//修改密码
const formDrawerRef = ref<InstanceType<FormDrawer>>()
const {
	resetFormRef,
	resetPWDForm,
	resetPWDFormRules,
	openRePassword,
	handleResetPWDClick
} = useRePassword(formDrawerRef)

//退出登录
function handleLogoutClick() {
	ElMessageBox.confirm('是否要退出登录', 'Warning', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(() => {
			globalStore.logoutRequestAction().finally(() => {
				removeToken()
				window.localStorage.clear()
				router.push('/login')
				toast('success', '退出登录成功')
			})
		})
		.catch(() => {
			toast('success', '取消退出')
		})
}

//刷新
function handleRefresh() {
	window.location.reload()
}

//全屏
const { isFullscreen, toggle } = useFullscreen()
</script>
<style scoped lang='scss'>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 16px;
	background-color: #6366f1;
	height: 70px;
	text-align: center;
	vertical-align: middle;

	.header-title {
		color: rgba(255, 255, 255, 0.89);
	}

	.header-left,
	.header-right {
		display: flex;
		justify-content: space-between;
		align-items: center;
		vertical-align: center;
		padding: 0 15px;
	}

	.el-dropdown-link {
		display: flex;
		justify-content: space-between;
		align-items: center;
		vertical-align: center;
	}

	span {
		vertical-align: bottom !important;
		text-align: center !important;
		padding: 0 5px;
	}

	.icon-btn:hover {
		cursor: pointer;
		background-color: #4549dc;
	}

	.icon {
		padding: 23px 20px;
	}
}
</style>
