<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { selectedUnit } from '$lib/stores/unitStore';

	$: selectedUnitLabel =
		$LL.pages.measurements.unitSelect.units[
			$selectedUnit as keyof typeof $LL.pages.measurements.unitSelect.units
		]?.shortLabel();

	let timeMode: 'day' | 'range' = 'day';
	let dateFrom = new Date();
	let dateTo = new Date();
</script>

<div class="mt-4 flex flex-col rounded-md border border-border">
	<div class="border-b border-border p-4">
		<h3 class="font-semibold">{selectedUnitLabel}</h3>
	</div>
	<div class="border-border p-4"></div>
</div>
