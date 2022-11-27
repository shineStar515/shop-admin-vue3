<template>
	<div class='home-chart'>
		<el-row :gutter='20'>
			<el-col :span='12'>
				<el-card shadow='never'>
					<template #header>
						<div class='home-chart-header'>
							<span>订单统计</span>
							<template v-for='item in options' :key='item.text'>
								<el-check-tag :checked='currentType === item.type' style='margin-right: 8px'
															@click='handleTagChange(item.type)'
								>{{ item.text }}
								</el-check-tag>
							</template>
						</div>
					</template>
					<div ref='el' id='chart'></div>
				</el-card>
			</el-col>
			<el-col :span='12'>
				<el-row>
					<el-col :span='24'>
						<el-card shadow='never'>
							<template #header>
								<div class='home-chart-header'>
									<span>店铺及商品提示</span>
									<el-tag class='ml-2' type='danger'>店铺及商品提示</el-tag>
								</div>
							</template>
							<el-row :gutter='40'>
								<el-col :span='6' v-for='item in goods' :key='item.label'>
									<el-card shadow='hover'>
										<div class='home-chart-text'>
											<span>{{ item.value }}</span>
											<span class='text'>{{ item.label }}</span>
										</div>
									</el-card>
								</el-col>
							</el-row>
						</el-card>
					</el-col>
					<el-col :span='24' style='margin-top: 22px'>
						<el-card shadow='never'>
							<template #header>
								<div class='home-chart-header'>
									<span>交易提示</span>
									<el-tag class='ml-2' type='danger'>需要立即处理的交易订单</el-tag>
								</div>
							</template>
							<el-row :gutter='40'>
								<el-col :span='6' v-for='item in order' :key='item.label'>
									<el-card shadow='hover'>
										<div class='home-chart-text'>
											<span>{{ item.value }}</span>
											<span class='text'>{{ item.label }}</span>
										</div>
									</el-card>
								</el-col>
							</el-row>
						</el-card>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</div>
</template>

<script lang='ts' setup>
import * as echarts from 'echarts';
import { useResizeObserver } from '@vueuse/core';
import { getStatistics2, getStatistics3 } from '@/service/api/home';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

/* 店铺信息 */
const goods = ref();
const order = ref();
getStatistics2().then(({ data }) => {
	console.log(data);
	goods.value = data.goods;
	order.value = data.order;
});
/* 订单统计 */
const options = [
	{ text: '近1个月', type: 'month' },
	{ text: '近1周', type: 'week' },
	{ text: '近24小时', type: 'hour' }
];
const currentType = ref(options[0].type);

//tagChange
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
	//监听tag改变重新发起请求
	watch(
		() => currentType.value,
		async () => {
			try {
				homeChart.showLoading();
				const { data } = await getStatistics3(currentType.value);
				chartOption.xAxis!.data = data.x;
				chartOption.series[0].data = data.y;
				homeChart.setOption(chartOption);
			} finally {
				homeChart.hideLoading();
				//根据屏幕大小等比例缩放
				useResizeObserver(el, () => homeChart.resize());
			}
		},
		{ immediate: true }
	);
});

const el = ref(null);
const instance = document.getElementById('chart');
//页面卸载前卸载图表
onBeforeUnmount(() => {
	if (instance) {
		echarts.dispose(instance);
	}
});
</script>
<style scoped lang='scss'>
.home-chart {
	box-sizing: border-box;
	margin-top: 20px;

	.home-chart-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.home-chart-text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		span {
			font-size: 16px;
		}

		.text {
			color: #8f9090;
			margin-top: 10px;
		}
	}

	#chart {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 300px;
	}
}
</style>
