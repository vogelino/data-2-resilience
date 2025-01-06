<script lang="ts">
	import { PUBLIC_SENTINELMAP_API_KEY } from '$env/static/public';
	import { RasterLayer, RasterTileSource } from 'svelte-maplibre';

	interface Props {
		visible?: boolean;
	}

	let { visible = false }: Props = $props();

	const satelliteTilesUrl = `https://tile.sentinelmap.eu/2016/summer/rgb/{z}/{x}/{y}.jpg?key=${PUBLIC_SENTINELMAP_API_KEY}`;

	const dortmundOrthophotosTileUrl =
		'https://www.wms.nrw.de/geobasis/wms_nw_dop?request=GetMap&service=WMS&version=1.3.0&format=image%2Fpng&transparent=true&layers=nw_dop_rgb&bbox={bbox-epsg-3857}&width=256&height=256&crs=EPSG%3A3857';
</script>

<RasterTileSource tiles={[dortmundOrthophotosTileUrl]} tileSize={256}>
	<RasterLayer
		paint={{}}
		beforeLayerType="symbol"
		layout={{ visibility: visible ? 'visible' : 'none' }}
	/>
</RasterTileSource>
