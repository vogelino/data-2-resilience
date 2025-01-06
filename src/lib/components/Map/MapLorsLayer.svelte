<script lang="ts">
	import { lors } from '$lib/stores/mapData';
	import { mode } from 'mode-watcher';
	import { GeoJSON, LineLayer } from 'svelte-maplibre';

	interface Props {
		visible?: boolean;
	}

	let { visible = false }: Props = $props();
</script>

<GeoJSON id="lors-dark" data={lors}>
	<LineLayer
		layout={{
			'line-cap': 'round',
			'line-join': 'round',
			visibility: visible && $mode === 'dark' ? 'visible' : 'none'
		}}
		paint={{ 'line-color': 'white', 'line-width': 0.5 }}
	/>
</GeoJSON>
<GeoJSON id="lors-light" data={lors}>
	<LineLayer
		layout={{
			'line-cap': 'round',
			'line-join': 'round',
			visibility: visible && $mode !== 'dark' ? 'visible' : 'none'
		}}
		paint={{ 'line-color': 'black', 'line-width': 0.5 }}
	/>
</GeoJSON>
