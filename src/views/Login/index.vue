<template>
	<div class="login">
		<el-row class="login-content">
			<el-col :lg="16" :md="12" class="login-left">
				<span class="login-title">欢迎光临</span>
			</el-col>
			<el-col :lg="8" :md="12" class="login-right">
				<login-form />
			</el-col>
		</el-row>
	</div>
</template>
<script lang="ts" setup>
import LoginForm from '@/views/Login/cpns/LoginForm.vue';
</script>
<style scoped lang="scss">
.login {
	width: 100%;
	height: 100%;
	.login-content {
		width: 100%;
		height: 100%;
		.login-left,
		.login-right {
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #6366f1;
		}
		.login-right {
			background-color: rgba(255, 255, 255, 0.99);
		}
		.login-title {
			font-size: 70px;
			font-weight: 2000;
			color: #ffffff;
		}
	}
}
</style>
