<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import type { StationsGeoJSONType } from '$lib/stores/mapData';
	import { useStations } from '$lib/stores/stationsStore';
	import { datavisType } from '$lib/stores/uiStore';
	import DailySationsValuesBarChart from './DailySationsValuesBarChart.svelte';
	import DateRangeSlider from './DateRangeSlider.svelte';
	import Histogram from './Histogram/Histogram.svelte';
	import StationsValuesLineChart from './StationsLineChart/StationsLineChart.svelte';

	interface Props {
		stations: StationsGeoJSONType;
		initialStationIds?: string[];
	}

	let { stations, initialStationIds = [] }: Props = $props();

	const selectedStations = useStations({ initialStationIds, stations });
</script>


	<div class="mt-4 flex flex-col rounded-md border border-border scroll-mt-20">
		<div class="flex flex-col gap-4 border-b border-border p-4 scroll-mt-20" id="stations-datavis">
			{#if $selectedStations.length > 0}
				{#if $datavisType === 'range'}
					<StationsValuesLineChart {stations} />
				{:else}
					<DailySationsValuesBarChart {stations} />
				{/if}
			{:else}
				<p class="flex min-h-16 items-center justify-center p-4 text-center text-muted-foreground">
					{$LL.pages.measurements.noStationsSelected()}
				</p>
			{/if}
		</div>
		<div class="border-border p-4 scroll-mt-20" id="date-range-slider">
			<DateRangeSlider />
		</div>
	</div>


	{#if $datavisType !== 'range'}
		<div class="mt-4 flex flex-col rounded-md border border-border scroll-mt-20" id="stations-histogram">
			<div class="flex flex-col gap-4 p-4">
				<Histogram {stations} {initialStationIds} />
			</div>
		</div>
	{/if}

