<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { districts } from '$lib/stores/mapData';
	import { mode } from 'mode-watcher';
	import { FillLayer, GeoJSON, LineLayer, Popup } from 'svelte-maplibre';
	import { addPopup } from '$lib/stores/mapPopupsStore.svelte';

	interface Props {
		visible?: boolean;
	}

	const { visible = true }: Props = $props();
</script>

<GeoJSON id="districts" data={districts} promoteId="DISTRICTS">
	<FillLayer
		layout={{
			visibility: visible ? 'visible' : 'none'
		}}
		paint={{ 'fill-color': 'transparent' }}
		hoverCursor="pointer"
		manageHoverState
	>
		<Popup closeOnClickOutside openOn="click" closeOnMove closeOnClickInside onopen={addPopup}>
			{#snippet children({ data })}
				{#if data}
					<strong class="text-sm font-semibold">
						{data.properties?.name}
					</strong>
					<p>
						{$LL.map.layersTooltips.type.stadtbezirk()}
					</p>
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
			'line-color': $mode === 'dark' ? 'white' : 'black',
			'line-opacity': 1
		}}
	/>
</GeoJSON>

<style>
	/* MAPLIBRE POPUPS */
	:global(.maplibregl-popup-anchor-top .maplibregl-popup-tip),
	:global(.maplibregl-popup-anchor-top-left .maplibregl-popup-tip),
	:global(.maplibregl-popup-anchor-top-right .maplibregl-popup-tip) {
		border-bottom-color: transparent;
	}
	:global(.maplibregl-popup-anchor-bottom .maplibregl-popup-tip),
	:global(.maplibregl-popup-anchor-bottom-left .maplibregl-popup-tip),
	:global(.maplibregl-popup-anchor-bottom-right .maplibregl-popup-tip) {
		border-top-color: transparent;
	}
	:global(.maplibregl-popup-anchor-left .maplibregl-popup-tip) {
		border-right-color: transparent;
	}
	:global(.maplibregl-popup-anchor-right .maplibregl-popup-tip) {
		border-left-color: transparent;
	}
	:global(.maplibregl-popup-content) {
		background-color: hsl(var(--background));
		border: 1px solid hsl(var(--border));
		font-size: 0.75rem;
		line-height: 1rem;
		padding: 0.75rem 1rem;
	}
	:global(.maplibregl-canvas-container:has(.maplibregl-marker:hover) ~ .maplibregl-popup) {
		opacity: 0;
		pointer-events: none;
	}
</style>
