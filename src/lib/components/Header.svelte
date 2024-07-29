<script lang="ts">
	import DarkModeToggle from './DarkModeToggle.svelte';
	import LocaleSwitcher from './LocaleSwitcher.svelte';

	export let title = '';
</script>

<header
	class="border-border grid w-screen grid-cols-[auto,1fr] items-center gap-x-8 gap-y-2 border-b px-6 py-4"
>
	<h1 class="text-xl font-bold">{title}</h1>

	<nav
		id="secondary-nav"
		aria-label="Light/Dark theme- and language switchers"
		class="flex w-full items-center justify-end gap-8"
	>
		<LocaleSwitcher />
		<DarkModeToggle />
	</nav>
</header>
