<template>
	<div class='countTo'>{{ countValue.num.toFixed(1) }}</div>
</template>

<script lang='ts' setup>
import gsap from 'gsap';
import { reactive, watch } from 'vue';

interface countToProps {
	value: number;
}

const props = withDefaults(defineProps<countToProps>(), {
	value: 0
});
const countValue = reactive({
	num: 0
});

function animateToValue() {
	gsap.to(countValue, { duration: 0.5, num: props.value });
}

animateToValue();
watch(
	() => props.value,
	() => animateToValue()
);
</script>
<style scoped></style>
