<script lang="ts" context="module">
	import type { Meta } from '@storybook/svelte';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	export const meta = {
		title: 'Data Loading/Stations Metadata',
		component: undefined,
		args: {},
		argTypes: {
			id: {
				type: 'string'
			}
		}
	} satisfies Meta;
</script>

<script lang="ts">
	import { browser } from '$app/environment';
	import { api, type StationMetadata } from '$lib/utils/api';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { createQuery, QueryClient } from '@tanstack/svelte-query';
	import DataFetchingPreview from './utils/DataFetchingPreview.svelte';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	const stations = createQuery<StationMetadata[] | StationMetadata | undefined, Error>(
		{
			queryKey: ['stationsMetadata'],
			queryFn: () => api().getStationsMetadata()
		},
		queryClient
	);
</script>

<Template let:args>
	<DataFetchingPreview
		status={$stations.status}
		data={args.id && Array.isArray($stations.data)
			? $stations.data.filter((s) => s.id === args.id)
			: $stations.data}
		error={$stations.error}
	/>
</Template>

<Story name="All" />
<Story name="Single" args={{ id: '1' }} />
