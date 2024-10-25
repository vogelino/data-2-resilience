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
	import { api } from '$lib/utils/api';
	import type { StationMetadata } from '$lib/utils/schemas';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import DataFetchingPreview from './utils/DataFetchingPreview.svelte';

	const getDataFormatter = (id?: string) => (data: unknown) => {
		const d = data as StationMetadata[];
		return id ? d.find((d) => d.id === id) : d;
	};
</script>

<Template let:args>
	<DataFetchingPreview
		queryKey={['stationsMetadata']}
		queryFn={() => api().getStationsMetadata()}
		dataFormatter={getDataFormatter(args.id)}
	/>
</Template>

<Story name="All" />
<Story name="Single" args={{ id: 'DEC005304' }} />
