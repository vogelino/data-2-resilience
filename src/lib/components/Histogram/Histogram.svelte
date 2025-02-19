<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { StationsGeoJSONType } from '$lib/stores/mapData';
	import { useStations } from '$lib/stores/stationsStore';
	import { formattedTimeConfiguration, isCategoryUnit, unitLabel, unitOnly, unitWithMinMaxAvg } from '$lib/stores/uiStore';
	import { reactiveQueryArgs } from '$lib/utils/queryUtils.svelte';
	import { useStationsSnapshotConfig } from '$lib/utils/useStationsSnapshot';
	import { createQuery } from '@tanstack/svelte-query';
	import ChartQueryHull from 'components/ChartQueryHull.svelte';
	import { bin } from 'd3-array';
	import { BarChart, Highlight, Tooltip } from 'layerchart';
	import HistogramTooltip, { tooltipClasses } from './HistogramTooltip.svelte';

	type Props = {
		stations: StationsGeoJSONType;
		initialStationIds?: string[];
	};

	let { initialStationIds = [], stations }: Props = $props();

	const allCategoryValues = $derived(Object.keys($LL.map.choroplethLegend.healthRisks));
	const allCategoryLabels = $derived(
		Object.values($LL.map.choroplethLegend.healthRisks).map(({ title }) => title.heatStress())
	);

	const ids = useStations(initialStationIds);
	const stationsSnapshotQueryConfig = useStationsSnapshotConfig(initialStationIds);
	const snapshotQuery = createQuery(reactiveQueryArgs(() => $stationsSnapshotQueryConfig));

	const getValue = $derived(
		<T,>(item: Record<string, unknown>) => item[$unitWithMinMaxAvg as keyof typeof item] as T
	);
	const snapshotApiResponseData = $derived(($snapshotQuery.data || []).filter((d) => {
		const value = getValue<number>(d);
		return typeof value !== 'undefined';
	}));

	const ordinalData = $derived(
		allCategoryValues.map((val, idx) => {
			const valuesWithThisCategory = snapshotApiResponseData.filter((v) => {
				const value = getValue(v);
				return value === val;
			});
			return {
				value: valuesWithThisCategory.length,
				label: allCategoryLabels[idx],
				ids: Array.from(new Set(valuesWithThisCategory.map((d) => d.id)))
			};
		})
	);

	const thresholds = $state(10);

	const binByValue = $derived(
		bin<(typeof snapshotApiResponseData)[0], number>().value(getValue).thresholds(thresholds)
	);
	const bins = $derived(binByValue(snapshotApiResponseData));

	const selectedItems = $derived($ids.map((id) => ({
		id,
		label: stations.features.find((f) => f.id === id)?.properties.longName || '',
	})));

	type BarchartProps = Parameters<typeof BarChart>[1];
	const commonChartProps = $derived({
		bandPadding: 0.15,
		props: {
			xAxis: {
				classes: {
					tickLabel: 'fill-muted-foreground text-xs',
					rule: 'stroke-muted'
				},
				format: (v) => {
					if (typeof v === 'number') return `${v?.toLocaleString($locale)} ${$unitOnly}`
					return v
				},
				ticks: $isCategoryUnit ? 4 : Math.ceil(bins.length/4)
			},
			yAxis: {
				classes: {
					tickLabel: 'fill-muted-foreground text-xs',
					rule: 'stroke-muted'
				},
				tickLength: 0,
				format: (v?: number) => (v === 0 ? '' : `${v?.toLocaleString($locale)}`),
				ticks: 2
			},
			grid: {
				classes: {
					line: 'stroke-muted'
				}
			},
			rule: { x: 0 },
			bars: { strokeWidth: 0 },
		}
	} satisfies BarchartProps);

	const binWithSelectedItems = $derived.by(() => {
		if (!$isCategoryUnit) {
			return bins.filter((bin) => bin.find((d) => selectedItems.find((s) => s.id === d.id)))
		}
		return ordinalData.filter((d) => d.ids.length > 0)
	})
</script>

{#snippet highlights()}
	{#each binWithSelectedItems as bin}
		<Highlight
			lines={{ 
				class: "stroke-foreground stroke-2 [stroke-dasharray:3,6] [stroke-linecap:round]",
				marker: "circle"
			}}
			data={bin}
		>
		</Highlight>
	{/each}
{/snippet}

<h3 class="grid grid-cols-[auto,1fr] items-center gap-x-8">
	<span class="flex flex-col gap-x-8 gap-y-0.5">
		<strong class="font-semibold">{$LL.pages.measurements.histogram.title()}</strong>
		<span class="text-sm text-muted-foreground">
			{$formattedTimeConfiguration}
		</span>
	</span>
	<span class="text-right text-sm font-normal text-muted-foreground">
		{$unitLabel}
		{$unitOnly ? `(${$unitOnly})` : ''}
	</span>
</h3>
<div class="h-40 relative">
	<ChartQueryHull
		query={$snapshotQuery}
		data={snapshotApiResponseData}
	>
		{#if $isCategoryUnit}
			<BarChart data={ordinalData} x="label" y="value" {...commonChartProps}>
				<svelte:fragment slot="tooltip">
					<Tooltip.Root let:data classes={tooltipClasses}>
						<HistogramTooltip item={data} {selectedItems} type="ordinal" />
					</Tooltip.Root>
				</svelte:fragment>
				<svelte:fragment slot="highlight">
					{@render highlights()}
				</svelte:fragment>
			</BarChart>
		{:else}
			<BarChart data={bins} x="x0" y="length" {...commonChartProps}>
				<svelte:fragment slot="tooltip">
					<Tooltip.Root let:data classes={tooltipClasses}>
						<HistogramTooltip item={data} {selectedItems} type="quantitative" />
					</Tooltip.Root>
				</svelte:fragment>
				<svelte:fragment slot="highlight">
					{@render highlights()}
				</svelte:fragment>
			</BarChart>
		{/if}
	</ChartQueryHull>
</div>
