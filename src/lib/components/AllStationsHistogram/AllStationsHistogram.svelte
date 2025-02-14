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
	import { useStationsDailyConfig } from '$lib/utils/useStationsDaily';
	import { useStationsSnapshotConfig } from '$lib/utils/useStationsSnapshot';
	import { createQuery } from '@tanstack/svelte-query';
	import { VisAxis, VisStackedBar, VisTooltip, VisXYContainer } from '@unovis/svelte';
	import { StackedBar } from '@unovis/ts';
	import { LoaderCircle } from 'lucide-svelte';
	import ErrorAlert from '../ErrorAlert.svelte';
	import UnovisChartContainer from '../UnovisChartContainer.svelte';
	import {
		createCategoryBins,
		getChartValueRounder,
		type DataRecord
	} from './allStationsHistogramUtil';

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
	const stationsDailyQueryConfig = useStationsDailyConfig(initialStationIds);
	const dailyStationsQuery = createQuery(reactiveQueryArgs(() => $stationsDailyQueryConfig));
	const dailyStationsData = $derived($dailyStationsQuery.data || []);
	const snapshotApiResponseData = $derived($snapshotQuery.data || []);

	const getValue = $derived(
		<T,>(item: Record<string, unknown>) => item[$unitWithMinMaxAvg as keyof typeof item] as T
	);
	const allSnapshotValues = $derived(
		snapshotApiResponseData
			.map(getValue)
			.filter(
				(val) => typeof val !== 'undefined' && val !== null && !isNaN(val as unknown as number)
			)
			.map((val) => {
				if ($isCategoryUnit) return val as string;
				return val as number;
			})
	);

	const numbericBinConfig = $derived.by(() => {
		if (allSnapshotValues.length === 0) {
			return {
				min: 0,
				binCount: 0,
				binIncrement: 1,
				round: <T>(x: T) => x
			}
		}
		const allVals = allSnapshotValues as number[];
		const round = getChartValueRounder(allVals);
		let roundedValues = Array.from(new Set(allVals.map(round))).sort();

		// Make sure there is a range when it's only one value
		if (roundedValues.length === 1) {
			roundedValues = [
				roundedValues[0] - 1,
				roundedValues[0],
				roundedValues[0] + 1
			];
		}

		if (roundedValues.length === 2) {
			roundedValues = [
				...roundedValues,
				roundedValues[1] + Math.abs(roundedValues[1] - roundedValues[0])
			]
		}
		
		const min = round(Math.min(...roundedValues));
		const max = round(Math.max(...roundedValues));
		const range = max - min;
		const binCount = Math.min(20, Math.max(3, roundedValues.length));
		let binIncrement = range / binCount;
		return { min, binCount, binIncrement, round };
	});

	const ordinalData = $derived.by(() => {
		if (!$isCategoryUnit) return [];
		return createCategoryBins({
			allUniqueOrdinalValues: allCategoryValues,
			ordinalValuesSelected: dailyStationsData || [],
			allOrdinalValues: snapshotApiResponseData.map(getValue<string>),
			translations: $LL
		});
	});

	const numbericalData = $derived.by(() => {
		if ($isCategoryUnit) return [];
		const { binCount, binIncrement, min, round } = numbericBinConfig;
		return Array.from({ length: binCount }).map((_, idx) => {
			const start = round(min + idx * binIncrement);
			const end = round(min + idx * binIncrement + binIncrement);
			const isInBin = (val: unknown) => {
				if (typeof val !== 'number') return false;
				return val >= start && val < end;
			};
			return {
				type: 'numerical' as const,
				id: `numberic-bin-${idx}`,
				start,
				end,
				label: start.toLocaleString($locale),
				ids: dailyStationsData.filter((item) => isInBin(item.value)).map((d) => d.id),
				count: allSnapshotValues.filter(isInBin).length
			};
		});
	});
	const data = $derived($isCategoryUnit ? ordinalData : numbericalData);

	const y = (d: DataRecord) => d.count;
	const x = (d: DataRecord, idx: number) => (d.type === 'numerical' ? d.start : idx);
	const roundToMax3DigitFraction = (value: number) => Math.round(value * 1000) / 1000;
	const xTickFormat = $derived((value: number) =>
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
		if (d.type === 'ordinal') {
			baseTooltipText = $LL.pages.measurements.histogram.tooltip.category({
				count: d.count.toLocaleString($locale),
				category: d.label
			});
		} else {
			baseTooltipText = $LL.pages.measurements.histogram.tooltip.numberic({
				count: roundToMax3DigitFraction(d.count).toLocaleString($locale),
				start: roundToMax3DigitFraction(d.start).toLocaleString($locale),
				end: roundToMax3DigitFraction(d.end).toLocaleString($locale),
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

	const chartHeight = 150;
	const chartPadding = { left: 8, right: 8, top: 16, bottom: 0 };

	$effect(() => console.log(data));
	const hasSomeData = $derived(data.some((d) => typeof d.count !== undefined && d.count > 0));

	const barsAttributes = $derived({
		[StackedBar.selectors.bar]: {
			['data-hasbin']: (d: DataRecord) => {
				return d.ids.length > 0 ? 'true' : 'false';
			}
		}
	});
	const triggers = $derived({
		[StackedBar.selectors.bar]: (d: DataRecord) => `
			<span class="text-xs max-w-56 block">
				${getTootipText(d)}
			</span>
		`
	});
</script>

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
<UnovisChartContainer className={cn('relative')} style={`height: ${chartHeight}px`}>
	{#key data}
		<VisXYContainer padding={chartPadding} height={chartHeight}>
			{#if $snapshotQuery.isSuccess && hasSomeData}
				<VisStackedBar
					{data}
					{x}
					{y}
					orientation="vertical"
					dataStep={$isCategoryUnit ? 1 : numbericBinConfig.binIncrement}
					attributes={barsAttributes}
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
					/>
				{/key}
				<VisTooltip {triggers} />
			{:else if $snapshotQuery.isSuccess && !hasSomeData}
				<div class="absolute inset-0 flex items-center justify-center">
					{$LL.pages.measurements.noDataAvailable()}
				</div>
			{:else if $snapshotQuery.error}
				<div class="absolute inset-0 flex items-center justify-center">
					<ErrorAlert errorObject={$snapshotQuery.error} />
				</div>
			{/if}
		</VisXYContainer>
	{/key}

	<div
		class={cn(
			'absolute inset-0 flex items-center justify-center',
			'pointer-events-none opacity-100',
			!$snapshotQuery.isFetching && !$dailyStationsQuery.isFetching && 'opacity-0'
		)}
	>
		<LoaderCircle class="size-6 animate-spin" />
	</div>
</UnovisChartContainer>

<style>
	:global([data-hasbin='false']) {
		opacity: 0.5;
	}
</style>
