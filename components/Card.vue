<template>
	<div class="content-card">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
.content-card {
	@apply bg-neutral-high-light border-neutral-high-medium rounded-md shadow-neutral-high-pure p-8 relative;
}
</style>
