<script lang="ts">
	import { districts } from '$lib/stores/mapData';
	import { mode } from 'mode-watcher';
	import { GeoJSON, Popup, FillLayer, LineLayer } from 'svelte-maplibre';

	interface Props {
		visible?: boolean;
	}

	let { visible = true }: Props = $props();
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
		paint={{
			'line-color': $mode === 'dark' ? 'white' : 'black',
			'line-opacity': 1
		}}
	/>
</GeoJSON>
