<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import { stations } from '$lib/stores/mapData';
	import { selectedStations } from '$lib/stores/stationsStore';
	import { selectedUnit } from '$lib/stores/unitStore';
	import { scaleBand } from 'd3-scale';
	import { Axis, Bars, Chart, Highlight, Svg, Tooltip } from 'layerchart';

	$: data = $selectedStations.map((id) => ({
		id,
		label: stations.features.find((s) => s.properties.id === id)?.properties.Label || id,
		value: Math.random() * 10000
	}));
	$: unitShortLabel =
		$LL.pages.measurements.unitSelect.units[
			$selectedUnit as keyof typeof $LL.pages.measurements.unitSelect.units
		].shortLabel();

	$: xTickFormat = (value: number) => value.toLocaleString($locale);
	$: yTickFormat = (label: string) => (label.length > 12 ? label.substring(0, 12) + '...' : label);
</script>

<div style={`height: ${100 + data.length * 24}px;`}>
	<Chart
		{data}
		x="value"
		xNice
		y="label"
		yScale={scaleBand().padding(0.4)}
		padding={{ left: 110, bottom: 24, right: 16 }}
		tooltip={{ mode: 'band' }}
	>
		<Svg>
			<Axis placement="bottom" grid rule format={xTickFormat} ticks={5} />
			<Axis
				placement="left"
				rule
				format={yTickFormat}
				tickLabelProps={{ class: 'text-sm font-sans' }}
			/>
			<Bars radius={4} strokeWidth={1} class="fill-primary" rounded="right" />
			<Highlight area />
		</Svg>
		<Tooltip.Root let:data>
			<Tooltip.Header>{data.label}</Tooltip.Header>
			<Tooltip.List>
				<Tooltip.Item label={unitShortLabel} value={xTickFormat(data.value)} />
			</Tooltip.List>
		</Tooltip.Root>
	</Chart>
</div>
