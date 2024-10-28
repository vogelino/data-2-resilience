<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import type { StationsGeoJSONType } from '$lib/stores/mapData';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import DailySationsValuesBarChart from './DailySationsValuesBarChart.svelte';
	import DateRangeSlider from './DateRangeSlider.svelte';
	import StationsValuesLineChart from './StationsLineChart/StationsLineChart.svelte';

	export let stations: StationsGeoJSONType;

	let unit = queryParam('unit', ssp.string('air_temperature'));

	$: selectedUnitLabel =
		$LL.pages.measurements.unitSelect.units[
			$unit as keyof typeof $LL.pages.measurements.unitSelect.units
		]?.shortLabel();

	const isRange = queryParam('is_range', ssp.boolean(false));
</script>

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
