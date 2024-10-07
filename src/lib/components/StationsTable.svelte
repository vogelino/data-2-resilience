<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { api } from '$lib/utils/api';
	import type { StationMetadata } from '$lib/utils/schemas';
	import { createQuery } from '@tanstack/svelte-query';
	import { type ColumnDef } from '@tanstack/svelte-table';
	import Table from './Table.svelte';

	const query = createQuery({
		queryKey: ['stations'],
		queryFn: () => api().getStationsMetadata()
	});
	const columns: ColumnDef<StationMetadata>[] = [
		{
			accessorKey: 'longName',
			cell: (info) => info.getValue()
		}
	];
</script>

<h1>{$LL.pages.stations.title()}</h1>

<Table data={$query.data} {columns} />
