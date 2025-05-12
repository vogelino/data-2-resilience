<!-- @migration-task Error while migrating Svelte code: Can't migrate code with afterUpdate. Please migrate by hand. -->
<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { cn } from '$lib/utils';
	import { onMount, type Snippet } from 'svelte';
	import { Button } from './ui/button';

	const clampingClasses = {
		1: 'line-clamp-1',
		2: 'line-clamp-2',
		3: 'line-clamp-3',
		4: 'line-clamp-4',
		5: 'line-clamp-5'
	};

	type Props = {
		defaultIsExpanded?: boolean;
		className?: string;
		linesClampedCount?: keyof typeof clampingClasses;
		children?: Snippet<[]>;
	};

	const props: Props = $props();

	let isExpanded = $state(props.defaultIsExpanded ?? false);
	let isClamped = $state(true);
	let contentDiv: HTMLDivElement | null = $state(null);

	$effect(checkIfClamped);

	function checkIfClamped() {
		if (!contentDiv) return;
		isClamped = contentDiv.scrollHeight > contentDiv.clientHeight;
	}

	function toggle() {
		isExpanded = !isExpanded;
	}
</script>

<div
	bind:this={contentDiv}
	class={cn(
		'flex flex-col gap-1 transition-colors',
		!isExpanded && clampingClasses[props.linesClampedCount ?? 2],
		!isExpanded && isClamped && 'text-muted-foreground',
		props.className
	)}
>
	{@render props.children?.()}
</div>
{#if isClamped || isExpanded}
	<Button
		variant="link"
		type="button"
		size="sm"
		on:click={toggle}
		class={cn(
			'-ml-3 mt-1 h-fit text-sm font-semibold transition-opacity',
			!isExpanded && 'opacity-90'
		)}
	>
		{isExpanded ? $LL.generic.collapse() : $LL.generic.expand()}
	</Button>
{/if}
