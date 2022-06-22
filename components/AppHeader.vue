<template>
	<header>
		<div class="icons">
			<img
				src="@img/plasma-white.svg"
				alt="Plasma Logo"
				style="cursor: pointer"
				@click="showHomePage"
			/>
		</div>
		<div class="actions">
			<slot />
		</div>
	</header>
</template>

<script setup lang="ts">
const showHomePage = () => {
	navigateTo('/');
};
</script>

<style lang="scss" scoped>
header {
	@apply flex flex-row h-19 w-screen px-6 bg-neutral-low-medium justify-between items-center;

	> .icons {
		@apply mr-micro;
		> img {
			@apply w-64;
		}
	}

	> .actions {
		@apply text-brand-primary-light;
	}
}
</style>
