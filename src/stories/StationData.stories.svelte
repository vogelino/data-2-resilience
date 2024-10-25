<script lang="ts" context="module">
	import type { Meta } from '@storybook/svelte';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	export const meta = {
		title: 'Data Loading/Stations Data',
		component: undefined,
		args: {
			id: 'DEC005476',
			start_date: '2024-09-21T03:00:00.000Z',
			end_date: '2024-10-03T03:00:00.000Z',
			param: 'wind_direction',
			scale: 'daily'
		},
		argTypes: {
			id: { type: 'string' },
			start_date: { type: 'string' },
			end_date: { type: 'string' },
			param: { type: 'string' },
			scale: { type: 'string' }
		}
	} satisfies Meta;
</script>

<script lang="ts">
	import { api } from '$lib/utils/api';
	import { type WeatherMeasurementKeyNoMinMax } from '$lib/utils/schemas';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { QueryFunction } from '@tanstack/svelte-query';
	import DataFetchingPreview from './utils/DataFetchingPreview.svelte';

	const queryFn: QueryFunction = ({ queryKey }) => {
		return api().getStationData({
			id: queryKey[1] as string,
			start_date: new Date(queryKey[2] as string).toISOString(),
			end_date: new Date(queryKey[3] as string).toISOString(),
			param: queryKey[4] as WeatherMeasurementKeyNoMinMax,
			scale: queryKey[5] as 'hourly' | 'daily'
		});
	};
</script>

<Template let:args>
	<DataFetchingPreview
		queryKey={['stationData', args.id, args.start_date, args.end_date, args.param, args.scale]}
		{queryFn}
	/>
</Template>

<Story name="Wind Speed" args={{ ...meta.args, param: 'wind_speed' }} />
<Story name="Wind Direction" args={{ ...meta.args, param: 'wind_direction' }} />
<Story name="Relative Humidity" args={{ ...meta.args, param: 'relative_humidity' }} />
