<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from '$i18n/i18n-svelte';
	import { bezirke, stations } from '$lib/stores/mapData';
	import { positronMapStyle } from '$lib/stores/mapStyle';
	import {
		hoverStation,
		selectedStations,
		stationsWithPopup,
		toggleStationSelection,
		unhoverStations
	} from '$lib/stores/stationsStore';
	import { getPopupHtml } from '$lib/utils/mapUti';
	import maplibregl, { type LngLatBoundsLike, type LngLatLike } from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { onMount } from 'svelte';
	import { queryParam, ssp } from 'sveltekit-search-params';

	let selectedHour = '00';
	let map: maplibregl.Map;

	let layerIds: string[] = [];
	let sourceIds: string[] = [];
	let popups = new Map<string, maplibregl.Popup>();

	$: tilesURL = `http://34.175.150.40:8080/geoserver/RUBochum/wms?service=WMS&version=1.1.0&request=GetMap&layers=RUBochum%3AUTCI_pytherm_3m_v0.6.0_2024_177_${selectedHour}&bbox={bbox-epsg-3857}&width=768&height=703&srs=EPSG%3A3857&styles=&format=image%2Fpng%3B%20mode%3D8bit&transparent=true`;

	const config = { debounceHistory: 500 };
	const lon = queryParam('lon', ssp.number(7.467), config);
	const lat = queryParam('lat', ssp.number(51.511), config);
	const zoom = queryParam('zoom', ssp.number(10.5), config);
	const urlState = queryParam('selectedStations');

	selectedStations.subscribe((value) => {
		urlState.set(value.join(','));
	});

	onMount(() => {
		let initialized = false;
		urlState.subscribe((value) => {
			if (!initialized && value) {
				selectedStations.set(value.split(','));
			}
			initialized = true;
		});
	});

	$: {
		popups.forEach((popup, id) => {
			popup.addClassName('!hidden');
			popup.removeClassName('selected');
		});
		if ($page.url.pathname === `/${$locale}`) {
			$stationsWithPopup.forEach((id) => {
				const popup = popups.get(id);
				if (popup) {
					const isSelected = $selectedStations.includes(id);
					popup.removeClassName('!hidden');
					popup.addTo(map);
					popup.getElement()?.classList.toggle('selected', isSelected);
				}
			});
		}
	}

	function onChange(event: Event) {
		const target = event.currentTarget as HTMLInputElement;
		selectedHour = target.value;
		cleanupMap();
		addWmsLayer(selectedHour);
	}

	function addWmsLayer(hour: string) {
		const sourceId = `wms-test-source-${hour}`;
		const layerId = `wms-test-layer-${hour}`;
		const newTilesURL = `http://34.175.150.40:8080/geoserver/RUBochum/wms?service=WMS&version=1.1.0&request=GetMap&layers=RUBochum%3AUTCI_pytherm_3m_v0.6.0_2024_177_${hour}&bbox={bbox-epsg-3857}&width=768&height=703&srs=EPSG%3A3857&styles=&format=image%2Fpng%3B%20mode%3D8bit&transparent=true`;

		if (!map.getSource(sourceId)) {
			map.addSource(sourceId, {
				type: 'raster',
				tiles: [newTilesURL],
				tileSize: 256
			});
		}

		if (!map.getLayer(layerId)) {
			map.addLayer({
				id: layerId,
				type: 'raster',
				source: sourceId,
				paint: {}
			});
			sourceIds.push(sourceId);
			layerIds.push(layerId);
		}
	}

	function cleanupMap() {
		layerIds.forEach((layerId) => {
			if (map.getLayer(layerId)) {
				map.removeLayer(layerId);
			}
		});

		sourceIds.forEach((sourceId) => {
			if (map.getSource(sourceId)) {
				map.removeSource(sourceId);
			}
		});

		layerIds = [];
		sourceIds = [];
	}

	onMount(() => {
		let tiles = {
			type: 'vector',
			tiles: [`${location.origin}/openmaptiles/{z}/{x}/{y}.pbf`],
			maxzoom: 14
		};

		// Add tiles to mapStyle
		// @ts-ignore
		$positronMapStyle.sources.openmaptiles = tiles;

		const bounds: LngLatBoundsLike = [
			[7.090650277147461, 51.400616267063896],
			[7.826598237576263, 51.61374377792475]
		];

		map = new maplibregl.Map({
			container: 'map',
			style: $positronMapStyle,
			center: {
				lng: $lon,
				lat: $lat
			},
			zoom: $zoom ?? zoom,
			maxBounds: bounds,
			attributionControl: false
		});

		map.addControl(new maplibregl.NavigationControl(), 'top-right');

		map.addControl(
			new maplibregl.AttributionControl({
				compact: true,
				customAttribution: `© <a href="https://maplibre.org/">MapLibre</a>, <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>`
			}),
			'bottom-right'
		);

		map.on('load', () => {
			map.addSource('stations', {
				type: 'geojson',
				data: stations
			});

			map.addSource('bezirke', {
				type: 'geojson',
				data: bezirke
			});

			addWmsLayer(selectedHour);

			map.addLayer({
				id: 'bezirke',
				source: 'bezirke',
				type: 'line',
				paint: {
					'line-color': 'black',
					'line-width': 0.5
				}
			});

			map.addLayer({
				id: 'stations',
				source: 'stations',
				type: 'circle',
				paint: {
					'circle-radius': 3
				}
			});

			map.on('mouseenter', 'stations', (e) => {
				if (!e.features?.length) return;
				const stationId = e.features[0].properties.id;
				hoverStation(stationId);
			});

			map.on('mouseleave', 'stations', (e) => {
				unhoverStations();
			});

			map.on('click', 'stations', (e) => {
				if (!e.features?.length) return;
				const { properties } = e.features[0];
				const stationId = properties.id;
				toggleStationSelection(stationId);
			});

			map.on('mouseenter', 'stations', () => {
				map.getCanvas().style.cursor = 'pointer';
			});

			map.on('mouseleave', 'stations', () => {
				map.getCanvas().style.cursor = '';
			});
		});

		map.on('move', () => {
			const center = map.getCenter();
			$lat = center.lat;
			$lon = center.lng;
		});

		map.on('zoom', () => {
			$zoom = map.getZoom();
		});

		stations.features.forEach((station) => {
			const stationId = station.properties.id;
			const popup = new maplibregl.Popup({ closeButton: false });
			popup.setLngLat(station.geometry.coordinates as LngLatLike);
			popup.setHTML(
				getPopupHtml({ title: station.properties.Label, content: station.properties.Strasse })
			);
			popup.addTo(map);
			popup.addClassName('!hidden');
			popups.set(stationId, popup);
		});
		popups = popups;
	});
</script>

<div class="relative grid h-full w-full items-center justify-center overflow-clip">
	<div id="map" class="relative h-[calc(100vh-var(--headerHeight,5rem))] w-screen">
		<div class="pointer-events-none absolute bottom-0 z-50 flex h-24 w-full flex-col items-center">
			<div class="pointer-events-auto space-x-4 rounded bg-background p-4">
				{#each ['00', '15', '20'] as time}
					<label>
						<input
							type="radio"
							name="time"
							value={time}
							class="mr-1"
							bind:group={selectedHour}
							on:change={onChange}
						/>{time === '00' ? '0' : time}h
					</label>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	/* MAPLIBRE */
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
