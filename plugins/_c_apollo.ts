import {
	ApolloClient,
	ApolloLink,
	concat,
	HttpLink,
	InMemoryCache
} from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
import _cloneDeep from 'lodash/cloneDeep';

type UserAuth = {
	token: string;
};

export default defineNuxtPlugin((nuxtApp) => {
	const config = useRuntimeConfig();
	const cache = new InMemoryCache();
	const cookie = useCookie<UserAuth>('auth');

	const httpLink = new HttpLink({ uri: config.URL_API });

	const authMiddleware = new ApolloLink((operation, forward) => {
		const user: UserAuth = cookie.value;

		operation.setContext(({ headers = {} }) => ({
			headers: {
				...headers,
				Authorization: user ? `Bearer ${user.token}` : null
			}
		}));
		return forward(operation);
	});

	let apolloClient;
	if (nuxtApp.ssrContext) {
		apolloClient = new ApolloClient({
			link: concat(authMiddleware, httpLink),
			ssrMode: true,
			cache: new InMemoryCache()
		});

		nuxtApp.hook('app:rendered', () => {
			nuxtApp.payload.data['apollo-default'] = apolloClient.extract();
		});
	} else {
		cache.restore(_cloneDeep(nuxtApp.payload.data['apollo-default']));

		apolloClient = new ApolloClient({
			link: concat(authMiddleware, httpLink),
			cache,
			ssrForceFetchDelay: 100
		});
	}

	nuxtApp.provide('apollo', apolloClient);
	nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient);
});
