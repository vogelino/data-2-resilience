<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import { type StationsGeoJSONType } from '$lib/stores/mapData';
	import { useStations } from '$lib/stores/stationsStore';
	import {
		datavisType,
		formattedTimeConfiguration,
		isCategoryUnit,
		minMaxAvg,
		unit,
		unitLabel,
		unitOnly,
		unitWithMinMaxAvg,
		updateMinMaxAvg
	} from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
	import { reactiveQueryArgs } from '$lib/utils/queryUtils.svelte';
	import { getMessageForUnsupportedStations } from '$lib/utils/stationsDataVisUtil';
	import { getHeatStressLabel } from '$lib/utils/textUtil';
	import { useStationsSnapshotConfig } from '$lib/utils/useStationsSnapshot';
	import { createQuery } from '@tanstack/svelte-query';
	import { BarChart, Highlight, Tooltip } from 'layerchart';
	import ChartQueryHull from './ChartQueryHull.svelte';
	import Combobox from './Combobox.svelte';
	import { tooltipClasses } from './Histogram/HistogramTooltip.svelte';
	import OrdinalDataVis from './OrdinalDataVis.svelte';
	import SingleStationDatavis from './SingleStationDatavis.svelte';
	import { Alert } from './ui/alert';

	interface Props {
		stations: StationsGeoJSONType;
		initialStationIds?: string[];
		isExport?: boolean;
	}

	let { stations, initialStationIds = [], isExport = false }: Props = $props();

	const ids = useStations({ initialStationIds, stations });
	const stationsSnapshotConfig = $derived.by(() => useStationsSnapshotConfig({ initialStationIds, stations }));
	const query = createQuery(reactiveQueryArgs(() => $stationsSnapshotConfig));

	const getValue = $derived(
		<T,>(item: Record<string, unknown>) => item[$unitWithMinMaxAvg as keyof typeof item] as T
	);
	let data = $derived(
			$ids.map((id) => {
				const label = stations.features.find((f) => f.properties.id === id)?.properties.longName || id
				const item = ($query.data || []).find((d) => d.id === id)
				if (!item) {
					return {
						id,
						value: undefined,
						supported: false,
						label
					}
				}
				const value = getValue<number>(item);
				return {
					id,
					value,
					supported: value !== null,
					label,
				}
			})
			.sort((a, b) => a.label.localeCompare(b.label))
	);

	let insufficientDataIds = $derived(
		data.filter((d) => d.supported && d.value === undefined).map((d) => d.id)
	);
	let noneSufficientData = $derived(insufficientDataIds.length === $ids.length);
	let insufficientDataStations = $derived(
		stations.features
			.filter((f) => insufficientDataIds.includes(f.properties.id))
			.sort((a, b) => a.properties.longName.localeCompare(b.properties.longName))
	);
	let unsupportedIds = $derived(data.filter((d) => !d.supported).map((d) => d.id));
	let unsupportedMsg = $derived(
		getMessageForUnsupportedStations({
			ids: $ids,
			unsupportedIds,
			unit: $unit,
			stations: stations.features,
			LL: $LL
		})
	);
	let validIds = $derived(
		data
			.filter((d) => !unsupportedIds.includes(d.id) && !insufficientDataIds.includes(d.id))
			.map((d) => d.id)
	);

	let firstValidValue = $derived(data.find((d) => d.value !== undefined)?.value as number | string | undefined);
	let firstValidValueLabel = $derived(
		typeof firstValidValue === 'string'
			? getHeatStressLabel({ unit: $unit, LL: $LL, value: firstValidValue })
			: firstValidValue?.toLocaleString($locale, { maximumFractionDigits: 1 })
	);

	let chartHeight = $derived(Math.max(96, 60 + $ids.length * 22));
	const unsupportedDataItems = $derived(
		data.filter((d) => unsupportedIds.includes(d.id))
	);
</script>

