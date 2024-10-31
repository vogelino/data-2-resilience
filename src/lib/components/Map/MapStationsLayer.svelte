<script lang="ts">
	import type { StationsGeoJSONType } from '$lib/stores/mapData';
	import { toggleStationSelection, useStations } from '$lib/stores/stationsStore';
	import { cn } from '$lib/utils';
	import { unitsToScalesMap } from '$lib/utils/colorScaleUtil';
	import { useSationsSnapshotData } from '$lib/utils/queryUtils/stationsLatestData';
	import { subDays } from 'date-fns';
	import { GeoJSON, MarkerLayer } from 'svelte-maplibre';
	import { queryParam, ssp } from 'sveltekit-search-params';

	export let stations: StationsGeoJSONType;
	export let map: maplibregl.Map;

	const unit = queryParam('unit', ssp.string('air_temperature'));
	const selectedStations = useStations();
	$: query = useSationsSnapshotData({
		date: subDays(new Date(), 18),
		unit: $unit,
		scale: 'hourly'
	});
	$: idToItemMap = $query.data || {};

	$: getBgColorById = (id?: string) => {
		const defaultColor = 'hsl(var(--muted-foreground))';
		if (!id || !$unit) return defaultColor;
		const item = idToItemMap[id];
		if (!item) return defaultColor;
		const value = item[$unit as keyof typeof item];
		if (!value) return defaultColor;
		const colorScale =
			unitsToScalesMap[$unit as keyof typeof unitsToScalesMap] || unitsToScalesMap.default;
		return colorScale.fn(value as { valueOf(): number } & string);
	};
</script>

<GeoJSON id="stations" data={stations} promoteId="STATEFP">
	<MarkerLayer interactive let:feature class="group relative hover:z-10">
		<button
			type="button"
			class={cn(
				'grid h-4 w-4 place-items-center rounded-full border-2 border-background bg-foreground outline-none',
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
		/>
		<div
			class={cn(
				'pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 group-hover:-translate-y-2',
				'w-fit max-w-96 rounded-md bg-background px-4 py-3 opacity-0 transition group-hover:opacity-100',
				'border border-border shadow-lg'
			)}
		>
			<div class="relative flex flex-col">
				<h3 class="whitespace-nowrap text-sm font-bold">{feature.properties?.longName}</h3>
				<p class="text-xs">{feature.properties?.district}</p>
			</div>
		</div>
	</MarkerLayer>
</GeoJSON>
