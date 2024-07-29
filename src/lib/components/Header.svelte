<script lang="ts">
	import LocaleSwitcher from './LocaleSwitcher.svelte';

	export let title = '';
</script>

<header
	class="flex w-screen flex-wrap items-center justify-between gap-12 border-b border-slate-300 px-6 py-4"
>
	<h1 class="text-3xl font-bold">{title}</h1>
	<LocaleSwitcher />
</header>
