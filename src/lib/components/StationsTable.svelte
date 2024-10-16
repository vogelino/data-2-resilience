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
			header: () => $LL.pages.stations.table.headers.stationType(),
			accessorKey: 'stationType',
			cell: (info) =>
				info.getValue() === 'biomet'
					? $LL.pages.stations.table.cells.stationTypes.biomet()
					: $LL.pages.stations.table.cells.stationTypes.temprh()
		},
		{
			header: () => $LL.pages.stations.table.headers.id(),
			accessorKey: 'id',
			cell: (info) => info.getValue()
		},
		{
			header: () => $LL.pages.stations.table.headers.district(),
			accessorKey: 'district',
			cell: (info) => info.getValue()
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
			accessorKey: 'latitude',
			cell: (info) => ((info.getValue() as number) > 51.491 ? 'active' : 'inactive')
		}
	] satisfies ColumnDef<StationMetadata>[];
</script>

<h1>{$LL.pages.stations.title()}</h1>

<Table data={$query.data} {columns} />
