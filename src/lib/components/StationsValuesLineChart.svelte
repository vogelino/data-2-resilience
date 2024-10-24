<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import { stations } from '$lib/stores/mapData';
	import { selectedStations } from '$lib/stores/stationsStore';
	import { cn } from '$lib/utils';
	import { api } from '$lib/utils/api';
	import { today } from '$lib/utils/dateUtil';
	import type { WeatherMeasurementKeyNoMinMax } from '$lib/utils/schemas';
	import { createQuery } from '@tanstack/svelte-query';
	import { VisAxis, VisCrosshair, VisLine, VisTooltip, VisXYContainer } from '@unovis/svelte';
	import { Position } from '@unovis/ts';
	import { addDays, compareAsc, format } from 'date-fns';
	import { debounce } from 'es-toolkit';
	import { LoaderCircle } from 'lucide-svelte';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import ErrorAlert from './ErrorAlert.svelte';
	import UnovisChartContainer from './UnovisChartContainer.svelte';

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
	$: query = createQuery({
		queryKey: ['stationsData', ids.join('-'), startDateKey, endDateKey, $unit],
		queryFn: async () => {
			if (ids.length === 0 || !start_date || !end_date || !$unit) return;
			const promises = ids.map(async (id) => {
				const startDate = start_date?.toISOString() || '';
				const endDate = end_date?.toISOString() || '';
				const itemResults = await api().getStaionsData({
					id,
					start_date: startDate,
					end_date: endDate,
					param: $unit as unknown as WeatherMeasurementKeyNoMinMax,
					scale: 'hourly'
				});
				return itemResults.map((i) => ({ ...i, id, [id]: i[$unit as keyof typeof i] }));
			});

			const results = await Promise.all(promises);
			return results.flat();
		},
		enabled: Boolean(ids.length > 0 && start_date && end_date && $unit)
	});

	type DataRecord = Record<string, unknown> & {
		date: Date;
	};

	let data = [] as DataRecord[];

	$: query.subscribe((value) => {
		if (!value.data) return;
		const dateStrings = [...value.data.map(({ measured_at }) => measured_at)];
		const allData = value.data;
		data = dateStrings
			.map((dateString) => {
				const itemsAtThisTime = allData.filter((item) => item.measured_at === dateString);
				const formattedItem = {
					...itemsAtThisTime.reduce(
						(acc, item) => ({ ...acc, [item.id]: item[$unit as keyof typeof item] }),
						{}
					),
					...itemsAtThisTime.reduce(
						(acc, { id }) => ({
							...acc,
							[`${id}_label`]:
								$stations.features.find((item) => item.properties.id === id)?.properties.longName ||
								id
						}),
						{}
					),
					date: new Date(dateString)
				} satisfies DataRecord;
				return formattedItem;
			})
			.sort((a, b) => compareAsc(a.date, b.date));
	});

	$: y = ids.map((id) => (d: DataRecord) => (d[id as keyof typeof d] || 0) as number);
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
					.filter((id) => d[id as keyof typeof d] && d[`${id}_label`])
					.map((id) => {
						const label = d[`${id}_label`];
						const value = d[id as keyof typeof d];
						return `
						<span>${label}</span>
						<span>${typeof value === 'number' ? value.toLocaleString($locale) : value ?? 'Unknown'}</span>
					`;
					})
					.join('')}
			</span>
		</span>
	`;
</script>

<UnovisChartContainer className={cn('relative h-[300px]')}>
	<VisXYContainer
		padding={{ top: 8, bottom: 8, right: 16 }}
		{data}
		height={300}
		class={cn('transition-opacity', $query.isFetching && 'opacity-20')}
	>
		{#if data && data.length > 0 && !$query.error}
			<VisLine {x} {y} fallbackValue={undefined} />
			<VisAxis type="x" tickFormat={xTickFormat} />
			<VisAxis type="y" tickFormat={yTickFormat} />
			<VisCrosshair template={tooltipTemplate} {x} {y} />
			<VisTooltip verticalShift={300} horizontalPlacement={Position.Center} />
		{:else if data && data.length === 0}
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
