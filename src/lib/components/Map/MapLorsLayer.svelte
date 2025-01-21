<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { lors } from '$lib/stores/mapData';
	import { addPopup } from '$lib/stores/mapPopupsStore.svelte';
	import { mode } from 'mode-watcher';
	import { FillLayer, GeoJSON, LineLayer, Popup } from 'svelte-maplibre';

	interface Props {
		visible?: boolean;
	}

	const { visible = false }: Props = $props();
</script>

<GeoJSON id="lors" data={lors} promoteId="LORS">
	<FillLayer
		layout={{
			visibility: visible ? 'visible' : 'none'
		}}
		paint={{
			'fill-color': 'transparent'
		}}
	>
		<Popup closeOnClickOutside openOn="click" closeOnClickInside closeOnMove onopen={addPopup}>
			{#snippet children({ data })}
				{#if data}
					<strong class="text-sm font-semibold">
						{data.properties?.name}
					</strong>
					<p>
						{$LL.map.layersTooltips.type.statistischer_bezirk()}
					</p>
					{#if data.properties?.vulnerable === 1}
						<span
							class="mt-1 block border-t border-border pt-1 underline decoration-primary underline-offset-2"
						>
							{$LL.map.layersTooltips.vulnerableArea()}
						</span>
					{/if}
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
			'line-opacity': 0.5,
			'line-width': 0.5
		}}
	/>
</GeoJSON>
