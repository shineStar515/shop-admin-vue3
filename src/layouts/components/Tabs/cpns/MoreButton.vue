<template>
	<el-dropdown trigger='click'>
		<el-button size='small' type='primary'>
			<span>更多</span>
			<el-icon class='el-icon--right'>
				<arrow-down />
			</el-icon>
		</el-button>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click='closeOtherTab'>
					<el-icon>
						<CircleClose />
					</el-icon>
					关闭其他
				</el-dropdown-item>
				<el-dropdown-item @click='closeAllTab'>
					<el-icon>
						<FolderDelete />
					</el-icon>
					关闭所有
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang='ts'>
import useTabsStore from '@/stores/modules/tabs';

const tabsStore = useTabsStore();

function closeOtherTab() {
	tabsStore.removeOtherTabs();
}

function closeAllTab() {
	tabsStore.removeAllTabs();
}
</script>

<style scoped lang='scss'></style>
