<script lang="ts">
	import type { StationsGeoJSONType } from '$lib/stores/mapData';
	import SearchInputField from 'components/SearchInputField.svelte';
	import { LL } from '$i18n/i18n-svelte';
	import { cn } from '$lib/utils';
	import * as Popover from '$lib/components/ui/popover';
	import { Command, CommandEmpty, CommandGroup, CommandItem } from 'components/ui/command';
	import { createQuery, type QueryFunctionContext, type QueryKey } from '@tanstack/svelte-query';
	import { reactiveQueryArgs } from '$lib/utils/queryUtils/queryUtils.svelte';
	import { debounceState } from '$lib/utils/runeUtil.svelte';
	import { z } from 'zod';
	import { PUBLIC_GEOCODING_URL } from '$env/static/public';

	let {
		map,
		stations
	}: {
		map: maplibregl.Map;
		stations: StationsGeoJSONType;
	} = $props();

	let searchQuery = $state('');
	let debouncedQuery = $derived.by(debounceState(() => searchQuery, 300)) as string;

	// --------------

	const responseSchema = z.object({
		type: z.literal('FeatureCollection'),
		features: z.array(
			z.object({
				id: z.string(),
				type: z.literal('Feature'),
				bbox: z.array(z.number()).length(4),
				properties: z.object({
					text: z.string(),
					score: z.number()
				}),
				geometry: z.object({
					type: z.literal('Point'),
					coordinates: z.array(z.number())
				})
			})
		)
	});

	const searchResultsQuery = createQuery(
		reactiveQueryArgs(() => ({
			queryKey: ['addressSearch', debouncedQuery],
			queryFn: async ({ queryKey: [_, searchTerm] }: QueryFunctionContext<QueryKey>) => {
				if (typeof searchTerm === undefined) return [];
				if (!searchTerm) return [];
				const query = encodeURIComponent(`${searchTerm}`);
				const response = await fetch(`${PUBLIC_GEOCODING_URL}?query=${query}&outputformat=JSON`);

				if (!response.ok) {
					console.error(`Geocoding error: ${response.status} ${response.statusText}`);
					return [];
				}

				const data = await response.json();
				const parsedData = responseSchema.safeParse(data).data?.features || [];
				if (parsedData.length === 0) return [];
				const validResults = parsedData
					.filter((f) => f.properties.text && f.geometry.coordinates.length === 2)
					.sort((f1, f2) => f2.properties.score - f1.properties.score)
					.map((f) => ({
						id: f.id,
						address: f.properties.text,
						coordinates: f.geometry.coordinates
					}));
				return validResults;
			}
		}))
	);
	const { isPending, isError, data = [] } = $derived($searchResultsQuery);
	const isEmpty = $derived(!isPending && data.length === 0);
	const showPopover = $derived(
		searchQuery.length > 0 &&
			debouncedQuery?.trim().length > 0 &&
			Boolean(data || isEmpty || isError || isPending)
	);

	// --------------

	let command: string | undefined = $state();

	$effect(() => {
		const firstResult = data[0];
		if (!firstResult) return;
		command = firstResult.id;
	});

	// --------------

	function onKeyDown(event: KeyboardEvent) {
		if (event.key === 'ArrowDown') {
			const limitedData = data.slice(0, 5);
			const index = limitedData.findIndex((result) => result.id === command);
			const nextIndex = index + 1 > limitedData.length - 1 ? 0 : index + 1;
			command = data[nextIndex].id || limitedData[0].id;
		} else if (event.key === 'ArrowUp') {
			const limitedData = data.slice(0, 5);
			const index = limitedData.findIndex((result) => result.id === command);
			const nextIndex = index - 1 < 0 ? limitedData.length - 1 : index - 1;
			command = data[nextIndex].id || limitedData[limitedData.length - 1].id;
		} else if (event.key === 'Escape') {
			command = undefined;
			searchQuery = '';
		}
	}
</script>

<div class={cn('fixed right-20 top-[calc(var(--headerHeight,5rem)+0.75rem)] z-10 w-64 transition')}>
	<div class="relative">
		<Popover.Root open={showPopover}>
			<Popover.Trigger asChild>
				<SearchInputField
					placeholder={$LL.map.search.placeholder()}
					value={searchQuery}
					onchange={(newVal) => (searchQuery = newVal)}
					classNames={{
						input: cn('shadow-lg shadow-black/5 dark:shadow-black/80'),
						container: cn('max-w-64 justify-end')
					}}
					{onKeyDown}
				/>
			</Popover.Trigger>
			<Popover.Content
				class="absolute right-0 top-full !block min-w-64 max-w-96 translate-y-1.5 p-0"
				side="bottom"
				align="end"
			>
				<Command bind:value={command}>
					{#if isPending}
						<CommandEmpty>{$LL.map.search.loading()}</CommandEmpty>
					{:else if isEmpty}
						<CommandEmpty>{$LL.map.search.noResults()}</CommandEmpty>
					{/if}
					{#each data.slice(0, 5) as { id, address }}
						<CommandItem
							class={cn(
								'border-t border-border px-4 py-3 text-base leading-5',
								'focusable text-left hover-hover:hover:bg-muted',
								'focus-visible:z-50 focus-visible:border-background'
							)}
							value={id}
						>
							{address}
						</CommandItem>
					{/each}
				</Command>
			</Popover.Content>
		</Popover.Root>
	</div>
</div>
