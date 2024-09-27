<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import { stations } from '$lib/stores/mapData';
	import { selectedStations } from '$lib/stores/stationsStore';
	import { selectedUnit } from '$lib/stores/unitStore';
	import { VisAxis, VisStackedBar, VisTooltip, VisXYContainer } from '@unovis/svelte';
	import { StackedBar } from '@unovis/ts';
	import UnovisChartContainer from './UnovisChartContainer.svelte';

	$: data = $selectedStations.map((id) => ({
		id,
		label: stations.features.find((s) => s.properties.id === id)?.properties.Label || id,
		value: Math.random() * 10000
	}));
	$: unitShortLabel =
		$LL.pages.measurements.unitSelect.units[
			$selectedUnit as keyof typeof $LL.pages.measurements.unitSelect.units
		].shortLabel();

	type DataRecord = (typeof data)[number];

	const y = (d: DataRecord) => d.value;
	const x = (d: DataRecord, idx: number) => idx;
	const yTickFormat = (idx: number) => data[idx]?.label ?? '';
	$: xTickFormat = (value: number) => value.toLocaleString($locale);
	$: tickValues = data.map(x);
	$: triggers = {
		[StackedBar.selectors.bar]: (d: DataRecord) => `
			<span class="flex flex-col text-xs">
				<strong>${d.label}</strong>
				<span>${unitShortLabel}: ${d.value.toLocaleString($locale)}</span>
			</span>
		`
	};
</script>

<UnovisChartContainer>
	<VisXYContainer padding={{ top: 8, bottom: 8, right: 16 }} height={100 + data.length * 24}>
		<VisStackedBar
			{data}
			{x}
			{y}
			orientation="horizontal"
			numTicks={data.length}
			barPadding={0.2}
		/>
		<VisAxis type="x" tickFormat={xTickFormat} numTicks={5} />
		<VisAxis
			type="y"
			tickFormat={yTickFormat}
			{tickValues}
			gridLine={false}
			numTicks={data.length}
			tickTextFitMode="trim"
			tickTextTrimType="end"
		/>
		<VisTooltip {triggers} />
	</VisXYContainer>
</UnovisChartContainer>
