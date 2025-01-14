<script lang="ts">
	import type { StationsGeoJSONType } from '$lib/stores/mapData';
	import SearchInputField from 'components/SearchInputField.svelte';
	import { LL, locale } from '$i18n/i18n-svelte';
	import { cn } from '$lib/utils';
	import * as Popover from '$lib/components/ui/popover';
	import { point } from '@turf/helpers';
	import { distance } from '@turf/distance';
	import { Command, CommandEmpty, CommandGroup, CommandItem } from 'components/ui/command';
	import { createQuery, type QueryFunctionContext, type QueryKey } from '@tanstack/svelte-query';
	import { reactiveQueryArgs } from '$lib/utils/queryUtils/queryUtils.svelte';
	import { searchAddress } from '$lib/utils/queryUtils/addressSearchQuery';

	let {
		map,
		stations
	}: {
		map: maplibregl.Map;
		stations: StationsGeoJSONType;
	} = $props();

	function debounce<T>(getter: () => T, delay: number) {
		let value = $state();
		let timer: ReturnType<typeof setTimeout>;
		$effect(() => {
			const newValue = getter(); // read here to subscribe to it
			clearTimeout(timer);
			timer = setTimeout(() => (value = newValue), delay);
			return () => clearTimeout(timer);
		});
		return () => value;
	}

	let searchQuery = $state('');
	let debouncedQuery = $derived.by(debounce(() => searchQuery, 300));

	const distanceFormatter = new Intl.NumberFormat($locale, {
		maximumFractionDigits: 1,
		unit: 'kilometer',
		style: 'unit'
	});

	// --------------

	const searchResultsQuery = createQuery(
		reactiveQueryArgs(() => ({
			queryKey: ['address-search', debouncedQuery],
			queryFn: ({ queryKey }: QueryFunctionContext<QueryKey>) => searchAddress(`${queryKey.at(-1)}`)
		}))
	);
	const isLoading = $derived($searchResultsQuery.isPending);
	const isEmpty = $derived(!isLoading && !$searchResultsQuery.data);
	const isError = $derived(!isLoading && !$searchResultsQuery.isError);
	const showPopover = $derived(
		Boolean($searchResultsQuery.data || isEmpty || isError || isLoading)
	);

	type StationFeatureWithDistance = StationsGeoJSONType['features'][0] & {
		distance: number;
	};
	const closestStations = $derived.by(() => {
		const addressFound = $searchResultsQuery.data;
		if (!addressFound) return [];
		const addressPoint = point(addressFound.coordinates);
		const stationsSortedByDistance = stations.features
			.map((f) => ({ ...f, distance: distance(addressPoint, point(f.geometry.coordinates)) }))
			.sort((a, b) => a.distance - b.distance) satisfies StationFeatureWithDistance[];
		return stationsSortedByDistance.slice(0, 5);
	});

	// --------------
</script>

<div class={cn('fixed right-20 top-[calc(var(--headerHeight,5rem)+0.75rem)] z-10 w-64 transition')}>
	<div class="relative">
		<Popover.Root open={searchQuery?.length > 0 && showPopover}>
			<Popover.Trigger asChild>
				<SearchInputField
					placeholder={$LL.map.search.placeholder()}
					value={searchQuery}
					onchange={(newVal) => (searchQuery = newVal)}
					classNames={{
						input: cn('shadow-lg shadow-black/5 dark:shadow-black/80'),
						container: cn('max-w-64 justify-end')
					}}
				/>
			</Popover.Trigger>
			<Popover.Content
				class="absolute right-0 top-full !block min-w-64 max-w-96 translate-y-1.5 p-0"
				side="bottom"
				align="end"
			>
				<Command>
					{#if isEmpty}
						<CommandEmpty>{$LL.map.search.noResults()}</CommandEmpty>
					{:else if isLoading}
						<CommandEmpty>{$LL.map.search.loading()}</CommandEmpty>
					{/if}
					{#if $searchResultsQuery.data}
						<CommandGroup class="flex flex-col" heading="Address">
							<CommandItem
								class={cn(
									'border-t border-border px-4 py-3 text-base leading-5',
									'focusable text-left hover-hover:hover:bg-muted',
									'focus-visible:z-50 focus-visible:border-background'
								)}
								value="address"
							>
								{$searchResultsQuery.data.address}
							</CommandItem>
						</CommandGroup>
					{/if}
					{#if closestStations.length > 0}
						<CommandGroup class="flex flex-col" heading="Closet stations">
							{#each closestStations as station}
								<CommandItem
									type="button"
									class={cn(
										'flex flex-col items-start rounded-none border-t border-border',
										'focusable px-4 py-2 text-left hover-hover:hover:bg-muted',
										'focus-visible:z-50 focus-visible:border-background'
									)}
									value={station.id}
								>
									<strong class="text-sm leading-4">
										{station.properties.longName}
									</strong>
									<span class="text-xs font-normal text-muted-foreground">
										{$LL.pages.stations.table.cells.stationTypes[
											station.properties.stationType
										].nameShort()}
										{` ・ `}
										{distanceFormatter.format(station.distance)}
									</span>
								</CommandItem>
							{/each}
						</CommandGroup>
					{/if}
				</Command>
			</Popover.Content>
		</Popover.Root>
	</div>
</div>
