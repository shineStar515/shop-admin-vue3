<template>
	<div class='image-aside'>
		<div class='aside-list' :class='{ active: active }'>
			<span><slot /></span>
			<div class='aside-btn'>
				<el-button class='btn' type='primary' size='small' plain @click='handleUpdateClick()'>
					<el-icon :size='12'>
						<Edit />
					</el-icon>
				</el-button>
				<el-button class='btn' type='primary' size='small' plain @click='handleDeleteClick()'>
					<el-icon :size='12'>
						<Close />
					</el-icon>
				</el-button>
			</div>
		</div>
	</div>
</template>
<script lang='ts' setup>
import { defineProps } from 'vue';

// props
interface ImageAsideProps {
	data: any;
	active: boolean;
}

const props = defineProps<ImageAsideProps>();

//emits
const emits = defineEmits(['update', 'delete']);

function handleUpdateClick() {
	emits('update', props.data);
}

function handleDeleteClick() {
	emits('delete', props.data);
}
</script>
<style scoped lang='scss'>
.image-aside {
	.aside-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #f0f2f5;
		padding: 10px;
		cursor: pointer;

		.btn {
			margin-left: 6px;
		}

		&:hover {
			background-color: #c6c8fb;
		}
	}

	.active {
		background-color: #c6c8fb;
	}
}
</style>
