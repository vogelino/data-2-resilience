<script lang="ts">
	import { browser } from '$app/environment';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import { locale, setLocale } from '$i18n/i18n-svelte';
	import type { Locales } from '$i18n/i18n-types';
	import { locales } from '$i18n/i18n-util';
	import { loadLocaleAsync } from '$i18n/i18n-util.async';
	import { cn } from '$lib/utils';
	import { replaceLocaleInUrl } from '../../utils';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import { Button } from './ui/button';

	const switchLocale = async (newLocale: Locales, updateHistoryState = true) => {
		if (!newLocale || $locale === newLocale) return;

		// load new dictionary from server
		await loadLocaleAsync(newLocale);

		// select locale
		setLocale(newLocale);

		if (updateHistoryState) {
			// update url to reflect locale changes
			history.pushState({ locale: newLocale }, '', replaceLocaleInUrl(page.url, newLocale));
		}

		// run the `load` function again
		invalidateAll();
	};

	// update `lang` attribute
	$effect(() => {
		browser && document.querySelector('html')!.setAttribute('lang', $locale);
	});

	// update locale when navigating via browser back/forward buttons
	const handlePopStateEvent = async ({ state }: PopStateEvent) => switchLocale(state.locale, false);

	// update locale when page store changes
	$effect(() => {
		if (browser) {
			const lang = page.params.lang as Locales;
			switchLocale(lang, false);
			history.replaceState(
				{ ...history.state, locale: lang },
				'',
				replaceLocaleInUrl(page.url, lang)
			);
		}
	});

	function getLocaleName(l: string) {
		const localeFullName = new Intl.DisplayNames([l], { type: 'language' });
		return localeFullName.of(l);
	}
</script>

<svelte:window onpopstate={handlePopStateEvent} />

<DropdownMenu>
	<DropdownMenuTrigger class={cn('focusable')}>
		<Button size="icon" variant="outline">
			{$locale.toUpperCase()}
		</Button>
	</DropdownMenuTrigger>
	<DropdownMenuContent class="w-fit min-w-0">
		{#each locales as l}
			<DropdownMenuItem
				href={replaceLocaleInUrl(page.url, l)}
				class={cn(l === $locale && 'font-bold')}
			>
				{getLocaleName(l)}
			</DropdownMenuItem>
		{/each}
	</DropdownMenuContent>
</DropdownMenu>
