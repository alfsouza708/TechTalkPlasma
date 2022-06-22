import { defineStore } from 'pinia';

interface LoadingState {
	loading: boolean;
}

export const useLoadingStore = defineStore('loading-store', {
	state: (): LoadingState => ({
		loading: false
	}),
	actions: {
		setLoading(loading: boolean) {
			this.loading = loading;
		}
	},
	getters: {
		loadingValue: (state) => state.loading
	}
});
