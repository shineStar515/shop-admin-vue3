<template>
	<div class='home-card'>
		<el-row :gutter='20' style='padding: 0'>
			<!--			骨架屏		-->
			<template v-if='!pageData' v-for='i in 4' :key='i'>
				<el-col :span='6'>
					<el-skeleton animated loading>
						<template #template>
							<el-card shadow='hover'>
								<template #header>
									<div class='home-card-header'>
										<el-skeleton-item variant='text' style='width: 30%; height: 20px' />
										<el-skeleton-item variant='text' style='width: 30px; height: 22px' />
									</div>
								</template>
								<div class='home-card-content'>
									<el-skeleton-item variant='text' style='width: 60%; height: 35px' />
								</div>
								<el-divider />
								<div class='home-card-footer'>
									<el-skeleton-item variant='text' style='width: 34%; height: 22px' />
									<el-skeleton-item variant='text' style='width: 36px; height: 22px' />
								</div>
							</el-card>
						</template>
					</el-skeleton>
				</el-col>
			</template>
			<template v-else v-for='item in pageData' :key='item.subTitle'>
				<el-col :span='6'>
					<el-card shadow='hover'>
						<template #header>
							<div class='home-card-header'>
								<span>{{ item.title }}</span>
								<el-tag class='ml-2' :type='item.unitColor'>{{ item.unit }}</el-tag>
							</div>
						</template>
						<div class='home-card-content'>
							<CountTo :value='item.value' />
						</div>
						<el-divider />
						<div class='home-card-footer'>
							<span>{{ item.subTitle }}</span>
							<span>{{ item.subValue }}</span>
						</div>
					</el-card>
				</el-col>
			</template>
		</el-row>
	</div>
</template>

<script lang='ts' setup>
import CountTo from '@/components/CountTo/index.vue';
import { getStatistics1 } from '@/service/api/home';
import { ref } from 'vue';
import type { IStatistics } from '@/service/api/home/types';

const pageData = ref<IStatistics.Panel[]>();

getStatistics1().then(({ data }) => {
	pageData.value = data.panels;
});
</script>
<style scoped lang='scss'>
.home-card {
	.home-card-header,
	.home-card-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 0;
	}

	.home-card-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #747576;
		font-size: 30px;
		font-weight: bold;
	}

	.home-card-footer {
		color: #8f9090;
		font-size: 16px;
	}
}
</style>
