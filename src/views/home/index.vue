<template>
	<div class='home'>
		首页
		<el-button type='primary' @click='handleLogoutClick'>退出登录</el-button>
	</div>
</template>
<script lang='ts' setup>
import { ElMessageBox } from 'element-plus'
import { toast } from '@/utils/toast'
import { removeToken } from '@/utils/authToken'
import useGlobalStore from '@/stores/global'
//退出登录
const globalStore = useGlobalStore()

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
				window.location.reload()
				toast('success', '成功退出')
			})
		})
		.catch(() => {
			toast('success', '取消退出')
		})
		.finally(() => {
		})
}
</script>
<style scoped></style>
