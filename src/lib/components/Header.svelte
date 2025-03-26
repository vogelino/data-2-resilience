<script lang="ts">
	import { browser } from '$app/environment';
	import { LL, locale } from '$i18n/i18n-svelte';
	import { cn } from '$lib/utils';
	import { Info } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { queryParameters } from 'sveltekit-search-params';
	import DarkModeToggle from './DarkModeToggle.svelte';
	import LocaleSwitcher from './LocaleSwitcher.svelte';
	import Logo from './Logo.svelte';
	import { Button } from './ui/button';

	interface Props {
		title?: string;
		subtitle?: string;
	}

	let { title = '', subtitle = '' }: Props = $props();
	let showMobileMenu = $state(true);

	function onMediaQueryChange(e: MediaQueryListEvent) {
		if (!browser) return false;
		showMobileMenu = e.matches;
	}
	onMount(() => {
		const mediaQuery = window.matchMedia('(max-width: 460px)');
		mediaQuery.addEventListener('change', onMediaQueryChange);
		showMobileMenu = mediaQuery.matches;

		return () => {
			mediaQuery.removeEventListener('change', onMediaQueryChange);
		};
	});

	let queryParams = $derived(queryParameters());
	let urlQuery = $derived(new URLSearchParams($queryParams).toString());
</script>

<header
	class={cn(
		'grid h-[var(--headerHeight,5rem)] w-screen grid-cols-[auto,1fr]',
		'items-center gap-x-4 gap-y-4 border-b border-border px-6'
	)}
>
	<a
		href={`/${$locale}`}
		class={cn(
			'focusable -ml-2 inline-flex items-center gap-x-3 rounded p-2 pr-4',
			'transition-colors hover-hover:hover:bg-muted'
		)}
	>
		<Logo className="size-10 -translate-y-0.5 shrink-0" />
		<span class="flex h-full flex-col justify-around">
			<h1 class="font-semibold">{title}</h1>
			<p class="hidden text-balance text-sm leading-4 text-muted-foreground sm:inline-block">
				{subtitle}
			</p>
		</span>
	</a>

	<nav
		id="secondary-nav"
		aria-label="Light/Dark theme- and language switchers"
		class="flex w-full items-center justify-end gap-2 sm:gap-4"
	>
		<Button
			variant={showMobileMenu ? 'outline' : 'ghost'}
			size={showMobileMenu ? 'icon' : undefined}
			href="/{$locale}/about?{urlQuery}"
		>
			{#if showMobileMenu}
				<Info class="size-5" />
			{:else}
				{$LL.navigation.header.about()}
			{/if}
		</Button>
		<LocaleSwitcher />
		<DarkModeToggle />
	</nav>
</header>
