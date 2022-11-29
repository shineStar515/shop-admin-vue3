<template>
	<div class='image'>
		<ImageManage :aside-request='getImageList'></ImageManage>
	</div>
</template>
<script lang='ts' setup>
import ImageManage from '@/components/ImageManage/index.vue';
import { getImageList } from '@/service/api/image';
</script>
<style scoped lang='scss'>
.image {
	box-sizing: border-box;
	height: 100%;
}
</style>
