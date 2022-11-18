<template>
	<div class="app">
		<keep-alive>
			<el-config-provider :locale="zhCn">
				<RouterView />
			</el-config-provider>
		</keep-alive>
	</div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
</script>

<style lang="scss">
body {
	width: 100vw;
	height: 100vh;
	#app {
		width: 100%;
		height: 100%;
	}
	.app {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
}
</style>
