<script lang="ts">
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { onMount } from 'svelte';
	import { queryParameters, ssp } from 'sveltekit-search-params';

	const urlState = queryParameters(
		{
			latitude: ssp.number(0),
			longitude: ssp.number(0),
			zoom: ssp.number(1)
		},
		{
			debounceHistory: 500
		}
	);

	let map: maplibregl.Map;
	let latitude = 0;
	let longitude = 0;

	onMount(() => {
		map = new maplibregl.Map({
			container: 'map',
			style: `https://demotiles.maplibre.org/style.json`,
			center: [$urlState.longitude, $urlState.latitude],
			zoom: $urlState.zoom
		});

		map.on('move', () => {
			const center = map.getCenter();
			$urlState.latitude = center.lat;
			$urlState.longitude = center.lng;
		});

		map.on('zoom', () => {
			$urlState.zoom = map.getZoom();
		});
	});
</script>

<div class="relative grid h-full w-full items-center justify-center overflow-clip">
	<div id="map" class="h-[calc(100vh-var(--headerHeight,5rem))] w-screen"></div>
</div>
