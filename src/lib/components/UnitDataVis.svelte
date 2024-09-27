<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { selectedStations } from '$lib/stores/stationsStore';
	import { selectedUnit } from '$lib/stores/unitStore';
	import DailySationsValuesBarChart from './DailySationsValuesBarChart.svelte';

	$: selectedUnitLabel =
		$LL.pages.measurements.unitSelect.units[
			$selectedUnit as keyof typeof $LL.pages.measurements.unitSelect.units
		]?.shortLabel();

	let timeMode: 'day' | 'range' = 'day';
	let dateFrom = new Date();
	let dateTo = new Date();
</script>

{#if $selectedStations.length > 1}
	<div class="mt-4 flex flex-col rounded-md border border-border">
		<div class="flex flex-col gap-4 border-b border-border p-4">
			<h3 class="font-semibold">{selectedUnitLabel}</h3>
			{#if timeMode === 'day'}
				<DailySationsValuesBarChart />
			{/if}
		</div>
		<div class="border-border p-4"></div>
	</div>
{/if}
