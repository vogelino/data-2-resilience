<script lang="ts">
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { onMount } from 'svelte';
	import { queryParameters, ssp } from 'sveltekit-search-params';
	import { positronMapStyle } from '$lib/stores/mapStyle';
	import { stations, bezirke } from '$lib/stores/mapData';
	import { redirect } from '@sveltejs/kit';

	let latitude = 7.467;
	let longitude = 51.511;
	let zoom = 10.5;

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

	onMount(() => {
		// Fetch local tiles
		let tiles = {
			type: 'vector',
			tiles: [`${location.origin}/openmaptiles/{z}/{x}/{y}.pbf`],
			maxzoom: 14
		};

		// Add tiles to mapStyle
		$positronMapStyle.sources.openmaptiles = tiles;

		// Define maxBounds
		const bounds = [
			[7.090650277147461, 51.400616267063896],
			[7.826598237576263, 51.61374377792475]
		];

		const map = new maplibregl.Map({
			container: 'map',
			style: $positronMapStyle,
			center: [$urlState.lat, $urlState.lon],
			zoom: $urlState.zoom,
			maxBounds: bounds
			// minZoom: 10,
			// maxZoom: 16
		});

		// Add zoom and rotation controls to the map.
		map.addControl(new maplibregl.NavigationControl('top-right'));

		map.on('load', () => {
			map.addSource('stations', {
				type: 'geojson',
				data: stations
			});

			map.addSource('bezirke', {
				type: 'geojson',
				data: bezirke
			});

			map.addSource('wms-test-source', {
				type: 'raster',
				// Important: WMS must contain '&bbox={bbox-epsg-3857}'' parameter
				// Important: WMS must be served as transparent png with '&transparent=true' parameter
				tiles: [
					// Default png images
					// 'http://34.175.30.147:8080/geoserver/RUBochum/wms?service=WMS&version=1.1.0&request=GetMap&layers=RUBochum%3AUTCI_pytherm_3m_v0.6.0_2024_177_00&bbox={bbox-epsg-3857}&width=768&height=703&srs=EPSG%3A3857&styles=&format=image%2Fpng8&transparent=true'

					// 8-bit images optimized
					'http://34.175.30.147:8080/geoserver/RUBochum/wms?service=WMS&version=1.1.0&request=GetMap&layers=RUBochum%3AUTCI_pytherm_3m_v0.6.0_2024_177_00&bbox={bbox-epsg-3857}&width=768&height=703&srs=EPSG%3A3857&styles=&format=image%2Fpng%3B%20mode%3D8bit&transparent=true'
				],
				tileSize: 256
			});

			map.addLayer({
				id: 'bezirke',
				source: {
					type: 'vector'
				},
				source: 'bezirke',
				type: 'line',
				paint: {
					'line-color': 'black',
					'line-width': 0.5

					// MapLibre Style Specification paint properties
				},
				layout: {
					// MapLibre Style Specification layout properties
				}
			});

			map.addLayer({
				id: 'stations',
				source: {
					type: 'vector'
				},
				source: 'stations',
				type: 'circle',
				paint: {
					'circle-radius': 3
					// MapLibre Style Specification paint properties
				},
				layout: {
					// MapLibre Style Specification layout properties
				}
			});

			map.addLayer(
				{
					id: 'wms-test-layer',
					type: 'raster',
					source: 'wms-test-source',
					paint: {}
				}
				// 'aeroway_fill' //streets above image
			);

			// When a click event occurs on a feature in the places layer, open a popup at the
			// location of the feature, with description HTML from its properties.
			map.on('click', 'stations', (e) => {
				const coordinates = e.features[0].geometry.coordinates.slice();
				const description = e.features[0].properties.Label;

				// Ensure that if the map is zoomed out such that multiple
				// copies of the feature are visible, the popup appears
				// over the copy being pointed to.
				while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
					coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
				}

				new maplibregl.Popup().setLngLat(coordinates).setHTML(description).addTo(map);
			});

			// Change the cursor to a pointer when the mouse is over the places layer.
			map.on('mouseenter', 'stations', () => {
				map.getCanvas().style.cursor = 'pointer';
			});

			// Change it back to a pointer when it leaves.
			map.on('mouseleave', 'stations', () => {
				map.getCanvas().style.cursor = '';
			});
		});

		map.on('move', () => {
			const center = map.getCenter();
			$urlState.lat = center.lat;
			$urlState.lon = center.lng;

			// let bounds = map.getBounds();
			// console.log('bounds', bounds);
			// let boundsFormatted = [
			// 	[bounds['_sw'].lng, bounds['_sw'].lat],
			// 	[bounds['_ne'].lng, bounds['_ne'].lat]
			// ];
			// console.log('boundsFormatted', boundsFormatted);
		});

		map.on('zoom', () => {
			$urlState.zoom = map.getZoom();
		});
	});
</script>

<div class="relative grid h-full w-full items-center justify-center overflow-clip">
	<div id="map" class="h-[calc(100vh-var(--headerHeight,5rem))] w-screen"></div>
</div>
