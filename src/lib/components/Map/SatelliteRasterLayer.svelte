<script lang="ts">
	import { mode } from 'mode-watcher';
	import { RasterLayer, RasterTileSource } from 'svelte-maplibre';

	interface Props {
		map: maplibregl.Map;
		visible?: boolean;
	}

	let { map, visible = false }: Props = $props();

	const dortmundOrthophotosTileUrl =
		'https://www.wms.nrw.de/geobasis/wms_nw_dop?request=GetMap&service=WMS&version=1.3.0&format=image%2Fpng&transparent=true&layers=nw_dop_rgb&bbox={bbox-epsg-3857}&width=256&height=256&crs=EPSG%3A3857';

	const buildingLayerIds = ['building', 'building-top'];

	$effect(() => toggleBuildingLayers(visible, $mode));

	function toggleBuildingLayers(isVisible: boolean, _mode?: string) {
		if (!map) return;
		buildingLayerIds.forEach((id) => {
			map?.setLayoutProperty(id, 'visibility', isVisible ? 'none' : 'visible');
		});
	}
</script>

<RasterTileSource tiles={[dortmundOrthophotosTileUrl]} tileSize={256}>
	<RasterLayer
		paint={{}}
		beforeId="landuse"
		layout={{ visibility: visible ? 'visible' : 'none' }}
	/>
</RasterTileSource>
