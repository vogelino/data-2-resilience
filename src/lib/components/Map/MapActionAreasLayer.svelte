<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { actionareas } from '$lib/stores/mapData';
	import { addPopup } from '$lib/stores/mapPopupsStore.svelte';
	import { mode } from 'mode-watcher';
	import { FillLayer, GeoJSON, LineLayer, Popup } from 'svelte-maplibre';

	interface Props {
		visible?: boolean;
	}

	const { visible = false }: Props = $props();
</script>

<GeoJSON id="action-areas" data={actionareas} promoteId="ACTION_AREAS">
	<FillLayer
		layout={{
			visibility: visible ? 'visible' : 'none'
		}}
		paint={{
			'fill-color': '#FACC13',
			'fill-opacity': 0.5
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
			'line-color': $mode === 'dark' ? 'white' : 'black',
			'line-width': 0.5
		}}
	/>
</GeoJSON>
