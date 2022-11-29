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
import useGlobalStore from '@/stores/global';
//页面缩放时重新计算可视化高度
window.addEventListener('resize', function() {
	useGlobalStore().getVisibleHeight();
	console.log('页面缩放变化了');
});
</script>

<style lang="scss">
body {
	box-sizing: border-box;
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

	#nprogress .bar {
		background-color: #31d8ed !important;
		height: 3px;
	}
}
</style>
