<template>
	<div class='drawer' v-if='dialog'>
		<el-drawer v-model='dialog' direction='rtl' :close-on-click-modal='false' custom-class='demo-drawer' size='40%'>
			<template #header><h3 style='color: #6366f1'>修改密码</h3></template>
			<div class='demo-drawer__content'>
				<el-scrollbar height='460px'>
					<slot name='content'></slot>
				</el-scrollbar>
				<div class='demo-drawer__footer'>
					<slot name='footer'>
						<el-button @click='close' size='large' plain>取消</el-button>
						<el-button type='primary' :loading='loading' size='large' @click='handleInputClick()'>{{ title }}
						</el-button>
					</slot>
				</div>
			</div>
		</el-drawer>
	</div>
</template>
<script lang='ts' setup>
import { ref, defineExpose } from 'vue';

const emit = defineEmits(['submit']);
const dialog = ref(false);
const open = () => (dialog.value = true);
const close = () => (dialog.value = false);
const loading = ref(false);
const openLoading = () => (loading.value = true);
const closeLoading = () => (loading.value = false);

function handleInputClick() {
	emit('submit');
}

defineProps({
	title: {
		type: String,
		default: '提交'
	}
});
defineExpose({
	open,
	close,
	openLoading,
	closeLoading
});
</script>
<style scoped lang='scss'>
.drawer {
	position: absolute;
	top: 0;
	right: 0;

	.demo-drawer__footer {
		position: absolute;
		bottom: 50px;
		left: 50px;
	}
}
</style>
