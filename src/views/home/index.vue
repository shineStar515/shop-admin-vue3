<template>
	<div class='home'>
		<HomeCard />
		<HomeNavs />
		<homeChart />
	</div>
</template>
<script lang='ts' setup>
import HomeCard from './cpns/HomeCard.vue';
import HomeNavs from './cpns/HomeNavs.vue';
import HomeChart from './cpns/HomeChart.vue';
</script>
<style scoped lang='scss'>
.home {
	box-sizing: border-box;
	padding: 0 20px;
}
</style>
