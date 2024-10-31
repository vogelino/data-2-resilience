<script lang="ts">
	import { cn } from '$lib/utils';
	import { Check } from 'lucide-svelte';

	export let checked = false;
</script>

<span
	class={cn(
		'group flex size-4 items-center justify-center rounded-[2px] border border-primary',
		checked && 'bg-primary'
	)}
>
	<Check
		class={cn('size-3 text-primary-foreground opacity-0 transition', checked && 'opacity-100')}
		strokeWidth={4}
	/>
</span>
