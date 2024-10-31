<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import type { StationsGeoJSONType } from '$lib/stores/mapData';
	import { useStations } from '$lib/stores/stationsStore';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import DailySationsValuesBarChart from './DailySationsValuesBarChart.svelte';
	import DateRangeSlider from './DateRangeSlider.svelte';
	import StationsValuesLineChart from './StationsLineChart/StationsLineChart.svelte';

	export let stations: StationsGeoJSONType;

	const datavisType = queryParam('datavisType', ssp.string('day'));
	const selectedStations = useStations();
</script>

<div class="mt-4 flex flex-col rounded-md border border-border">
	<div class="flex flex-col gap-4 border-b border-border p-4">
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
	<div class="border-border p-4">
		<DateRangeSlider />
	</div>
</div>
