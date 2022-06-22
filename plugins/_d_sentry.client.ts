import { Integrations } from '@sentry/tracing';
import * as Sentry from '@sentry/vue';

export default defineNuxtPlugin((nuxtApp) => {
	const config = useRuntimeConfig();
	const { vueApp } = nuxtApp;

	Sentry.init({
		app: [vueApp],
		dsn: config.SENTRY_DSN,
		integrations: [
			new Integrations.BrowserTracing({
				routingInstrumentation: Sentry.vueRouterInstrumentation(nuxtApp.$router),
				tracingOrigins: ['localhost', 'yourdomain.com', /^\//]
			})
		],
		logErrors: false,
		tracesSampleRate: config.SENTRY_TRACES_SAMPLE_RATE || 1.0,
		debug: config.SENTRY_ENABLE_DEBUG || false,
		environment: config.ENVIRONMENT || 'dev',

		beforeSend(event, hint) {
			if (event.exception) {
				console.error(`[Exeption handled by Sentry]: (${hint.originalException})`, {
					event,
					hint
				});
			}
			return event;
		}
	});

	vueApp.mixin(
		Sentry.createTracingMixins({
			trackComponents: true,
			timeout: 2000,
			hooks: ['activate', 'mount', 'update']
		})
	);
	Sentry.attachErrorHandler(vueApp, {
		logErrors: false,
		attachProps: true,
		trackComponents: true,
		timeout: 2000,
		hooks: ['activate', 'mount', 'update']
	});

	return {
		provide: {
			sentrySetContext: (n, context) => Sentry.setContext(n, context),
			sentrySetUser: (user) => Sentry.setUser(user),
			sentrySetTag: (tagName, value) => Sentry.setTag(tagName, value),
			sentryAddBreadcrumb: (breadcrumb) => Sentry.addBreadcrumb(breadcrumb)
		}
	};
});
