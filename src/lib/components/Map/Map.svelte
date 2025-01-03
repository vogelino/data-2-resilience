<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from '$i18n/i18n-svelte';
	import { type StationsGeoJSONType } from '$lib/stores/mapData';
	import { mode } from 'mode-watcher';
	import { MapLibre } from 'svelte-maplibre';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import ChoroplethLegend from '../ChoroplethLegend.svelte';
	import MapAttribution from './MapAttribution.svelte';
	import MapDistrictsLayer from './MapDistrictsLayer.svelte';
	import MapHourFilter from './MapHourFilter.svelte';
	import MapLayerSelection from './MapLayerSelection.svelte';
	import MapLorsLayer from './MapLorsLayer.svelte';
	import MapMeasurementsRasterLayer from './MapMeasurementsRasterLayer.svelte';
	import MapStationsLayer from './MapStationsLayer.svelte';
	import MapZoomControl from './MapZoomControl.svelte';
	import SatelliteRasterLayer from './SatelliteRasterLayer.svelte';

	export let stations: StationsGeoJSONType;

	const config = { debounceHistory: 500 };
	const lon = queryParam('lon', ssp.number(7.467), config);
	const lat = queryParam('lat', ssp.number(51.511), config);
	const zoom = queryParam('zoom', ssp.number(10.5), config);
	const hour = queryParam('hour', ssp.number(12), config);
	const showDistricts = queryParam('showDistricts', ssp.boolean(true));
	const showLors = queryParam('showLors', ssp.boolean(false));
	const showSatellite = queryParam('showSatellite', ssp.boolean(false));

	let mapLat = $lat;
	let mapLon = $lon;
	let mapZoom = $zoom;

	$: p = $page.url.pathname.replace(`/${$locale}`, '').replaceAll('/', '');
	$: currentPage = p === '' ? 'measurements' : p;
	$: vectorTilesUrl =
		$mode === 'dark'
			? 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
			: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

	function disableMapRotation(map: maplibregl.Map) {
		// disable map rotation using right click + drag
		map.dragRotate.disable();
		// disable map rotation using keyboard
		map.keyboard.disable();
		// disable map rotation using touch rotation gesture
		map.touchZoomRotate.disableRotation();
	}

	function onMapLoad(e: CustomEvent<maplibregl.Map>) {
		disableMapRotation(e.detail);
	}
</script>

<div class="main-map relative grid h-full w-full items-center justify-center overflow-clip">
	<MapLibre
		let:map
		center={[mapLon, mapLat]}
		zoom={mapZoom}
		dragRotate={false}
		pitchWithRotate={false}
		maxPitch={0}
		maxZoom={15.5}
		maxBounds={[
			[7.090650277147461, 51.400616267063896],
			[7.826598237576263, 51.61374377792475]
		]}
		attributionControl={false}
		class="relative h-[calc(100vh-var(--headerHeight,5rem))] w-screen"
		standardControls={false}
		style={vectorTilesUrl}
		on:moveend={(e) => {
			if (!e?.detail?.map) return;
			const center = e.detail.map.getCenter();
			lon.set(center.lng);
			lat.set(center.lat);
			if (!e.detail.map.getZoom()) return;
			zoom.set(e.detail.map.getZoom());
		}}
		on:load={onMapLoad}
	>
		<MapZoomControl {map} />
		<MapLayerSelection />

		<SatelliteRasterLayer visible={$showSatellite} />
		{#if currentPage === 'measurements'}
			<MapStationsLayer {stations} {map} />
		{/if}
		<MapMeasurementsRasterLayer hour={$hour} visible={currentPage === 'heat-stress'} />
		<MapDistrictsLayer visible={$showDistricts} />
		<MapLorsLayer visible={$showLors} />
	</MapLibre>

	<ChoroplethLegend />
	{#if currentPage === 'heat-stress'}
		<MapHourFilter />
	{/if}
	<MapAttribution />
</div>

<style>
	/* MAPLIBRE */
	.main-map :global(.maplibregl-canvas) {
		outline: none;
	}

	.main-map:has(.maplibregl-canvas:focus-visible)::after {
		content: '';
		position: absolute;
		inset: -4px;
		z-index: 1000;
		border-radius: 0.75rem;
		box-shadow:
			inset 0 0 0 6px hsl(var(--background)),
			inset 0 0 0 8px hsl(var(--ring));
	}
</style>
