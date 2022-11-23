<template>
	<div class='home'>
		<!--		<el-row :gutter="20" style="padding: 0">-->
		<!--			<el-col :span="6" v-for="item in pageData" :key="item.subTitle">-->
		<!--				<el-card class="box-card">-->
		<!--					<template #header>-->
		<!--						<div class="card-header">-->
		<!--							<span>{{ item.title }}</span>-->
		<!--							&lt;!&ndash;							<el-tag class="ml-2" :type="item.">{{}}</el-tag>&ndash;&gt;-->
		<!--						</div>-->
		<!--					</template>-->
		<!--					<div class="card-content">-->
		<!--						<span>{{ item.subValue }}</span>-->
		<!--					</div>-->
		<!--					<div class="card-footer">-->
		<!--						<span>{{ item.subTitle }}</span>-->
		<!--						<span>{{ item.value }}</span>-->
		<!--					</div>-->
		<!--				</el-card>-->
		<!--			</el-col>-->
		<!--		</el-row>-->
	</div>
</template>
<script lang='ts' setup>
import { getStatistics1 } from '@/service/api/home';
import { ref } from 'vue';
import type { IStatistics } from '@/service/api/home/types';

const pageData = ref<IStatistics.statistics1Result>();

getStatistics1().then(({ data }) => {
	console.log(data);
	pageData.value = data;
});
</script>
<style scoped lang='scss'>
.home {
	box-sizing: border-box;
}
</style>
