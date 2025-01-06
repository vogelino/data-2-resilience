<script lang="ts">
	import { lors } from '$lib/stores/mapData';
	import { mode } from 'mode-watcher';
	import { GeoJSON, LineLayer, FillLayer } from 'svelte-maplibre';

	export let visible = false;
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
	{#if visible}
		<FillLayer
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
				visibility: visible && $mode !== 'dark' ? 'visible' : 'none'
			}}
			paint={{ 'line-color': 'black', 'line-width': 0.5 }}
		/>
	{/if}
</GeoJSON>
