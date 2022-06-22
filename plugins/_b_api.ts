import Connection from '~/utils/connection/Connection';
import enviromentConnections from '~/utils/connection/Connections';
import { $fetch } from 'ohmyfetch';

export default defineNuxtPlugin((nuxtApp) => {
	const params = nuxtApp?.ssrContext?.url.substring(1) ?? location.search;

	const urlParams = new URLSearchParams(decodeURIComponent(params));

	const api: Connection = [
		enviromentConnections['development'],
		enviromentConnections[urlParams.get('api')]
	][Number(!!urlParams.get('api'))];

	return {
		provide: {
			api: $fetch.create({
				baseURL: api.apiURL,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				async onRequest({ request, options }) {
					console.log(request, options);
				},
				async onResponse({ response }) {
					console.log(response);
				}
			})
		}
	};
});
