<template>
	<div class='home-navs'>
		<el-row :gutter='30'>
			<template v-for='item in iconNavs' :key='item.title'>
				<el-col :span='3'>
					<el-card shadow='hover' @click='handleNavClick(item.path)'>
						<div class='home-navs-content'>
							<el-icon :size='20' :color='item.color'>
								<component :is='item.icon' />
							</el-icon>
							<span class='home-navs-text'>{{ item.title }}</span>
						</div>
					</el-card>
				</el-col>
			</template>
		</el-row>
	</div>
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router';

const iconNavs = [
	{
		icon: 'user',
		color: '#409EFF',
		title: '用户',
		path: '/user/list'
	},
	{
		icon: 'shopping-cart',
		color: '#67C23A',
		title: '商品',
		path: '/goods/list'
	},
	{
		icon: 'tickets',
		color: '#E6A23C',
		title: '订单',
		path: '/order/list'
	},
	{
		icon: 'chat-dot-square',
		color: '#F56C6C',
		title: '评价',
		path: '/comment/list'
	},
	{
		icon: 'picture',
		color: '#794fcc',
		title: '图库',
		path: '/image/list'
	},
	{
		icon: 'bell',
		color: '#d3c57e',
		title: '公告',
		path: '/notice/list'
	},
	{
		icon: 'set-up',
		color: '#50e1e1',
		title: '配置',
		path: '/setting/base'
	},
	{
		icon: 'files',
		color: '#d34bf1',
		title: '优惠券',
		path: '/coupon/list'
	}
];
const router = useRouter();

function handleNavClick(path: string) {
	router.push(path);
}
</script>
<style scoped lang='scss'>
.home-navs {
	box-sizing: border-box;
	margin-top: 20px;

	.home-navs-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.home-navs-text {
			margin-top: 5px;
			font-size: 16px;
		}
	}
}
</style>
