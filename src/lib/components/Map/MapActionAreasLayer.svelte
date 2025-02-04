<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { actionareas } from '$lib/stores/mapData';
	import { addPopup } from '$lib/stores/mapPopupsStore.svelte';
	import { mode } from 'mode-watcher';
	import { FillLayer, GeoJSON, LineLayer, Popup } from 'svelte-maplibre';

	interface Props {
		visible?: boolean;
		displayMode?: 'fill' | 'stroke';
	}

	const { visible = false, displayMode = 'fill' }: Props = $props();
</script>

<GeoJSON id="action-areas" data={actionareas} promoteId="ACTION_AREAS">
	<LineLayer
		layout={{
			'line-cap': 'round',
			'line-join': 'round',
			visibility: visible ? 'visible' : 'none'
		}}
		paint={{
			'line-color': $mode === 'dark' ? 'black' : 'white',
			'line-opacity': 1,
			'line-width': displayMode === 'fill' ? 3.5 : 7
		}}
	/>
	<FillLayer
		layout={{
			visibility: visible ? 'visible' : 'none'
		}}
		paint={{
			'fill-color': displayMode === 'fill' ? '#FACC13' : 'transparent',
			'fill-opacity': 0.2
		}}
	>
		<Popup closeOnClickOutside openOn="click" closeOnClickInside closeOnMove onopen={addPopup}>
			{#snippet children({ data })}
				{#if data}
					<strong class="text-sm font-semibold">
						{data.properties?.name}
					</strong>
					<span
						class="mt-1 block border-t border-border pt-1 underline decoration-primary underline-offset-2"
					>
						{$LL.map.layersTooltips.vulnerableArea()}
					</span>
				{/if}
			{/snippet}
		</Popup>
	</FillLayer>
	<LineLayer
		layout={{
			'line-cap': 'round',
			'line-join': 'round',
			visibility: visible ? 'visible' : 'none'
		}}
		paint={{
			'line-color': '#FACC13',
			'line-width': displayMode === 'stroke' ? 3 : 1.5
		}}
	/>
</GeoJSON>
