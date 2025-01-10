<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import { api } from '$lib/utils/api';
	import type { StationMetadata } from '$lib/utils/schemas';
	import { createQuery } from '@tanstack/svelte-query';
	import {
		createSvelteTable,
		getCoreRowModel,
		getFilteredRowModel,
		getPaginationRowModel,
		getSortedRowModel,
		renderComponent,
		sortingFns,
		type ColumnDef,
		type FilterFn,
		type OnChangeFn,
		type PaginationState,
		type SortingFn,
		type SortingState
	} from '$lib/components/table';
	import Table from './Table.svelte';
	import SensorTypeWithTooltip from './SensorTypeWithTooltip.svelte';
	import { cn } from '$lib/utils';
	import { Button } from './ui/button';
	import { ArrowLeftToLine, Search } from 'lucide-svelte';
	import { compareItems, rankItem } from '@tanstack/match-sorter-utils';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import HighlightedSearchQuery from './HighlightedSearchQuery.svelte';
	import { dortmundPostalCodeToDistrictsMap } from '$lib/stores/mapData';

	let { stations }: { stations: StationMetadata[] } = $props();

	let inputElement: HTMLInputElement | undefined = $state();
	const searchQuery = queryParam('stationsSearch', ssp.string(''), {
		debounceHistory: 500
	});

	const query = createQuery({
		queryKey: ['stations'],
		queryFn: () => api().getStationsMetadata(),
		initialData: stations
	});
	let data = $derived($query?.data || []);

	let columns = [
		{
			header: () => $LL.pages.stations.table.headers.name(),
			accessorKey: 'longName',
			cell: (info) => {
				const text = info.getValue() as string;
				const searchQuery = info.table.getState().globalFilter;
				return renderComponent(HighlightedSearchQuery, { searchQuery, text });
			},
			sortingFn: (a, b) => a.original.longName.localeCompare(b.original.longName, $locale)
		},
		{
			header: () => $LL.pages.stations.table.headers.stationType(),
			accessorKey: 'stationType',
			cell: (info) => {
				const type = info.getValue() === 'biomet' ? 'biomet' : 'temprh';
				const searchQuery = info.table.getState().globalFilter;
				return renderComponent(SensorTypeWithTooltip, { type, searchQuery });
			},
			sortingFn: (a, b) => {
				const aLabel =
					a.original.stationType === 'biomet'
						? $LL.pages.stations.table.cells.stationTypes.biomet.title()
						: $LL.pages.stations.table.cells.stationTypes.temprh.title();
				const bLabel =
					b.original.stationType === 'biomet'
						? $LL.pages.stations.table.cells.stationTypes.biomet.title()
						: $LL.pages.stations.table.cells.stationTypes.temprh.title();
				return aLabel.localeCompare(bLabel, $locale);
			}
		},
		{
			header: () => $LL.pages.stations.table.headers.id(),
			accessorKey: 'id',
			cell: (info) => {
				const text = info.getValue() as string;
				const searchQuery = info.table.getState().globalFilter;
				return renderComponent(HighlightedSearchQuery, { searchQuery, text });
			},
			sortingFn: (a, b) => a.original.longName.localeCompare(b.original.longName, $locale)
		},
		{
			header: () => $LL.pages.stations.table.headers.district(),
			accessorKey: 'district',
			cell: (info) => {
				const postalCode = info.getValue() as string;
				const districtName = dortmundPostalCodeToDistrictsMap.get(postalCode);
				const val =
					postalCode && districtName ? `${districtName} (${postalCode})` : postalCode || 'unknown';
				if (val === 'unknown') return '-';
				const searchQuery = info.table.getState().globalFilter;
				return renderComponent(HighlightedSearchQuery, { searchQuery, text: val });
			},
			sortingFn: (a, b) => a.original.longName.localeCompare(b.original.longName, $locale)
		},
		{
			header: () => $LL.pages.stations.table.headers.geolocation(),
			accessorKey: 'latitude',
			cell: (info) => {
				const { latitude, longitude } = info.row.original;
				const searchQuery = info.table.getState().globalFilter;
				const text = `${latitude.toLocaleString($locale)}, ${longitude.toLocaleString($locale)}`;
				return renderComponent(HighlightedSearchQuery, { searchQuery, text });
			}
		}
	] satisfies ColumnDef<StationMetadata>[];

	const fuzzyFilter: FilterFn<any> = (row, columnId, searchTerm, addMeta) => {
		let value = row.getValue(columnId);

		if (columnId === 'stationType') {
			value = $LL.pages.stations.table.cells.stationTypes[value as 'biomet' | 'temprh'].title();
		} else if (columnId === 'district') {
			let districtName = dortmundPostalCodeToDistrictsMap.get(value as string);
			value = districtName ? `${districtName} (${value})` : value || 'unknown';
		} else if (typeof value === 'number') {
			value = value.toLocaleString($locale);
		}

		const itemRank = rankItem(value, searchTerm);
		addMeta({ itemRank });
		return itemRank.passed;
	};

	const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
		let dir = 0;

		// Only sort by rank if the column has ranking information
		if (rowA.columnFiltersMeta[columnId]) {
			dir = compareItems(
				// @ts-ignore
				rowA.columnFiltersMeta[columnId]?.itemRank!,
				// @ts-ignore
				rowB.columnFiltersMeta[columnId]?.itemRank!
			);
		}

		// Provide an alphanumeric fallback for when the item ranks are equal
		return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
	};

	let sorting: SortingState = $state([]);
	let pagination: PaginationState = $state({ pageIndex: 0, pageSize: 13 });

	const setSorting: OnChangeFn<SortingState> = (updater) => {
		if (updater instanceof Function) {
			sorting = updater(sorting);
		} else {
			sorting = updater;
		}
	};

	const setPagination: OnChangeFn<PaginationState> = (updater) => {
		if (updater instanceof Function) {
			pagination = updater(pagination);
		} else {
			pagination = updater;
		}
	};

	let table = createSvelteTable({
		get data() {
			return data || [];
		},
		columns,
		state: {
			get sorting() {
				return sorting;
			},
			get pagination() {
				return pagination;
			},
			get globalFilter() {
				return $searchQuery || undefined;
			}
		},
		getCoreRowModel: getCoreRowModel<StationMetadata>(),
		getFilteredRowModel: getFilteredRowModel<StationMetadata>(),
		getSortedRowModel: getSortedRowModel<StationMetadata>(),
		getPaginationRowModel: getPaginationRowModel<StationMetadata>(),
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		filterFns: { fuzzy: fuzzyFilter },
		sortingFns: { fuzzy: fuzzySort },
		globalFilterFn: fuzzyFilter
	});
