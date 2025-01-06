<script lang="ts">
	import { districts } from '$lib/stores/mapData';

	import { mode } from 'mode-watcher';
	import { GeoJSON, LineLayer } from 'svelte-maplibre';

	export let visible = true;
</script>

<GeoJSON id="districts-dark" data={districts}>
	<LineLayer
		layout={{
			'line-cap': 'round',
			'line-join': 'round',
			visibility: visible && $mode === 'dark' ? 'visible' : 'none'
		}}
		paint={{ 'line-color': 'white', 'line-width': 1 }}
	/>
</GeoJSON>
<GeoJSON id="districts-light" data={districts}>
	<LineLayer
		layout={{
			'line-cap': 'round',
			'line-join': 'round',
			visibility: visible && $mode !== 'dark' ? 'visible' : 'none'
		}}
		paint={{ 'line-color': 'black', 'line-width': 1 }}
	/>
</GeoJSON>
