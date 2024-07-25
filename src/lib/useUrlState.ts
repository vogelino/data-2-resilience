import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { onDestroy } from 'svelte';
import { type Writable, writable } from 'svelte/store';

interface UrlState {
	query: string;
	bool: boolean;
	slider: number;
}

export const urlInitialState: UrlState = {
	query: '',
	bool: true,
	slider: 50
};

export function useUrlState(): Writable<UrlState> {
	const urlState = writable<UrlState>(urlInitialState);

	const debouncedUpdateUrlParam = debounce(updateUrlParam);

	function updateFromUrl(url: URL) {
		const newStateFromUrl: UrlState = {
			query: url.searchParams.get('query') ?? urlInitialState.query,
			bool:
				typeof url.searchParams.get('bool') !== 'undefined'
					? url.searchParams.get('bool') === 'true'
					: urlInitialState.bool,
			slider: url.searchParams.get('slider')
				? Number(url.searchParams.get('slider'))
				: urlInitialState.slider
		};
		urlState.set(newStateFromUrl);
	}

	function onUpdateFromUrl() {
		updateFromUrl(new URL(window.location.href));
	}

	if (browser) window.addEventListener('popstate', onUpdateFromUrl);

	const subscribers: Array<() => void> = [];

	subscribers.push(page.subscribe(($page) => updateFromUrl($page.url)));
	subscribers.push(urlState.subscribe((value) => debouncedUpdateUrlParam(value)));

	onDestroy(() => {
		subscribers.forEach((unsub) => unsub());
		if (!browser) return;
		window.removeEventListener('popstate', onUpdateFromUrl);
	});

	return urlState;
}

async function updateUrlParam(newState: UrlState): Promise<void> {
	if (!browser) return;
	const params = new URLSearchParams(window.location.search);

	for (const [key, value] of Object.entries(newState)) {
		params.set(key, value.toString());
	}
	await goto(`?${params.toString()}`, { keepFocus: true });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => void>(
	callback: T,
	wait = 300
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout>;
	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => callback(...args), wait);
	};
}
