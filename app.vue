<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { locale } = useI18n(); // globally scoped tools

// check for local language preference cookie
const browserLocale = useCookie('language');
locale.value = browserLocale.value || 'pt';
</script>

<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
