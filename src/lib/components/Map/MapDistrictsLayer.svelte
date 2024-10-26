<script lang="ts">
	import { districts } from '$lib/stores/mapData';
	import { mode } from 'mode-watcher';
	import { GeoJSON, LineLayer } from 'svelte-maplibre';
</script>

{#if $mode === 'dark'}
	<GeoJSON id="districts-dark" data={districts}>
		<LineLayer
			layout={{ 'line-cap': 'round', 'line-join': 'round' }}
			paint={{ 'line-color': 'white', 'line-width': 0.5 }}
		/>
	</GeoJSON>
{:else}
	<GeoJSON id="districts-light" data={districts}>
		<LineLayer
			layout={{ 'line-cap': 'round', 'line-join': 'round' }}
			paint={{ 'line-color': 'black', 'line-width': 0.5 }}
		/>
	</GeoJSON>
{/if}
