<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import { type StationsGeoJSONType } from '$lib/stores/mapData';
	import { useStations } from '$lib/stores/stationsStore';
	import {
		datavisType,
		dayStartDate,
		formattedTimeConfiguration,
		isCategoryUnit,
		minMaxAvg,
		unit,
		unitLabel,
		unitOnly,
		unitWithoutCategory,
		updateMinMaxAvg
	} from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
	import { getColorScaleValue } from '$lib/utils/colorScaleUtil';
	import { reactiveQueryArgs } from '$lib/utils/queryUtils.svelte';
	import { getMessageForUnsupportedStations } from '$lib/utils/stationsDataVisUtil';
	import { getHeatStressLabel } from '$lib/utils/textUtil';
	import { useStationsDailyConfig, type DailyStationRecord } from '$lib/utils/useStationsDaily';
	import { createQuery } from '@tanstack/svelte-query';
	import { VisAxis, VisStackedBar, VisTooltip, VisXYContainer } from '@unovis/svelte';
	import { StackedBar } from '@unovis/ts';
	import { LoaderCircle } from 'lucide-svelte';
	import Combobox from './Combobox.svelte';
	import ErrorAlert from './ErrorAlert.svelte';
	import UnovisChartContainer from './UnovisChartContainer.svelte';
	import { Alert } from './ui/alert';
	import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

	interface Props {
		stations: StationsGeoJSONType;
		initialStationIds?: string[];
	}

	let { stations, initialStationIds = [] }: Props = $props();

	const titleKey = $derived(
		$isCategoryUnit ? ('heatStress' as const) : ('thermalComfort' as const)
	);
	const healthRisks = $derived($LL.map.choroplethLegend.healthRisks);

	const ids = useStations(initialStationIds);
	const stationsDailyQueryConfig = useStationsDailyConfig(initialStationIds);
	const query = createQuery(reactiveQueryArgs(() => $stationsDailyQueryConfig));

	let data = $derived(
		($query.data || [])
			.map((d) => ({
				...d,
				label: stations.features.find((f) => f.properties.id === d.id)?.properties.longName || d.id
			}))
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

	let firstValidValue = $derived(data.find((d) => d.value !== undefined)?.value);
	let firstValidValueLabel = $derived(
		typeof firstValidValue === 'string'
			? getHeatStressLabel({ unit: $unit, LL: $LL, value: firstValidValue })
			: firstValidValue?.toLocaleString($locale, { maximumFractionDigits: 1 })
	);
	let maxValue = $derived(data.reduce((acc, item) => Math.max(acc, item.value ?? 0), 0));
	const y = (d: DailyStationRecord) => (typeof d.value === 'number' ? d.value : maxValue);
	const x = (_d: DailyStationRecord, idx: number) => idx;
	const color = (d: DailyStationRecord) =>
		typeof d.value === 'number' ? undefined : 'hsl(var(--muted-foreground) / 0.1)';
	const yTickFormat = $derived((idx: number) => data[idx].label || '');

	let xTickFormat = $derived(
		(value: number) =>
			`${value.toLocaleString($locale, {
				maximumFractionDigits: 1
			})} ${$unitOnly}`
	);
	let yTickValues = $derived(data.map(x));
	let triggers = $derived({
		[StackedBar.selectors.bar]: (d: DailyStationRecord) => {
			return `
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
					${d.value ? $unitOnly : ''}
				</span>
			</span>
		`;
		}
	});
	let chartHeight = $derived(Math.max(96, 60 + $ids.length * 22));

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

{#if unsupportedMsg}
	<Alert variant="destructive">
		{@html unsupportedMsg}
	</Alert>
{/if}
{#if insufficientDataIds.length > 0}
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
{#if $ids.length === 1}
	<div class="relative flex flex-col gap-2 pb-6 pt-2 text-center">
		<span class="text-muted-foreground">
			{#if $query.isLoading}
				<span class="inline-block h-4 w-40 animate-pulse rounded-sm bg-muted-foreground/20"></span>
			{:else if $dayStartDate && firstValidValueLabel}
				{dateLongFormatter.format($dayStartDate)}
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
		{#if $isCategoryUnit}
			<div class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
				{#if $query.isPending}
					{#each $ids as _d, i}
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
						{@const correspondingFeature = stations.features.find((f) => f.properties.id === d.id)}
						{@const label = correspondingFeature?.properties.longName || d.label || d.id || ''}
						<strong class="max-w-48 font-semibold">{label}</strong>
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
											{#if healthRisk.ranges[$unitWithoutCategory]()}
												<span class="whitespace-nowrap font-normal text-muted-foreground">
													({healthRisk.ranges[$unitWithoutCategory]()})
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
				{#if validIds.length > 0 || $query.isLoading || $query.isError || ($query.data || []).length === 0}
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
							{#key $locale}
								<VisAxis type="x" tickFormat={xTickFormat} numTicks={5} />
							{/key}
							<VisAxis
								type="y"
								tickFormat={yTickFormat}
								tickValues={yTickValues}
								gridLine={false}
								numTicks={data.length}
								tickTextFitMode="trim"
								tickTextTrimType="end"
								tickTextHideOverlapping={true}
								tickTextAlign="center"
								tickTextWidth={70}
							/>
							<VisTooltip {triggers} />
						{:else if $query.isSuccess && data.length === 0}
							<div class="absolute inset-0 flex items-center justify-center">
								{$LL.pages.measurements.noDataAvailable()}
							</div>
						{:else if $query.error}
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
