<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import { isCategoryUnit, unitLabel, unitOnly, unitWithMinMaxAvg } from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
	import { reactiveQueryArgs } from '$lib/utils/queryUtils.svelte';
	import { useStationsDailyConfig } from '$lib/utils/useStationsDaily';
	import { useStationsSnapshotConfig } from '$lib/utils/useStationsSnapshot';
	import { createQuery } from '@tanstack/svelte-query';
	import {
		VisAnnotations,
		VisAxis,
		VisStackedBar,
		VisTooltip,
		VisXYContainer
	} from '@unovis/svelte';
	import { StackedBar, type AnnotationItem } from '@unovis/ts';
	import { LoaderCircle } from 'lucide-svelte';
	import ErrorAlert from './ErrorAlert.svelte';
	import UnovisChartContainer from './UnovisChartContainer.svelte';

	type Props = {
		initialStationIds?: string[];
	};
	
	let { initialStationIds = [] }: Props = $props();

	type DataRecord = {
		id: string;
		valueStart: number;
		valueEnd: number;
		valueRounded: number;
		label: string;
		count: number;
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

	function createCategoryBins(itemResults: any[]) {
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

		return Array.from(categoryMap.entries()).map(
			([category, count], idx) =>
				({
					id: `category-bin-${category}`,
					valueStart: idx,
					valueEnd: idx,
					valueRounded: idx,
					label:
						$LL.map.choroplethLegend.healthRisks[
							category as keyof typeof $LL.map.choroplethLegend.healthRisks
						].title.heatStress(),
					count
				}) satisfies DataRecord
		);
	}

	const stationsSnapshotQueryConfig = useStationsSnapshotConfig(initialStationIds);
	const snapshotQuery = createQuery(reactiveQueryArgs(() => $stationsSnapshotQueryConfig));
	const stationsDailyQueryConfig = useStationsDailyConfig(initialStationIds);
	const dailyStationsQuery = createQuery(reactiveQueryArgs(() => $stationsDailyQueryConfig));
	const dailyStationsData = $derived($dailyStationsQuery.data || []);
	const snapshotApiResponseData = $derived($snapshotQuery.data || []);
	const data = $derived.by(() => {
		if ($isCategoryUnit) {
			return createCategoryBins(snapshotApiResponseData);
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
				const roundedValue = roundToAdaptivePrecision(itemValue, precision);
				return roundedValue === valueRounded;
			});
			dataRecords.push({
				id: `histogram-bin-${i}`,
				valueStart: value,
				valueEnd: value + binIncrement,
				valueRounded,
				label: value.toLocaleString($locale),
				count: ids.length
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
		if ($isCategoryUnit) {
			return $LL.pages.measurements.histogram.tooltip.category({
				count: d.count.toLocaleString($locale),
				category: allCategoryLabels[d.valueStart]
			});
		}
		return $LL.pages.measurements.histogram.tooltip.numberic({
			count: roundToMax3DigitFraction(d.count).toLocaleString($locale),
			start: roundToMax3DigitFraction(d.valueStart).toLocaleString($locale),
			end: roundToMax3DigitFraction(d.valueEnd).toLocaleString($locale),
			unit: $unitOnly
		});
	});
	const triggers = $derived({
		[StackedBar.selectors.bar]: (d: DataRecord) => `
			<span class="text-xs max-w-56 block">
				${getTootipText(d)}
			</span>
		`
	});
	const items: AnnotationItem[] = $derived(
		dailyStationsData.map((d) => ({
			x: `${d.value || 0}%`,
			y: `20%`,
			content: d.label
		}))
	);

	const chartHeight = 150;
</script>

<h3 class="flex flex-col gap-x-8 gap-y-0.5 font-semibold">
	{$LL.pages.measurements.histogram.title()}
	<span class="text-sm font-normal text-muted-foreground">
		{$unitLabel}
		{$unitOnly ? `(${$unitOnly})` : ''}
	</span>
</h3>
{#key data}
	<UnovisChartContainer className={cn('relative')} style={`height: ${chartHeight}px`}>
		<VisXYContainer
			padding={{
				left: 8,
				right: 8,
				top: 16,
				bottom: 0
			}}
			height={chartHeight}
		>
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
			<VisAnnotations {items} />
		</VisXYContainer>
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
