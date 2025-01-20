<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { StationsGeoJSONType } from '$lib/stores/mapData';
	import { toggleStationSelection, useStations } from '$lib/stores/stationsStore';
	import { cn } from '$lib/utils';
	import { api } from '$lib/utils/api';
	import { getColorScaleValue } from '$lib/utils/colorScaleUtil';
	import { today } from '$lib/utils/dateUtil';
	import { reactiveQueryArgs } from '$lib/utils/queryUtils.svelte';
	import type { WeatherMeasurementKeyNoMinMax } from '$lib/utils/schemas';
	import { getHeatStressLabel } from '$lib/utils/textUtil';
	import { createQuery } from '@tanstack/svelte-query';
	import { format, startOfHour } from 'date-fns';
	import { GeoJSON, MarkerLayer } from 'svelte-maplibre';
	import { queryParam, ssp } from 'sveltekit-search-params';

	interface Props {
		stations: StationsGeoJSONType;
		map: maplibregl.Map;
	}

	let { stations, map }: Props = $props();

	const unit = queryParam('unit', ssp.string('utci'));
	const selectedStations = useStations();
	const date = startOfHour(today());
	const dateKey = $derived(date && format(date, 'yyyy-MM-dd'));
	const query = createQuery(
		reactiveQueryArgs(() => ({
			queryKey: ['stations-snapshot', dateKey, $unit],
			queryFn: async () => {
				if (!date || !$unit) return;
				const itemResults = await api().getStationsSnapshot({
					date,
					param: $unit as unknown as WeatherMeasurementKeyNoMinMax,
					scale: 'hourly'
				});
				if (itemResults === null) return {};
				return itemResults.reduce(
					(acc, item) => ({ ...acc, ...(item.id ? { [item.id]: item } : {}) }),
					{} as Record<string, (typeof itemResults)[0]>
				);
			},
			enabled: Boolean(date && $unit)
		}))
	);
	let idToItemMap = $derived($query.data || {});

	let unitLabel = $derived(
		$LL.pages.measurements.unitSelect.units[
			$unit as keyof typeof $LL.pages.measurements.unitSelect.units
		].label()
	);
	let unitOnlyLabel = $derived(
		$LL.pages.measurements.unitSelect.units[
			$unit as keyof typeof $LL.pages.measurements.unitSelect.units
		].unitOnly()
	);

	let getValueById = $derived((id?: string) => {
		if (!id || !$unit) return;
		const item = idToItemMap[id];
		if (!item) return;
		const value = item[$unit as keyof typeof item];
		return value as { valueOf(): number } & string;
	});
	let getBgColorById = $derived((id?: string) => {
		const defaultColor = 'hsl(var(--muted-foreground))';
		const value = getValueById(id);
		if (!value) return defaultColor;
		return getColorScaleValue({ unit: $unit, LL: $LL, value });
	});
</script>

<GeoJSON id="stations" data={stations} promoteId="STATEFP">
	<MarkerLayer interactive class="group relative hover:z-10">
		{#snippet children({ feature })}
			<button
				type="button"
				class={cn(
					'relative grid h-4 w-4 place-items-center rounded-full border-2 border-background bg-foreground outline-none',
					'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
					$selectedStations.includes(feature.properties?.id) && [
						'ring-2 ring-background ring-offset-2 ring-offset-foreground'
					]
				)}
				style={`background-color: ${getBgColorById(feature.properties?.id)}`}
				onclick={() => {
					if (!feature.properties?.id) return;
					const { id } = feature.properties;
					toggleStationSelection(id);
				}}
				onfocusin={() => {
					map.flyTo({
						center: [7.467, 51.511],
						zoom: 10.5
					});
				}}
				aria-label={feature.properties?.longName}
			>
				<span class="absolute inset-0 rounded-full border border-black/20 mix-blend-multiply"
				></span>
			</button>
			<div
				class={cn(
					'pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 group-hover:-translate-y-2',
					'w-fit max-w-96 rounded-md bg-background px-4 py-3 opacity-0 transition group-hover:opacity-100',
					'w-48 border border-border shadow-lg'
				)}
			>
				<div class="relative flex flex-col">
					<h3 class="text-sm font-bold leading-4">{feature.properties?.longName}</h3>
					{#if feature.properties?.stationType}
						<span class="block leading-4 text-muted-foreground"> </span>
					{/if}
					<p class="text-xs">
						{#if typeof getValueById(feature.properties?.id) !== 'undefined'}
							{$LL.pages.stations.table.cells.stationTypes[
								feature.properties
									?.stationType as keyof typeof $LL.pages.stations.table.cells.stationTypes
							].nameShort()}
						{/if}
						{#if typeof getValueById(feature.properties?.id) === 'number'}
							{` ・ `}
							{getValueById(feature.properties?.id)?.valueOf().toLocaleString($locale, {
								maximumFractionDigits: 1
							})}
							{unitOnlyLabel}
						{:else if typeof getValueById(feature.properties?.id) === 'string'}
							<br />
							{getHeatStressLabel({
								unit: $unit,
								LL: $LL,
								value: String(getValueById(feature.properties?.id))
							})}
						{:else}
							{@html $LL.pages.measurements.singleUnsupportedStationShort({
								unit: unitLabel
							})}
						{/if}
					</p>
				</div>
			</div>
		{/snippet}
	</MarkerLayer>
</GeoJSON>
