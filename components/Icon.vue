<template>
	<div class="icon" :is-menu="isMenu" :is-link="isLink" :title="tooltip">
		<span :style="{ 'font-size': size, color }" :class="`mdi mdi-${icon}`" />
	</div>
</template>

<script setup lang="ts">
defineProps({
	icon: { type: String, required: true },
	color: { type: String, default: '#000' },
	isMenu: { type: Boolean, default: false },
	isLink: { type: Boolean, default: false },
	size: { type: String, default: '22px' },
	tooltip: { type: String, default: null }
});
</script>

<style lang="scss" scoped>
.icon {
	@apply text-neutral-low-pure px-1;
	width: fit-content;

	> span {
		@apply text-xl;
	}

	&[is-menu='true'] {
		@apply cursor-pointer transition-all duration-100 ease-in-out;

		&:hover {
			@apply bg-neutral-low-pure rounded-1/2;
		}
	}

	&[is-link='true'] {
		@apply cursor-pointer transition-all duration-100 ease-in-out;

		&:hover {
			@apply text-feedback-informative-pure rounded-1/2;
		}
	}
}
</style>
