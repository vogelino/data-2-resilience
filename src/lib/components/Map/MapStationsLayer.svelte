<script lang="ts">
	import type { StationsGeoJSONType } from '$lib/stores/mapData';
	import { selectedStations, toggleStationSelection } from '$lib/stores/stationsStore';
	import { cn } from '$lib/utils';
	import { GeoJSON, MarkerLayer } from 'svelte-maplibre';

	export let stations: StationsGeoJSONType;
	export let map: maplibregl.Map;
</script>

<GeoJSON id="stations" data={stations} promoteId="STATEFP">
	<MarkerLayer interactive let:feature class="group relative hover:z-10">
		<button
			type="button"
			class={cn(
				'grid h-4 w-4 place-items-center rounded-full border-2 border-background bg-primary outline-none',
				'focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background',
				$selectedStations.includes(feature.properties?.id) && [
					'ring-2 ring-background ring-offset-2 ring-offset-primary'
				]
			)}
			on:click={() => {
				toggleStationSelection(feature.properties?.id);
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
