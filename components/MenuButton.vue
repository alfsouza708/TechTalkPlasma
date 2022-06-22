<template>
	<button class="cp_menu_button">
		<Icon :icon="icon" :color="iconColor" />
		<span>
			<slot />
		</span>
	</button>
</template>

<script setup lang="ts">
defineProps({
	icon: { type: String, default: 'menu' },
	iconColor: { type: String, default: '#000' }
});
</script>

<style lang="scss" scoped>
.cp_menu_button {
	@apply relative flex flex-row items-center justify-center
        outline-none cursor-pointer font-light
        text-brand-primary-light rounded py-2 px-4 my-2
        transition-all duration-300 ease-in-out;
	font-size: 12px;

	&:focus {
		@apply scale-95;
	}

	&:hover {
		@apply scale-105;
	}
}
</style>
