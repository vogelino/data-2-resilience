<script lang="ts">
	import { locale } from '$i18n/i18n-svelte';
	import DarkModeToggle from './DarkModeToggle.svelte';
	import LocaleSwitcher from './LocaleSwitcher.svelte';

	export let title = '';
</script>

<header
	class="grid h-[var(--headerHeight,5rem)] w-screen grid-cols-[auto,1fr] items-center gap-x-8 gap-y-4 border-b border-border px-6 py-3"
>
	<a href={`/${$locale}`} class="focusable -ml-2 rounded px-2 py-1"
		><h1 class="text-xl font-bold">{title}</h1></a
	>

	<nav
		id="secondary-nav"
		aria-label="Light/Dark theme- and language switchers"
		class="flex w-full items-center justify-end gap-8"
	>
		<LocaleSwitcher />
		<DarkModeToggle />
	</nav>
</header>
