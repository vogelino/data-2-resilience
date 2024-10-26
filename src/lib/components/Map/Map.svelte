<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from '$i18n/i18n-svelte';
	import { type StationsGeoJSONType } from '$lib/stores/mapData';
	import { selectedStations } from '$lib/stores/stationsStore';
	import { selectedUnit } from '$lib/stores/unitStore';
	import { onMount } from 'svelte';
	import { MapLibre } from 'svelte-maplibre';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import ChoroplethLegend from '../ChoroplethLegend.svelte';
	import MapDistrictsLayer from './MapDistrictsLayer.svelte';
	import MapHourFilter from './MapHourFilter.svelte';
	import MapMeasurementsRasterLayer from './MapMeasurementsRasterLayer.svelte';
	import MapStationsLayer from './MapStationsLayer.svelte';
	import MapZoomControl from './MapZoomControl.svelte';

	export let stations: StationsGeoJSONType;

	const config = { debounceHistory: 500 };
	const lon = queryParam('lon', ssp.number(7.467), config);
	const lat = queryParam('lat', ssp.number(51.511), config);
	const zoom = queryParam('zoom', ssp.number(10.5), config);
	const hour = queryParam('hour', ssp.number(12), config);
	const urlStations = queryParam('selectedStations');
	const unit = queryParam('unit');

	let mapLat = $lat;
	let mapLon = $lon;
	let mapZoom = $zoom;

	$: p = $page.url.pathname.replace(`/${$locale}`, '').replaceAll('/', '');
	$: currentPage = p === '' ? 'measurements' : p;

	onMount(() => {
		selectedStations.subscribe((value) => {
			value && urlStations.set(value.join(','));
		});
		selectedUnit.subscribe((value) => {
			value && unit.set(value);
		});
		urlStations.subscribe((value) => {
			value && selectedStations.set(value.split(','));
		});
		unit.subscribe((value) => {
			value && selectedUnit.set(value);
		});
	});
</script>

<div class="relative grid h-full w-full items-center justify-center overflow-clip">
	<MapLibre
		let:map
		center={[mapLon, mapLat]}
		zoom={mapZoom}
		dragRotate={false}
		maxPitch={0}
		class="main-map relative h-[calc(100vh-var(--headerHeight,5rem))] w-screen"
		standardControls={false}
		style={'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'}
		on:moveend={(e) => {
			if (!e?.detail?.map) return;
			const center = e.detail.map.getCenter();
			lon.set(center.lng);
			lat.set(center.lat);
			if (!e.detail.map.getZoom()) return;
			zoom.set(e.detail.map.getZoom());
		}}
	>
		<MapZoomControl {map} />

		<MapDistrictsLayer />
		{#if currentPage === 'measurements'}
			<MapStationsLayer {stations} />
		{:else if currentPage === 'heat-stress'}
			<MapMeasurementsRasterLayer hour={$hour} />
		{/if}
	</MapLibre>

	{#if currentPage === 'heat-stress'}
		<MapHourFilter />
		<ChoroplethLegend />
	{/if}
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
		box-shadow:
			inset 0 0 0 6px hsl(var(--background)),
			inset 0 0 0 8px hsl(var(--foreground));
		border-radius: 0.75rem;
	}

	.main-map :global(.maplibregl-popup-content) {
		background: hsl(var(--background));
		padding: 0.75rem 1rem;
		border: 1px solid hsl(var(--border));
	}

	.main-map :global(.maplibregl-popup-tip) {
		border-top-color: hsl(var(--border));
	}

	.main-map :global(.selected > .maplibregl-popup-content) {
		border-color: hsl(var(--foreground));
	}

	.main-map :global(.selected > .maplibregl-popup-tip) {
		border-top-color: hsl(var(--foreground));
	}
</style>
