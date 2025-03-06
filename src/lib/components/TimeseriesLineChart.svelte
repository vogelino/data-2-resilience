<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import { stations } from '$lib/stores/mapData';
	import { unit } from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
	import { getHeatStressCategoryByValue, getHeatStressValueByCategory } from '$lib/utils/heatStressCategoriesUtil';
	import { getHeatStressLabel } from '$lib/utils/textUtil';
	import { scaleLinear, scaleOrdinal, scaleTime } from 'd3-scale';
	import {
		Axis,
		Chart,
		Highlight,
		Legend,
		Spline,
		Svg,
		Tooltip
	} from 'layerchart';
	import { LoaderCircle } from 'lucide-svelte';
	import ErrorAlert from './ErrorAlert.svelte';
	import { tooltipClasses } from './Histogram/HistogramTooltip.svelte';

  const CHART_COLORS = [
		'hsl(var(--primary))',
		'#2E7DAF',
		'#E17C05',
		'#6CC24A',
		'#7B2D9B',
		'#D64545',
		'#3B8C8C',
		'#B86B25',
		'#7F4B91',
		'#598234',
		'#3C5BA2',
		'#8BC34A',
		'#CDDC39',
		'#FFEB3B',
		'#FFC107',
		'#FF9800',
		'#FF5722',
		'#795548',
		'#607D8B'
	];

  type DataRecord = Record<string, string | number> & {
    date: Date;
  }

  type Props = {
    data?: DataRecord[];
    error?: Error | null;
    isLoading?: boolean;
		isOrdinal?: boolean;
  }
  const {
    data = [],
    error,
    isLoading,
		isOrdinal,
  }: Props = $props()

	const seriesKeys = $derived(Object.keys(data[0] || {}).filter((k) => k !== 'date'));
	const yDomain = $derived.by(() => {
		if (isOrdinal) return seriesKeys;
		if (data.length === 0) return [0, 100];
		const min = Math.min(...data.map((d) => Math.min(...seriesKeys.map((k) => d[k] as number))));
		const max = Math.max(...data.map((d) => Math.max(...seriesKeys.map((k) => d[k] as number))));
		return [min, max];
	})
	const xScale = scaleTime()
	const yScale = $derived(isOrdinal ? scaleOrdinal() : scaleLinear())
	const cScale = $derived(
		scaleOrdinal()
			.domain(seriesKeys)
			.range(CHART_COLORS)
	);
	const xTickFormat = $derived((d: Date) =>
		new Intl.DateTimeFormat($locale, { dateStyle: 'short' }).format(d)
	);
	const yTickFormat = $derived((d: number) =>
		isOrdinal
			? getHeatStressLabel({
					unit: $unit,
					LL: $LL,
					value: getHeatStressCategoryByValue(d)
				})
			: d.toLocaleString($locale, {
					maximumFractionDigits: 1
				})
	);
	const y = $derived(
		seriesKeys.map(
			(id) => (d: DataRecord) =>
				isOrdinal
					? getHeatStressValueByCategory(`${d[id as keyof typeof d]}` as string)
					: (d[id as keyof typeof d] as number)
		)
	);
	const legendItems = $derived(
		seriesKeys
			.map((id, idx) => ({
				id,
				name: $stations.features.find((f) => f.properties.id === id)?.properties.longName || id,
				color: CHART_COLORS[idx]
			}))
			.sort((a, b) => a.name.localeCompare(b.name))
	);
	const tooltipTemplate = $derived(
		(d: DataRecord) => `
		<span class="flex flex-col text-xs">
			<strong class="pb-1 mb-1 border-b border-border text-sm">
				${new Intl.DateTimeFormat($locale, { dateStyle: 'long', timeStyle: 'short', hour12: false }).format(d.date)}
			</strong>
			<span class="grid grid-cols-[1fr_auto] gap-x-4 gap-y-0.5 items-center">
				${legendItems
					.filter(({ id }) => d[id as keyof typeof d])
					.map(({ id, name, color }) => {
						const value = d[id as keyof typeof d];
						return `
							<span class="flex items-center leading-tight">
								${color && `<span style="background-color: ${color}" class="inline-block w-3 h-0.5 mr-2"></span>`}
								${name}
							</span>
							${`<span>
										${
											typeof value === 'number'
												? value.toLocaleString($locale, {
														maximumFractionDigits: 1
													})
												: getHeatStressLabel({
														unit: $unit,
														LL: $LL,
														value: value as string
													})
										}
										${$LL.pages.measurements.unitSelect.units[
											$unit as keyof typeof $LL.pages.measurements.unitSelect.units
										].unitOnly()}
									</span>`}
						`;
					})
					.join('')}
			</span>
		</span>
	`
	);
</script>

<div class={cn("relative h-[360px] w-full")}>
	{#if data && data.length > 0 && !error}
		<Chart
			{data}
			x="date"
			{yDomain}
			{xScale}
			{yScale}
			yNice={!isOrdinal}
			c="id"
			{cScale}
			padding={{ left: isOrdinal ? 100 : 40, bottom: 48 + Math.ceil(seriesKeys.length / 3) * 14 }}
			tooltip={{ mode: 'bisect-x'  }}
		>
			<Svg>
				<Axis
					placement="left"
					rule
					grid
					classes={{ tickLabel: "text-xs" }} 
					tickLabelProps={{
						dx: -8
					}}
					format={yTickFormat}
				/>
				<Axis
					placement="bottom"
					format={xTickFormat}
					rule
					classes={{ tickLabel: "text-xs" }} 
					tickLabelProps={{ dy: 8 }}
					ticks={4}
				/>
				{#each seriesKeys as _key, idx}
					<Spline
						{data}
						class="stroke-2"
						stroke={CHART_COLORS[idx]}
						{y}
						x="date"
					/>
				{/each}
				{#each seriesKeys as _key, idx}
					<Highlight {y} points={{ fill: CHART_COLORS[idx] }} />
				{/each}
				<Highlight lines points />
			</Svg>

			<Legend
				scale={cScale}
				variant="swatches"
				tickFormat={(d) => $stations.features.find((f) => f.properties.id === d)?.properties.longName || d}
				classes={{
					root: 'absolute inset-x-0 bottom-0',
					swatches: 'items-center justify-center w-full flex flex-wrap gap-x-4',
					swatch: 'w-3 h-0.5',
					item: () => "flex items-center gap-x-2"
				}}
			/>
			<Tooltip.Root let:data classes={tooltipClasses}>
				{@html tooltipTemplate(data)}
			</Tooltip.Root>
		</Chart>
	{:else if !error && !isLoading && data && data.length === 0}
		<div class="absolute inset-0 flex items-center justify-center">
			{$LL.pages.measurements.noDataAvailable()}
		</div>
	{/if}
	{#if error}
		<div class="absolute inset-0 flex items-center justify-center">
			<ErrorAlert errorObject={error} />
		</div>
	{/if}
	<div
		class={cn(
			'absolute inset-0 flex items-center justify-center',
			'pointer-events-none opacity-0',
			isLoading && 'opacity-100'
		)}
	>
		<LoaderCircle class="size-6 animate-spin" />
	</div>
</div>
