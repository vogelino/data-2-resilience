<script lang="ts">
	import { page } from '$app/state';
	import { page as storePage } from '$app/stores';
	import { locale } from '$i18n/i18n-svelte';
	import type { StationsGeoJSONType } from '$lib/stores/mapData';
	import { closePopup } from '$lib/stores/mapPopupsStore.svelte';
	import { isLeftSidebarOpened } from '$lib/stores/queryPatamsStore.svelte';
	import { cn } from '$lib/utils';
	import type { AddressFeature } from '$lib/utils/searchUtil';
	import { shortcut } from '@svelte-put/shortcut';
	import { mode } from 'mode-watcher';
	import { MapLibre, ScaleControl } from 'svelte-maplibre';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import ChoroplethLegend from '../ChoroplethLegend.svelte';
	import MapActionAreasLayer from './MapActionAreasLayer.svelte';
	import MapAttribution from './MapAttribution.svelte';
	import MapDistrictsLayer from './MapDistrictsLayer.svelte';
	import MapHourFilter from './MapHourFilter.svelte';
	import MapLayerSelection from './MapLayerSelection.svelte';
	import MapLorsLayer from './MapLorsLayer.svelte';
	import MapMeasurementsRasterLayer from './MapMeasurementsRasterLayer.svelte';
	import MapSearchInput from './MapSearchInput.svelte';
	import MapSearchedFeatureLayer from './MapSearchedFeatureLayer.svelte';
	import MapStationsLayer from './MapStationsLayer.svelte';
	import MapZoomControl from './MapZoomControl.svelte';
	import SatelliteRasterLayer from './SatelliteRasterLayer.svelte';

	interface Props {
		stations: StationsGeoJSONType;
	}

	const { stations }: Props = $props();

	const config = { debounceHistory: 500 };
	const lon = queryParam('lon', ssp.number(7.467), config);
	const lat = queryParam('lat', ssp.number(51.511), config);
	const zoom = queryParam('zoom', ssp.number(10.5), config);
	const hour = queryParam('hour', ssp.number(12), config);
	const boundariesMode = queryParam('boundariesMode', ssp.string('districts'));
	const showSatellite = queryParam('showSatellite', ssp.boolean(false));

	const mapLat = $lat;
	const mapLon = $lon;
	const mapZoom = $zoom;

	let searchedFeature: AddressFeature | undefined = $state();
	let isAboutPage = $derived(page.url.pathname.startsWith(`/${$locale}/about`));
	let showLeftSidebar = $derived(!isAboutPage && $isLeftSidebarOpened);

	const showSearchedFeature = (map: maplibregl.Map, feature: AddressFeature | undefined) => {
		if (!feature) return;
		searchedFeature = feature;
		const [lng, lat] = feature.geometry.coordinates;
		map.flyTo({ center: [lng, lat], zoom: 10 });
	};

	const currentPage = $derived.by(() => {
		const p = page.url.pathname.replace(`/${$locale}`, '').replaceAll('/', '');
		return p === '' ? 'measurements' : p;
	});
	const vectorTilesUrl = $derived(
		$mode === 'dark'
			? 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
			: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
	);

	function disableMapRotation(map: maplibregl.Map) {
		// disable map rotation using right click + drag
		map.dragRotate.disable();
		// disable map rotation using keyboard
		map.keyboard.disable();
		// disable map rotation using touch rotation gesture
		map.touchZoomRotate.disableRotation();
	}

	function onMapLoad(map: maplibregl.Map) {
		if (!map) return;
		map.zoomTo(map.getZoom() ?? 10);
		disableMapRotation(map);
	}

	function handleEscape() {
		closePopup();
	}

	boundariesMode.subscribe(() => closePopup());
	// Using the legacy $page store instead of the svelte 5 page state
	// because using $effect with the page state is triggered way too often
	// and prevents the popups from opening
	storePage.subscribe(() => closePopup());
</script>

<svelte:window
	use:shortcut={{
		trigger: {
			key: 'Escape',
			callback: handleEscape,
			preventDefault: false
		}
	}}
/>
<div
	class={cn(
		'main-map relative grid h-full w-full items-center justify-center overflow-clip',
		showLeftSidebar ? 'left-sidebar-open' : 'left-sidebar-closed'
	)}
>
	<MapLibre
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
		onmoveend={(e) => {
			if (!e.target) return;
			const center = e.target.getCenter();
			lon.set(center.lng);
			lat.set(center.lat);
			if (!e.target.getZoom()) return;
			zoom.set(e.target.getZoom());
		}}
		onload={onMapLoad}
	>
		{#snippet children({ map })}
			{#if currentPage === 'measurements'}
				<MapSearchInput
					onFeatureSearched={(f) => showSearchedFeature(map, f)}
					onSearchCleared={() => (searchedFeature = undefined)}
				/>
			{/if}
			<MapZoomControl {map} />
			<MapLayerSelection />

			<SatelliteRasterLayer visible={$showSatellite} />
			{#if currentPage === 'measurements'}
				<MapStationsLayer {stations} {map} />
			{/if}
			<MapMeasurementsRasterLayer hour={$hour} visible={currentPage === 'heat-stress'} />
			<MapDistrictsLayer visible={$boundariesMode === 'districts'} />
			<MapLorsLayer visible={$boundariesMode === 'lors'} />
			{#if searchedFeature}
				<MapSearchedFeatureLayer feature={searchedFeature} />
			{/if}
			<MapActionAreasLayer visible={$boundariesMode === 'lors'} />
			<ScaleControl unit="metric" position="bottom-right" />
		{/snippet}
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

	.main-map:has(:global(.maplibregl-canvas:focus-visible))::after {
		content: '';
		position: absolute;
		inset: -4px;
		z-index: 1000;
		border-radius: 0.75rem;
		box-shadow:
			inset 0 0 0 6px hsl(var(--background)),
			inset 0 0 0 8px hsl(var(--ring));
	}

	.main-map :global(.maplibregl-ctrl-bottom-right .maplibregl-ctrl) {
		margin: 0;
		position: fixed;
		bottom: 2rem;
		right: 0.5rem;
		z-index: 0;
	}
</style>
