<template>
	<div class='layouts'>
		<el-container class='layouts-content'>
			<el-header class='el-header' height='70px'>
				<Header />
			</el-header>
			<el-container>
				<el-aside class='el-aside' :width='menuWidth'>
					<Menu />
				</el-aside>
				<el-main class='el-main'>
					<Tabs />
					<router-view v-slot='{ Component }'>
						<transition name='fade'>
							<keep-alive :max='10'>
								<component :is='Component'></component>
							</keep-alive>
						</transition>
					</router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<script lang='ts' setup name='admin'>
import Header from '@/layouts/components/Header/index.vue';
import Menu from '@/layouts/components/Menu/index.vue';
import Tabs from '@/layouts/components/Tabs/index.vue';
import useGlobalStore from '@/stores/global';
import { storeToRefs } from 'pinia';

const { menuWidth } = storeToRefs(useGlobalStore());
</script>
<style scoped lang='scss'>
.layouts {
	box-sizing: border-box;
	width: 100%;
	height: 100%;

	.layouts-content {
		width: 100%;
		height: 100%;

		.el-header {
			padding: 0;
		}

		.el-aside {
			padding: 0;
			transition: all 0.2s;
		}

		.el-main {
			box-sizing: border-box;
			padding: 0;
			background-color: #f0f2f5;
		}
	}
}

.fade-enter-from {
	opacity: 0;
}

.fade-enter-to {
	opacity: 1;
}

.fade-leave-from {
	opacity: 1;
}

.fade-leave-to {
	opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
	transition: all 0.3s;
}

/*避免进入离开动画重叠*/
.fade-enter-active {
	transition-delay: 0.3s;
}
</style>
