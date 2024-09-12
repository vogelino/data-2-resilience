<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { cn } from '$lib/utils';
	import { ArrowDown, X } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import Button from './ui/button/button.svelte';

	let opened = false;

	onMount(() => {
		const lastValue = localStorage.getItem('welcome-opened');
		if (lastValue === 'true') {
			opened = true;
		} else if (lastValue === 'false') {
			opened = false;
		}
	});

	const handleClose = () => {
		localStorage.setItem('welcome-opened', 'false');
		opened = false;
	};

	const handleOpen = () => {
		localStorage.setItem('welcome-opened', 'true');
		opened = true;
	};
</script>

<section
	class={cn('relative flex flex-col gap-2 p-6 transition-all', opened ? 'py-6' : 'pb-0 pt-4')}
>
	{#if opened}
		<h2 class="text-2xl font-semibold">{$LL.welcome.title()}</h2>
		{#each Object.entries($LL.welcome.text) as [key, paragraph] (key)}
			<p class="mb-2">{paragraph()}</p>
		{/each}
		<Button
			size="icon"
			on:click={handleClose}
			class="absolute right-4 top-6 rounded-full text-muted-foreground"
			variant="ghost"
		>
			<X />
		</Button>
		<div class="flex gap-4">
			<Button on:click={handleClose}>
				{$LL.welcome.buttons.confirm()}
			</Button>
			<Button variant="outline" on:click={handleClose}>
				{$LL.welcome.buttons.launchTour()}
			</Button>
		</div>
	{:else}
		<Button
			variant="ghost"
			class="-ml-3 mb-1 flex h-fit w-fit cursor-pointer items-center gap-2 py-2 text-left text-sm"
			size="sm"
			on:click={handleOpen}
		>
			<ArrowDown class="size-4" />
			{$LL.welcome.expandButtonLabel()}
		</Button>
	{/if}
</section>
