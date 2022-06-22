<template>
	<div id="language-selector">
		<SolSelect
			id="select-language"
			v-model="locale"
			class="language"
			:options="availableLocales"
			label=""
		/>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { availableLocales, locale } = useI18n();

// Watch for locale changes to update language persistance cookie
watch(locale, (value) => {
	const languageCookie = useCookie('language', {
		secure: true,
		sameSite: true
	});

	languageCookie.value = value;
});
</script>

<style lang="scss" scoped>
#language-selector {
	color: black;
	> .language {
		background-color: white;
		border-radius: 8px;
	}
}
</style>
