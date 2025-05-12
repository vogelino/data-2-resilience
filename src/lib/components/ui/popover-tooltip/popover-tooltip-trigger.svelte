<script lang="ts">
	import { PopoverTrigger } from '$lib/components/ui/popover';
	import { TooltipTrigger } from '$lib/components/ui/tooltip';
	import type { PopoverTriggerProps, TooltipTriggerProps } from 'bits-ui';
	import { MediaQuery } from 'svelte/reactivity';

	let { ...restProps }: PopoverTriggerProps & TooltipTriggerProps = $props();

	const isTouch = new MediaQuery('any-hover: none', false);
</script>

{#if isTouch.current}
	<PopoverTrigger {...restProps}>
		{@render restProps.children?.()}
	</PopoverTrigger>
{:else}
	<TooltipTrigger {...restProps}>
		{@render restProps.children?.()}
	</TooltipTrigger>
{/if}
