<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import { type StationsGeoJSONType } from '$lib/stores/mapData';
	import { useStations } from '$lib/stores/stationsStore';
	import { rangeEndDate, rangeEndKey, rangeStartDate, rangeStartKey, unit } from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
	import {
		getHeatStressCategoryByValue,
		getHeatStressValueByCategory
	} from '$lib/utils/heatStressCategoriesUtil';
	import { reactiveQueryArgs } from '$lib/utils/queryUtils.svelte';
	import { getMessageForUnsupportedStations } from '$lib/utils/stationsDataVisUtil';
	import { getHeatStressLabel } from '$lib/utils/textUtil';
	import { createQuery } from '@tanstack/svelte-query';
	import { VisAxis, VisCrosshair, VisLine, VisTooltip, VisXYContainer } from '@unovis/svelte';
	import { Position } from '@unovis/ts';
	import Alert from 'components/ui/alert/alert.svelte';
	import { LoaderCircle } from 'lucide-svelte';
	import ErrorAlert from '../ErrorAlert.svelte';
	import UnovisChartContainer from '../UnovisChartContainer.svelte';
	import { getStationDataFetcher } from './stationsLineChartUtil';

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

	interface Props {
		stations: StationsGeoJSONType;
	}

	let { stations }: Props = $props();

	const ids = useStations();

	type DataRecord = Record<string, unknown> & {
		date: Date;
	};

	const x = (d: DataRecord) => d.date.getTime();
	const color = (_d: DataRecord, idx: number) => CHART_COLORS[idx];

	const queryFn = $derived.by(() =>
		getStationDataFetcher({
			ids: $ids,
			start_date: $rangeStartDate,
			end_date: $rangeEndDate,
			unit: $unit,
			stations: stations.features
		})
	);
	let query = createQuery(
		reactiveQueryArgs(() => ({
			queryKey: ['stationsData-range', $ids?.join('-'), $rangeStartKey, $rangeEndKey, $unit],
			queryFn,
			enabled: Boolean(
				$ids?.length > 0 && stations?.features?.length > 0 && $rangeStartDate && $rangeEndDate && $unit
			)
		}))
	);
	const { data: queryData, isLoading, isFetching, isSuccess, error } = $derived($query);
	const data = $derived(queryData?.lineChartData || ([] as DataRecord[]).filter(Boolean));
	const isCatChart = $derived($unit.endsWith('_category'));
	const y = $derived(
		$ids.map(
			(id) => (d: DataRecord) =>
				isCatChart
					? getHeatStressValueByCategory(`${d[id as keyof typeof d]}` as string)
					: (d[id as keyof typeof d] as number)
		)
	);
	const idsColors = $derived(
		$ids.reduce((acc, id, idx) => ({ ...acc, [id]: CHART_COLORS[idx] }), {})
	);
	const xTickFormat = $derived((d: Date) =>
		new Intl.DateTimeFormat($locale, { dateStyle: 'long' }).format(d)
	);
	const yTickFormat = $derived((d: number) =>
		isCatChart
			? getHeatStressLabel({
					unit: $unit,
					LL: $LL,
					value: getHeatStressCategoryByValue(d)
				})
			: d.toLocaleString($locale, {
					maximumFractionDigits: 1
				})
	);
	let unsupportedIds = $derived(queryData?.unsupportedIds || []);
	let legendItems = $derived(
		$ids
			.filter((id) => !unsupportedIds.includes(id))
			.map((id) => ({
				id,
				name: stations.features.find((f) => f.properties.id === id)?.properties.longName || id,
				color: idsColors[id as keyof typeof idsColors]
			}))
			.sort((a, b) => a.name.localeCompare(b.name))
	);
	let tooltipTemplate = $derived(
		(d: DataRecord) => `
		<span class="flex flex-col text-xs min-w-56">
			<strong class="pb-1 mb-1 border-b border-border text-sm">
				${new Intl.DateTimeFormat($locale, { dateStyle: 'long', timeStyle: 'short' }).format(d.date)}
			</strong>
			<span class="grid grid-cols-[auto_1fr] gap-x-4">
				${legendItems
					.filter(({ id }) => d[id as keyof typeof d])
					.map(({ id, name, color }) => {
						const value = d[id as keyof typeof d];
						return `
							<span class="flex items-center">
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
	let unsupportedMsg = $derived(
		getMessageForUnsupportedStations({
			ids: $ids,
			unsupportedIds,
			unit: $unit,
			stations: stations.features,
			LL: $LL
		})
	);
	let selectedUnitLabel = $derived(
		$LL.pages.measurements.unitSelect.units[
			$unit as keyof typeof $LL.pages.measurements.unitSelect.units
		].label()
	);
</script>

<h3 class="font-semibold">{selectedUnitLabel}</h3>
{#if unsupportedMsg}
	<Alert variant="destructive">
		{@html unsupportedMsg}
	</Alert>
{/if}

{#key data}
	<UnovisChartContainer
		className={cn('relative', isSuccess && data && data.length === 0 ? '' : 'h-[360px]')}
	>
		<VisXYContainer
			padding={{ top: 8, bottom: 8, right: 16 }}
			{data}
			height={isSuccess && data && data.length === 0 ? 64 : 300}
			class={cn('relative transition-opacity', isFetching && 'opacity-20')}
		>
			{#if data && data.length > 0 && !error}
				<VisLine {x} {y} fallbackValue={undefined} {color} />
				<VisAxis type="x" tickFormat={xTickFormat} />
				<VisAxis type="y" tickFormat={yTickFormat} />
				<VisCrosshair template={tooltipTemplate} {x} {y} />
				<VisTooltip verticalShift={300} horizontalPlacement={Position.Center} />
			{:else if isSuccess && data && data.length === 0}
				<div class="absolute inset-0 flex items-center justify-center">
					{$LL.pages.measurements.noDataAvailable()}
				</div>
			{/if}
			{#if error}
				<div class="absolute inset-0 flex items-center justify-center">
					<ErrorAlert errorObject={error} />
				</div>
			{/if}
		</VisXYContainer>
		{#if data && data.length > 0 && !error}
			<ul
				class="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 py-4 text-xs text-muted-foreground"
			>
				{#each legendItems as { name, color }}
					<li class="flex items-center gap-2">
						<span style="background-color: {color}" class="inline-block h-0.5 w-3"></span>
						{name}
					</li>
				{/each}
			</ul>
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
	</UnovisChartContainer>
{/key}
