import { useLoadingStore } from '@store/loading';

export default function () {
	const loadingStore = useLoadingStore();

	return {
		show: () => {
			loadingStore.setLoading(true);
		},
		hide: () => {
			loadingStore.setLoading(false);
		}
	};
}
