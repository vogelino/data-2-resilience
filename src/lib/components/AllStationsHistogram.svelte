<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { StationsGeoJSONType } from '$lib/stores/mapData';
	import { useStations } from '$lib/stores/stationsStore';
	import {
		formattedTimeConfiguration,
		isCategoryUnit,
		unitLabel,
		unitOnly,
		unitWithMinMaxAvg
	} from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
	import { reactiveQueryArgs } from '$lib/utils/queryUtils.svelte';
	import { useStationsDailyConfig, type DailyStationRecord } from '$lib/utils/useStationsDaily';
	import { useStationsSnapshotConfig } from '$lib/utils/useStationsSnapshot';
	import { createQuery } from '@tanstack/svelte-query';
	import { VisAxis, VisStackedBar, VisTooltip, VisXYContainer } from '@unovis/svelte';
	import { StackedBar } from '@unovis/ts';
	import { LoaderCircle } from 'lucide-svelte';
	import ErrorAlert from './ErrorAlert.svelte';
	import UnovisChartContainer from './UnovisChartContainer.svelte';

	type Props = {
		stations: StationsGeoJSONType;
		initialStationIds?: string[];
	};

	let { initialStationIds = [], stations }: Props = $props();

	type DataRecord = {
		id: string;
		valueStart: number;
		valueEnd: number;
		valueRounded: number;
		label: string;
		count: number;
		ids: string[];
	};

	function calculateBinningPrecision(values: number[], range: number) {
		if (values.length === 0) return 20;
		const binSize = range / 20;

		if (range === 0) return 2;

		let precision = Math.max(0, -Math.floor(Math.log10(binSize)));

		while (Math.pow(10, -precision) > binSize) {
			precision++;
		}

		return Math.min(precision, 4);
	}

	function roundToAdaptivePrecision(value: number, precision: number) {
		const factor = Math.pow(10, precision);
		return Math.ceil(value * factor) / factor;
	}

	const allCategoryValues = $derived(Object.keys($LL.map.choroplethLegend.healthRisks));
	const allCategoryLabels = $derived(
		Object.values($LL.map.choroplethLegend.healthRisks).map(({ title }) => title.heatStress())
	);

	function createCategoryBins(itemResults: any[], dailyStationsData: DailyStationRecord[]) {
		const categoryMap = new Map<string, number>();

		// Initialize all possible categories with 0 count
		allCategoryValues.forEach((category) => {
			categoryMap.set(category, 0);
		});

		// Count occurrences in the data
		itemResults.forEach((item) => {
			const category = item[$unitWithMinMaxAvg as keyof typeof item] as string;
			if (category && categoryMap.has(category)) {
				categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
			}
		});

		return Array.from(categoryMap.entries()).map(([category, count], idx) => {
			const label =
				$LL.map.choroplethLegend.healthRisks[
					category as keyof typeof $LL.map.choroplethLegend.healthRisks
				].title.heatStress();
			return {
				id: `category-bin-${category}`,
				valueStart: idx,
				valueEnd: idx,
				valueRounded: idx,
				label,
				count,
				ids: dailyStationsData
					.filter((d) => (d.value as unknown as string) === category)
					.map((d) => d.id)
			} satisfies DataRecord;
		});
	}

	const ids = useStations(initialStationIds);
	const stationsSnapshotQueryConfig = useStationsSnapshotConfig(initialStationIds);
	const snapshotQuery = createQuery(reactiveQueryArgs(() => $stationsSnapshotQueryConfig));
	const stationsDailyQueryConfig = useStationsDailyConfig(initialStationIds);
	const dailyStationsQuery = createQuery(reactiveQueryArgs(() => $stationsDailyQueryConfig));
	const dailyStationsData = $derived($dailyStationsQuery.data || []);
	const snapshotApiResponseData = $derived($snapshotQuery.data || []);
	const data = $derived.by(() => {
		if ($isCategoryUnit) {
			return createCategoryBins(snapshotApiResponseData, dailyStationsData);
		}

		const numericValues = snapshotApiResponseData
			.map((item) => {
				const value = item[$unitWithMinMaxAvg as keyof typeof item] as unknown as number;
				if (typeof value === 'number' && !isNaN(value)) return value;
			})
			.filter((i) => typeof i === 'number' && !isNaN(i)) as number[];
		const min = Math.min(...numericValues);
		const max = Math.max(...numericValues);
		const range = max - min;
		const precision = calculateBinningPrecision(numericValues, range);
		const roundedMin = roundToAdaptivePrecision(min, precision);
		const binCount = 20;
		const binIncrement = range / binCount;

		const dataRecords = [];
		for (let i = 0; i <= binCount; i++) {
			const value = roundedMin + i * binIncrement;
			const valueRounded = roundToAdaptivePrecision(value, precision);
			const ids = snapshotApiResponseData.filter((item) => {
				const itemValue = item[$unitWithMinMaxAvg as keyof typeof item] as unknown as number;
				return itemValue >= value && itemValue < value + binIncrement;
			});
			dataRecords.push({
				id: `histogram-bin-${i}`,
				valueStart: value,
				valueEnd: value + binIncrement,
				valueRounded,
				label: value.toLocaleString($locale),
				count: ids.length,
				ids: dailyStationsData
					.filter((d) => d.value && d.value >= value && d.value < value + binIncrement)
					.map((d) => d.id)
			} satisfies DataRecord);
		}

		return dataRecords.sort((a, b) => a.valueStart - b.valueEnd);
	});

	const y = (d: DataRecord) => d.count;
	const x = (d: DataRecord) => d.valueStart;
	const roundToMax3DigitFraction = (value: number) => Math.round(value * 1000) / 1000;
	const xTickFormat = $derived((value: ReturnType<typeof x>) =>
		$isCategoryUnit
			? allCategoryLabels[value]
			: `${roundToMax3DigitFraction(value).toLocaleString($locale)} ${$unitOnly}`
	);
	const xTickValues = $derived(data.map(x));

	const getTootipText = $derived((d: DataRecord) => {
		const stationIds = $ids.filter((id) => d.ids.includes(id));
		const stationNames = stationIds.map(
			(id) => stations.features.find((f) => f.properties.id === id)?.properties.longName || id
		);
		let baseTooltipText = '';
		if ($isCategoryUnit) {
			baseTooltipText = $LL.pages.measurements.histogram.tooltip.category({
				count: d.count.toLocaleString($locale),
				category: allCategoryLabels[d.valueStart]
			});
		} else {
			baseTooltipText = $LL.pages.measurements.histogram.tooltip.numberic({
				count: roundToMax3DigitFraction(d.count).toLocaleString($locale),
				start: roundToMax3DigitFraction(d.valueStart).toLocaleString($locale),
				end: roundToMax3DigitFraction(d.valueEnd).toLocaleString($locale),
				unit: $unitOnly
			});
		}
		const stationsTooltipText = $LL.pages.measurements.histogram.tooltip.stations(
			stationIds.length
		);
		return [
			baseTooltipText,
			stationNames.length > 0 &&
				`
					<strong class='block border-t border-border mt-1 py-1'>${stationsTooltipText}</strong>
					<ul class='flex flex-wrap gap-x-1 gap-y-0.5 text-sm list-muted-foreground'>
						${stationNames
							.map(
								(sN) => `
									<li class='px-1.5 py-0.5 rounded-full border border-border text-xs max-w-48 inline-block text-ellipsis overflow-clip'>
										${sN}
									</li>
								`
							)
							.join('\n')}
					</ul>
				`
		]
			.filter(Boolean)
			.join('\n');
	});
	const triggers = $derived({
		[StackedBar.selectors.bar]: (d: DataRecord) => `
			<span class="text-xs max-w-56 block">
				${getTootipText(d)}
			</span>
		`
	});

	const highestCount = $derived(data.reduce((acc, item) => Math.max(acc, item.count ?? 0), 0));
	const chartHeight = 150;
	const chartPadding = {
		left: 8,
		right: 8,
		top: 16,
		bottom: 0
	};
