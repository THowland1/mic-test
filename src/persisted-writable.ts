import { writable, type Writable } from 'svelte/store';

export function persistedWritable<T>(
	key: string,
	value: T
): Writable<T> & { useLocalStorage: () => void } {
	const { set, subscribe, update } = writable(value);

	return {
		set,
		subscribe,
		update,
		useLocalStorage: () => {
			const fromStorage = localStorage.getItem(key);
			if (fromStorage) {
				set(JSON.parse(fromStorage));
			}
			subscribe((newvalue) => {
				localStorage.setItem(key, JSON.stringify(newvalue));
			});
		}
	};
}
