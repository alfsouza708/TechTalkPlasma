import graphql from '@rollup/plugin-graphql';
import { defineNuxtConfig } from 'nuxt';
import { resolve } from 'path';
import publicEnv from './public.env';

export default defineNuxtConfig({
	meta: {
		meta: [
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1'
			},
			{
				hid: 'description',
				name: 'description',
				content: 'Plasma | Boilerplate'
			}
		],
		title: 'Plasma | Boilerplate'
	},
	dev: process.env.NODE_ENV === 'development',
	css: ['@/assets/styles/main.scss'],
	vite: {
		logLevel: 'info',
		plugins: [graphql()],
		optimizeDeps: {
			include: ['vue', 'pinia']
		}
	},
	components: true,
	publicRuntimeConfig: publicEnv,
	buildModules: [
		'@pinia/nuxt',
		'nuxt-windicss',
		'@intlify/nuxt3',
		'unplugin-icons/nuxt'
	],
	build: {
		transpile: ['@apollo/client', 'ts-invariant/process']
	},
	modules: ['nuxt-windicss'],
	postcss: {
		plugins: {
			cssnano: false
		}
	},
	intlify: {
		localeDir: 'lang',
		vueI18n: {
			locale: 'pt',
			numberFormats: {
				en: {
					currency: {
						style: 'currency',
						currency: 'USD',
						currencyDisplay: 'symbol'
					}
				},
				pt: {
					currency: {
						style: 'currency',
						currency: 'BRL',
						currencyDisplay: 'symbol'
					}
				}
			},
			datetimeFormats: {
				en: {
					short: {
						year: 'numeric',
						month: 'short',
						day: 'numeric'
					},
					long: {
						year: 'numeric',
						month: 'short',
						day: 'numeric',
						weekday: 'short',
						hour: 'numeric',
						minute: 'numeric'
					}
				},
				pt: {
					short: {
						year: 'numeric',
						month: 'short',
						day: 'numeric'
					},
					long: {
						year: 'numeric',
						month: 'short',
						day: 'numeric',
						weekday: 'short',
						hour: 'numeric',
						minute: 'numeric'
					}
				}
			}
		}
	},
	alias: {
		'@img': resolve(__dirname, './assets/images'),
		'@utils': resolve(__dirname, './utils'),
		'@models': resolve(__dirname, './models'),
		'@services': resolve(__dirname, './services'),
		'@store': resolve(__dirname, './store'),
		'@icons': resolve(__dirname, '~icons')
	}
});
