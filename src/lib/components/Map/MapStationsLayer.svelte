<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { StationsGeoJSONType } from '$lib/stores/mapData';
	import { toggleStationSelection, useStations } from '$lib/stores/stationsStore';
	import { unit, unitLabel, unitOnly, unitWithMinMaxAvg } from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
	import { getColorScaleValue } from '$lib/utils/colorScaleUtil';
	import { reactiveQueryArgs } from '$lib/utils/queryUtils.svelte';
	import { getHeatStressLabel } from '$lib/utils/textUtil';
	import { useStationsSnapshotConfig } from '$lib/utils/useStationsSnapshot';
	import { createQuery } from '@tanstack/svelte-query';
	import { GeoJSON, MarkerLayer } from 'svelte-maplibre';

	interface Props {
		stations: StationsGeoJSONType;
		initialStationIds?: string[];
		map: maplibregl.Map;
	}

	let { stations, initialStationIds = [], map }: Props = $props();

	const selectedStations = useStations({ initialStationIds, stations });
	const stationsSnapshotQueryConfig = $derived.by(() => useStationsSnapshotConfig({ initialStationIds, stations }));
	const snapshotQuery = createQuery(reactiveQueryArgs(() => $stationsSnapshotQueryConfig));
	const apiResponseData = $derived($snapshotQuery.data || []);

	const idToItemMap = $derived.by(() => {
		return apiResponseData.reduce(
			(acc, item) => ({ ...acc, ...(item.id ? { [item.id]: item } : {}) }),
			{} as Record<string, (typeof apiResponseData)[0]>
		);
	});

	let getValueById = $derived((id?: string) => {
		if (!id || !$unitWithMinMaxAvg) return;
		const item = idToItemMap[id];
		if (!item) return;
		const value = item[$unitWithMinMaxAvg as keyof typeof item];
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
							{@const type = feature.properties?.stationType === 'temprh' ? 'temprh' : 'biomet'}
							{$LL.pages.stations.table.cells.stationTypes[type].nameShort()}
						{/if}
						{#if typeof getValueById(feature.properties?.id) === 'number'}
							{` ・ `}
							{getValueById(feature.properties?.id)?.valueOf().toLocaleString($locale, {
								maximumFractionDigits: 1
							})}
							{$unitOnly}
						{:else if typeof getValueById(feature.properties?.id) === 'string'}
							<br />
							{getHeatStressLabel({
								unit: $unit,
								LL: $LL,
								value: String(getValueById(feature.properties?.id))
							})}
						{:else}
							{@html $LL.pages.measurements.singleUnsupportedStationShort({
								unit: $unitLabel
							})}
						{/if}
					</p>
				</div>
			</div>
		{/snippet}
	</MarkerLayer>
</GeoJSON>
