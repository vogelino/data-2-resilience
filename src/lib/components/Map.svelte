<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from '$i18n/i18n-svelte';
	import { positronMapStyle } from '$lib/stores/mapStyle';
	import {
		hoverStation,
		selectedStations,
		stationsWithPopup,
		toggleStationSelection,
		unhoverStations
	} from '$lib/stores/stationsStore';
	import { selectedUnit } from '$lib/stores/unitStore';
	import {
		addDistrictsLayer,
		addStationsLayer,
		addWmsLayers,
		getAllPopups,
		initMap,
		updateLayersVisibilityByPage
	} from '$lib/utils/mapUti';
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { onMount } from 'svelte';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import MapHourFilter from './MapHourFilter.svelte';
	import MapZoomControl from './MapZoomControl.svelte';

	let map: maplibregl.Map;
	let initialized = false;
	let popups = new Map<string, maplibregl.Popup>();

	const config = { debounceHistory: 500 };
	const lon = queryParam('lon', ssp.number(7.467), config);
	const lat = queryParam('lat', ssp.number(51.511), config);
	const zoom = queryParam('zoom', ssp.number(10.5), config);
	const hour = queryParam('hour', ssp.number(0), config);
	const urlStations = queryParam('selectedStations');
	const thermalComfort = queryParam('thermal_comfort');
	const unit = queryParam('unit');

	selectedStations.subscribe((value) => {
		urlStations.set(value.join(','));
	});

	selectedUnit.subscribe((value) => {
		unit.set(value);
	});

	onMount(() => {
		urlStations.subscribe((value) => {
			if (!initialized && value) {
				selectedStations.set(value.split(','));
			}
		});
		unit.subscribe((value) => {
			if (!initialized && value) {
				selectedUnit.set(value);
			}
		});
	});

	$: p = $page.url.pathname.replace(`/${$locale}`, '').replaceAll('/', '');
	$: currentPage = p === '' ? 'thermal-comfort' : p;
	$: layerType = currentPage === `thermal-comfort` ? $thermalComfort : 'stations';

	$: {
		const isRightPage = currentPage === 'measurements';
		popups.forEach((popup, id) => {
			const isSelected = $selectedStations.includes(id);
			const isVisible = isRightPage && $stationsWithPopup.includes(id);
			popup.remove();
			popup.addTo(map);
			popup.getElement()?.classList.toggle('selected', isSelected);
			popup.getElement()?.classList.toggle('!hidden', !isVisible);
		});
	}

	$: {
		if (initialized && map) {
			updateLayersVisibilityByPage({
				hour: $hour,
				map,
				visibleLayerType: layerType,
				page: currentPage
			});
		}
	}

	function onHourChange(event: Event) {
		const target = event.currentTarget as HTMLInputElement;
		hour.set(+target.value);
	}

	function initStationsInteractions(mp: maplibregl.Map) {
		// MAP INTERACTIONS
		mp.on('mouseenter', 'stations', (e) => {
			const stationId = e.features?.[0]?.properties.id;
			if (!stationId) return;
			hoverStation(stationId);
		});

		mp.on('mouseleave', 'stations', (e) => {
			unhoverStations();
		});

		mp.on('click', 'stations', (e) => {
			const stationId = e.features?.[0]?.properties.id;
			if (!stationId) return;
			toggleStationSelection(stationId);
		});

		mp.on('mouseenter', 'stations', () => {
			mp.getCanvas().style.cursor = 'pointer';
		});

		mp.on('mouseleave', 'stations', () => {
			mp.getCanvas().style.cursor = '';
		});
	}

	onMount(() => {
		map = initMap({
			defaultLat: $lat,
			defaultLng: $lon,
			defaultZoom: $zoom,
			style: $positronMapStyle
		});

		map.on('load', () => {
			// MAP SOURCES AND LAYERS
			addWmsLayers({ map });
			addDistrictsLayer({ map });
			addStationsLayer({ map });

			initStationsInteractions(map);

			initialized = true;
		});

		map.on('move', () => {
			const center = map.getCenter();
			$lat = center.lat;
			$lon = center.lng;
		});

		map.on('zoom', () => {
			$zoom = map.getZoom();
		});

		popups = getAllPopups(map);
	});
</script>

<div class="relative grid h-full w-full items-center justify-center overflow-clip">
	<div id="map" class="relative h-[calc(100vh-var(--headerHeight,5rem))] w-screen">
		<MapZoomControl {map} />
		{#if currentPage === 'thermal-comfort'}
			<MapHourFilter />
		{/if}
	</div>
</div>

<style>
	/* MAPLIBRE */
	#map :global(.maplibregl-canvas) {
		outline: none;
	}

	#map:has(.maplibregl-canvas:focus-visible)::after {
		content: '';
		position: absolute;
		inset: -4px;
		z-index: 1000;
		box-shadow:
			inset 0 0 0 6px hsl(var(--background)),
			inset 0 0 0 8px hsl(var(--foreground));
		border-radius: 0.75rem;
	}

	#map :global(.maplibregl-popup-content) {
		background: hsl(var(--background));
		padding: 0.75rem 1rem;
		border: 1px solid hsl(var(--border));
	}

	#map :global(.maplibregl-popup-tip) {
		border-top-color: hsl(var(--border));
	}

	#map :global(.selected > .maplibregl-popup-content) {
		border-color: hsl(var(--foreground));
	}

	#map :global(.selected > .maplibregl-popup-tip) {
		border-top-color: hsl(var(--foreground));
	}
</style>
