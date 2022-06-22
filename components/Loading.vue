<template>
	<div v-if="loadingStore.loadingValue" class="loading-page">
		<div class="lds-spinner">
			<img src="@img/loading-bg-transparent-medium.gif" alt="logo" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useLoadingStore } from '@store/loading';
const loadingStore = useLoadingStore();
</script>

<style lang="scss" scoped>
.loading-page {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #00000070;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 9999;

	.lds-spinner {
		color: official;
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
		transform: scale(0.7);

		> img {
			filter: drop-shadow(0 0 0.15rem white);
		}
	}
}
</style>
