<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import { api } from '$lib/utils/api';
	import type { StationMetadata } from '$lib/utils/schemas';
	import { createQuery } from '@tanstack/svelte-query';
	import { type ColumnDef } from '@tanstack/svelte-table';
	import Table from './Table.svelte';

	const query = createQuery({
		queryKey: ['stations'],
		queryFn: () => api().getStationsMetadata()
	});

	$: columns = [
		{
			header: () => $LL.pages.stations.table.headers.name(),
			accessorKey: 'longName',
			cell: (info) => info.getValue(),
			sortingFn: (a, b) => a.original.longName.localeCompare(b.original.longName, $locale)
		},
		{
			header: () => $LL.pages.stations.table.headers.stationType(),
			accessorKey: 'stationType',
			cell: (info) =>
				info.getValue() === 'biomet'
					? $LL.pages.stations.table.cells.stationTypes.biomet()
					: $LL.pages.stations.table.cells.stationTypes.temprh(),
			sortingFn: (a, b) => {
				const aLabel =
					a.original.stationType === 'biomet'
						? $LL.pages.stations.table.cells.stationTypes.biomet()
						: $LL.pages.stations.table.cells.stationTypes.temprh();
				const bLabel =
					b.original.stationType === 'biomet'
						? $LL.pages.stations.table.cells.stationTypes.biomet()
						: $LL.pages.stations.table.cells.stationTypes.temprh();
				return aLabel.localeCompare(bLabel, $locale);
			}
		},
		{
			header: () => $LL.pages.stations.table.headers.id(),
			accessorKey: 'id',
			cell: (info) => info.getValue(),
			sortingFn: (a, b) => a.original.longName.localeCompare(b.original.longName, $locale)
		},
		{
			header: () => $LL.pages.stations.table.headers.district(),
			accessorKey: 'district',
			cell: (info) => {
				const val = info.getValue();
				if (val === 'unknown') return '-';
				return val;
			},
			sortingFn: (a, b) => a.original.longName.localeCompare(b.original.longName, $locale)
		},
		{
			header: () => $LL.pages.stations.table.headers.geolocation(),
			accessorKey: 'latitude',
			cell: (info) => {
				const { latitude, longitude } = info.row.original;
				return `${latitude.toLocaleString($locale)}, ${longitude.toLocaleString($locale)}`;
			}
		},
		{
			header: () => $LL.pages.stations.table.headers.status(),
			accessorKey: 'status',
			cell: ({ row }) =>
				(row.original.latitude as number) > 51.491
					? $LL.pages.stations.table.cells.status.active()
					: $LL.pages.stations.table.cells.status.inactive(),
			sortingFn: (a, b) => {
				const aLabel =
					a.original.latitude > 51.491
						? $LL.pages.stations.table.cells.status.active()
						: $LL.pages.stations.table.cells.status.inactive();
				const bLabel =
					b.original.latitude > 51.491
						? $LL.pages.stations.table.cells.status.active()
						: $LL.pages.stations.table.cells.status.inactive();
				return aLabel.localeCompare(bLabel, $locale);
			}
		}
	] satisfies ColumnDef<StationMetadata>[];
</script>

<div class="min-h-full bg-muted">
	<div class="container flex min-h-full flex-col gap-6 py-8">
		<h1 class="text-xl font-semibold">{$LL.pages.stations.title()}</h1>
		<div class="rounded border border-border bg-background">
			<Table data={$query.data} {columns} />
		</div>
	</div>
</div>
