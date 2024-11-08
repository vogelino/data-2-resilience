<script lang="ts">
	import { Tooltip, TooltipContent, TooltipTrigger } from '$lib/components/ui/tooltip';
	import { cn } from '$lib/utils';
	import { Info } from 'lucide-svelte';

	export let title = '';
	export let description = '';
</script>

{#if title || description}
	<Tooltip openDelay={100}>
		<TooltipTrigger
			class={cn(
				'focusable hover-hover:hover:bg-foreground hover-hover:hover:text-background',
				'rounded-full p-1 transition'
			)}
		>
			<Info class="size-4"></Info>
		</TooltipTrigger>
		<TooltipContent class="flex w-96 max-w-full flex-col gap-1 px-4 pb-4 pt-3 leading-tight">
			{#if title}
				<strong class="block text-base font-semibold leading-5">{title}</strong>
			{/if}
			{#if description}
				<p class="text-sm leading-4 text-muted-foreground">{description}</p>
			{/if}
		</TooltipContent>
	</Tooltip>
{/if}
