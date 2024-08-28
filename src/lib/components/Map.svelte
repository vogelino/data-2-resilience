<script lang="ts">
	import { bezirke, stations } from '$lib/stores/mapData';
	import { positronMapStyle } from '$lib/stores/mapStyle';
	import maplibregl, { type LngLatBoundsLike, type LngLatLike } from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { onMount } from 'svelte';
	import { queryParameters, ssp } from 'sveltekit-search-params';

	let latitude = 7.467;
	let longitude = 51.511;
	let zoom = 10.5;
	let selectedHour = '00';
	let map: maplibregl.Map;

	let layerIds: string[] = [];
	let sourceIds: string[] = [];

	$: tilesURL = `http://34.175.150.40:8080/geoserver/RUBochum/wms?service=WMS&version=1.1.0&request=GetMap&layers=RUBochum%3AUTCI_pytherm_3m_v0.6.0_2024_177_${selectedHour}&bbox={bbox-epsg-3857}&width=768&height=703&srs=EPSG%3A3857&styles=&format=image%2Fpng%3B%20mode%3D8bit&transparent=true`;

	const urlState = queryParameters(
		{
			lon: ssp.number(longitude),
			lat: ssp.number(latitude),
			zoom: ssp.number(zoom)
		},
		{
			debounceHistory: 500
		}
	);

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
				lng: $urlState.lon ?? longitude,
				lat: $urlState.lat ?? latitude
			},
			zoom: $urlState.zoom ?? zoom,
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

			map.on('click', 'stations', (e) => {
				if (!e.features?.length) return;
				const coordinates = e.features[0].geometry.coordinates.slice();
				const description = e.features[0].properties.Label;
				if (typeof coordinates[0] !== 'number') return;

				while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
					coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
				}

				new maplibregl.Popup()
					.setLngLat(coordinates as LngLatLike)
					.setHTML(description)
					.addTo(map);
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
			$urlState.lat = center.lat;
			$urlState.lon = center.lng;
		});

		map.on('zoom', () => {
			$urlState.zoom = map.getZoom();
		});
	});
</script>

<div class="relative grid h-full w-full items-center justify-center overflow-clip">
	<div id="map" class="relative h-[calc(100vh-var(--headerHeight,5rem))] w-screen">
		<div class="absolute bottom-0 z-50 flex h-24 w-full flex-col items-center">
			<div class="space-x-4 rounded bg-white p-4">
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
