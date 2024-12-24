<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from '$i18n/i18n-svelte';
	import { cn } from '$lib/utils';
	import DarkModeToggle from './DarkModeToggle.svelte';
	import LocaleSwitcher from './LocaleSwitcher.svelte';
	import Logo from './Logo.svelte';
	import { Button } from './ui/button';
	import { LL } from '$i18n/i18n-svelte';

	export let title = '';
	export let subtitle = '';

	const urlQuery = $page.url.searchParams.toString();

	$: isAboutPage = $page.url.pathname.startsWith(`/${$locale}/about`);
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
			<p class="text-balance text-sm leading-4 text-muted-foreground">{subtitle}</p>
		</span>
	</a>

	<nav
		id="secondary-nav"
		aria-label="Light/Dark theme- and language switchers"
		class="flex w-full items-center justify-end gap-4"
	>
		<Button variant="ghost" href="/{$locale}/about?{urlQuery}">
			{$LL.navigation.header.about()}
		</Button>
		<LocaleSwitcher />
		<DarkModeToggle />
	</nav>
</header>
