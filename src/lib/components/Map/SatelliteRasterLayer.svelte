<script lang="ts">
	import { PUBLIC_SENTINELMAP_API_KEY } from '$env/static/public';
	import { RasterLayer, RasterTileSource } from 'svelte-maplibre';

	const satelliteTilesUrl = `https://tile.sentinelmap.eu/2016/summer/rgb/{z}/{x}/{y}.jpg?key=${PUBLIC_SENTINELMAP_API_KEY}`;
</script>

<RasterTileSource tiles={[satelliteTilesUrl]} tileSize={256}>
	<RasterLayer paint={{}} beforeLayerType="fill-extrusion" />
</RasterTileSource>
