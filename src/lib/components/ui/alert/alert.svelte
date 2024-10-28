<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { Info, TriangleAlert } from 'lucide-svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { type Variant, alertVariants } from './index.js';

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		variant?: Variant;
	};

	let className: $$Props['class'] = undefined;
	export let variant: $$Props['variant'] = 'default';
	export { className as class };
</script>

<div class={cn(alertVariants({ variant }), className)} {...$$restProps} role="alert">
	<div>
		<slot />
	</div>
	{#if ['warning', 'destructive'].includes(variant || 'default')}
		<TriangleAlert class="size-5 shrink-0" />
	{:else}
		<Info class="size-5 shrink-0" />
	{/if}
</div>
