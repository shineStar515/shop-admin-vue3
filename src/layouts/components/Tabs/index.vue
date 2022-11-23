<template>
	<div class='tabs'>
		<div class='tabs-menu'>
			<el-tabs v-model='tabsMenuValue' type='card' @tab-click='tabClick' @tab-remove='tabRemove'>
				<el-tab-pane v-for='item in tabsMenuList' :key='item.path' :label='item.name' :closable='true'></el-tab-pane>
			</el-tabs>
			<MoreButton />
		</div>
	</div>
</template>
<script lang='ts' setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MoreButton from '@/layouts/components/Tabs/cpns/MoreButton.vue';

const router = useRouter();
const tabsMenuValue = ref(0);
const data = router.getRoutes();
const tabsMenuList = ref(data);
console.log(tabsMenuList);
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
