<script lang="ts">
	import * as Popover from '$lib/components/ui/popover';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { cn } from '$lib/utils';
	import { Popover as PopoverPrimitive, Tooltip as TooltipPrimitive } from 'bits-ui';
	import type { ClassArray, ClassDictionary } from 'clsx';
	import { MediaQuery } from 'svelte/reactivity';

	type Props = {
		class?: string | ClassArray | ClassDictionary | null | undefined;
	};

	let {
		class: className,
		...restProps
	}: Props & PopoverPrimitive.ContentProps & TooltipPrimitive.ContentProps = $props();

	const isTouch = new MediaQuery('any-hover: none', false);
</script>

{#if isTouch.current}
	<Popover.Content class={cn('w-auto px-3 py-1.5 text-sm', className)} side="top" {...restProps}>
		{@render restProps.children?.()}
	</Popover.Content>
{:else}
	<Tooltip.Content class={cn('font-medium', className)} {...restProps}>
		{@render restProps.children?.()}
	</Tooltip.Content>
{/if}
