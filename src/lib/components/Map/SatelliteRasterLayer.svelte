<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { RasterLayer, RasterTileSource } from 'svelte-maplibre';

	interface Props {
		map: maplibregl.Map;
		visible?: boolean;
	}

	let { map, visible = false }: Props = $props();

	const dortmundOrthophotosTileUrl =
		'https://www.wms.nrw.de/geobasis/wms_nw_dop?request=GetMap&service=WMS&version=1.3.0&format=image%2Fpng&transparent=true&layers=nw_dop_rgb&bbox={bbox-epsg-3857}&width=256&height=256&crs=EPSG%3A3857';

	const buildingLayerIds = ['building', 'building-top'];

	onMount(() => {
		toggleBuildingLayers(visible);
	});

	$effect(() => toggleBuildingLayers(visible));

	function toggleBuildingLayers(isVisible: boolean) {
		if (!map) return;
		buildingLayerIds.forEach((id) => {
			map?.setLayoutProperty(id, 'visibility', isVisible ? 'none' : 'visible');
		});
	}

	onDestroy(() => {
		// Restore building layers visibility when component is destroyed
		if (map && visible) {
			toggleBuildingLayers(false);
		}
	});
</script>

<RasterTileSource tiles={[dortmundOrthophotosTileUrl]} tileSize={256}>
	<RasterLayer
		paint={{}}
		beforeId="tunnel_service_case"
		layout={{ visibility: visible ? 'visible' : 'none' }}
	/>
</RasterTileSource>
