<script lang="ts">
	import { districts } from '$lib/stores/mapData';
	import { GeoJSON, LineLayer } from 'svelte-maplibre';
</script>

<GeoJSON id="districts" data={districts}>
	<LineLayer
		layout={{ 'line-cap': 'round', 'line-join': 'round' }}
		paint={{ 'line-color': 'black', 'line-width': 0.5 }}
	/>
</GeoJSON>
