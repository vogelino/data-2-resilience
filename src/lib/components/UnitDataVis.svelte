<script lang="ts">
	import type { StationsGeoJSONType } from '$lib/stores/mapData';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import DailySationsValuesBarChart from './DailySationsValuesBarChart.svelte';
	import DateRangeSlider from './DateRangeSlider.svelte';
	import StationsValuesLineChart from './StationsLineChart/StationsLineChart.svelte';

	export let stations: StationsGeoJSONType;

	const isRange = queryParam('is_range', ssp.boolean(false));
</script>

<div class="mt-4 flex flex-col rounded-md border border-border">
	<div class="flex flex-col gap-4 border-b border-border p-4">
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
