<script lang="ts">
	import { browser } from '$app/environment';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { locale, setLocale } from '$i18n/i18n-svelte';
	import type { Locales } from '$i18n/i18n-types';
	import { locales } from '$i18n/i18n-util';
	import { loadLocaleAsync } from '$i18n/i18n-util.async';
	import { cn } from '$lib/utils';
	import { replaceLocaleInUrl } from '../../utils';

	const switchLocale = async (newLocale: Locales, updateHistoryState = true) => {
		if (!newLocale || $locale === newLocale) return;

		// load new dictionary from server
		await loadLocaleAsync(newLocale);

		// select locale
		setLocale(newLocale);

		if (updateHistoryState) {
			// update url to reflect locale changes
			history.pushState({ locale: newLocale }, '', replaceLocaleInUrl($page.url, newLocale));
		}

		// run the `load` function again
		invalidateAll();
	};

	// update `lang` attribute
	$: browser && document.querySelector('html')!.setAttribute('lang', $locale);

	// update locale when navigating via browser back/forward buttons
	const handlePopStateEvent = async ({ state }: PopStateEvent) => switchLocale(state.locale, false);

	// update locale when page store changes
	$: if (browser) {
		const lang = $page.params.lang as Locales;
		switchLocale(lang, false);
		history.replaceState(
			{ ...history.state, locale: lang },
			'',
			replaceLocaleInUrl($page.url, lang)
		);
	}
</script>

<svelte:window on:popstate={handlePopStateEvent} />

<ul class="flex items-center gap-2" aria-label="Language switcher">
	{#each locales as l}
		<li
			class="flex border-l border-border pl-2 transition first-of-type:border-none first-of-type:pl-0 hover:hover-hover:font-bold"
		>
			<a
				class={cn('focusable rounded px-2 py-1', l === $locale && 'font-bold')}
				href={replaceLocaleInUrl($page.url, l)}
			>
				{l}
			</a>
		</li>
	{/each}
</ul>
