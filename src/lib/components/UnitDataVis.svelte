<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import type { StationsGeoJSONType } from '$lib/stores/mapData';
	import { selectedStations } from '$lib/stores/stationsStore';
	import { selectedUnit } from '$lib/stores/unitStore';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import DailySationsValuesBarChart from './DailySationsValuesBarChart.svelte';
	import DateRangeSlider from './DateRangeSlider.svelte';
	import StationsValuesLineChart from './StationsLineChart/StationsLineChart.svelte';

	export let stations: StationsGeoJSONType;

	$: selectedUnitLabel =
		$LL.pages.measurements.unitSelect.units[
			$selectedUnit as keyof typeof $LL.pages.measurements.unitSelect.units
		]?.shortLabel();

	const isRange = queryParam('is_range', ssp.boolean(false));
</script>

{#if $selectedStations.length > 1}
	<div class="mt-4 flex flex-col rounded-md border border-border">
		<div class="flex flex-col gap-4 border-b border-border p-4">
			<h3 class="font-semibold">{selectedUnitLabel}</h3>
			{#if $isRange}
				<StationsValuesLineChart {stations} />
			{:else}
				<DailySationsValuesBarChart {stations} />
			{/if}
		</div>
		<div class="border-border p-4">
			<DateRangeSlider />
		</div>
	</div>
{/if}
