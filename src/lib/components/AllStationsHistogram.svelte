<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import { useStations } from '$lib/stores/stationsStore';
	import {
		dayEndDate,
		dayKey,
		dayStartDate,
		hourKey,
		scale,
		unitLabel,
		unitOnly,
		unitWithMinMaxAvg
	} from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
	import { api } from '$lib/utils/api';
	import { reactiveQueryArgs } from '$lib/utils/queryUtils.svelte';
	import type { WeatherMeasurementKey } from '$lib/utils/schemas';
	import { createQuery } from '@tanstack/svelte-query';
	import { VisAxis, VisStackedBar, VisTooltip, VisXYContainer } from '@unovis/svelte';
	import { StackedBar } from '@unovis/ts';
	import { LoaderCircle } from 'lucide-svelte';
	import ErrorAlert from './ErrorAlert.svelte';
	import UnovisChartContainer from './UnovisChartContainer.svelte';

	type DataRecord = {
		id: string;
		value: number;
		label: string;
		count: number;
	};

	let ids = useStations();

	function calculateBinningPrecision(values: number[], range: number) {
		if (values.length === 0) return 20;
		// Always ensure at least 20 bins
		const binSize = range / 20;

		if (range === 0) return 2;
		
		// Calculate precision based on bin size
		let precision = Math.max(0, -Math.floor(Math.log10(binSize)));
		
		// Ensure we don't lose precision that would make bins too large
		while (Math.pow(10, -precision) > binSize) {
			precision++;
		}

		return Math.min(precision, 4); // Cap at 4 decimal places for readability
	}

	function roundToAdaptivePrecision(value: number, precision: number) {
		const factor = Math.pow(10, precision);
		return Math.round(value * factor) / factor;
	}

	let query = createQuery(
		reactiveQueryArgs(() => ({
			queryKey: ['histogram', $ids.join('-'), $dayKey, $unitWithMinMaxAvg, $scale, $hourKey],
			queryFn: async () => {
				if (!$dayEndDate || !$unitWithMinMaxAvg || !$scale) return [];
				const itemResults = await api().getStationsSnapshot({
					date: $dayEndDate,
					param: $unitWithMinMaxAvg as unknown as WeatherMeasurementKey,
					scale: $scale
				});
				if (!itemResults || itemResults.length === 0) return [] as DataRecord[];

				const numericValues = itemResults.map((item) => {
					const value = item[$unitWithMinMaxAvg as keyof typeof item] as unknown as number;
					if (typeof value === 'number' && !isNaN(value)) return value;
				}).filter((i) => typeof i === 'number' && !isNaN(i)) as number[];
				const min = Math.min(...numericValues);
				const max = Math.max(...numericValues);
				const range = max - min;
				const precision = calculateBinningPrecision(numericValues, range);
				const roundedMin = roundToAdaptivePrecision(min, precision);
				// Create exactly 20 bins
				const binCount = 20;
				const binIncrement = range / binCount;

				const dataRecords = []
				for (let i = 0; i <= binCount; i++) {
					const value = roundToAdaptivePrecision(roundedMin + i * binIncrement, precision);
					const ids = itemResults.filter((item) => {
						const itemValue = item[$unitWithMinMaxAvg as keyof typeof item] as unknown as number;
						const roundedValue = roundToAdaptivePrecision(itemValue, precision);
						return roundedValue === value;
					})
					dataRecords.push({
						id: `histogram-bin-${i}`,
						value,
						label: value.toLocaleString($locale),
						count: ids.length,
					} satisfies DataRecord);
				}

				return dataRecords.sort((a, b) => a.value - b.value);
			},
			enabled: Boolean($ids.length > 0 && $dayStartDate && $dayEndDate && $unitWithMinMaxAvg)
		})));

	let data = $derived(($query.data || []));

	const y = (d: DataRecord) => d.count;
	const x = (d: DataRecord) => d.value;
	const xTickFormat = (value: DataRecord['value']) =>
		`${value.toLocaleString($locale)}${$unitOnly}`;

	const triggers = $derived({
		[StackedBar.selectors.bar]: (d: DataRecord) => `
			<span class="flex flex-col text-xs max-w-48">
				Count: ${d.count.toLocaleString($locale)}
				Value: ${d.value.toLocaleString($locale)}
			</span>
		`
	});
</script>

<h3 class="flex flex-col gap-x-8 gap-y-0.5 font-semibold">
	{$LL.pages.measurements.histogram.title()}
	<span class="text-sm text-muted-foreground font-normal">
		{$unitLabel}
		{$unitOnly ? `(${$unitOnly})` : ''}
	</span>
</h3>
{#key data}
	<UnovisChartContainer className={cn('relative')}>
		<VisXYContainer
			padding={{
				left: 8,
				right: 8,
				top: 16,
				bottom: 0
			}}
			height={150}
		>
			{#if $query.isSuccess && data.length > 0}
				<VisStackedBar
					{data}
					{x}
					{y}
					numTicks={Math.max(2, data.length)}
					tickValues={data.length === 1 ? [0, 5] : undefined}
					orientation="vertical"
					barPadding={0.2}
				/>
				<VisAxis
					type="x"
					gridLine={false}
					tickFormat={xTickFormat}
					minMaxTicksOnly={true} 
				/>
			{:else if $query.isSuccess && data.length === 0}
				<div class="absolute inset-0 flex items-center justify-center">
					{$LL.pages.measurements.noDataAvailable()}
				</div>
			{/if}

			{#if $query.error}
				<div class="absolute inset-0 flex items-center justify-center">
					<ErrorAlert errorObject={$query.error} />
				</div>
			{/if}
			<VisTooltip {triggers} />
		</VisXYContainer>
		<div
			class={cn(
				'absolute inset-0 flex items-center justify-center',
				'pointer-events-none opacity-100',
				!$query.isFetching && 'opacity-0'
			)}
		>
			<LoaderCircle class="size-6 animate-spin" />
		</div>
	</UnovisChartContainer>
{/key}
