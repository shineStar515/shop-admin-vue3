<template>
	<div class='home-chart'>
		<el-row :gutter='20'>
			<el-col :span='12'>
				<el-card shadow='never'>
					<template #header>
						<div class='home-chart-header'>
							<span>订单统计</span>
							<template v-for='item in options' :key='item.text'>
								<el-check-tag
									:checked='currentType === item.type'
									style='margin-right: 8px'
									@click='handleTagChange(item.type)'
								>{{ item.text }}
								</el-check-tag
								>
							</template>
						</div>
					</template>
					<div id='chart'></div>
				</el-card>
			</el-col>
			<el-col :span='12'></el-col>
		</el-row>
	</div>
</template>

<script lang='ts' setup>
import * as echarts from 'echarts';
import { getStatistics3 } from '@/service/api/home';
import { onMounted, ref, watch } from 'vue';

const options = [
	{ text: '近1个月', type: 'month' },
	{ text: '近1周', type: 'week' },
	{ text: '近24小时', type: 'hour' }
];
const currentType = ref(options[0].type);

function handleTagChange(type: string) {
	currentType.value = type;
	getStatistics3(currentType.value);
}

//图表
onMounted(() => {
	const chartDom = document.getElementById('chart')!;
	const homeChart = echarts.init(chartDom);
	const chartOption: any = {
		xAxis: {
			type: 'category',
			data: []
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data: [],
				type: 'bar',
				showBackground: true,
				backgroundStyle: {
					color: 'rgba(180, 180, 180, 0.2)'
				}
			}
		]
	};
	watch(
		() => currentType.value,
		async () => {
			const { data } = await getStatistics3(currentType.value);
			chartOption.xAxis!.data = data.x;
			chartOption.series[0].data = data.y;
			homeChart.setOption(chartOption);
		},
		{ immediate: true }
	);
});
</script>
<style scoped lang='scss'>
.home-chart {
	box-sizing: border-box;

	.home-chart-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	#chart {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 300px;
	}
}
</style>
