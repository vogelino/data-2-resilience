<script lang="ts">
	import { locale, LL } from '$i18n/i18n-svelte';
	import { lors } from '$lib/stores/mapData';
	import { HandHelping } from 'lucide-svelte';
	import { mode } from 'mode-watcher';
	import { GeoJSON, LineLayer, FillLayer, Popup } from 'svelte-maplibre';

	interface Props {
		visible?: boolean;
	}

	let { visible = false }: Props = $props();
</script>

<GeoJSON id="lors" data={lors} promoteId="LORS">
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
			'fill-opacity': 0.5
		}}
	>
		<Popup closeOnClickOutside openOn="hover">
			{#snippet children({ data })}
				{#if data}
					<strong class="text-sm font-semibold">
						{data.properties?.NAME}
					</strong>
					<p>
						{$LL.map.layersTooltips.type.statistischer_bezirk?.()}
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
			'line-width': 0.5
		}}
	/>
</GeoJSON>
