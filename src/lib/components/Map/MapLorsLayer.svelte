<script lang="ts">
	import { lors } from '$lib/stores/mapData';
	import { mode } from 'mode-watcher';
	import { GeoJSON, LineLayer, FillLayer } from 'svelte-maplibre';

	interface Props {
		visible?: boolean;
	}

	let { visible = false }: Props = $props();
</script>

<GeoJSON id="lors" data={lors}>
	<FillLayer
		layout={{
			visibility: visible ? 'visible' : 'none'
		}}
		paint={{
			'fill-color': [
				'match',
				['get', 'vulnerable'],
				1,
				'#FACC13', // Yellow for vulnerable: 1
				0,
				'transparent', // Transparent for vulnerable: 0
				'#CCCCCC' // Gray for any other value or missing property
			],
			'fill-opacity': 0.8
		}}
	/>
	<LineLayer
		layout={{
			'line-cap': 'round',
			'line-join': 'round',
			visibility: visible ? 'visible' : 'none'
		}}
		paint={{
			'line-color': $mode === 'dark' ? 'white' : 'black',
			'line-width': 0.5
		}}
	/>
</GeoJSON>
