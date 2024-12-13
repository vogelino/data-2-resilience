<script lang="ts" context="module">
	import type { Meta } from '@storybook/svelte';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	export const meta = {
		title: 'Data Loading/Stations Latest Data',
		component: undefined,
		args: {
			param: 'wind_speed'
		},
		argTypes: {
			id: {
				type: 'string'
			},
			param: {
				type: 'string',
				control: {
					disable: true,
					type: 'text'
				}
			}
		}
	} satisfies Meta;
</script>

<script lang="ts">
	import { api } from '$lib/utils/api';
	import type { StationMetadata, WeatherMeasurementKeyNoMinMax } from '$lib/utils/schemas';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { QueryFunction } from '@tanstack/svelte-query';
	import DataFetchingPreview from './utils/DataFetchingPreview.svelte';

	const getDataFormatter = (id?: string) => (data: unknown) => {
		const d = data as StationMetadata[] & Record<WeatherMeasurementKeyNoMinMax, unknown>;
		return id ? d.find((d) => d.id === id) : d;
	};
	const queryFn: QueryFunction = ({ queryKey }) => {
		return api().getStationsLatestData(queryKey[1] as WeatherMeasurementKeyNoMinMax);
	};
</script>

<Template let:args>
	<DataFetchingPreview
		queryKey={['stationLatestData', args.param]}
		{queryFn}
		dataFormatter={getDataFormatter(args.id)}
	/>
</Template>

<Story name="Wind Speed" args={{ id: 'DEC005304', param: 'wind_speed' }} />
<Story name="Wind Direction" args={{ id: 'DEC005304', param: 'wind_direction' }} />
<Story name="Relative Humidity" args={{ id: 'DEC005304', param: 'relative_humidity' }} />
