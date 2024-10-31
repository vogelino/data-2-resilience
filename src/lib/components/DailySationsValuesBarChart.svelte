<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import { type StationsGeoJSONType } from '$lib/stores/mapData';
	import { useStations } from '$lib/stores/stationsStore';
	import { cn } from '$lib/utils';
	import { today } from '$lib/utils/dateUtil';
	import { parseDatavisType } from '$lib/utils/parsingUtil';
	import { useDailyStationsData } from '$lib/utils/queryUtils/stationsDataDaily';
	import {
		getMessageForUnsupportedStations,
		isNoStationSupported
	} from '$lib/utils/stationsDataVisUtil';
	import { VisAxis, VisStackedBar, VisTooltip, VisXYContainer } from '@unovis/svelte';
	import { StackedBar } from '@unovis/ts';
	import { addDays } from 'date-fns';
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
	const hour = queryParam('hour', ssp.number(12));
	const selectedStations = useStations();
	const rawDatavisType = queryParam('datavisType', ssp.string('day'));
	$: datavisType = parseDatavisType($rawDatavisType);

	const updateDay = debounce((d: number) => {
		updateDay?.cancel();
		date = addDays(today(), d);
	}, 500);

	dayVlaue.subscribe(updateDay);

	$: unitShortLabel =
		$LL.pages.measurements.unitSelect.units[
			$unit as keyof typeof $LL.pages.measurements.unitSelect.units
		].shortLabel();
	$: unitLongLabel =
		$LL.pages.measurements.unitSelect.units[
			$unit as keyof typeof $LL.pages.measurements.unitSelect.units
		].label();
	$: unitOnly =
		$LL.pages.measurements.unitSelect.units[
			$unit as keyof typeof $LL.pages.measurements.unitSelect.units
		].unitOnly();

	$: ids = $selectedStations.toSorted();
	$: query = useDailyStationsData({
		ids,
		date,
		unit: $unit,
		stations,
		scale: datavisType === 'day' ? 'daily' : 'hourly',
		hour: $hour
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
	$: xTickFormat = (value: number) =>
		value.toLocaleString($locale, {
			maximumFractionDigits: 1
		});
	$: yTickValues = chartData.map(x);
	$: triggers = {
		[StackedBar.selectors.bar]: (d: DataRecord) => `
			<span class="flex flex-col text-xs">
				<strong>${d.label}</strong>
				<span>
					${d.value?.toLocaleString($locale, {
						maximumFractionDigits: 1
					})}
					${unitOnly}
				</span>
			</span>
		`
	};
	$: chartHeight = Math.max(240, 60 + chartData.length * 22);

	const dateLongFormatter = new Intl.DateTimeFormat($locale, {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
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

{#if ids.length === 1}
	<div class="flex flex-col justify-center gap-2 text-center">
		<span class="text-muted-foreground">
			{#if $query.isLoading}
				<span class="inline-block h-4 w-40 animate-pulse rounded-sm bg-muted-foreground/20"></span>
			{:else if date}
				{dateLongFormatter.format(date)}
			{/if}
		</span>
		<strong class="text-3xl leading-tight">
			{#if $query.isLoading}
				<span class="inline-block h-6 w-24 animate-pulse rounded-sm bg-muted-foreground/20"></span>
			{:else if data[0]?.value !== undefined}
				{data[0]?.value?.toLocaleString($locale, {
					maximumFractionDigits: 1
				})}
				{unitOnly}
			{/if}
		</strong>
		<span>
			{#if $query.isLoading}
				<span class="inline-block h-4 w-48 animate-pulse rounded-sm bg-muted-foreground/20"></span>
			{:else if date}
				{unitLongLabel}
			{/if}</span
		>
	</div>
{:else}
	{#if $query.isLoading || ($query.isSuccess && chartData.length > 0)}
		<h3 class="font-semibold">{unitShortLabel}</h3>
	{/if}
	<UnovisChartContainer
		className={cn('relative', !data || (data.length === 0 && 'min-h-[240px]'))}
		style={`height: ${chartHeight}px`}
	>
		{#if !noneSufficientData && !noneSupportedData}
			<VisXYContainer padding={{ top: 8, bottom: 8, right: 16 }} height={chartHeight}>
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
{/if}
