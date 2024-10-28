<script lang="ts">
	import { browser } from '$app/environment';
	import { cn } from '$lib/utils';
	import {
		createQuery,
		QueryClient,
		type QueryFunction,
		type QueryKey
	} from '@tanstack/svelte-query';

	export let queryKey: QueryKey;
	export let queryFn: QueryFunction<unknown, QueryKey>;
	export let dataFormatter = (data: unknown) => data;

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	const query = createQuery({ queryKey, queryFn }, queryClient);
</script>

<div class="flex items-center gap-2">
	<span
		class={cn(
			'size-4 rounded-full bg-muted shadow-[inset_0_0_0_1px] shadow-black/10',
			$query.status === 'success' && 'bg-green-600',
			$query.status === 'error' && 'bg-red-600'
		)}
	/>
	<span class={cn($query.status === 'pending' && 'animate-pulse')}>
		{$query.status.substring(0, 1).toUpperCase() + $query.status.substring(1)}
	</span>
</div>

{#if $query.data}
	<code class="mt-8 block rounded border border-border bg-muted px-6 py-5 font-mono">
		<pre>{JSON.stringify(dataFormatter($query.data), null, 2)}</pre>
	</code>
{/if}

{#if $query.error}
	<p
		class={cn(
			'mt-8 rounded font-mono text-red-600',
			'border border-red-300 bg-red-500/5 px-6 py-5'
		)}
	>
		{$query.error.message}
	</p>
{/if}
