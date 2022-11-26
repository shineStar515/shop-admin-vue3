<template>
	<div class='tabs'>
		<div class='tabs-menu'>
			<el-tabs v-model='tabsMenuValue' type='card' @tab-remove='tabRemove' @tab-change='tabChange'>
				<el-tab-pane
					v-for='item in tabsList'
					:key='item.path'
					:label='item.name'
					:name='item.path'
					:closable='true'
				></el-tab-pane>
			</el-tabs>
			<MoreButton />
		</div>
	</div>
</template>
<script lang='ts' setup>
import { useRoute, useRouter } from 'vue-router';
import MoreButton from '@/layouts/components/Tabs/cpns/MoreButton.vue';
import useTabsStore from '@/stores/modules/tabs';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';

const tabsStore = useTabsStore();
const { tabsList, tabsMenuValue } = storeToRefs(tabsStore);
const router = useRouter();

function tabChange(path: string) {
	router.push(path);
}

function tabRemove(path: string) {
	tabsStore.removeTabsRoute(path);
}

// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
const route = useRoute();
watch(
	() => route.path,
	() => {
		tabsMenuValue.value = route.path;

		tabsStore.addTabsRoute(route.path);
	},
	{
		immediate: true
	}
);
</script>
<style scoped lang='scss'>
:deep(.el-card__header) {
	display: none !important;
}

.tabs {
	background-color: #ffffff;

	:deep(.tabs-menu) {
		position: relative;
		width: 100%;

		.el-dropdown {
			position: absolute;
			top: 8px;
			right: 13px;
		}

		.el-tabs__nav-wrap {
			position: absolute;
			width: calc(100% - 100px);
		}

		.el-tabs--card > .el-tabs__header {
			box-sizing: border-box;
			height: 40px;
			padding: 0 10px;
			margin: 0;
		}

		.el-tabs--card > .el-tabs__header .el-tabs__nav {
			border: none;
		}

		.el-tabs--card > .el-tabs__header .el-tabs__item {
			color: #cccccc;
			border: none;
		}

		.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
			color: var(--el-color-primary);
			border-bottom: 2px solid var(--el-color-primary);
		}

		.el-tabs__item .is-icon-close svg {
			margin-top: 0.5px;
		}
	}
}
</style>