</script>

<div class="min-h-full bg-muted pt-6 sm:pt-2">
	<div class="container flex min-h-full flex-col gap-6 py-8">
		<div class="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
			<h1 class="text-xl font-semibold">{$LL.pages.stations.titleTable()}</h1>
			<label class="flex translate-y-1 flex-col gap-1">
				<span class="text-sm font-semibold">{$LL.pages.stations.table.search.label()}</span>
				<div class="relative">
					<input
						type="text"
						bind:value={$searchQuery}
						bind:this={inputElement}
						placeholder={$LL.pages.stations.table.search.placeholder()}
						class={cn(
							'px-4 py-2 text-base placeholder-muted-foreground',
							'w-64 max-w-full rounded border border-border bg-background',
							'focusable focus-visible:border-muted-foreground'
						)}
					/>
					<Button
						size="icon"
						variant="ghost"
						on:click={() => {
							if ($searchQuery.length === 0) {
								inputElement?.focus();
							} else {
								$searchQuery = '';
							}
						}}
						class={cn(
							'absolute right-px top-1/2 h-[calc(100%-2px)] -translate-y-1/2',
							'rounded-none rounded-r-sm focus-visible:rounded'
						)}
					>
						{#if $searchQuery.length === 0}
							<Search class="size-5" />
						{:else}
							<ArrowLeftToLine class="size-5" />
						{/if}
					</Button>
				</div>
			</label>
		</div>
		<div class="rounded border border-border bg-background">
			<Table {table} />
		</div>
	</div>
</div>
