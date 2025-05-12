<script lang="ts">
	import { Popover } from '$lib/components/ui/popover';
	import { Tooltip } from '$lib/components/ui/tooltip';
	import type { PopoverProps as PopoverRootProps, TooltipProps as TooltipRootProps } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import { MediaQuery } from 'svelte/reactivity';

	let {
		...restProps
	}: PopoverRootProps &
		TooltipRootProps & {
			children?: Snippet<[]>;
		} = $props();

	const isTouch = new MediaQuery('any-hover: none', false);
</script>

{#if isTouch.current}
	<Popover {...restProps}>
		{@render restProps.children?.()}
	</Popover>
{:else}
	<Tooltip openDelay={0} closeDelay={0} {...restProps}>
		{@render restProps.children?.()}
	</Tooltip>
{/if}
