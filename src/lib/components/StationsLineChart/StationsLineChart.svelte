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
		unit
	} from '$lib/stores/uiStore';
	import { reactiveQueryArgs } from '$lib/utils/queryUtils.svelte';
	import { getMessageForUnsupportedStations } from '$lib/utils/stationsDataVisUtil';
	import { createQuery } from '@tanstack/svelte-query';
	import TimeseriesLineChart from 'components/TimeseriesLineChart.svelte';
	import Alert from 'components/ui/alert/alert.svelte';
	import { getStationDataFetcher } from './stationsLineChartUtil';

	interface Props {
		stations: StationsGeoJSONType;
		initialStationIds?: string[];
	}

	let { stations, initialStationIds = [] }: Props = $props();

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
	const selectedUnitLabel = $derived(
		$LL.pages.measurements.unitSelect.units[
			$unit as keyof typeof $LL.pages.measurements.unitSelect.units
		].label()
	);
</script>

<h3 class="flex flex-col gap-x-2 gap-y-0.5">
	<strong class="font-semibold">{selectedUnitLabel}</strong>
	<span class="text-sm text-muted-foreground">
		{$formattedTimeConfiguration}
	</span>
</h3>
{#if unsupportedMsg}
	<Alert variant="destructive">
		{@html unsupportedMsg}
	</Alert>
{/if}

<TimeseriesLineChart
	{data}
	{isOrdinal}
	{isLoading}
	{error}
/>
