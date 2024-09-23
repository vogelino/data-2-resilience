<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { cn } from '$lib/utils';
	import { Button } from './ui/button';

	const clampingClasses = {
		1: 'line-clamp-1',
		2: 'line-clamp-2',
		3: 'line-clamp-3',
		4: 'line-clamp-4',
		5: 'line-clamp-5'
	};

	export let defaultIsExpanded = false;
	export let className = '';
	export let linesClampedCount: keyof typeof clampingClasses = 2;

	let isExpanded = defaultIsExpanded;

	function toggle() {
		isExpanded = !isExpanded;
	}
</script>

<div
	class={cn(
		'flex flex-col gap-1 transition-colors',
		!isExpanded && clampingClasses[linesClampedCount],
		!isExpanded && 'text-muted-foreground',
		className
	)}
>
	<slot />
</div>
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
