<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import type { StationsGeoJSONType } from '$lib/stores/mapData';
	import { useStations } from '$lib/stores/stationsStore';
	import {
		datavisType,
		rangeEndDate,
		rangeEndKey,
		rangeStartDate,
		rangeStartKey,
		unit
	} from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
	import { reactiveQueryArgs } from '$lib/utils/queryUtils.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { getStationDataFetcher } from 'components/StationsLineChart/stationsLineChartUtil';
	import TimeseriesLineChart from 'components/TimeseriesLineChart.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}
	type DataRecord = Record<string, string | number> & {
		date: Date;
	};

	const { data: pageData }: Props = $props();
	const stations = $derived(pageData.stationsGeoJson as StationsGeoJSONType);
	const ids = useStations({ stations });

	const queryFn = $derived.by(() =>
		getStationDataFetcher({
			ids: $ids,
			start_date: $rangeStartDate,
			end_date: $rangeEndDate,
			unit: $unit,
			stations: stations?.features
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
	const data = $derived((queryData?.lineChartData as unknown as DataRecord[]) || []);
	const isOrdinal = $derived($unit.endsWith('_category'));

	onMount(() => {
		if (typeof window === 'undefined') return;
		const htmlEl = document.querySelector('html') as HTMLElement;
		if (!htmlEl) return;
		htmlEl.style.fontSize = '16px';
	});
</script>

<div
	id="export-container"
	class={cn(
		'relative h-[400px] w-[520px] p-6',
		'[&_*]:select-none! pointer-events-none select-none [&_*]:pointer-events-none',
		'border',
	)}
>
	{#if $ids.length > 0 && $datavisType === 'range'}
		<TimeseriesLineChart {data} {isOrdinal} {isLoading} {error} />
	{:else}
		<p class="absolute inset-0 flex items-center justify-center text-center">
			{$LL.errors.invalidExportConfig()}
		</p>
	{/if}
</div>
