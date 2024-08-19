<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { cn } from '$lib/utils';

	export let title: string;
	export let description: string;
	export let image: {
		src: string;
		alt: string;
	};

	let expanded = false;
</script>

<li class="rounded-xl border border-border bg-background">
	<header class="flex h-fit flex-col border-b border-border p-4 pb-6">
		<h2 class="mb-1 text-lg font-semibold">
			{title}
		</h2>
		<p class={cn(!expanded && 'line-clamp-3', 'text-sm text-muted-foreground')}>
			{description}
		</p>
		<button
			type="button"
			class={cn(
				'focusable inline w-fit text-sm font-semibold text-muted-foreground',
				'transition focus-within:rounded-sm hover:text-foreground'
			)}
			on:click|preventDefault|stopPropagation={() => (expanded = !expanded)}
		>
			{expanded ? $LL.generic.collapse() : $LL.generic.expand()}
		</button>
	</header>
	<img src={image.src} alt={image.alt} class="aspect-2.61/1 w-full rounded-b-xl object-contain" />
</li>
