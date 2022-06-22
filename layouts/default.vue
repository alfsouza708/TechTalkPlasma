<template>
	<section class="main-layout">
		<AppHeader>
			<LanguageSelector />
		</AppHeader>
		<main class="main-content">
			<NuxtPage />
		</main>
		<Loading />
	</section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.main-layout {
	@apply min-h-screen relative;

	> .main-content {
		@apply min-h-[calc(100vh-4.75rem)] overflow-auto w-full p-8 bg-neutral-low-pure;
	}
}
</style>
