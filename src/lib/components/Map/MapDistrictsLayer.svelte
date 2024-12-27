<script lang="ts">
	import { districts } from '$lib/stores/mapData';
	import { mode } from 'mode-watcher';
	import { type ComponentProps } from 'svelte';
	import { GeoJSON, Popup, FillLayer, LineLayer } from 'svelte-maplibre';

	type LineLayerProps = ComponentProps<LineLayer>;

	export let visible = true;

	$: paint = {
		'line-color': $mode === 'dark' ? 'white' : 'black',
		'line-opacity': 1
	} satisfies LineLayerProps['paint'];
</script>

<GeoJSON id="districts" data={districts}>
	<FillLayer
		layout={{
			visibility: visible ? 'visible' : 'none'
		}}
		paint={{
			'fill-color': 'transparent'
		}}
		hoverCursor="pointer"
		manageHoverState
	>
		<Popup closeOnClickOutside openOn="hover">Hola!</Popup>
	</FillLayer>
	<LineLayer
		layout={{
			'line-cap': 'round',
			'line-join': 'round',
			visibility: visible ? 'visible' : 'none'
		}}
		{paint}
	/>
</GeoJSON>
