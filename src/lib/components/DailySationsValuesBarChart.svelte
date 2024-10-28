<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import { type StationsGeoJSONType } from '$lib/stores/mapData';
	import { selectedStations } from '$lib/stores/stationsStore';
	import { cn } from '$lib/utils';
	import { api } from '$lib/utils/api';
	import { today } from '$lib/utils/dateUtil';
	import type { WeatherMeasurementKeyNoMinMax } from '$lib/utils/schemas';
	import {
		getMessageForUnsupportedStations,
		isNoStationSupported
	} from '$lib/utils/stationsDataVisUtil';
	import { createQuery } from '@tanstack/svelte-query';
	import { VisAxis, VisStackedBar, VisTooltip, VisXYContainer } from '@unovis/svelte';
	import { StackedBar } from '@unovis/ts';
	import { addDays, format } from 'date-fns';
	import { debounce } from 'es-toolkit';
	import { LoaderCircle } from 'lucide-svelte';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import ErrorAlert from './ErrorAlert.svelte';
	import UnovisChartContainer from './UnovisChartContainer.svelte';
	import { Alert } from './ui/alert';

	export let stations: StationsGeoJSONType;

	type DataRecord = {
		id: string;
		label: string;
		value: number | undefined;
		supported: boolean;
	};

	let date: Date | undefined;
	const options = { debounceHistory: 500 };
	const dayVlaue = queryParam('day_value', ssp.number(0), options);
	const unit = queryParam('unit', ssp.string('air_temperature'));

	const updateDay = debounce((d: number) => {
		updateDay?.cancel();
		date = addDays(today(), d);
	}, 500);

	dayVlaue.subscribe(updateDay);

	$: dateKey = date && format(date, 'yyyy-MM-dd');
	$: unitShortLabel =
		$LL.pages.measurements.unitSelect.units[
			$unit as keyof typeof $LL.pages.measurements.unitSelect.units
		].shortLabel();
	$: unitLongLabel =
		$LL.pages.measurements.unitSelect.units[
			$unit as keyof typeof $LL.pages.measurements.unitSelect.units
		].label();

	$: ids = $selectedStations.toSorted();
	$: enabled = Boolean(ids.length > 0 && date && $unit);
	$: query = createQuery({
		queryKey: ['stationsData-daily', ids.join('-'), dateKey, $unit],
		queryFn: async () => {
			if (ids.length === 0 || !date || !$unit) return [];
			const promises = ids.map(async (id) => {
				if (ids.length === 0 || !date || !$unit) return;
				const startDate = addDays(date, -1).toISOString();
				const endDate = date?.toISOString() || '';
				const itemResults = await api().getStationData({
					id,
					start_date: startDate,
					end_date: endDate,
					param: $unit as unknown as WeatherMeasurementKeyNoMinMax,
					scale: 'daily'
				});
				const label =
					stations.features.find((f) => f.properties.id === id)?.properties.longName || id;
				if (itemResults === null) {
					return {
						id,
						label,
						value: undefined,
						supported: false
					};
				}
				const i = itemResults[0];
				return {
					id,
					label,
					value: i ? (i[$unit as keyof typeof i] as unknown as number) : undefined,
					supported: true
				};
			});

			const results = await Promise.all(promises);
			return results as DataRecord[];
		},
		enabled
	});

	$: data = $query.data || [];
	$: chartData = data.filter((d) => typeof d.value === 'number');
	$: insufficientDataIds = data
		.filter((d) => d.supported && d.value === undefined)
		.map((d) => d.id);
	$: noneSufficientData = insufficientDataIds.length === ids.length;
	$: insufficientDataStations = stations.features
		.filter((f) => insufficientDataIds.includes(f.properties.id))
		.sort((a, b) => a.properties.longName.localeCompare(b.properties.longName));
	$: unsupportedIds = data.filter((d) => !d.supported).map((d) => d.id);
	$: noneSupportedData = isNoStationSupported({ ids, unsupportedIds });
	$: unsupportedMsg = getMessageForUnsupportedStations({
		ids,
		unsupportedIds,
		unit: $unit,
		stations: stations.features,
		LL: $LL
	});

	const y = (d: DataRecord) => d.value;
	const x = (d: DataRecord, idx: number) => idx;
	const yTickFormat = (idx: number) => chartData[idx]?.label ?? '';
	$: xTickFormat = (value: number) => value.toLocaleString($locale);
	$: yTickValues = chartData.map(x);
	$: triggers = {
		[StackedBar.selectors.bar]: (d: DataRecord) => `
			<span class="flex flex-col text-xs">
				<strong>${d.label}</strong>
				<span>${unitShortLabel}: ${d.value?.toLocaleString($locale)}</span>
			</span>
		`
	};
</script>

{#if unsupportedMsg}
	<Alert variant="destructive">
		{@html unsupportedMsg}
	</Alert>
{/if}
{#if insufficientDataIds.length > 0}
	<Alert variant="warning">
		{#if $query.isSuccess && noneSufficientData}
			{@html $LL.pages.measurements.allInsufficientDataStations({
				unit: unitLongLabel
			})}
		{:else if $query.isSuccess && insufficientDataIds.length === 1}
			{@html $LL.pages.measurements.singleInsufficientDataStation({
				unit: unitLongLabel,
				station: insufficientDataStations[0].properties.longName
			})}
		{:else if $query.isSuccess && insufficientDataIds.length > 1}
			{@html $LL.pages.measurements.someInsufficientDataStations({
				unit: unitLongLabel,
				stations: insufficientDataStations.map(({ properties }) => properties.longName).join(', ')
			})}
		{/if}
	</Alert>
{/if}
<UnovisChartContainer className={cn('relative min-h-16')}>
	{#if !noneSufficientData && !noneSupportedData}
		<VisXYContainer padding={{ top: 8, bottom: 8, right: 16 }} height={60 + chartData.length * 24}>
			{#if $query.isSuccess && chartData.length > 0}
				<VisStackedBar
					data={chartData}
					{x}
					{y}
					numTicks={Math.max(2, chartData.length)}
					tickValues={chartData.length === 1 && chartData[0].value === 0 ? [0, 5] : undefined}
					orientation="horizontal"
					barPadding={0.2}
					barMinHeight1Px
				/>
				<VisAxis type="x" tickFormat={xTickFormat} numTicks={5} />
				<VisAxis
					type="y"
					tickFormat={yTickFormat}
					tickValues={yTickValues}
					gridLine={false}
					numTicks={chartData.length}
					tickTextFitMode="trim"
					tickTextTrimType="end"
				/>
				<VisTooltip {triggers} />
			{:else if $query.isSuccess && chartData.length === 0}
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
	{/if}
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
