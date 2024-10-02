<script lang="ts" generics="T">
	import { cn } from '$lib/utils';

	export let status: string;
	export let data: unknown;
	export let error: Error | null;
</script>

<div class="flex items-center gap-2">
	<span
		class={cn(
			'size-4 rounded-full bg-muted shadow-[inset_0_0_0_1px] shadow-black/10',
			status === 'success' && 'bg-green-600',
			status === 'error' && 'bg-red-600'
		)}
	/>
	<span class={cn(status === 'pending' && 'animate-pulse')}>
		{status.substring(0, 1).toUpperCase() + status.substring(1)}
	</span>
</div>

{#if data}
	<code class="mt-8 block rounded border border-border bg-muted px-6 py-5 font-mono">
		<pre>{JSON.stringify(data, null, 2)}</pre>
	</code>
{/if}

{#if error}
	<p class={cn('mt-8 rounded font-mono text-red-600', 'border border-red-300 bg-red-50 px-6 py-5')}>
		{error.message}
	</p>
{/if}
