import SecureLS from 'secure-ls';

export default defineNuxtPlugin(() => {
	const config = useRuntimeConfig();

	const ls = new SecureLS({
		isCompression: true,
		encodingType: 'aes',
		encryptionSecret: config.STORAGE_SECRET,
		encryptionNamespace: 'sol_salt_'
	});

	return {
		provide: {
			storage: {
				set: (key: string, value) => {
					ls.set(key, value);
				},
				get: (key: string) => ls.get(key),
				remove: (key: string): void => {
					ls.remove(key);
				},
				clear: () => {
					ls.clear();
				}
			}
		}
	};
});
