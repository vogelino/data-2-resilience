<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import { type StationsGeoJSONType } from '$lib/stores/mapData';
	import { useStations } from '$lib/stores/stationsStore';
	import { cn } from '$lib/utils';
	import { getColorScaleValue } from '$lib/utils/colorScaleUtil';
	import { today } from '$lib/utils/dateUtil';
	import { parseDatavisType } from '$lib/utils/parsingUtil';
	import { getMessageForUnsupportedStations } from '$lib/utils/stationsDataVisUtil';
	import { getHeatStressLabel } from '$lib/utils/textUtil';
	import { VisAxis, VisStackedBar, VisTooltip, VisXYContainer } from '@unovis/svelte';
	import { StackedBar } from '@unovis/ts';
	import { addDays, format, setHours } from 'date-fns';
	import { debounce } from 'es-toolkit';
	import { LoaderCircle } from 'lucide-svelte';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import ErrorAlert from './ErrorAlert.svelte';
	import UnovisChartContainer from './UnovisChartContainer.svelte';
	import { Alert } from './ui/alert';
	import Combobox from './Combobox.svelte';
	import { createQuery, type QueryFunctionContext } from '@tanstack/svelte-query';
	import { reactiveQueryArgs } from '$lib/utils/queryUtils.svelte';
	import { api } from '$lib/utils/api';
	import type { WeatherMeasurementKeyNoMinMax } from '$lib/utils/schemas';
	import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

	interface Props {
		stations: StationsGeoJSONType;
	}

	let { stations }: Props = $props();

	type DataRecord = {
		id: string;
		label: string;
		value: number | undefined;
		supported: boolean;
	};

	let date: Date | undefined = $state();
	const options = { debounceHistory: 500 };
	const dayVlaue = queryParam('day_value', ssp.number(0), options);
	const unit = queryParam('unit', ssp.string('utci'));
	const isCategoryUnit = $derived($unit?.endsWith('_category'));
	const hour = queryParam('hour', ssp.number(12));
	const selectedStations = useStations();
	const rawDatavisType = queryParam('datavisType', ssp.string('day'));
	let datavisType = $derived(parseDatavisType($rawDatavisType));
	let minMaxAvg: 'min' | 'max' | 'avg' = $state('avg');
	let unitWithMinMaxAvg = $derived(
		datavisType === 'day'
			? minMaxAvg === 'avg' || isCategoryUnit
				? $unit
				: `${$unit}_${minMaxAvg}`
			: $unit
	);

	const updateDay = debounce((d: number) => {
		updateDay?.cancel();
		date = addDays(today(), d);
	}, 500);

	dayVlaue.subscribe(updateDay);

	let unitLabel = $derived(
		$LL.pages.measurements.unitSelect.units[
			$unit as keyof typeof $LL.pages.measurements.unitSelect.units
		].label()
	);
	let unitOnly = $derived(
		$LL.pages.measurements.unitSelect.units[
			$unit as keyof typeof $LL.pages.measurements.unitSelect.units
		].unitOnly()
	);
	const unitWithoutCategory = $derived(
		$unit.replace(/_category$/, '') === 'pet' ? ('pet' as const) : ('utci' as const)
	);
	const titleKey = $derived(isCategoryUnit ? ('heatStress' as const) : ('thermalComfort' as const));
	const healthRisks = $derived($LL.map.choroplethLegend.healthRisks);

	let ids = $derived($selectedStations.filter(Boolean).toSorted());
	const scale = $derived(datavisType === 'day' ? 'daily' : 'hourly');
	const hourParam = $derived(scale === 'hourly' ? $hour : undefined);
	const dateKey = $derived(date && format(date, 'yyyy-MM-dd'));
	let query = createQuery(
		reactiveQueryArgs(() => ({
			queryKey: ['stationsData-daily', ids.join('-'), dateKey, unitWithMinMaxAvg, scale, hourParam],
			queryFn: async () => {
				if (ids.length === 0 || !date || !unitWithMinMaxAvg) return [];
				const promises = ids.map(async (id) => {
					if (ids.length === 0 || !date || !unitWithMinMaxAvg) return;
					const isHour = scale === 'hourly' && typeof $hour === 'number';
					const startDate = isHour ? setHours(date, $hour) : addDays(date, -1);
					const endDate = isHour ? setHours(date, $hour) : date || '';
					const itemResults = await api().getStationData({
						id,
						start_date: startDate,
						end_date: endDate,
						param: unitWithMinMaxAvg as unknown as WeatherMeasurementKeyNoMinMax,
						scale
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
						value: i ? (i[unitWithMinMaxAvg as keyof typeof i] as unknown as number) : undefined,
						supported: true
					};
				});

				const results = await Promise.all(promises);
				return results as DataRecord[];
			},
			enabled: Boolean(ids.length > 0 && date && unitWithMinMaxAvg)
		}))
	);

	let data = $derived(
		($query.data || []).sort((a, b) => {
			const aValue = a.value;
			const bValue = b.value;
			if (aValue === undefined && bValue === undefined)
				return b.label.localeCompare(a.label, $locale);
			if (aValue === undefined) return -1;
			if (bValue === undefined) return 1;
			return b.label.localeCompare(a.label, $locale);
		})
	);

	let insufficientDataIds = $derived(
		data.filter((d) => d.supported && d.value === undefined).map((d) => d.id)
	);
	let noneSufficientData = $derived(insufficientDataIds.length === ids.length);
	let insufficientDataStations = $derived(
		stations.features
			.filter((f) => insufficientDataIds.includes(f.properties.id))
			.sort((a, b) => a.properties.longName.localeCompare(b.properties.longName))
	);
	let unsupportedIds = $derived(data.filter((d) => !d.supported).map((d) => d.id));
	let unsupportedMsg = $derived(
		getMessageForUnsupportedStations({
			ids,
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

	let firstValidValue = $derived(data.find((d) => d.value !== undefined)?.value);
	let firstValidValueLabel = $derived(
		typeof firstValidValue === 'string'
			? getHeatStressLabel({ unit: $unit, LL: $LL, value: firstValidValue })
			: firstValidValue?.toLocaleString($locale, { maximumFractionDigits: 1 })
	);
	let maxValue = $derived(data.reduce((acc, item) => Math.max(acc, item.value ?? 0), 0));
	const y = (d: DataRecord) => (typeof d.value === 'number' ? d.value : maxValue);
	const x = (_d: DataRecord, idx: number) => idx;
	const color = (d: DataRecord) =>
		typeof d.value === 'number' ? undefined : 'hsl(var(--muted-foreground) / 0.1)';
	const yTickFormat = (idx: number) => data[idx]?.label ?? '';
	let xTickFormat = $derived((value: number) =>
		value.toLocaleString($locale, {
			maximumFractionDigits: 1
		})
	);
	let yTickValues = $derived(data.map(x));
	let triggers = $derived({
		[StackedBar.selectors.bar]: (d: DataRecord) => `
			<span class="flex flex-col text-xs max-w-48">
				${
					unsupportedIds.includes(d.id) || insufficientDataIds.includes(d.id)
						? ''
						: `<strong>${d.label}</strong>`
				}
				<span>
					${cn(
						d.value !== undefined &&
							d.value.toLocaleString($locale, {
								maximumFractionDigits: 1
							}),
						d.value === undefined &&
							unsupportedIds.includes(d.id) &&
							$LL.pages.measurements.singleUnsupportedStation({
								unit: unitLabel,
								station: d.label
							}),
						d.value === undefined &&
							insufficientDataIds.includes(d.id) &&
							$LL.pages.measurements.singleInsufficientDataStation({
								unit: unitLabel,
								station: d.label
							})
					)}
					${d.value ? unitOnly : ''}
				</span>
			</span>
		`
	});
	let chartHeight = $derived(Math.max(96, 60 + ids.length * 22));

	const dateLongFormatter = new Intl.DateTimeFormat($locale, {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	const dataContainsNegativeValues = $derived(
		data.some((d) => d.value !== undefined && d.value < 0)
	);
	const dataContainsOnlyNegativeValues = $derived(
		data.every((d) => d.value !== undefined && d.value < 0)
	);
</script>

{#snippet minMaxAvgCombobox()}
	{#if datavisType === 'day' && !isCategoryUnit}
		<Combobox
			defaultValue={minMaxAvg}
			onChange={(value) => (minMaxAvg = value as 'min' | 'avg' | 'max')}
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

{#if $query.isLoading || $query.isSuccess}
	<h3 class="grid grid-cols-[1fr_auto] items-center gap-x-8 gap-y-2 font-semibold">
		{unitLabel}
		{unitOnly ? `(${unitOnly})` : ''}
		{@render minMaxAvgCombobox()}
	</h3>
{/if}

{#if unsupportedMsg}
	<Alert variant="destructive">
		{@html unsupportedMsg}
	</Alert>
{/if}
{#if insufficientDataIds.length > 0}
	<Alert variant="warning">
		{#if $query.isSuccess && noneSufficientData}
			{@html $LL.pages.measurements.allInsufficientDataStations({
				unit: unitLabel
			})}
		{:else if $query.isSuccess && insufficientDataIds.length === 1}
			{@html $LL.pages.measurements.singleInsufficientDataStation({
				unit: unitLabel,
				station: insufficientDataStations[0].properties.longName
			})}
		{:else if $query.isSuccess && insufficientDataIds.length > 1}
			{@html $LL.pages.measurements.someInsufficientDataStations({
				unit: unitLabel,
				stations: insufficientDataStations.map(({ properties }) => properties.longName).join(', ')
			})}
		{/if}
	</Alert>
{/if}

{#if ids.length === 1}
	<div class="relative flex flex-col gap-2 pb-6 pt-2 text-center">
		<span class="text-muted-foreground">
			{#if $query.isLoading}
				<span class="inline-block h-4 w-40 animate-pulse rounded-sm bg-muted-foreground/20"></span>
			{:else if date && firstValidValueLabel}
				{dateLongFormatter.format(date)}
			{/if}
		</span>
		<strong class="flex items-center justify-center gap-2 text-3xl leading-tight">
			{#if $query.isLoading}
				<span class="inline-block h-6 w-24 animate-pulse rounded-sm bg-muted-foreground/20"></span>
			{:else if firstValidValueLabel !== undefined}
				{#if typeof firstValidValue === 'string'}
					<span
						class="inline-block size-6 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]"
						style={`background-color: ${getColorScaleValue({
							unit: $unit,
							LL: $LL,
							value: firstValidValue
						})}`}
					></span>
				{/if}
				{firstValidValueLabel}
				{unitOnly}
			{/if}
		</strong>
	</div>
{:else}
	{#key data}
		{#if isCategoryUnit}
			<div class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
				{#if $query.isPending}
					{#each ids as _d, i}
						<span
							class={cn(
								'inline-block h-5 w-40 animate-pulse rounded-sm bg-muted-foreground/20',
								['w-24', 'w-20', 'w-32'][i]
							)}
						>
						</span>
						<span class="grid grid-cols-[0.75rem_1fr] items-center gap-2">
							<span
								class={cn('inline-block size-3 animate-pulse rounded-full bg-muted-foreground/20')}
							>
							</span>
							<span
								class={cn(
									'inline-block h-5 w-40 animate-pulse rounded-sm bg-muted-foreground/20',
									['w-32', 'w-24', 'w-40'][i]
								)}
							>
							</span>
						</span>
					{/each}
				{:else}
					{#each data as d}
						{@const healthRisk = healthRisks[d.value as unknown as keyof typeof healthRisks]}
						<strong class="font-semibold">{d.label}</strong>
						<Tooltip openDelay={0} disableHoverableContent>
							<TooltipTrigger
								class={cn(
									'grid w-fit grid-cols-[0.75rem_1fr] items-center gap-2 text-left',
									d.value && 'transition-colors hover:text-muted-foreground'
								)}
							>
								<span
									class="inline-block size-3 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]"
									{...d.value
										? {
												style: `background-color: ${getColorScaleValue({
													LL: $LL,
													value: d.value || 0,
													unit: $unit
												})};`
											}
										: {}}
								></span>
								{healthRisk?.title[titleKey]() || $LL.map.choroplethLegend.noValueAvailable()}
							</TooltipTrigger>
							{#if d.value}
								<TooltipContent class="max-w-72">
									{#if healthRisk}
										<strong class="flex gap-2 font-semibold">
											<span>{healthRisk.title[titleKey]()}</span>
											{#if healthRisk.ranges[unitWithoutCategory]()}
												<span class="whitespace-nowrap font-normal text-muted-foreground">
													({healthRisk.ranges[unitWithoutCategory]()})
												</span>
											{/if}
										</strong>
										<span>{@html healthRisk.description()}</span>
									{/if}
								</TooltipContent>
							{/if}
						</Tooltip>
					{/each}
				{/if}
			</div>
		{:else}
			<UnovisChartContainer
				className={cn('relative')}
				style={!$query.isLoading && validIds.length === 0 ? '' : `height: ${chartHeight}px`}
			>
				{#if validIds.length > 0}
					<VisXYContainer
						padding={{
							top: 8,
							bottom: 8,
							right: dataContainsOnlyNegativeValues ? 0 : 16,
							left: dataContainsNegativeValues ? 16 : 0
						}}
						height={chartHeight}
					>
						{#if $query.isSuccess && data.length > 0}
							<VisStackedBar
								{data}
								{x}
								{y}
								{color}
								numTicks={Math.max(2, data.length)}
								tickValues={data.length === 1 && firstValidValue === 0 ? [0, 5] : undefined}
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
								numTicks={data.length}
								tickTextFitMode="trim"
								tickTextTrimType="end"
							/>
							<VisTooltip {triggers} />
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
	{/key}
{/if}
