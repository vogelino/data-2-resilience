<script lang="ts">
	import { lors } from '$lib/stores/mapData';
	import { mode } from 'mode-watcher';
	import { GeoJSON, LineLayer } from 'svelte-maplibre';
</script>

{#if $mode === 'dark'}
	<GeoJSON id="lors-dark" data={lors}>
		<LineLayer
			layout={{ 'line-cap': 'round', 'line-join': 'round' }}
			paint={{ 'line-color': 'white', 'line-width': 0.5 }}
		/>
	</GeoJSON>
{:else}
	<GeoJSON id="lors-light" data={lors}>
		<LineLayer
			layout={{ 'line-cap': 'round', 'line-join': 'round' }}
			paint={{ 'line-color': 'black', 'line-width': 0.5 }}
		/>
	</GeoJSON>
{/if}
