<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import { stations } from '$lib/stores/mapData';
	import { unit } from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
	import { CHART_COLORS } from '$lib/utils/chartUtils';
	import { getColorScaleValue } from '$lib/utils/colorScaleUtil';
	import { getHeatStressCategoryByValue, getHeatStressValueByCategory, valueToCategoryMap } from '$lib/utils/heatStressCategoriesUtil';
	import { getHeatStressLabel } from '$lib/utils/textUtil';
	import { scaleLinear, type ScaleLinear, scaleOrdinal, scaleTime } from 'd3-scale';
	import {
		Axis,
		Chart,
		Highlight,
		Legend,
		LinearGradient,
		Rect,
		Spline,
		Svg,
		Tooltip
	} from 'layerchart';
	import { LoaderCircle } from 'lucide-svelte';
	import ErrorAlert from './ErrorAlert.svelte';
	import { tooltipClasses } from './Histogram/HistogramTooltip.svelte';

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

	const stationNames = $derived(
		Object.keys(data[0] || {})
			.filter((k) => k !== 'date')
			.sort((a, b) => a.localeCompare(b, $locale))
	);
	const yDomain = $derived.by(() => {
		if (isOrdinal) {
			return [
				getHeatStressValueByCategory("extreme cold stress"),
				getHeatStressValueByCategory("extreme heat stress")
			]
		}
		if (data.length === 0) return [0, 100];
		const min = Math.min(...data.map((d) => Math.min(...stationNames.map((k) => d[k] as number))));
		const max = Math.max(...data.map((d) => Math.max(...stationNames.map((k) => d[k] as number))));
		return [min, max];
	})
	const xScale = scaleTime()
	const yScale = scaleLinear()
	const cScale = $derived(
		scaleOrdinal()
			.domain(stationNames)
			.range(CHART_COLORS)
	);
	const xTickFormat = $derived((d: Date) =>
		new Intl.DateTimeFormat($locale, { dateStyle: 'short' }).format(d)
	);
	const yTickFormat = $derived((d: number) =>
		isOrdinal
			? `${getHeatStressLabel({
					unit: $unit,
					LL: $LL,
					value: getHeatStressCategoryByValue(d)
				})}`
			: d.toLocaleString($locale, {
					maximumFractionDigits: 1
				})
	);
	const tooltipTemplate = $derived(
		(d: DataRecord) => {
			const heatStressColorByValue = (val: number) => {
				return getColorScaleValue({
					unit: $unit,
					LL: $LL,
					value: val
				});
			}
			const heatStressColorByCategory = (catNum: number) => {
				return getColorScaleValue({
					value: getHeatStressCategoryByValue(catNum),
					LL: $LL,
					unit: $unit
				})
			}

			const heatStressColorPill = (val: number) => `
				<span
					class="size-2.5 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] inline-block"
					style="background-color: ${isOrdinal ? heatStressColorByCategory(val) : heatStressColorByValue(val)};"
				></span>
			`
			return `
			<span class="flex flex-col text-xs">
				<strong class="pb-1 mb-1 border-b border-border text-sm">
					${new Intl.DateTimeFormat($locale, { dateStyle: 'long', timeStyle: 'short', hour12: false }).format(d.date)}
				</strong>
				<span class="grid grid-cols-[1fr_auto] gap-x-4 gap-y-0.5 items-center">
					${stationNames
						.filter((name) => typeof d[name as keyof typeof d] === 'number')
						.map((name, idx) => {
							const value = d[name as keyof typeof d] as number;
							const heatStressStringVal = getHeatStressCategoryByValue(value)
							const heatStressPill = heatStressColorPill(value)
							return `
								<span class="flex items-center leading-tight">
									${CHART_COLORS[idx] && `<span style="background-color: ${CHART_COLORS[idx]}" class="inline-block w-3 h-0.5 mr-2"></span>`}
									${name}
								</span>
								${`<span class="whitespace-nowrap inline-flex items-center gap-1">
											${(
												!isOrdinal
													? `${heatStressPill} ${value.toLocaleString($locale, { maximumFractionDigits: 1 })}`
													: `${heatStressPill} ${getHeatStressLabel({ unit: $unit, LL: $LL, value: heatStressStringVal })}`
											) || `<span class="text-muted-foreground">${$LL.pages.measurements.noValueMeasured()}</span>`}
											${$LL.pages.measurements.unitSelect.units[
												$unit as keyof typeof $LL.pages.measurements.unitSelect.units
											].unitOnly()}
										</span>`}
							`;
						})
						.join('')}
				</span>
			</span>
		`;
	});
	const catAsideWidth = 8;
	const padding = $derived({
		top: 8,
		left: isOrdinal ? 150 : 40, bottom: 48 + Math.ceil(stationNames.length / 3) * 14,
		right: 8 + catAsideWidth,
	})
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
			{padding}
			tooltip={{ mode: 'bisect-x' }}
			let:yScale
			let:width
			let:height
		>
			{@const scaleY = yScale as ScaleLinear<number, number>}
			<Svg>
				<Axis
					placement="left"
					rule
					grid
					classes={{ tickLabel: "text-xs" }} 
					tickLabelProps={{ dx: -8 }}
					format={yTickFormat}
					ticks={isOrdinal ? valueToCategoryMap.size : undefined}
				/>
				<Axis
					placement="bottom"
					format={xTickFormat}
					rule
					classes={{ tickLabel: "text-xs" }} 
					tickLabelProps={{ dy: 8 }}
					ticks={4}
				/>
				{#if isOrdinal}
					{#each valueToCategoryMap.entries() as [val, key]}
						{@const seriesHeight = Math.ceil(height / valueToCategoryMap.size) + 3}
						{@const color = getColorScaleValue({ unit: $unit, LL: $LL, value: key })}
						<Rect
							x={width + catAsideWidth}
							y={scaleY(val) - seriesHeight / 2}
							width={catAsideWidth}
							height={Math.abs(seriesHeight)}
							class="no-stroke"
							fill={color}
						/>
					{/each}
				{:else}
					<LinearGradient
						stops={scaleY.ticks(10).toReversed().map((d) => getColorScaleValue({
							unit: $unit,
							LL: $LL,
							value: d
						}))}
						vertical
						units="userSpaceOnUse"
						let:gradient
					>
						<Rect
							x={width + catAsideWidth}
							y={0}
							width={catAsideWidth}
							height={height}
							class="no-stroke"
							fill={gradient}
						/>
					</LinearGradient>
				{/if}
				{#each stationNames as name, idx}
					<Spline
						{data}
						class="stroke-2"
						stroke={CHART_COLORS[idx]}
						y={(d) => d[name]}
						x="date"
					/>
				{/each}
				{#each stationNames as name, idx}
					<Highlight y={(d) => d[name]} points={{ fill: CHART_COLORS[idx] }} />
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
			<Tooltip.Root let:data classes={tooltipClasses} x="data" xOffset={8} contained="container">
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
