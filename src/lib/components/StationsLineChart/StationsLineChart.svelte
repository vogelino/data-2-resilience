<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { type StationsGeoJSONType } from '$lib/stores/mapData';
	import { useStations } from '$lib/stores/stationsStore';
	import {
		formattedTimeConfiguration,
		rangeEndDate,
		rangeEndKey,
		rangeStartDate,
		rangeStartKey,
		unit,

		unitLabel,

		unitOnly
	} from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
	import { reactiveQueryArgs } from '$lib/utils/queryUtils.svelte';
	import { getMessageForUnsupportedStations } from '$lib/utils/stationsDataVisUtil';
	import { createQuery } from '@tanstack/svelte-query';
	import ChartExportDropdown from 'components/ChartExportDropdown.svelte';
	import TimeseriesLineChart from 'components/TimeseriesLineChart.svelte';
	import Alert from 'components/ui/alert/alert.svelte';
	import WindDirectionChart from 'components/WindDirectionChart.svelte';
	import { getStationDataFetcher } from './stationsLineChartUtil';

	interface Props {
		stations: StationsGeoJSONType;
		initialStationIds?: string[];
	}

	let { stations, initialStationIds = [] }: Props = $props();

	let isExporting = $state(false);

	const ids = useStations({ stations, initialStationIds });

	type DataRecord = Record<string, string | number> & {
		date: Date;
	};

	const queryFn = $derived.by(() =>
		getStationDataFetcher({
			ids: $ids,
			start_date: $rangeStartDate,
			end_date: $rangeEndDate,
			unit: $unit,
			stations: stations.features
		})
	);
	let query = createQuery(
		reactiveQueryArgs(() => ({
			queryKey: ['stationsData-range', $ids?.join('-'), $rangeStartKey, $rangeEndKey, $unit],
			queryFn,
			enabled: Boolean(
				$ids?.length > 0 &&
					stations?.features?.length > 0 &&
					$rangeStartDate &&
					$rangeEndDate &&
					$unit
			)
		}))
	);
	const { data: queryData, isLoading, error } = $derived($query);
	const data = $derived(queryData?.lineChartData as unknown as DataRecord[] || [])
	const isOrdinal = $derived($unit.endsWith('_category'));
	const unsupportedIds = $derived(queryData?.unsupportedIds || []);
	const unsupportedMsg = $derived(
		getMessageForUnsupportedStations({
			ids: $ids,
			unsupportedIds,
			unit: $unit,
			stations: stations.features,
			LL: $LL
		})
	);

	const isWindDirectionUnit = $derived($unit.startsWith('wind_direction'));
</script>

<h3 class="grid grid-cols-[1fr_auto] items-center gap-x-8 gap-y-2 font-semibold">
		<span class="flex flex-col gap-x-2 gap-y-0.5 font-semibold">
			{$unitLabel}
			{$unitOnly ? `(${$unitOnly})` : ''}
			<span class="text-sm font-normal text-muted-foreground">
				{$formattedTimeConfiguration}
			</span>
		</span>
		<span class={cn('flex items-center gap-x-2', isExporting && 'opacity-0')}>
			<ChartExportDropdown
				chartExportFilename="stations-linechart.png"
				chartExportId="stations-datavis"
				onChartExportStart={() => (isExporting = true)}
				onChartExportEnd={() => (isExporting = false)}
			/>
		</span>
	</h3>
{#if unsupportedMsg}
	<Alert variant="destructive">
		{@html unsupportedMsg}
	</Alert>
{/if}

{#if isWindDirectionUnit}
	<WindDirectionChart
		{data}
		isLoading={isExporting || isLoading}
		{error}
	/>
{:else}
	<TimeseriesLineChart
		{data}
		{isOrdinal}
		isLoading={isExporting || isLoading}
		{error}
	/>
{/if}
