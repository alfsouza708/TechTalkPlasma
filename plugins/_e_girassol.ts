import { defineNuxtPlugin } from '#app';

import { install } from '@solfacil/girassol';

export default defineNuxtPlugin(({ vueApp }) => {
	vueApp.use(install);
});
