<template>
	<div class='list'>
		<el-container class='list-content'>
			<el-header>Header</el-header>
			<el-container>
				<el-aside width='200px'>Aside</el-aside>
				<el-main>Main</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<script lang='ts' setup>
import useGlobalStore from '@/stores/global';
import { storeToRefs } from 'pinia';

const globalStore = useGlobalStore();
//可视区高度
const { visibleHeight } = storeToRefs(globalStore);
</script>
<style scoped lang='scss'>
.list {
	box-sizing: border-box;
	padding: 0 20px;
	height: v-bind(visibleHeight);

	.list-content {
		background-color: #ffffff;
		border-radius: 10px;
		height: 100%;
	}
}
</style>