</script>

<h3 class="grid grid-cols-[auto,1fr] items-center gap-x-8">
	<span class="flex flex-col gap-x-8 gap-y-0.5">
		<strong class="font-semibold">{$LL.pages.measurements.histogram.title()}</strong>
		<span class="text-sm text-muted-foreground">
			{$formattedTimeConfiguration}
		</span>
	</span>
	<span class="text-sm font-normal text-muted-foreground text-right">
		{$unitLabel}
		{$unitOnly ? `(${$unitOnly})` : ''}
	</span>
</h3>
{#key data}
	<UnovisChartContainer className={cn('relative')} style={`height: ${chartHeight}px`}>
		<VisXYContainer padding={chartPadding} height={chartHeight}>
			{#if $snapshotQuery.isSuccess && data.length > 0}
				<VisStackedBar {data} {x} {y} orientation="vertical" barPadding={0.2} />
				{#key $locale}
					<VisAxis
						type="x"
						gridLine={false}
						tickFormat={xTickFormat}
						tickValues={xTickValues}
						tickTextHideOverlapping={true}
						tickTextAlign="center"
						tickTextWidth={70}
					/>
				{/key}
			{:else if $snapshotQuery.isSuccess && data.length === 0}
				<div class="absolute inset-0 flex items-center justify-center">
					{$LL.pages.measurements.noDataAvailable()}
				</div>
			{/if}

			{#if $snapshotQuery.error}
				<div class="absolute inset-0 flex items-center justify-center">
					<ErrorAlert errorObject={$snapshotQuery.error} />
				</div>
			{/if}
			<VisTooltip {triggers} />
		</VisXYContainer>
		<div class={cn('pointer-events-none absolute inset-0')}>
			<VisXYContainer padding={chartPadding} height={chartHeight}>
				{#if $snapshotQuery.isSuccess && data.length > 0}
					<VisStackedBar
						{data}
						{x}
						y={() => highestCount}
						orientation="vertical"
						barWidth={1}
						color={(d: DataRecord) =>
							$ids.some((id) => d.ids.includes(id)) ? 'hsl(var(--foreground))' : 'transparent'}
						roundedCorners={true}
					/>
					{#key $locale}
						<VisAxis
							type="x"
							gridLine={false}
							tickFormat={xTickFormat}
							tickValues={xTickValues}
							tickTextHideOverlapping={true}
							tickTextAlign="center"
							tickTextWidth={70}
							tickTextColor="transparent"
						/>
					{/key}
				{/if}
			</VisXYContainer>
		</div>
		<div
			class={cn(
				'absolute inset-0 flex items-center justify-center',
				'pointer-events-none opacity-100',
				!$snapshotQuery.isFetching && 'opacity-0'
			)}
		>
			<LoaderCircle class="size-6 animate-spin" />
		</div>
	</UnovisChartContainer>
{/key}