{#snippet minMaxAvgCombobox()}
	{#if $datavisType === 'day' && !$isCategoryUnit}
		<Combobox
			defaultValue={$minMaxAvg}
			onChange={(value) => updateMinMaxAvg(value as 'min' | 'avg' | 'max')}
			classes={{ trigger: 'w-fit' }}
			options={[
				{
					value: 'min',
					label: $LL.pages.measurements.minMaxAvgSelect.min()
				},
				{
					value: 'avg',
					label: $LL.pages.measurements.minMaxAvgSelect.avg()
				},
				{
					value: 'max',
					label: $LL.pages.measurements.minMaxAvgSelect.max()
				}
			]}
		/>
	{/if}
{/snippet}

{#if !isExport && unsupportedMsg && !$query.isLoading}
	<Alert variant="destructive">
		{@html unsupportedMsg}
	</Alert>
{/if}
{#if !isExport && insufficientDataIds.length > 0}
	<Alert variant="warning">
		{#if $query.isSuccess && noneSufficientData}
			{@html $LL.pages.measurements.allInsufficientDataStations({
				unit: $unitLabel
			})}
		{:else if $query.isSuccess && insufficientDataIds.length === 1}
			{@html $LL.pages.measurements.singleInsufficientDataStation({
				unit: $unitLabel,
				station: insufficientDataStations[0].properties.longName
			})}
		{:else if $query.isSuccess && insufficientDataIds.length > 1}
			{@html $LL.pages.measurements.someInsufficientDataStations({
				unit: $unitLabel,
				stations: insufficientDataStations.map(({ properties }) => properties.longName).join(', ')
			})}
		{/if}
	</Alert>
{/if}

{#if !isExport}
	<h3 class="grid grid-cols-[1fr_auto] items-center gap-x-8 gap-y-2 font-semibold">
		<span class="flex flex-col gap-x-2 gap-y-0.5 font-semibold">
			{$unitLabel}
			{$unitOnly ? `(${$unitOnly})` : ''}
			<span class="text-sm font-normal text-muted-foreground">
				{$formattedTimeConfiguration}
			</span>
		</span>
		{@render minMaxAvgCombobox()}
	</h3>
{/if}
{#if $ids.length === 1}
	<SingleStationDatavis
		isLoading={$query.isLoading}
		label={firstValidValueLabel}
		value={firstValidValue}
	/>
{:else if (validIds.length > 0 || $query.isLoading || $query.isError || ($query.data || []).length === 0)}
	{#if $isCategoryUnit}
		<OrdinalDataVis
			data={data}
			isLoading={$query.isLoading}
			{stations}
		/>
	{:else}
		<div
			class={cn('relative mb-6')}
			style={`height: ${chartHeight}px`}
		>
			<ChartQueryHull
				data={data}
				query={$query}
			>
				<BarChart
					{data}
					bandPadding={0.3}
					x="value"
					y="label"
					orientation="horizontal"
					padding={{ left: Math.min(130, Math.max(...data.map((d) => d.label.length)) * 8), right: 16 }}
					props={{
						yAxis: {
							tickLength: 0,
							tickLabelProps: {
								dx: - 8
							},
							classes: {
								tickLabel: 'fill-muted-foreground text-xs',
								rule: 'stroke-primary',
							},
							format: (v?: string) => (v?.length || 0) > 130 / 8 ? (v || '').slice(0, 130 / 8) + '...' : v || '',
						},
						xAxis: {
							classes: {
								tickLabel: 'fill-muted-foreground text-xs',
								rule: 'stroke-muted'
							},
							format: (v?: number) => (v === 0 ? '' : `${v?.toLocaleString($locale)} ${$unitOnly}`),
							ticks: 4
						},
						grid: {
							classes: {
								line: 'stroke-muted'
							}
						},
						rule: { x: 0 },
						bars: {
							strokeWidth: 0,
							radius: 2
						},
					}}
				>
					<svelte:fragment slot="tooltip">
						<Tooltip.Root let:data={d} classes={tooltipClasses}>
							<span class="flex flex-col text-xs max-w-48">
								{@html
									unsupportedIds.includes(d.id) || insufficientDataIds.includes(d.id)
										? ''
										: `<strong>${d.label}</strong>`
								}
								<span>
									{@html cn(
										d.value !== undefined &&
											d.value.toLocaleString($locale, {
												maximumFractionDigits: 1
											}),
										d.value === undefined &&
											unsupportedIds.includes(d.id) &&
											$LL.pages.measurements.singleUnsupportedStation({
												unit: $unitLabel,
												station: d.label
											}),
										d.value === undefined &&
											insufficientDataIds.includes(d.id) &&
											$LL.pages.measurements.singleInsufficientDataStation({
												unit: $unitLabel,
												station: d.label
											})
									)}
									{@html d.value ? $unitOnly : ''}
								</span>
							</span>
						</Tooltip.Root>
					</svelte:fragment>
					<svelte:fragment slot="highlight">
						{#each unsupportedDataItems as item}
							<Highlight
								lines={{ 
									class: "stroke-foreground/5 stroke-[20] [stroke-dasharray:1000,0]",
								}}
								data={item}
							>
							</Highlight>
						{/each}
					</svelte:fragment>
				</BarChart>
			</ChartQueryHull>
		</div>
	{/if}
{/if}
