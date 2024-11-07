<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { StationsGeoJSONType } from '$lib/stores/mapData';
	import { toggleStationSelection, useStations } from '$lib/stores/stationsStore';
	import { cn } from '$lib/utils';
	import { getColorScaleValue } from '$lib/utils/colorScaleUtil';
	import { today } from '$lib/utils/dateUtil';
	import { useSationsSnapshotData } from '$lib/utils/queryUtils/stationsLatestData';
	import { getHeatStressLabel } from '$lib/utils/textUtil';
	import { startOfHour } from 'date-fns';
	import { GeoJSON, MarkerLayer } from 'svelte-maplibre';
	import { queryParam, ssp } from 'sveltekit-search-params';

	export let stations: StationsGeoJSONType;
	export let map: maplibregl.Map;

	const unit = queryParam('unit', ssp.string('air_temperature'));
	const selectedStations = useStations();
	$: query = useSationsSnapshotData({
		date: startOfHour(today()),
		unit: $unit,
		scale: 'hourly'
	});
	$: idToItemMap = $query.data || {};

	$: unitLabel =
		$LL.pages.measurements.unitSelect.units[
			$unit as keyof typeof $LL.pages.measurements.unitSelect.units
		].label();
	$: unitOnlyLabel =
		$LL.pages.measurements.unitSelect.units[
			$unit as keyof typeof $LL.pages.measurements.unitSelect.units
		].unitOnly();

	$: getValueById = (id?: string) => {
		if (!id || !$unit) return;
		const item = idToItemMap[id];
		if (!item) return;
		const value = item[$unit as keyof typeof item];
		return value as { valueOf(): number } & string;
	};
	$: getBgColorById = (id?: string) => {
		const defaultColor = 'hsl(var(--muted-foreground))';
		const value = getValueById(id);
		if (!value) return defaultColor;
		return getColorScaleValue({ unit: $unit, LL: $LL, value });
	};
</script>

<GeoJSON id="stations" data={stations} promoteId="STATEFP">
	<MarkerLayer interactive let:feature class="group relative hover:z-10">
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
			on:click={() => {
				if (!feature.properties?.id) return;
				const { id } = feature.properties;
				toggleStationSelection(id);
			}}
			on:focusin={() => {
				map.flyTo({
					center: [7.467, 51.511],
					zoom: 10.5
				});
			}}
		>
			<span class="absolute inset-0 rounded-full border border-black/20 mix-blend-multiply" />
		</button>
		<div
			class={cn(
				'pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 group-hover:-translate-y-2',
				'w-fit max-w-96 rounded-md bg-background px-4 py-3 opacity-0 transition group-hover:opacity-100',
				'w-48 border border-border shadow-lg'
			)}
		>
			<div class="relative flex flex-col">
				<h3 class="text-sm font-bold">{feature.properties?.longName}</h3>
				<p class="text-xs">
					{#if typeof getValueById(feature.properties?.id) === 'number'}
						{getValueById(feature.properties?.id)?.valueOf().toLocaleString($locale, {
							maximumFractionDigits: 1
						})}
						{unitOnlyLabel}
					{:else if typeof getValueById(feature.properties?.id) === 'string'}
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
	</MarkerLayer>
</GeoJSON>
