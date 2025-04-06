<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { StationsGeoJSONType } from '$lib/stores/mapData';
	import { toggleStationSelection, useStations } from '$lib/stores/stationsStore';
	import { unit, unitLabel, unitOnly, unitWithMinMaxAvg } from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
	import { getColorScaleValue } from '$lib/utils/colorScaleUtil';
	import { reactiveQueryArgs } from '$lib/utils/queryUtils.svelte';
	import { useStationsSnapshotConfig } from '$lib/utils/useStationsSnapshot';
	import { createQuery } from '@tanstack/svelte-query';
	import HealthRiskPill from 'components/HealthRiskPill.svelte';
	import { GeoJSON, MarkerLayer } from 'svelte-maplibre';

	interface Props {
		stations: StationsGeoJSONType;
		initialStationIds?: string[];
		map: maplibregl.Map;
	}

	let { stations, initialStationIds = [], map }: Props = $props();

	const selectedStations = useStations({ initialStationIds, stations });
	const stationsSnapshotQueryConfig = $derived.by(() =>
		useStationsSnapshotConfig({ initialStationIds, stations })
	);
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
		return value as ({ valueOf(): number } & string) | undefined | null;
	});
	let getBgColorById = $derived((id?: string) => {
		const undefinedColor = 'hsl(var(--muted-foreground)/0.2)';
		const nullColor = 'hsl(var(--muted)/0.1)';
		const value = getValueById(id);
		if (typeof value === 'undefined') return undefinedColor;
		if (value === null) return nullColor;
		return getColorScaleValue({ unit: $unit, LL: $LL, value });
	});
</script>

<GeoJSON id="stations" data={stations} promoteId="STATEFP">
	<MarkerLayer interactive class="group relative hover:z-10">
		{#snippet children({ feature })}
			{@const value = getValueById(feature.properties?.id)}
			{@const type = feature.properties?.stationType === 'temprh' ? 'temprh' : 'biomet'}
			<button
				type="button"
				class={cn(
					'relative grid h-4 w-4 place-items-center rounded-full border-2 border-background outline-none',
					'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
					$selectedStations.includes(feature.properties?.id) && [
						'ring-2 ring-background ring-offset-2 ring-offset-foreground'
					],
					(typeof value === 'undefined' || value === 'null') && 'backdrop-blur-[2px]'
				)}
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
				<HealthRiskPill {value} />
			</button>
			<div
				class={cn(
					'pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 group-hover:-translate-y-2',
					'w-56 rounded-md bg-background px-4 py-3 opacity-0 transition group-hover:opacity-100',
					'border border-border shadow-lg'
				)}
			>
				<div class="relative flex flex-col">
					<h3 class="text-sm font-bold leading-4">{feature.properties?.longName}</h3>
					<div class="mb-2 border-b border-border pb-1 text-xs text-muted-foreground">
						{$LL.pages.stations.table.cells.stationTypes[type].nameShort()}
					</div>
					<div class="text-xs">
						{#if typeof value === 'number'}
							<div class="flex flex-wrap items-center gap-x-1.5">
								<span>
									{(value as { valueOf(): number }).valueOf().toLocaleString($locale, {
										maximumFractionDigits: 1
									})}
									{$unitOnly}
								</span>
								<span class="inline-grid grid-cols-[0.75rem_1fr] items-center gap-1.5 text-nowrap">
									<HealthRiskPill {value} withLabel />
								</span>
							</div>
						{:else if typeof value === 'string'}
							<span class="inline-grid grid-cols-[0.75rem_1fr] items-center gap-1.5 text-nowrap">
								<HealthRiskPill {value} withLabel />
							</span>
						{:else if value === null}
							{@html $LL.pages.measurements.singleStationWithoutAvailableData({
								station: feature.properties?.longName,
								unit: $unitLabel
							})}
						{:else}
							{@html $LL.pages.measurements.singleUnsupportedStationShort({
								unit: $unitLabel
							})}
						{/if}
					</div>
				</div>
			</div>
		{/snippet}
	</MarkerLayer>
</GeoJSON>
