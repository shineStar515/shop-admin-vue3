<template>
	<div class='menu'>
		<el-menu
			:default-active='defaultActive'
			class='el-menu'
			:collapse="menuWidth !== '250px'"
			:collapse-transition='false'
			unique-opened
		>
			<template v-for='item in menus' :key='item.name'>
				<!--				二级菜单    -->
				<el-sub-menu v-if='item.child && item.child.length > 0' :index='item.name'>
					<template #title>
						<el-icon>
							<component :is='item.icon'></component>
						</el-icon>
						<span>{{ item.name }}</span>
					</template>
					<el-menu-item
						v-for='child in item.child'
						:key='child.name'
						:index='child.frontpath'
						@click='handleMenuClick(child.frontpath)'
					>
						<template #title>
							<el-icon>
								<component :is='child.icon'></component>
							</el-icon>
							<span>{{ child.name }}</span>
						</template>
					</el-menu-item>
				</el-sub-menu>
				<!--				一级菜单    -->
				<el-menu-item v-else :index='item.frontpath' @click='handleMenuClick(item.frontpath)'>
					<el-icon>
						<component :is='item.icon'></component>
					</el-icon>
					<template #title>
						<span>{{ item.name }}</span>
					</template>
				</el-menu-item>
			</template>
		</el-menu>
	</div>
</template>
<script lang='ts' setup>
import { useRoute, useRouter } from 'vue-router'
import useGlobalStore from '@/stores/global'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
//折叠菜单宽度
const { menuWidth, menus } = storeToRefs(useGlobalStore())
const route = useRoute()
//默认菜单项
const defaultActive = ref(route.path)
onMounted(() => {
	defaultActive.value = defaultActive.value == '/' ? '/admin/index' : defaultActive.value
})
//菜单跳转
const router = useRouter()

function handleMenuClick(path: any) {
	router.push(path)
}
</script>
<style scoped lang='scss'>
.menu {
	position: fixed;
	top: 70px;
	left: 0;
	bottom: 0;
	width: v-bind(menuWidth);
	overflow-y: auto;
	overflow-x: hidden;
	box-shadow: 2px 0px 0px rgba(0, 0, 0, 0.08);
	transition: all 0.2s;

	.el-menu {
		border: 0;
	}
}
</style>
