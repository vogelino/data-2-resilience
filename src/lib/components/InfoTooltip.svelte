<script lang="ts">
	import { Tooltip, TooltipContent, TooltipTrigger } from '$lib/components/ui/tooltip';
	import { cn } from '$lib/utils';
	import { Info } from 'lucide-svelte';

	interface Props {
		title?: string;
		description?: string;
		triggerLabel?: string;
		class?: string;
	}

	let { title = '', description = '', triggerLabel = '', class: className = '' }: Props = $props();
</script>

{#if title || description}
	<Tooltip openDelay={100}>
		<TooltipTrigger
			class={cn(
				'focusable hover-hover:hover:bg-foreground hover-hover:hover:text-background',
				'group flex items-center gap-2 rounded-full p-1 transition',
				triggerLabel && '-ml-2.5 pl-2.5 pr-1.5',
				className
			)}
		>
			{#if triggerLabel}
				<span>{triggerLabel}</span>
			{/if}
			<Info
				class={cn(
					'size-4',
					triggerLabel && 'text-muted-foreground hover-hover:group-hover:text-background'
				)}
			></Info>
		</TooltipTrigger>
		<TooltipContent class="flex w-96 max-w-full flex-col gap-1 px-4 pb-4 pt-3 leading-tight">
			{#if title}
				<strong class="block text-balance text-base font-semibold leading-5">{title}</strong>
			{/if}
			{#if description}
				<p class="text-pretty text-sm leading-4 text-muted-foreground">{@html description}</p>
			{/if}
		</TooltipContent>
	</Tooltip>
{/if}
