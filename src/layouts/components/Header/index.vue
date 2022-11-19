<template>
	<div class='header'>
		<div class='header-left'>
			<span>
				<el-icon color='#fff' class='icon' :size='25'><IceCream /></el-icon
				></span>
			<h2 class='header-title'>星星会发光</h2>
			<span style='margin-left: 20px'>
				<el-icon class='icon icon-btn' color='#fff' :size='25'><Fold /></el-icon>
				<el-tooltip class='box-item' effect='dark' content='刷新' placement='bottom'>
					<el-icon class='icon icon-btn' color='#fff' :size='25' @click='handleRefresh'>
						<RefreshRight />
					</el-icon>
				</el-tooltip>
			</span>
		</div>
		<div class='header-right'>
			<el-tooltip class='box-item' effect='dark' content='全屏' placement='bottom'>
				<el-icon class='icon icon-btn' color='#fff' :size='25' @click='toggle()'
				>
					<FullScreen v-if='!isFullscreen' />
					<Aim v-else
					/>
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
		<el-drawer
			v-model='dialog'
			title='修改密码'
			direction='rtl'
			:close-on-click-modal='false'
			custom-class='demo-drawer'
			size='45%'
		>
			<div class='demo-drawer__content' style='padding: 0 50px'>
				<el-form ref='resetFormRef' :model='resetPWDForm' label-position='right' size='large' label-width='100px'>
					<el-form-item required label='旧密码 :'>
						<el-input v-model='resetPWDForm.oldPassword' placeholder='请输入旧密码' />
					</el-form-item>
					<el-form-item required label='新密码 :'>
						<el-input v-model='resetPWDForm.newPassword' placeholder='请输入新密码' />
					</el-form-item>
					<el-form-item required label='确认密码 :'>
						<el-input v-model='resetPWDForm.confirmPassword' placeholder='请确认新密码' />
					</el-form-item>
				</el-form>
				<div class='demo-drawer__footer'>
					<el-button @click='dialog = false'>取消</el-button>
					<el-button type='primary' :loading='loading' @click='handleResetPWDClick(resetFormRef)'>修改</el-button>
				</div>
			</div>
		</el-drawer>
	</div>
</template>
<script lang='ts' setup>
import { useFullscreen } from '@vueuse/core'
import { ElMessageBox } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { toast } from '@/utils/toast'
import { removeToken } from '@/utils/authToken'
import useGlobalStore from '@/stores/global'
import type { IUser } from '@/service/api/login/types'
import { reactive, ref } from 'vue'

const userInfo: IUser.UserResult = useGlobalStore().userInfo

/* 下拉框事件派发 */
function handleCommand(command: string) {
	switch (command) {
		case 'resetPassword':
			openDialog()
			break
		case 'logout':
			handleLogoutClick()
			break
		default:
			break
	}
}

//修改密码
function openDialog() {
	dialog.value = true
}

const dialog = ref(false)
const loading = ref(false)
const resetFormRef = ref<FormInstance>()
const resetPWDForm = reactive({
	oldPassword: '',
	newPassword: '',
	confirmPassword: ''
})

function handleResetPWDClick(formEl: FormInstance) {
	console.log(formEl)
}

//退出登录
function handleLogoutClick() {
	ElMessageBox.confirm('是否要退出登录', 'Warning', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(() => {
			useGlobalStore()
				.logoutRequestAction()
				.finally(() => {
					removeToken()
					window.localStorage.clear()
					window.location.reload()
					toast('success', '成功退出')
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
	padding: 0 20px;
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
		padding: 0 20px;
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
