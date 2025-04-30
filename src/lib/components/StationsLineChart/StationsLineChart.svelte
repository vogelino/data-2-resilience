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
	import {
		getMessageForUnavailableStations,
		getMessageForUnsupportedStations
	} from '$lib/utils/stationsDataVisUtil';
	import { useStationsSnapshotConfig } from '$lib/utils/useStationsSnapshot';
	import { createQuery } from '@tanstack/svelte-query';
	import ChartExportDropdown from 'components/ChartExportDropdown.svelte';
	import TimeseriesLineChart from 'components/TimeseriesLineChart.svelte';
	import Alert from 'components/ui/alert/alert.svelte';
	import WindDirectionChart from 'components/WindDirectionChart.svelte';
	import { TriangleAlert } from 'lucide-svelte';
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

	const stationsSnapshotQueryConfig = $derived.by(() =>
		useStationsSnapshotConfig({ initialStationIds, stations })
	);
	const snapshotQuery = createQuery(reactiveQueryArgs(() => $stationsSnapshotQueryConfig));
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
	const { data: queryData, error } = $derived($query);
	const isLoading = $derived($query.isLoading || isExporting);
	const data = $derived((queryData?.lineChartData as unknown as DataRecord[]) || []);
	const isOrdinal = $derived($unit.endsWith('_category'));
	const unsupportedMsg = $derived(
		getMessageForUnsupportedStations({
			ids: $ids,
			unsupportedIds: queryData?.unsupportedIds || [],
			unit: $unit,
			stations: stations.features,
			LL: $LL
		})
	);
	const unavailableMsg = $derived(
		getMessageForUnavailableStations({
			ids: $ids,
			unavailableIds: queryData?.unavailableIds || [],
			unit: $unit,
			stations: stations.features,
			LL: $LL
		})
	);

	const isWindDirectionUnit = $derived($unit.startsWith('wind_direction'));
</script>

{#if unsupportedMsg}
	<Alert variant="default" class="chart-export-ignore border-muted-foreground bg-muted/50">
		{#snippet icon()}
			<TriangleAlert class="size-5 shrink-0 text-muted-foreground" />
		{/snippet}
		{@html unsupportedMsg}
	</Alert>
{/if}
{#if unavailableMsg}
	<Alert variant="warning" class="chart-export-ignore">
		{@html unavailableMsg}
	</Alert>
{/if}
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
			chartExportFilename="stations-linechart"
			chartExportId="stations-datavis"
			onChartExportStart={() => (isExporting = true)}
			onChartExportEnd={() => (isExporting = false)}
		/>
	</span>
</h3>

{#if isWindDirectionUnit}
	<WindDirectionChart {data} {isLoading} {error} />
{:else}
	<TimeseriesLineChart
		{data}
		{isOrdinal}
		{isLoading}
		{error}
		min={$snapshotQuery.data?.scaleMin ?? null}
		max={$snapshotQuery.data?.scaleMax ?? null}
	/>
{/if}
