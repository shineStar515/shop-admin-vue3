<template>
	<div class='tagList'>路由标签</div>
</template>
<!--<template>-->
<!--	<div class="tagList">-->
<!--		<div class="tagList-tabs" style="min-width: 100px">-->
<!--			<el-tabs v-model="editableTabsValue" type="border-card" closable @tab-remove="removeTab">-->
<!--				<el-tab-pane class="tagList-tab" v-for="item in editableTabs" :key="item.name" :label="item.name" :name="item.path" />-->
<!--			</el-tabs>-->
<!--		</div>-->
<!--		<div class="tagList-down">-->
<!--			<el-dropdown>-->
<!--				<span class="el-dropdown-link">-->
<!--					<el-icon>-->
<!--						<arrow-down />-->
<!--					</el-icon>-->
<!--				</span>-->
<!--				<template #dropdown>-->
<!--					<el-dropdown-menu>-->
<!--						<el-dropdown-item>Action 1</el-dropdown-item>-->
<!--						<el-dropdown-item>Action 2</el-dropdown-item>-->
<!--						<el-dropdown-item>Action 3</el-dropdown-item>-->
<!--						<el-dropdown-item disabled>Action 4</el-dropdown-item>-->
<!--						<el-dropdown-item divided>Action 5</el-dropdown-item>-->
<!--					</el-dropdown-menu>-->
<!--				</template>-->
<!--			</el-dropdown>-->
<!--		</div>-->
<!--	</div>-->
<!--</template>-->
<!--<script lang="ts" setup>-->
<!--import { ref } from 'vue';-->
<!--import { useRouter } from 'vue-router';-->

<!--// let tabIndex = 2;-->
<!--const editableTabsValue = ref('2');-->
<!--const router = useRouter();-->
<!--console.log(router.getRoutes());-->
<!--const editableTabs = ref(router.getRoutes());-->

<!--// const addTab = (targetName: string) => {-->
<!--// 	const newTabName = `${++tabIndex}`;-->
<!--// 	editableTabs.value.push({-->
<!--// 		title: 'New Tab',-->
<!--// 		name: newTabName,-->
<!--// 		content: 'New Tab content'-->
<!--// 	});-->
<!--// 	editableTabsValue.value = newTabName;-->
<!--// };-->
<!--const removeTab = (targetName: string) => {-->
<!--	const tabs = editableTabs.value;-->
<!--	let activeName = editableTabsValue.value;-->
<!--	if (activeName === targetName) {-->
<!--		tabs.forEach((tab, index) => {-->
<!--			if (tab.name === targetName) {-->
<!--				const nextTab = tabs[index + 1] || tabs[index - 1];-->
<!--				if (nextTab) {-->
<!--					activeName = nextTab.name;-->
<!--				}-->
<!--			}-->
<!--		});-->
<!--	}-->

<!--	editableTabsValue.value = activeName;-->
<!--	editableTabs.value = tabs.filter(tab => tab.name !== targetName);-->
<!--};-->
<!--</script>-->
<!--<style scoped lang="scss">-->
<!--.tagList {-->
<!--	box-sizing: border-box;-->
<!--	display: flex;-->
<!--	justify-content: space-between;-->
<!--	align-items: center;-->
<!--	.tagList-tabs {-->
<!--		display: flex;-->
<!--		justify-content: center;-->
<!--		align-items: center;-->
<!--		height: 40px;-->
<!--		line-height: 40px;-->
<!--	}-->
<!--}-->
<!--:deep(.el-icon) {-->
<!--	vertical-align: middle;-->
<!--	padding-bottom: 3px;-->
<!--}-->
<!--:deep(.el-tabs__content) {-->
<!--	padding: 0;-->
<!--}-->

<!--:deep(.el-tabs__header) {-->
<!--	background-color: #f0f2f5;-->
<!--	border: 0;-->
<!--}-->
<!--:deep(.el-tabs&#45;&#45;border-card) {-->
<!--	border: 0;-->
<!--}-->
<!--:deep(.el-tabs__nav .is-stretch .is-top) {-->
<!--	border: 0;-->
<!--}-->
<!--:deep(.is-active, .is-closable) {-->
<!--	border: 0;-->
<!--}-->
<!--:deep(.el-tabs__header) {-->
<!--	border: 0;-->
<!--}-->
<!--:deep(.el-tabs__item) {-->
<!--	background-color: #fff;-->
<!--	margin: 0 10px !important;-->
<!--	border-radius: 10px;-->
<!--	border: 0 !important;-->
<!--}-->
<!--</style>-->
