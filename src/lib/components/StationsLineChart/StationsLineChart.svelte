<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import { type StationsGeoJSONType } from '$lib/stores/mapData';
	import { selectedStations } from '$lib/stores/stationsStore';
	import { selectedUnit } from '$lib/stores/unitStore';
	import { cn } from '$lib/utils';
	import { today } from '$lib/utils/dateUtil';
	import { getMessageForUnsupportedStations } from '$lib/utils/stationsDataVisUtil';
	import { createQuery } from '@tanstack/svelte-query';
	import { VisAxis, VisCrosshair, VisLine, VisTooltip, VisXYContainer } from '@unovis/svelte';
	import { Position } from '@unovis/ts';
	import Alert from 'components/ui/alert/alert.svelte';
	import { addDays, format } from 'date-fns';
	import { debounce } from 'es-toolkit';
	import { LoaderCircle } from 'lucide-svelte';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import ErrorAlert from '../ErrorAlert.svelte';
	import UnovisChartContainer from '../UnovisChartContainer.svelte';
	import { getStationDataFetcher } from './stationsLineChartUtil';

	export let stations: StationsGeoJSONType;

	let start_date: Date | undefined;
	let end_date: Date | undefined;
	const options = { debounceHistory: 500 };
	const rangeStart = queryParam('range_start', ssp.number(-10), options);
	const rangeEnd = queryParam('range_end', ssp.number(0), options);

	const unit = queryParam('unit', ssp.string());

	const updateStartDate = debounce((d: number) => {
		updateStartDate?.cancel();
		start_date = addDays(today(), d);
	}, 500);
	const updateEndDate = debounce((d: number) => {
		updateEndDate?.cancel();
		end_date = addDays(today(), d);
	}, 500);

	rangeStart.subscribe(updateStartDate);
	rangeEnd.subscribe(updateEndDate);

	$: startDateKey = start_date && format(start_date, 'yyyy-MM-dd');
	$: endDateKey = end_date && format(end_date, 'yyyy-MM-dd');
	$: unitShortLabel =
		$LL.pages.measurements.unitSelect.units[
			$unit as keyof typeof $LL.pages.measurements.unitSelect.units
		].shortLabel();
	$: stationHeaderLabel = $LL.pages.measurements.unitSelect.stationsHeaderLabel();

	$: ids = $selectedStations.toSorted();
	$: queryFn = getStationDataFetcher({
		ids,
		start_date,
		end_date,
		unit: $unit,
		stations: stations.features
	});
	$: query = createQuery({
		queryKey: ['stationsData-range', ids?.join('-'), startDateKey, endDateKey, $unit, stations],
		queryFn,
		enabled: Boolean(
			ids?.length > 0 && stations?.features?.length > 0 && start_date && end_date && $unit
		)
	});

	type DataRecord = Record<string, unknown> & {
		date: Date;
	};

	$: data = $query.data?.lineChartData || ([] as DataRecord[]).filter(Boolean);

	$: y = ids.map((id) => (d: DataRecord) => d[id as keyof typeof d] as number);
	const x = (d: DataRecord) => d.date.getTime();
	$: xTickFormat = (d: Date) => new Intl.DateTimeFormat($locale, { dateStyle: 'long' }).format(d);
	$: yTickFormat = (d: number) => d.toLocaleString($locale);
	$: tooltipTemplate = (d: DataRecord) => `
		<span class="flex flex-col text-xs min-w-56">
			<strong class="pb-1 mb-1 border-b border-border text-sm">
				${new Intl.DateTimeFormat($locale, { dateStyle: 'long', timeStyle: 'short' }).format(d.date)}
			</strong>
			<span class="grid grid-cols-[auto_1fr] gap-x-4">
				<strong class="pb-1 mb-1 border-b border-border">${stationHeaderLabel}</strong>
				<strong class="pb-1 mb-1 border-b border-border">${unitShortLabel}</strong>
				${ids
					.filter((id) => d[id as keyof typeof d])
					.sort((a, b) => {
						const aLabel = d[`${a}_label`] as string;
						const bLabel = d[`${b}_label`] as string;
						if (!aLabel || !bLabel) return 0;
						return aLabel.localeCompare(bLabel);
					})
					.map((id) => {
						const label = d[`${id}_label`];
						const value = d[id as keyof typeof d];
						return `
							<span>${label}</span>
							${`<span>
										${typeof value === 'number' ? value.toLocaleString($locale) : value ?? 'Unknown'}
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
	$: unsupportedIds = $query.data?.unsupportedIds || [];
	$: unsupportedMsg = getMessageForUnsupportedStations({
		ids,
		unsupportedIds,
		unit: $selectedUnit,
		stations: stations.features,
		LL: $LL
	});
</script>

{#if unsupportedMsg}
	<Alert variant="destructive">
		{@html unsupportedMsg}
	</Alert>
{/if}
<UnovisChartContainer
	className={cn('relative', $query.isSuccess && data && data.length === 0 ? '' : 'h-[300px]')}
>
	<VisXYContainer
		padding={{ top: 8, bottom: 8, right: 16 }}
		{data}
		height={$query.isSuccess && data && data.length === 0 ? 64 : 300}
		class={cn('transition-opacity', $query.isFetching && 'opacity-20')}
	>
		{#if data && data.length > 0 && !$query.error}
			<VisLine {x} {y} fallbackValue={undefined} />
			<VisAxis type="x" tickFormat={xTickFormat} />
			<VisAxis type="y" tickFormat={yTickFormat} />
			<VisCrosshair template={tooltipTemplate} {x} {y} />
			<VisTooltip verticalShift={300} horizontalPlacement={Position.Center} />
		{:else if $query.isSuccess && data && data.length === 0}
			<div class="absolute inset-0 flex items-center justify-center">
				{$LL.pages.measurements.noDataAvailable()}
			</div>
		{/if}
		{#if $query.error}
			<div class="absolute inset-0 flex items-center justify-center">
				<ErrorAlert errorObject={$query.error} />
			</div>
		{/if}
	</VisXYContainer>
	<div
		class={cn(
			'absolute inset-0 flex items-center justify-center',
			'pointer-events-none opacity-0',
			$query.isFetching && 'opacity-100'
		)}
	>
		<LoaderCircle class="size-6 animate-spin" />
	</div>
</UnovisChartContainer>
