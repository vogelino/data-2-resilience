<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { selectedStations } from '$lib/stores/stationsStore';
	import { selectedUnit } from '$lib/stores/unitStore';
	import { addDays, endOfToday, format } from 'date-fns';
	import DailySationsValuesBarLayerChart from './DailySationsValuesBarLayerChart.svelte';
	import DateRangeSlider from './DateRangeSlider.svelte';

	$: selectedUnitLabel =
		$LL.pages.measurements.unitSelect.units[
			$selectedUnit as keyof typeof $LL.pages.measurements.unitSelect.units
		]?.shortLabel();

	let timeMode: 'day' | 'range' = 'day';
	let dateRange = [-10, 0];
	function formatter(value: number) {
		const date = addDays(endOfToday(), value);
		return format(date, 'dd. MMM yyy');
	}
</script>

{#if $selectedStations.length > 1}
	<div class="mt-4 flex flex-col rounded-md border border-border">
		<div class="flex flex-col gap-4 border-b border-border p-4">
			<h3 class="font-semibold">{selectedUnitLabel}</h3>
			{#if timeMode === 'day'}
				<DailySationsValuesBarLayerChart />
			{/if}
		</div>
		<div class="border-border p-4">
			<DateRangeSlider />
		</div>
	</div>
{/if}
