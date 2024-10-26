<script lang="ts">
	import { RasterLayer, RasterTileSource } from 'svelte-maplibre';

	export let hour: number;

	$: tilesUrl = `http://34.175.150.40:8080/geoserver/RUBochum/wms?service=WMS&version=1.1.0&request=GetMap&layers=RUBochum%3AUTCI_pytherm_3m_v0.6.0_2024_177_${hour}_separate_color&bbox={bbox-epsg-3857}&width=768&height=703&srs=EPSG%3A3857&styles=&format=image%2Fpng%3B%20mode%3D8bit&transparent=true`;
</script>

<RasterTileSource tiles={[tilesUrl]} tileSize={256}>
	<RasterLayer paint={{}} beforeLayerType="symbol" />
</RasterTileSource>
