<script lang="ts">
	import {
		PopoverTooltip,
		PopoverTooltipContent,
		PopoverTooltipTrigger
	} from '$lib/components/ui/popover-tooltip';
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
	<PopoverTooltip openDelay={100}>
		<PopoverTooltipTrigger
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
		</PopoverTooltipTrigger>
		<PopoverTooltipContent class="flex w-96 max-w-full flex-col gap-1 px-4 pb-4 pt-3 leading-tight">
			{#if title}
				<strong class="block text-balance text-base font-semibold leading-5">{title}</strong>
			{/if}
			{#if description}
				<p class="text-pretty text-sm leading-4 text-muted-foreground">{@html description}</p>
			{/if}
		</PopoverTooltipContent>
	</PopoverTooltip>
{/if}
